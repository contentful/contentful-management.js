import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import {
  wrapAppInstallation,
  wrapAppInstallationCollection,
} from '../../../lib/entities/app-installation'
import { expect } from 'chai'

import {
  entityCollectionWrappedTest,
  entityDeleteTest,
  entityWrappedTest,
  failingActionTest,
  failingVersionActionTest,
} from '../test-creators/instance-entity-methods'
import { describe, test } from 'mocha'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
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
    const { httpMock, entityMock } = setup()
    entityMock.sys.version = 2
    const entity = wrapAppInstallation(httpMock, entityMock)
    entity.name = 'updatedname'
    return entity.update().then((response) => {
      expect(response.toPlainObject, 'response is wrapped').to.be.ok
      expect(httpMock.put.args[0][1].name).equals('updatedname', 'data is sent')
      return {
        httpMock,
        entityMock,
        response,
      }
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
