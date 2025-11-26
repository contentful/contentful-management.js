import { describe, test } from 'vitest'
import { cloneMock } from '../mocks/entities.js'
import setupMakeRequest from '../mocks/makeRequest.js'
import { wrapUpload } from '../../../lib/entities/upload.js'
import {
  entityDeleteTest,
  entityWrappedTest,
  failingActionTest,
} from '../test-creators/instance-entity-methods.js'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('upload'),
  }
}

describe('Entity Uploads', () => {
  test('Upload is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapUpload,
    })
  })

  test('Upload delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapUpload,
    })
  })

  test('Upload delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapUpload,
      actionMethod: 'delete',
    })
  })
})
