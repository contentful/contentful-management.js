/* global test, jest */
import {cloneMock} from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import {wrapRole, wrapRoleCollection} from '../../../lib/entities/role'
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
    entityMock: cloneMock('role')
  }
}

test('Role is wrapped', () => {
  entityWrappedTest(jest, setup, {
    wrapperMethod: wrapRole
  })
})

test('Role collection is wrapped', () => {
  return entityCollectionWrappedTest(jest, setup, {
    wrapperMethod: wrapRoleCollection
  })
})

test('Role update', () => {
  return entityUpdateTest(jest, setup, {
    wrapperMethod: wrapRole
  })
})

test('Role update fails', () => {
  return failingVersionActionTest(jest, setup, {
    wrapperMethod: wrapRole,
    actionMethod: 'update'
  })
})

test('Role delete', () => {
  return entityDeleteTest(jest, setup, {
    wrapperMethod: wrapRole
  })
})

test('Role delete fails', () => {
  return failingActionTest(jest, setup, {
    wrapperMethod: wrapRole,
    actionMethod: 'delete'
  })
})
