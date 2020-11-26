import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import { wrapUser, wrapUserCollection } from '../../../lib/entities/user'
import {
  entityCollectionWrappedTest,
  entityWrappedTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
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
