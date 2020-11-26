import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import { wrapEditorInterface } from '../../../lib/entities/editor-interface'
import { entityUpdateTest, entityWrappedTest } from '../test-creators/instance-entity-methods'
import { describe, test } from 'mocha'
import { expect } from 'chai'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('editorInterface'),
  }
}

describe('Entity EditorInterface', () => {
  test('Editor Interface is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapEditorInterface,
    })
  })

  test('EditorInterface update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapEditorInterface,
    })
  })

  test('EditorInterface getControlForField with an existing fieldId', async () => {
    const { httpMock, entityMock } = setup()
    const editorInterface = wrapEditorInterface(httpMock, entityMock)
    const control = editorInterface.getControlForField('fieldId')
    expect(control, 'control object sould be there').to.be.ok
    expect(control.fieldId, 'should have a fieldId').to.be.ok
    expect(control.widgetId, 'should have a widgetId').to.be.ok
    expect(control.fieldId).equals('fieldId')
    expect(control.widgetId).equals('singleLine')
  })

  test('EditorInterface getControlForField without an existing fieldId', async () => {
    const { httpMock, entityMock } = setup()
    const editorInterface = wrapEditorInterface(httpMock, entityMock)
    const control = editorInterface.getControlForField('notThere')
    expect(control).to.be.null
  })
})
