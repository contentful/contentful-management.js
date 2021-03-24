import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  wrapPersonalAccessToken,
  wrapPersonalAccessTokenCollection,
} from '../../../lib/entities/personal-access-token'
import {
  entityCollectionWrappedTest,
  entityWrappedTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('personalAccessToken'),
  }
}

describe('Entity PersonalAccessToken', () => {
  test('personalAccessToken is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapPersonalAccessToken,
    })
  })

  test('personalAccessToken collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapPersonalAccessTokenCollection,
    })
  })
})
