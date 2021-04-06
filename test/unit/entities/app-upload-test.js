import { wrapAppUpload, wrapAppUploadCollection } from '../../../lib/entities/app-upload'
import setupMakeRequest from '../mocks/makeRequest'
import { describe, test } from 'mocha'
import {
  entityCollectionWrappedTest,
  entityWrappedTest,
  failingActionTest,
  entityDeleteTest,
} from '../test-creators/instance-entity-methods'
import { appUploadMock } from '../mocks/entities'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: appUploadMock,
  }
}

describe('Entity AppUpload', () => {
  test('AppUpload is wrapped', async () => {
    return entityWrappedTest(setup, { wrapperMethod: wrapAppUpload })
  })

  test('AppUpload collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, { wrapperMethod: wrapAppUploadCollection })
  })

  test('AppUpload delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapAppUpload,
      actionMethod: 'delete',
    })
  })

  test('AppUpload delete fails', async () => {
    return failingActionTest(setup, { wrapperMethod: wrapAppUpload, actionMethod: 'delete' })
  })
})
