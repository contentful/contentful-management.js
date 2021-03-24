import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  wrapAppInstallation,
  wrapAppInstallationCollection,
} from '../../../lib/entities/app-installation'
import {
  entityCollectionWrappedTest,
  entityDeleteTest,
  entityUpdateTest,
  entityWrappedTest,
  failingActionTest,
  failingVersionActionTest,
} from '../test-creators/instance-entity-methods'
import { describe, test } from 'mocha'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('appInstallation'),
  }
}

describe('Entity AppInstallation', () => {
  test('AppInstallation is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapAppInstallation,
    })
  })

  test('AppInstallation collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapAppInstallationCollection,
    })
  })

  test('AppInstallation update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapAppInstallation,
    })
  })

  test('AppInstallation update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapAppInstallation,
      actionMethod: 'update',
    })
  })

  test('AppInstallation delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapAppInstallation,
    })
  })

  test('AppInstallation delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapAppInstallation,
      actionMethod: 'delete',
    })
  })
})
