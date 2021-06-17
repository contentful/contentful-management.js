import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapSpaceMember, wrapSpaceMemberCollection } from '../../../lib/entities/space-member'
import {
  entityCollectionWrappedTest,
  entityWrappedTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('spaceMember'),
  }
}

describe('Entity SpaceMember', () => {
  test('SpaceMember is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapSpaceMember,
    })
  })

  test('SpaceMember collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapSpaceMemberCollection,
    })
  })
})
