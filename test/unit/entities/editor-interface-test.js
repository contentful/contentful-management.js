/* global test, expect */
import {cloneMock} from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import {wrapEditorInterface} from '../../../lib/entities/editor-interface'
import {
  entityWrappedTest,
  entityUpdateTest
} from '../test-creators/instance-entity-methods'

function setup (promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('editorInterface')
  }
}

test('Editor Interface is wrapped', () => {
  return entityWrappedTest(setup, {
    wrapperMethod: wrapEditorInterface
  })
})

test('EditorInterface update', () => {
  return entityUpdateTest(setup, {
    wrapperMethod: wrapEditorInterface
  })
})

test('EditorInterface getControlForField with an existing fieldId', () => {
  expect.assertions(5)
  const {httpMock, entityMock} = setup()
  const editorInterface = wrapEditorInterface(httpMock, entityMock)
  const control = editorInterface.getControlForField('fieldId')
  expect(control).toBeTruthy()
  expect(control.fieldId).toBeTruthy()
  expect(control.widgetId).toBeTruthy()
  expect(control.fieldId).toBe('fieldId')
  expect(control.widgetId).toBe('singleLine')
})

test('EditorInterface getControlForField without an existing fieldId', () => {
  expect.assertions(1)
  const {httpMock, entityMock} = setup()
  const editorInterface = wrapEditorInterface(httpMock, entityMock)
  const control = editorInterface.getControlForField('notThere')
  expect(control).toBe(null)
})
