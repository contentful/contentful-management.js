/* global test */
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
  entityWrappedTest(setup, {
    wrapperMethod: wrapSpaceMembership
  })
})

test('SpaceMembership collection is wrapped', () => {
  return entityCollectionWrappedTest(setup, {
    wrapperMethod: wrapSpaceMembershipCollection
  })
})

test('SpaceMembership update', () => {
  return entityUpdateTest(setup, {
    wrapperMethod: wrapSpaceMembership
  })
})

test('SpaceMembership update fails', () => {
  return failingVersionActionTest(setup, {
    wrapperMethod: wrapSpaceMembership,
    actionMethod: 'update'
  })
})

test('SpaceMembership delete', () => {
  return entityDeleteTest(setup, {
    wrapperMethod: wrapSpaceMembership
  })
})

test('SpaceMembership delete fails', () => {
  return failingActionTest(setup, {
    wrapperMethod: wrapSpaceMembership,
    actionMethod: 'delete'
  })
})
