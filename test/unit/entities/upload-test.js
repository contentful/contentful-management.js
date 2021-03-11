import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapUpload } from '../../../lib/entities/upload'
import {
  entityDeleteTest,
  entityWrappedTest,
  failingActionTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('upload'),
  }
}

describe('Entity TeamSpaceMembership', () => {
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

  test.skip('Upload delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapUpload,
      actionMethod: 'delete',
    })
  })
})
