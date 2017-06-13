/* global jest, test */
import {cloneMock} from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import {wrapSpaceMembership, wrapSpaceMembershipCollection} from '../../../lib/entities/space-membership'
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
    entityMock: cloneMock('spaceMembership')
  }
}

test('SpaceMembership is wrapped', () => {
  entityWrappedTest(jest, setup, {
    wrapperMethod: wrapSpaceMembership
  })
})

test('SpaceMembership collection is wrapped', () => {
  return entityCollectionWrappedTest(jest, setup, {
    wrapperMethod: wrapSpaceMembershipCollection
  })
})

test('SpaceMembership update', () => {
  return entityUpdateTest(jest, setup, {
    wrapperMethod: wrapSpaceMembership
  })
})

test('SpaceMembership update fails', () => {
  return failingVersionActionTest(jest, setup, {
    wrapperMethod: wrapSpaceMembership,
    actionMethod: 'update'
  })
})

test('SpaceMembership delete', () => {
  return entityDeleteTest(jest, setup, {
    wrapperMethod: wrapSpaceMembership
  })
})

test('SpaceMembership delete fails', () => {
  return failingActionTest(jest, setup, {
    wrapperMethod: wrapSpaceMembership,
    actionMethod: 'delete'
  })
})
