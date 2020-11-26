import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import { wrapRole, wrapRoleCollection } from '../../../lib/entities/role'
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
    entityMock: cloneMock('role'),
  }
}

describe('Entity Role', () => {
  test('Role is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapRole,
    })
  })

  test('Role collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapRoleCollection,
    })
  })

  test('Role update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapRole,
    })
  })

  test('Role update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapRole,
      actionMethod: 'update',
    })
  })

  test('Role delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapRole,
    })
  })

  test('Role delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapRole,
      actionMethod: 'delete',
    })
  })
})
