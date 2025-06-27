import { describe, test } from 'vitest'
import { cloneMock } from '../mocks/entities.js'
import setupMakeRequest from '../mocks/makeRequest.js'
import { wrapAccessToken, wrapAccessTokenCollection } from '../../../lib/entities/access-token.js'
import {
  entityCollectionWrappedTest,
  entityWrappedTest,
} from '../test-creators/instance-entity-methods.js'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('accessToken'),
  }
}

describe('Entity AccessToken', () => {
  test('AccessToken is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapAccessToken,
    })
  })

  test('AccessToken collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapAccessTokenCollection,
    })
  })
})
