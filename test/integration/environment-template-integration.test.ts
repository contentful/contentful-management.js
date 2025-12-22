import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import type { ClientAPI } from '../../lib/create-contentful-api'
import {
  defaultClient,
  getTestOrganizationId,
  createTestSpace,
  createTestEnvironment,
  generateRandomId,
  baseEnvironmentTemplateDescription,
  timeoutToCalmRateLimiting,
  waitForEnvironmentToBeReady,
} from '../helpers'
import type {
  CreateEnvironmentTemplateProps,
  Environment,
  EnvironmentTemplate,
  EnvironmentTemplateInstallationProps,
  Space,
} from '../../lib/export-types'

type InstallTemplate = (versionsCount?: number) => Promise<EnvironmentTemplateInstallationProps>

describe('Environment template API', () => {
  const templateDescription = `${baseEnvironmentTemplateDescription} ${generateRandomId()}`
  const client = defaultClient
  const orgId = getTestOrganizationId()

  describe('Environment template', () => {
    let createdTemplate: EnvironmentTemplate
    let draftTemplate: CreateEnvironmentTemplateProps

    async function setupEnvironmentTemplate(deleteTemplateBeforeSetup: boolean = false) {
      if (createdTemplate && deleteTemplateBeforeSetup) {
        await createdTemplate.delete()
      }
      draftTemplate = createDraftTemplate()
      createdTemplate = await client.createEnvironmentTemplate(orgId, draftTemplate)
    }

    beforeAll(async () => {
      await setupEnvironmentTemplate()
    })

    afterAll(() => {
      // Cleanup
      createdTemplate.delete()
      timeoutToCalmRateLimiting()
    })

    it('creates an environment template', async () => {
      const { sys, ...template } = createdTemplate
      expect(template).toEqual(draftTemplate)
      expect(sys).toBeDefined()
    })

    it('gets an environment template', async () => {
      const {
        sys: { id: templateId },
      } = createdTemplate

      const { sys, ...template } = await client.getEnvironmentTemplate({
        organizationId: orgId,
        environmentTemplateId: templateId,
      })

      expect(template).toEqual(draftTemplate)
      expect(sys).toBeDefined()
    })

    it('gets an environment template with select filter applied', async () => {
      const {
        sys: { id: templateId },
      } = createdTemplate

      const response = await client.getEnvironmentTemplate({
        organizationId: orgId,
        environmentTemplateId: templateId,
        query: {
          select: 'name',
        },
      })

      expect(response).toEqual({ name: draftTemplate.name })
    })

    it('gets a collection of environment templates', async () => {
      const { items: templates } = await client.getEnvironmentTemplates(orgId)

      const fetchedTemplate = templates.find(({ sys: { id } }) => id === createdTemplate.sys.id)

      expect(fetchedTemplate).toBeDefined()

      const { sys, ...template } = fetchedTemplate!

      expect(template).toEqual(draftTemplate)
      expect(sys).toBeDefined()
    })

    it('gets a collection of environment templates with select filter applied', async () => {
      const { items: templates } = await client.getEnvironmentTemplates(orgId, {
        select: 'sys,description',
      })

      const fetchedTemplate = templates.find(({ sys: { id } }) => id === createdTemplate.sys.id)

      expect(fetchedTemplate).toBeDefined()

      const { sys, ...template } = fetchedTemplate!

      expect(template).toEqual({ description: templateDescription })
      expect(sys).toBeDefined()
    })

    it('gets a collection of environment templates with forTemplatedSpaces filter applied', async () => {
      const { items: templates } = await client.getEnvironmentTemplates(orgId, {
        forTemplatedSpaces: true,
      })

      const fetchedTemplate = templates.find(({ sys: { id } }) => id === createdTemplate.sys.id)

      expect(fetchedTemplate).toBeUndefined()
    })

    it('updates an environment template', async () => {
      const draftTemplate = createDraftTemplate()
      const template = await client.createEnvironmentTemplate(orgId, draftTemplate)

      expect(template.sys.version).toBe(1)

      const updatedName = 'Updated name'
      template.name = updatedName
      const { sys, ...updatedTemplate } = await template.update()

      expect(sys.version).toBe(2)
      expect(updatedTemplate).toEqual({
        ...draftTemplate,
        name: updatedName,
      })
    })

    it('updates the version description and name of an environment template', async () => {
      const updatedVersionName = 'Updated version name'
      const updatedVersionDescription = 'Updated version description'
      const updatedTemplateVersion = await createdTemplate.updateVersion({
        versionName: updatedVersionName,
        versionDescription: updatedVersionDescription,
      })

      expect(updatedTemplateVersion.sys.version).toBe(createdTemplate.sys.version)
      expect(updatedTemplateVersion.versionName).toBe(updatedVersionName)
      expect(updatedTemplateVersion.versionDescription).toBe(updatedVersionDescription)
    })

    it('gets a version of an environment template', async () => {
      createdTemplate.name = 'Updated name'
      await createdTemplate.update()

      const secondTemplateVersion = await client.getEnvironmentTemplate({
        version: 2,
        organizationId: orgId,
        environmentTemplateId: createdTemplate.sys.id,
      })

      expect(secondTemplateVersion.sys.version).toBe(2)
    })

    it('deletes an environment template', async () => {
      await expect(createdTemplate.delete()).resolves.not.toThrow()

      // deleted the template so reset it
      await setupEnvironmentTemplate(false)
    })
  })

  describe('Template installation/validation', () => {
    let space: Space
    let environment: Environment
    let installTemplate: InstallTemplate

    beforeAll(async () => {
      space = await createTestSpace(client, 'EnvironmentTemplate')
      environment = await createTestEnvironment(space, generateRandomId('env'))
      await waitForEnvironmentToBeReady(space, environment)

      await enableSpace(client, space)
      installTemplate = createInstallTemplate({
        client,
        orgId,
        space,
        environment,
        createDraftTemplate,
      })
    })

    afterAll(async () => {
      await environment?.delete()
      await space?.delete()
      await clearEnvironmentTemplates(client, orgId, templateDescription)
    })

    it('installs an environment template', async () => {
      await expect(installTemplate()).resolves.not.toThrow()
    })

    it('validates an environment template', async () => {
      const draftTemplate = createDraftTemplate()
      const template = await client.createEnvironmentTemplate(orgId, draftTemplate)
      const validations = await template.validate({
        spaceId: space.sys.id,
        environmentId: environment.sys.id,
      })

      expect(validations.items).toHaveLength(0)
    })

    it('gets installations on an environment for a given environment template', async () => {
      const installation = await installTemplate()
      const { items: installations } = await environment.getEnvironmentTemplateInstallations(
        installation.sys.template.sys.id,
      )

      expect(installations).toHaveLength(1)
      expect(installation.sys.id).toBe(installations[0].sys.id)
    })

    it('gets all installations of an environment template for a given environment', async () => {
      const installation = await installTemplate(2)
      const template = await client.getEnvironmentTemplate({
        organizationId: orgId,
        environmentTemplateId: installation.sys.template.sys.id,
      })

      const { items: installations } = await template.getInstallations()
      expect(installations).toHaveLength(2)
      expect(installation.sys.id).toBe(installations[0].sys.id)
    })

    it('gets only the latest installation of an environment template for a given environment', async () => {
      const installation = await installTemplate(2)
      const template = await client.getEnvironmentTemplate({
        organizationId: orgId,
        environmentTemplateId: installation.sys.template.sys.id,
      })

      const { items: installations } = await template.getInstallations({ latestOnly: true })
      expect(installations).toHaveLength(1)
      expect(installation.sys.id).toBe(installations[0].sys.id)
    })

    it('disconnects environment template', async () => {
      const installation = await installTemplate()
      const template = await client.getEnvironmentTemplate({
        organizationId: orgId,
        environmentTemplateId: installation.sys.template.sys.id,
      })

      await expect(
        template.disconnect({ spaceId: space.sys.id, environmentId: environment.sys.id }),
      ).resolves.not.toThrow()
    })
  })

  function createDraftTemplate(): CreateEnvironmentTemplateProps {
    return {
      name: `Environment template ${generateRandomId()}`,
      description: templateDescription,
      versionName: 'Version 1',
      versionDescription: 'Version 1 description',
      entities: {
        contentTypeTemplates: [],
        editorInterfaceTemplates: [],
      },
      forTemplatedSpaces: false,
    }
  }
})

