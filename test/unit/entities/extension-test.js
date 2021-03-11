import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import { wrapExtension, wrapExtensionCollection } from '../../../lib/entities/ui-extension'
import {
  entityWrappedTest,
  entityCollectionWrappedTest,
  entityUpdateTest,
  entityDeleteTest,
  failingActionTest,
  failingVersionActionTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
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
    return entityUpdateTest(setup, {
      wrapperMethod: wrapExtension,
    })
  })

  test('Extension update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapExtension,
      actionMethod: 'update',
    })
  })

  test('Extension delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapExtension,
    })
  })

  test('Extension delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapExtension,
      actionMethod: 'delete',
    })
  })
})
