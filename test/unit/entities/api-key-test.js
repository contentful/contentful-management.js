/* global test */

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
  entityWrappedTest(setup, {
    wrapperMethod: wrapApiKey
  })
})

test('ApiKey collection is wrapped', () => {
  return entityCollectionWrappedTest(setup, {
    wrapperMethod: wrapApiKeyCollection
  })
})

test('ApiKey update', () => {
  return entityUpdateTest(setup, {
    wrapperMethod: wrapApiKey
  })
})

test('ApiKey update fails', () => {
  return failingVersionActionTest(setup, {
    wrapperMethod: wrapApiKey,
    actionMethod: 'update'
  })
})

test('ApiKey delete', () => {
  return entityDeleteTest(setup, {
    wrapperMethod: wrapApiKey
  })
})

test('ApiKey delete fails', () => {
  return failingActionTest(setup, {
    wrapperMethod: wrapApiKey,
    actionMethod: 'delete'
  })
})
