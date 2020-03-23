import test from 'blue-tape'
import {cloneMock} from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import {wrapAppInstallation, wrapAppInstallationCollection} from '../../../lib/entities/app-installation'

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
  return entityUpdateTest(t, setup, {
    wrapperMethod: wrapAppInstallation
  })
})

test('AppInstallation update fails', (t) => {
  return failingVersionActionTest(t, setup, {
    wrapperMethod: wrapAppInstallation,
    actionMethod: 'update'
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
