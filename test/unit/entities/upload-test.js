/* global jest, test */
import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import { wrapUpload } from '../../../lib/entities/upload'
import {
  entityWrappedTest,
  entityDeleteTest,
  failingActionTest
} from '../test-creators/instance-entity-methods'

function setup (promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('upload')
  }
}

test('Upload is wrapped', () => {
  entityWrappedTest(jest, setup, {
    wrapperMethod: wrapUpload
  })
})

test('Upload delete', () => {
  return entityDeleteTest(jest, setup, {
    wrapperMethod: wrapUpload
  })
})

test('Upload delete fails', () => {
  return failingActionTest(jest, setup, {
    wrapperMethod: wrapUpload,
    actionMethod: 'delete'
  })
})
