import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  entityActionTest,
  entityWrappedTest,
  entityDeleteTest,
} from '../test-creators/instance-entity-methods'
import { describe, it } from 'vitest'
import { wrapResourceType, type ResourceTypeProps } from '../../../lib/entities/resource-type'

function setup(promise: Promise<ResourceTypeProps>) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('resourceType'),
  }
}

describe('Entity ResourceType', () => {
  it('ResourceType is wrapped', async () => {
    await entityWrappedTest(setup, { wrapperMethod: wrapResourceType })
  })

  it('ResourceType upsert', async () => {
    await entityActionTest(setup, {
      wrapperMethod: wrapResourceType,
      actionMethod: 'upsert',
    })
  })

  it('ResourceType delete', async () => {
    await entityDeleteTest(setup, {
      wrapperMethod: wrapResourceType,
    })
  })
})