async function waitForPendingInstallation(
  client: ClientAPI,
  environment: Environment,
  environmentTemplateId: string,
  { retries = 3, timeout = 200 } = {},
): Promise<void> {
  while (retries > 1) {
    const { items: installations } =
      await environment.getEnvironmentTemplateInstallations(environmentTemplateId)

    const allInstallationsSuccessful = installations.every(
      (installation) => installation.sys.status === 'succeeded',
    )

    if (allInstallationsSuccessful) {
      return Promise.resolve()
    }

    await new Promise((res) => setTimeout(res, timeout))
    retries--
    timeout *= 2
  }

  throw new Error('Environment template installation timeout')
}

function createInstallTemplate({
  client,
  orgId,
  space,
  environment,
  createDraftTemplate,
}: {
  client: ClientAPI
  orgId: string
  space: Space
  environment: Environment
  createDraftTemplate: () => CreateEnvironmentTemplateProps
}): InstallTemplate {
  return async (versionsCount: number = 1) => {
    let template = await client.createEnvironmentTemplate(orgId, createDraftTemplate())
    let installation = await installNewTemplateVersion(client, space, environment, template)

    for (let version = 2; version <= versionsCount; version++) {
      template.name = `Updated name for version ${version}`
      template = await template.update()
      installation = await installNewTemplateVersion(client, space, environment, template)
    }

    return installation
  }
}

async function installNewTemplateVersion(
  client: ClientAPI,
  space: Space,
  environment: Environment,
  template: EnvironmentTemplate,
): Promise<EnvironmentTemplateInstallationProps> {
  const installation = await template.install({
    spaceId: space.sys.id,
    environmentId: environment.sys.id,
    installation: {
      version: template.sys.version,
    },
  })

  expect(installation.sys.template.sys.id).toBe(template.sys.id)

  await waitForPendingInstallation(client, environment, template.sys.id)

  return installation
}

async function enableSpace(client: ClientAPI, space: Space): Promise<void> {
  const previousEnablements = await client.rawRequest({
    method: 'get',
    url: `/spaces/${space.sys.id}/enablements`,
  })

  await client.rawRequest({
    method: 'put',
    headers: {
      'x-contentful-version': previousEnablements.sys.version,
    },
    url: `/spaces/${space.sys.id}/enablements`,
    data: {
      spaceTemplates: {
        enabled: true,
      },
      crossSpaceLinks: {
        enabled: true,
      },
    },
  })
}

async function clearEnvironmentTemplates(
  client: ClientAPI,
  orgId: string,
  templateDescription: string,
): Promise<void> {
  const { items: templates } = await client.getEnvironmentTemplates(orgId)

  function filterByDescription({ description }: EnvironmentTemplate): boolean {
    return description === templateDescription
  }

  const templatesToBeDeleted = templates.filter(filterByDescription)

  for (const template of templatesToBeDeleted) {
    await template.delete()
  }
}
