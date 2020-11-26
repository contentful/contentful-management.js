import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import {
  wrapSpaceMembership,
  wrapSpaceMembershipCollection,
} from '../../../lib/entities/space-membership'
import {
  entityCollectionWrappedTest,
  entityDeleteTest,
  entityUpdateTest,
  entityWrappedTest,
  failingActionTest,
  failingVersionActionTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('spaceMembership'),
  }
}

describe('Entity SpaceMembership', () => {
  test('SpaceMembership is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapSpaceMembership,
    })
  })

  test('SpaceMembership collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapSpaceMembershipCollection,
    })
  })

  test('SpaceMembership update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapSpaceMembership,
    })
  })

  test('SpaceMembership update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapSpaceMembership,
      actionMethod: 'update',
    })
  })

  test('SpaceMembership delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapSpaceMembership,
    })
  })

  test('SpaceMembership delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapSpaceMembership,
      actionMethod: 'delete',
    })
  })
})
