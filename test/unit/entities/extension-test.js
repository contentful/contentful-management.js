import { describe, test } from 'mocha'
import { wrapExtension, wrapExtensionCollection } from '../../../lib/entities/extension'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  entityActionTest,
  entityCollectionWrappedTest,
  entityDeleteTest,
  entityWrappedTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('extension'),
  }
}

describe('Entity Extension', () => {
  test('Extension is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapExtension,
    })
  })

  test('Extension collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapExtensionCollection,
    })
  })

  test('Extension update', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapExtension,
      actionMethod: 'update',
    })
  })

  test('Extension delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapExtension,
    })
  })
})
