import test from 'blue-tape'
import {cloneMock} from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import {wrapAppInstallation, wrapAppInstallationCollection} from '../../../lib/entities/app-installation'

import {
  entityWrappedTest,
  entityCollectionWrappedTest,
  entityDeleteTest,
  failingActionTest
} from '../test-creators/instance-entity-methods'

function setup (promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('appInstallation')
  }
}

test('AppInstallation is wrapped', (t) => {
  entityWrappedTest(t, setup, {
    wrapperMethod: wrapAppInstallation
  })
})

test('AppInstallation collection is wrapped', (t) => {
  return entityCollectionWrappedTest(t, setup, {
    wrapperMethod: wrapAppInstallationCollection
  })
})

test('AppInstallation update', (t) => {
  t.plan(2)
  const { httpMock, entityMock } = setup()
  entityMock.sys.version = 2
  const entity = wrapAppInstallation(httpMock, entityMock)
  entity.name = 'updatedname'
  return entity.update()
    .then((response) => {
      t.ok(response.toPlainObject, 'response is wrapped')
      t.equals(httpMock.put.args[0][1].name, 'updatedname', 'data is sent')
      return {httpMock, entityMock, response}
    })
})

test('AppInstallation update fails', (t) => {
  /**
   * Test needs to be inlined here because error object shape does not match
   * the current test pattern
   */
  t.plan(2)
  const error = cloneMock('error')
  const { httpMock, entityMock } = setup(Promise.reject(error))
  entityMock.sys.version = 2
  const entity = wrapAppInstallation(httpMock, entityMock)

  return entity['update']()
    .catch((r) => {
      t.equals(r.response.status, 404)
      t.equals(r.response.statusText, 'Not Found')
    })
})

test('AppInstallation delete', (t) => {
  return entityDeleteTest(t, setup, {
    wrapperMethod: wrapAppInstallation
  })
})

test('AppInstallation delete fails', (t) => {
  return failingActionTest(t, setup, {
    wrapperMethod: wrapAppInstallation,
    actionMethod: 'delete'
  })
})
