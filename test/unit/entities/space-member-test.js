import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import { wrapSpaceMember, wrapSpaceMemberCollection } from '../../../lib/entities/space-member'
import {
  entityCollectionWrappedTest,
  entityWrappedTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('spaceMembership'),
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
