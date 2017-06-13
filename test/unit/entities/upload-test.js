/* global test */
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
  entityWrappedTest(setup, {
    wrapperMethod: wrapUpload
  })
})

test('Upload delete', () => {
  return entityDeleteTest(setup, {
    wrapperMethod: wrapUpload
  })
})

test('Upload delete fails', () => {
  return failingActionTest(setup, {
    wrapperMethod: wrapUpload,
    actionMethod: 'delete'
  })
})
