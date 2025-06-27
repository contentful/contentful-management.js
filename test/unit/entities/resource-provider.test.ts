import type { ResourceProviderProps } from '../../../lib/entities/resource-provider.js'
import { cloneMock, resourceTypeMock } from '../mocks/entities.js'
import setupMakeRequest from '../mocks/makeRequest.js'
import { wrapResourceProvider } from '../../../lib/entities/resource-provider.js'
import {
  entityActionTest,
  entityWrappedTest,
  entityDeleteTest,
} from '../test-creators/instance-entity-methods.js'
import { describe, it, expect } from 'vitest'
import type { ResourceTypeProps } from '../../../lib/entities/resource-type.js'
import type { CollectionProp } from '../../../lib/common-types.js'

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
  it('ResourceProvider is wrapped', async () => {
    await entityWrappedTest(setup, { wrapperMethod: wrapResourceProvider })
  })

  it('ResourceProvider upsert', async () => {
    await entityActionTest(setup, {
      wrapperMethod: wrapResourceProvider,
      actionMethod: 'upsert',
    })
  })

  it('ResourceProvider delete', async () => {
    await entityDeleteTest(setup, {
      wrapperMethod: wrapResourceProvider,
    })
  })

  it('API call upsertResourceType', async () => {
    const { makeRequest, entityMock } = setupResourceType(Promise.resolve(resourceTypeMock))
    const entity = wrapResourceProvider(makeRequest, entityMock)

    const response = await entity['upsertResourceType'](
      'resourceProvider:resourceTypeId',
      resourceTypeMock
    )
    expect(response).toEqual(resourceTypeMock)
    expect(response.toPlainObject).toBeTruthy()
  })

  it('API call getResourceType', async () => {
    const { makeRequest, entityMock } = setupResourceType(Promise.resolve(resourceTypeMock))
    const entity = wrapResourceProvider(makeRequest, entityMock)

    const response = await entity['getResourceType']('resourceTypeId')
    expect(response).toEqual(resourceTypeMock)
    expect(response.toPlainObject).toBeTruthy()
  })

  it('API call getResourceTypes', async () => {
    const { makeRequest, entityMock } = setupResourceType(
      Promise.resolve({
        items: [resourceTypeMock],
        total: 1,
        skip: 0,
        limit: 100,
        sys: { type: 'Array' },
      })
    )
    const entity = wrapResourceProvider(makeRequest, entityMock)
    const response = await entity['getResourceTypes']()

    expect(response.items[0]).toEqual(resourceTypeMock)
    expect(response.items[0].toPlainObject).toBeTruthy()
  })
})
