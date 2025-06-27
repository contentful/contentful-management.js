import { describe, test } from 'vitest'
import { wrapExtension, wrapExtensionCollection } from '../../../lib/entities/extension.js'
import { cloneMock } from '../mocks/entities.js'
import setupMakeRequest from '../mocks/makeRequest.js'
import {
  entityActionTest,
  entityCollectionWrappedTest,
  entityDeleteTest,
  entityWrappedTest,
} from '../test-creators/instance-entity-methods.js'

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
