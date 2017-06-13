/* global test, jest */

import {cloneMock} from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import {wrapApiKey, wrapApiKeyCollection} from '../../../lib/entities/api-key'
import {
  entityWrappedTest,
  entityCollectionWrappedTest,
  entityUpdateTest,
  entityDeleteTest,
  failingActionTest,
  failingVersionActionTest
} from '../test-creators/instance-entity-methods'

function setup (promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('apiKey')
  }
}

test('ApiKey is wrapped', () => {
  entityWrappedTest(jest, setup, {
    wrapperMethod: wrapApiKey
  })
})

test('ApiKey collection is wrapped', () => {
  return entityCollectionWrappedTest(jest, setup, {
    wrapperMethod: wrapApiKeyCollection
  })
})

test('ApiKey update', () => {
  return entityUpdateTest(jest, setup, {
    wrapperMethod: wrapApiKey
  })
})

test('ApiKey update fails', () => {
  return failingVersionActionTest(jest, setup, {
    wrapperMethod: wrapApiKey,
    actionMethod: 'update'
  })
})

test('ApiKey delete', () => {
  return entityDeleteTest(jest, setup, {
    wrapperMethod: wrapApiKey
  })
})

test('ApiKey delete fails', () => {
  return failingActionTest(jest, setup, {
    wrapperMethod: wrapApiKey,
    actionMethod: 'delete'
  })
})
