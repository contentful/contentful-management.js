/* global test */
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
  entityWrappedTest(setup, {
    wrapperMethod: wrapRole
  })
})

test('Role collection is wrapped', () => {
  return entityCollectionWrappedTest(setup, {
    wrapperMethod: wrapRoleCollection
  })
})

test('Role update', () => {
  return entityUpdateTest(setup, {
    wrapperMethod: wrapRole
  })
})

test('Role update fails', () => {
  return failingVersionActionTest(setup, {
    wrapperMethod: wrapRole,
    actionMethod: 'update'
  })
})

test('Role delete', () => {
  return entityDeleteTest(setup, {
    wrapperMethod: wrapRole
  })
})

test('Role delete fails', () => {
  return failingActionTest(setup, {
    wrapperMethod: wrapRole,
    actionMethod: 'delete'
  })
})
