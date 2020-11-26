import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import { wrapUpload } from '../../../lib/entities/upload'
import {
  entityDeleteTest,
  entityWrappedTest,
  failingActionTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
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

  test('Upload delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapUpload,
      actionMethod: 'delete',
    })
  })
})
