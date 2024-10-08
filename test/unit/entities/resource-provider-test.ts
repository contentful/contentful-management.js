import type { ResourceProviderProps } from '../../../lib/entities/resource-provider'
import { cloneMock, resourceTypeMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapResourceProvider } from '../../../lib/entities/resource-provider'
import {
  entityActionTest,
  entityWrappedTest,
  entityDeleteTest,
} from '../test-creators/instance-entity-methods'
import { describe, test } from 'mocha'
import { expect } from 'chai'
import type { ResourceTypeProps } from '../../../lib/entities/resource-type'
import type { CollectionProp } from '../../../lib/common-types'

function setup(promise: Promise<ResourceProviderProps>) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('resourceProvider'),
  }
}

function setupResourceType(
  promise: Promise<ResourceTypeProps | CollectionProp<ResourceTypeProps>>
) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('resourceType'),
  }
}

describe('Entity ResourceProvider', () => {
  test('ResourceProvider is wrapped', async () => {
    return entityWrappedTest(setup, { wrapperMethod: wrapResourceProvider })
  })

  test('ResourceProvider upsert', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapResourceProvider,
      actionMethod: 'upsert',
    })
  })

  test('ResourceProvider delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapResourceProvider,
    })
  })

  test('API call upsertResourceType', async () => {
    const { makeRequest, entityMock } = setupResourceType(new Promise((r) => r(resourceTypeMock)))
    const entity = wrapResourceProvider(makeRequest, entityMock)

    const response = await entity['upsertResourceType'](
      'resourceProvider:resourceTypeId',
      resourceTypeMock
    )
    expect(response).to.deep.equal(resourceTypeMock)
    expect(response.toPlainObject, 'response is wrapped').to.be.ok
  })

  test('API call getResourceType', async () => {
    const { makeRequest, entityMock } = setupResourceType(new Promise((r) => r(resourceTypeMock)))
    const entity = wrapResourceProvider(makeRequest, entityMock)

    const response = await entity['getResourceType']('resourceTypeId')
    expect(response).to.deep.equal(resourceTypeMock)
    expect(response.toPlainObject, 'response is wrapped').to.be.ok
  })

  test('API call getResourceTypes', async () => {
    const { makeRequest, entityMock } = setupResourceType(
      new Promise((r) =>
        r({ items: [resourceTypeMock], total: 1, skip: 0, limit: 100, sys: { type: 'Array' } })
      )
    )
    const entity = wrapResourceProvider(makeRequest, entityMock)
    const response = await entity['getResourceTypes']()

    expect(response.items[0]).to.deep.equal(resourceTypeMock)
    expect(response.items[0].toPlainObject, 'response is wrapped').to.be.ok
  })
})
