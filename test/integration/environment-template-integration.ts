import { after, before, describe, test, afterEach } from 'mocha'
import { assert, expect } from 'chai'
import type { ClientAPI } from '../../lib/create-contentful-api'
import {
  initClient,
  getTestOrganizationId,
  createTestSpace,
  createTestEnvironment,
  generateRandomId,
} from '../helpers'
import type {
  CreateEnvironmentTemplateProps,
  Environment,
  EnvironmentTemplateInstallationProps,
  Space,
} from '../../lib/export-types'

type InstallTemplate = () => Promise<EnvironmentTemplateInstallationProps>

describe('Environment template Api', () => {
  const client = initClient()
  const orgId = getTestOrganizationId()
  const templateDescription = `Integration test run ${generateRandomId()}`
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
    }
  }

  describe('Environment template', () => {
    afterEach(async () => {
      await clearEnvironmentTemplates(client, orgId, templateDescription)
    })

    test('creates an environment template', async () => {
      const draftTemplate = createDraftTemplate()
      const { sys, ...template } = await client.createEnvironmentTemplate(orgId, draftTemplate)
      expect(template).to.be.eql(draftTemplate)
      expect(sys).not.to.be.undefined
    })

    test('gets an environment template', async () => {
      const draftTemplate = createDraftTemplate()
      const {
        sys: { id: templateId },
      } = await client.createEnvironmentTemplate(orgId, draftTemplate)

      const { sys, ...template } = await client.getEnvironmentTemplate({
        organizationId: orgId,
        environmentTemplateId: templateId,
      })

      expect(template).to.be.eql(draftTemplate)
      expect(sys).not.to.be.undefined
    })

    test('gets a collection of environment templates', async () => {
      const draftTemplate = createDraftTemplate()
      await client.createEnvironmentTemplate(orgId, draftTemplate)
      const { items: templates } = await client.getEnvironmentTemplates(orgId)

      expect(
        templates.filter(({ description }) => description === templateDescription)
      ).to.have.length(1)

      const [{ sys, ...template }] = templates
      expect(template).to.be.eql(draftTemplate)
      expect(sys).not.to.be.undefined
    })

    test('updates an environment template', async () => {
      const draftTemplate = createDraftTemplate()
      const template = await client.createEnvironmentTemplate(orgId, draftTemplate)

      expect(template.sys.version).to.eq(1)

      const updatedName = 'Updated name'
      template.name = updatedName
      const { sys, ...updatedTemplate } = await template.update()

      expect(sys.version).to.eq(2)
      expect(updatedTemplate).to.eql({
        ...draftTemplate,
        name: updatedName,
      })
    })

    test('updates the version description and name of an environment template', async () => {
      const draftTemplate = createDraftTemplate()
      const template = await client.createEnvironmentTemplate(orgId, draftTemplate)

      const updatedVersionName = 'Updated version name'
      const updatedVersionDescription = 'Updated version description'
      const updatedTemplateVersion = await template.updateVersion({
        versionName: updatedVersionName,
        versionDescription: updatedVersionDescription,
      })

      expect(updatedTemplateVersion.sys.version).to.eql(template.sys.version)
      expect(updatedTemplateVersion.versionName).to.eq(updatedVersionName)
      expect(updatedTemplateVersion.versionDescription).to.eq(updatedVersionDescription)
    })

    test('gets a version of an environment template', async () => {
      const draftTemplate = createDraftTemplate()
      const template = await client.createEnvironmentTemplate(orgId, draftTemplate)
      template.name = 'Updated name'
      await template.update()

      const secondTemplateVersion = await client.getEnvironmentTemplate({
        version: 2,
        organizationId: orgId,
        environmentTemplateId: template.sys.id,
      })

      expect(secondTemplateVersion.sys.version).to.eq(2)
    })

    test('deletes an environment template', async () => {
      const draftTemplate = createDraftTemplate()
      const template = await client.createEnvironmentTemplate(orgId, draftTemplate)
      expect(await template.delete()).not.to.throw
    })
  })

  describe('Template installation/validation', () => {
    let space: Space
    let environment: Environment
    let installTemplate: InstallTemplate

    before(async () => {
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

    after(async () => {
      await environment?.delete()
      await space?.delete()
    })

    test('installs an environment template', async () => {
      expect(await installTemplate()).not.to.throw
    })

    test('validates an environment template', async () => {
      const draftTemplate = createDraftTemplate()
      const template = await client.createEnvironmentTemplate(orgId, draftTemplate)
      const validations = await template.validate({
        spaceId: space.sys.id,
        environmentId: environment.sys.id,
      })

      expect(validations.items).to.be.empty
    })

    test('gets installations on an environment for a given environment template', async () => {
      const installation = await installTemplate()
      const { items: installations } = await environment.getEnvironmentTemplateInstallations(
        installation.sys.template.sys.id
      )

      expect(installations).to.have.length(1)
      expect(installation.sys.id).to.eq(installations[0].sys.id)
    })

    test('gets all installations of an environment template for an environment', async () => {
      const installation = await installTemplate()
      const template = await client.getEnvironmentTemplate({
        organizationId: orgId,
        environmentTemplateId: installation.sys.template.sys.id,
      })

      const { items: installations } = await template.getInstallations()
      expect(installations).to.have.length(1)
      expect(installation.sys.id).to.eq(installations[0].sys.id)
    })

    test('disconnects environment template', async () => {
      const installation = await installTemplate()
      const template = await client.getEnvironmentTemplate({
        organizationId: orgId,
        environmentTemplateId: installation.sys.template.sys.id,
      })

      expect(
        await template.disconnect({ spaceId: space.sys.id, environmentId: environment.sys.id })
      ).not.to.throw
    })
  })
})

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

    assert.equal(
      installation.sys.template.sys.id,
      template.sys.id,
      'Environment template installation template id mismatch'
    )

    return installation
  }
}

async function enableSpace(client: ClientAPI, space: Space): Promise<void> {
  const previousEnablements = await client.rawRequest({
    method: 'get',
    url: `/spaces/${space.sys.id}/enablements`,
  })

  return client.rawRequest({
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
  await Promise.all(
    templates
      .filter(({ description }) => description === templateDescription)
      .map((template) => template.delete())
  )
}
