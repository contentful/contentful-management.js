import {
  environmentTemplateInstallationMock,
  environmentTemplateMock,
  environmentTemplateValidationMock,
} from './mocks/entities'
import { describe, test, expect } from 'vitest'
import setupMakeRequest from './mocks/makeRequest'
import { createEnvironmentTemplateApi } from '../../lib/create-environment-template-api'
import { makeLink } from '../utils'

const organizationId = 'test-organization-id'
const spaceId = 'mockSpaceId'
const environmentId = 'mockEnvironment'

function setup<T>(promise: Promise<T>) {
  const makeRequest = setupMakeRequest(promise)
  const api = createEnvironmentTemplateApi(makeRequest, organizationId)
  return {
    api: {
      ...api,
      toPlainObject: () => environmentTemplateMock,
    },
    makeRequest,
  }
}

describe('createEnvironmentTemplateApi', () => {
  test('API call update', async () => {
    const { api, makeRequest } = setup(Promise.resolve(environmentTemplateMock))
    const template = await api.update()
    expect(template.toPlainObject()).to.eql(environmentTemplateMock)

    expect(makeRequest).toHaveBeenCalledWith({
      entityType: 'EnvironmentTemplate',
      action: 'update',
      params: { organizationId, environmentTemplateId: environmentTemplateMock.sys.id },
      payload: environmentTemplateMock,
    })
  })

  test('API call update version', async () => {
    const versionName = 'update'
    const versionDescription = 'update description'
    const updatedTemplate = { ...environmentTemplateMock, versionName, versionDescription }

    const { api, makeRequest } = setup(Promise.resolve(updatedTemplate))
    const template = await api.updateVersion({ versionName, versionDescription })
    expect(template.toPlainObject()).to.eql(updatedTemplate)

    expect(makeRequest).toHaveBeenCalledWith({
      entityType: 'EnvironmentTemplate',
      action: 'versionUpdate',
      params: {
        organizationId,
        environmentTemplateId: environmentTemplateMock.sys.id,
        version: environmentTemplateMock.sys.version,
      },
      payload: { versionName, versionDescription },
    })
  })

  test('API call delete', async () => {
    const { api, makeRequest } = setup(Promise.resolve({}))
    expect(await api.delete()).not.throw
    expect(makeRequest).toHaveBeenCalledWith({
      entityType: 'EnvironmentTemplate',
      action: 'delete',
      params: { organizationId, environmentTemplateId: environmentTemplateMock.sys.id },
    })
  })

  test('API call environment template versions', async () => {
    const versions = [
      environmentTemplateMock,
      { ...environmentTemplateMock, sys: { ...environmentTemplateMock.sys, version: 2 } },
    ]

    const { api, makeRequest } = setup(Promise.resolve({ items: versions }))
    const [version1, version2] = (await api.getVersions()).items
    expect(version1.toPlainObject()).to.eql(versions[0])
    expect(version2.toPlainObject()).to.eql(versions[1])
    expect(makeRequest).toHaveBeenCalledWith({
      entityType: 'EnvironmentTemplate',
      action: 'versions',
      params: {
        organizationId,
        environmentTemplateId: environmentTemplateMock.sys.id,
      },
    })
  })

  test('API call installations', async () => {
    const installations = [
      environmentTemplateInstallationMock,
      {
        sys: {
          ...environmentTemplateInstallationMock.sys,
          space: makeLink('Space', 'anotherMockSpaceId'),
        },
      },
    ]

    const { api, makeRequest } = setup(Promise.resolve({ items: installations }))
    const [installation1, installation2] = (await api.getInstallations()).items
    expect(installation1.toPlainObject()).to.eql(installations[0])
    expect(installation2.toPlainObject()).to.eql(installations[1])
    expect(makeRequest).toHaveBeenCalledWith({
      entityType: 'EnvironmentTemplateInstallation',
      action: 'getMany',
      params: {
        organizationId,
        environmentTemplateId: environmentTemplateMock.sys.id,
        spaceId: undefined,
        environmentId: undefined,
        query: {},
      },
    })
  })

  test('API call installations with spaceId and environmentId', async () => {
    const installations = [
      environmentTemplateInstallationMock,
      {
        sys: {
          ...environmentTemplateInstallationMock.sys,
          space: makeLink('Space', 'anotherMockSpaceId'),
        },
      },
    ]

    const { api, makeRequest } = setup(Promise.resolve({ items: installations }))
    const [installation1, installation2] = (await api.getInstallations({ spaceId, environmentId }))
      .items
    expect(installation1.toPlainObject()).to.eql(installations[0])
    expect(installation2.toPlainObject()).to.eql(installations[1])
    expect(makeRequest).toHaveBeenCalledWith({
      entityType: 'EnvironmentTemplateInstallation',
      action: 'getMany',
      params: {
        organizationId,
        environmentTemplateId: environmentTemplateMock.sys.id,
        spaceId,
        environmentId,
        query: {},
      },
    })
  })

  test('API call validate', async () => {
    const version = 1
    const { api, makeRequest } = setup(Promise.resolve(environmentTemplateValidationMock))
    const validationResult = await api.validate({
      spaceId,
      environmentId,
      version,
    })

    expect(validationResult).to.eql(environmentTemplateValidationMock)
    expect(makeRequest).toHaveBeenCalledWith({
      entityType: 'EnvironmentTemplate',
      action: 'validate',
      params: {
        spaceId,
        environmentId,
        environmentTemplateId: environmentTemplateMock.sys.id,
        version,
      },
      payload: {},
    })
  })

  test('API call install', async () => {
    const version = 1
    const { api, makeRequest } = setup(Promise.resolve(environmentTemplateInstallationMock))
    const installation = await api.install({
      spaceId,
      environmentId,
      installation: {
        version,
      },
    })

    expect(installation).to.eql(environmentTemplateInstallationMock)
    expect(makeRequest).toHaveBeenCalledWith({
      entityType: 'EnvironmentTemplate',
      action: 'install',
      params: {
        spaceId,
        environmentId,
        environmentTemplateId: environmentTemplateMock.sys.id,
      },
      payload: {
        version,
      },
    })
  })

  test('API call disconnect environment template', async () => {
    const { api, makeRequest } = setup(Promise.resolve())

    expect(await api.disconnect({ spaceId, environmentId })).not.to.throw
    expect(makeRequest).toHaveBeenCalledWith({
      entityType: 'EnvironmentTemplate',
      action: 'disconnect',
      params: {
        spaceId,
        environmentId,
        environmentTemplateId: environmentTemplateMock.sys.id,
      },
    })
  })
})
