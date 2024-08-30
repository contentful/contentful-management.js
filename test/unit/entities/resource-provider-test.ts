import type { ResourceProviderProps } from '../../../lib/entities/resource-provider'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapResourceProvider } from '../../../lib/entities/resource-provider'
import {
  entityActionTest,
  entityWrappedTest,
  entityDeleteTest,
} from '../test-creators/instance-entity-methods'
import { describe, test } from 'mocha'

function setup(promise: Promise<ResourceProviderProps>) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('resourceProvider'),
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
})
