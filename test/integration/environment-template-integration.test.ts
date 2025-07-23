import { afterAll, beforeAll, describe, it, afterEach, expect } from 'vitest'
import type { ClientAPI } from '../../lib/create-contentful-api'
import {
  defaultClient,
  getTestOrganizationId,
  createTestSpace,
  createTestEnvironment,
  generateRandomId,
  baseEnvironmentTemplateDescription,
  timeoutToCalmRateLimiting,
} from '../helpers'
import type {
  CreateEnvironmentTemplateProps,
  Environment,
  EnvironmentTemplate,
  EnvironmentTemplateInstallationProps,
  Space,
} from '../../lib/export-types'

type InstallTemplate = () => Promise<EnvironmentTemplateInstallationProps>

describe.skip('Environment template API', () => {
  const client = defaultClient
  const orgId = getTestOrganizationId()
  const templateDescription = `${baseEnvironmentTemplateDescription} ${generateRandomId()}`

  afterAll(timeoutToCalmRateLimiting)

  afterEach(async () => {
    await clearEnvironmentTemplates(client, orgId, templateDescription)
  })

  describe('Environment template', () => {
    it('creates an environment template', async () => {
      const draftTemplate = createDraftTemplate()
      const { sys, ...template } = await client.createEnvironmentTemplate(orgId, draftTemplate)
      expect(template).toEqual(draftTemplate)
      expect(sys).toBeDefined()
    })

    it('gets an environment template', async () => {
      const draftTemplate = createDraftTemplate()
      const {
        sys: { id: templateId },
      } = await client.createEnvironmentTemplate(orgId, draftTemplate)

      const { sys, ...template } = await client.getEnvironmentTemplate({
        organizationId: orgId,
        environmentTemplateId: templateId,
      })

      expect(template).toEqual(draftTemplate)
      expect(sys).toBeDefined()
    })

    it('gets an environment template with select filter applied', async () => {
      const draftTemplate = createDraftTemplate()
      const {
        sys: { id: templateId },
      } = await client.createEnvironmentTemplate(orgId, draftTemplate)

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
      const draftTemplate = createDraftTemplate()
      await client.createEnvironmentTemplate(orgId, draftTemplate)
      const { items: templates } = await client.getEnvironmentTemplates(orgId)

      expect(
        templates.filter(({ description }) => description === templateDescription)
      ).toHaveLength(1)

      const [{ sys, ...template }] = templates
      expect(template).toEqual(draftTemplate)
      expect(sys).toBeDefined()
    })

    it('gets a collection of environment templates with select filter applied', async () => {
      const draftTemplate = createDraftTemplate()
      await client.createEnvironmentTemplate(orgId, draftTemplate)
      const { items: templates } = await client.getEnvironmentTemplates(orgId, {
        select: 'description',
      })

      expect(
        templates.filter(({ description }) => description === templateDescription)
      ).toHaveLength(1)

      const [firstTemplate] = templates
      expect(firstTemplate).toEqual({ description: templateDescription })
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
      const draftTemplate = createDraftTemplate()
      const template = await client.createEnvironmentTemplate(orgId, draftTemplate)

      const updatedVersionName = 'Updated version name'
      const updatedVersionDescription = 'Updated version description'
      const updatedTemplateVersion = await template.updateVersion({
        versionName: updatedVersionName,
        versionDescription: updatedVersionDescription,
      })

      expect(updatedTemplateVersion.sys.version).toBe(template.sys.version)
      expect(updatedTemplateVersion.versionName).toBe(updatedVersionName)
      expect(updatedTemplateVersion.versionDescription).toBe(updatedVersionDescription)
    })

    it('gets a version of an environment template', async () => {
      const draftTemplate = createDraftTemplate()
      const template = await client.createEnvironmentTemplate(orgId, draftTemplate)
      template.name = 'Updated name'
      await template.update()

      const secondTemplateVersion = await client.getEnvironmentTemplate({
        version: 2,
        organizationId: orgId,
        environmentTemplateId: template.sys.id,
      })

      expect(secondTemplateVersion.sys.version).toBe(2)
    })

    it('deletes an environment template', async () => {
      const draftTemplate = createDraftTemplate()
      const template = await client.createEnvironmentTemplate(orgId, draftTemplate)
      await expect(template.delete()).resolves.not.toThrow()
    })
  })

  describe('Template installation/validation', () => {
    let space: Space
    let environment: Environment
    let installTemplate: InstallTemplate

    beforeAll(async () => {
      space = (await createTestSpace(client, 'EnvironmentTemplate')) as Space
      environment = (await createTestEnvironment(space, generateRandomId('env'))) as Environment

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
        installation.sys.template.sys.id
      )

      expect(installations).toHaveLength(1)
      expect(installation.sys.id).toBe(installations[0].sys.id)
    })

    it('gets all installations of an environment template for an environment', async () => {
      const installation = await installTemplate()
      const template = await client.getEnvironmentTemplate({
        organizationId: orgId,
        environmentTemplateId: installation.sys.template.sys.id,
      })

      const { items: installations } = await template.getInstallations()
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
        template.disconnect({ spaceId: space.sys.id, environmentId: environment.sys.id })
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
  { retries = 3, timeout = 200 } = {}
): Promise<void> {
  while (retries > 1) {
    const { items: installations } = await environment.getEnvironmentTemplateInstallations(
      environmentTemplateId
    )

    const allInstallationsSuccessful = installations.every(
      (installation) => installation.sys.status === 'succeeded'
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
  return async () => {
    const template = await client.createEnvironmentTemplate(orgId, createDraftTemplate())
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
  templateDescription: string
): Promise<void> {
  const { items: templates } = await client.getEnvironmentTemplates(orgId)

  function filterByDescription({ description }: EnvironmentTemplate): boolean {
    return description === templateDescription
  }

  await Promise.all(templates.filter(filterByDescription).map((template) => template.delete()))
}
