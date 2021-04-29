import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapUser, wrapUserCollection } from '../../../lib/entities/user'
import {
  entityCollectionWrappedTest,
  entityWrappedTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('user'),
  }
}

describe('Entity TeamSpaceMembership', () => {
  test('User is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapUser,
    })
  })

  test('User collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapUserCollection,
    })
  })
})
