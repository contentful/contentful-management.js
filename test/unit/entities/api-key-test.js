import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import { wrapApiKey, wrapApiKeyCollection } from '../../../lib/entities/api-key'
import {
  entityCollectionWrappedTest,
  entityDeleteTest,
  entityUpdateTest,
  entityWrappedTest,
  failingActionTest,
  failingVersionActionTest,
} from '../test-creators/instance-entity-methods'
import { describe, test } from 'mocha'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('apiKey'),
  }
}

describe('Entity ApiKey', () => {
  test('ApiKey is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapApiKey,
    })
  })

  test('ApiKey collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapApiKeyCollection,
    })
  })

  test('ApiKey update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapApiKey,
    })
  })

  test('ApiKey update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapApiKey,
      actionMethod: 'update',
    })
  })

  test('ApiKey delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapApiKey,
    })
  })

  test('ApiKey delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapApiKey,
      actionMethod: 'delete',
    })
  })
})
