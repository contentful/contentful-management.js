import {
  environmentTemplateInstallationMock,
  environmentTemplateMock,
  environmentTemplateValidationMock,
} from './mocks/entities'
import { describe, test } from 'mocha'
import { expect } from 'chai'
import setupMakeRequest from './mocks/makeRequest'
import { createEnvironmentTemplateApi } from '../../lib/create-environment-template-api'
import type { SinonStub } from 'sinon'
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
    makeRequest: makeRequest as SinonStub,
  }
}

describe('A createEnvironmentTemplateApi', () => {
  test('API call update', async () => {
    const { api, makeRequest } = setup(Promise.resolve(environmentTemplateMock))
    const template = await api.update()
    expect(template.toPlainObject()).to.eql(environmentTemplateMock)
    expect(
      makeRequest.calledOnceWith({
        entityType: 'EnvironmentTemplate',
        action: 'update',
        params: { organizationId, templateId: environmentTemplateMock.sys.id },
        payload: environmentTemplateMock,
      })
    ).to.be.ok
  })

  test('API call update version', async () => {
    const versionName = 'update'
    const versionDescription = 'update description'
    const updatedTemplate = { ...environmentTemplateMock, versionName, versionDescription }

    const { api, makeRequest } = setup(Promise.resolve(updatedTemplate))
    const template = await api.updateVersion({ versionName, versionDescription })
    expect(template.toPlainObject()).to.eql(updatedTemplate)

    expect(
      makeRequest.calledOnceWith({
        entityType: 'EnvironmentTemplate',
        action: 'versionUpdate',
        params: {
          organizationId,
          templateId: environmentTemplateMock.sys.id,
          version: environmentTemplateMock.sys.version,
        },
        payload: { versionName, versionDescription },
      })
    ).to.be.ok
  })

  test('API call delete', async () => {
    const { api, makeRequest } = setup(Promise.resolve({}))
    expect(await api.delete()).not.throw
    expect(
      makeRequest.calledOnceWith({
        entityType: 'EnvironmentTemplate',
        action: 'delete',
        params: { organizationId, templateId: environmentTemplateMock.sys.id },
      })
    ).to.be.ok
  })

  test('API call environment template versions', async () => {
    const versions = [
      environmentTemplateMock,
      { ...environmentTemplateMock, sys: { ...environmentTemplateMock.sys, version: 2 } },
    ]

    const { api, makeRequest } = setup(Promise.resolve({ items: versions }))
    const [version1, version2] = (await api.versions()).items
    expect(version1.toPlainObject()).to.eql(versions[0])
    expect(version2.toPlainObject()).to.eql(versions[1])
    expect(
      makeRequest.calledOnceWith({
        entityType: 'EnvironmentTemplate',
        action: 'versions',
        params: {
          organizationId,
          templateId: environmentTemplateMock.sys.id,
        },
      })
    ).to.be.ok
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
    const [installation1, installation2] = (await api.installations()).items
    expect(installation1.toPlainObject()).to.eql(installations[0])
    expect(installation2.toPlainObject()).to.eql(installations[1])
    expect(
      makeRequest.calledOnceWith({
        entityType: 'EnvironmentTemplateInstallation',
        action: 'getMany',
        params: {
          organizationId,
          templateId: environmentTemplateMock.sys.id,
          spaceId: undefined,
          environmentId: undefined,
          query: {},
        },
      })
    ).to.be.ok
  })

  test('API call validate', async () => {
    const version = 1
    const { api, makeRequest } = setup(Promise.resolve(environmentTemplateValidationMock))
    const installation = await api.validate({
      spaceId,
      environmentId,
      version,
    })

    expect(installation).to.eql(environmentTemplateValidationMock)
    expect(
      makeRequest.calledOnceWith({
        entityType: 'EnvironmentTemplate',
        action: 'validate',
        params: {
          spaceId,
          environmentId,
          templateId: environmentTemplateMock.sys.id,
          version,
        },
        payload: {},
      })
    ).to.be.ok
  })

  test('API call install environment template', async () => {
    const version = 1
    const { api, makeRequest } = setup(Promise.resolve(environmentTemplateMock))
    const installation = await api.install({
      spaceId,
      environmentId,
      installation: {
        version,
      },
    })

    expect(installation).to.eql(environmentTemplateMock)
    expect(
      makeRequest.calledOnceWith({
        entityType: 'EnvironmentTemplate',
        action: 'install',
        params: {
          spaceId,
          environmentId,
          templateId: environmentTemplateMock.sys.id,
        },
        payload: {
          version,
        },
      })
    ).to.be.ok
  })

  test('API call disconnect environment template', async () => {
    const { api, makeRequest } = setup(Promise.resolve())

    expect(await api.disconnect({ spaceId, environmentId })).not.to.throw
    expect(
      makeRequest.calledOnceWith({
        entityType: 'EnvironmentTemplate',
        action: 'disconnect',
        params: {
          spaceId,
          environmentId,
          templateId: environmentTemplateMock.sys.id,
        },
      })
    ).to.be.ok
  })
})
