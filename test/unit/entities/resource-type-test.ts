import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  entityActionTest,
  entityWrappedTest,
  entityDeleteTest,
} from '../test-creators/instance-entity-methods'
import { describe, test } from 'mocha'
import { wrapResourceType, type ResourceTypeProps } from '../../../lib/entities/resource-type'

function setup(promise: Promise<ResourceTypeProps>) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('resourceType'),
  }
}

describe('Entity ResourceType', () => {
  test('ResourceType is wrapped', async () => {
    return entityWrappedTest(setup, { wrapperMethod: wrapResourceType })
  })

  test('ResourceType upsert', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapResourceType,
      actionMethod: 'upsert',
    })
  })

  test('ResourceType delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapResourceType,
    })
  })
})
