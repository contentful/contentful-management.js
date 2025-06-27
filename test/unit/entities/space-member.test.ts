import { describe, test } from 'vitest'
import { cloneMock } from '../mocks/entities.js'
import setupMakeRequest from '../mocks/makeRequest.js'
import { wrapSpaceMember, wrapSpaceMemberCollection } from '../../../lib/entities/space-member.js'
import {
  entityCollectionWrappedTest,
  entityWrappedTest,
} from '../test-creators/instance-entity-methods.js'

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
