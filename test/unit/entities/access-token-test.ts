import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapAccessToken, wrapAccessTokenCollection } from '../../../lib/entities/access-token'
import {
  entityCollectionWrappedTest,
  entityWrappedTest,
} from '../test-creators/instance-entity-methods'

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
