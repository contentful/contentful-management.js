import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import { wrapUiExtension, wrapUiExtensionCollection } from '../../../lib/entities/ui-extension'
import {
  entityWrappedTest,
  entityCollectionWrappedTest,
  entityUpdateTest,
  entityDeleteTest,
  failingActionTest,
  failingVersionActionTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('uiExtension'),
  }
}

describe('Entity UiExtension', () => {
  test('UiExtension is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapUiExtension,
    })
  })

  test('UiExtension collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapUiExtensionCollection,
    })
  })

  test('UiExtension update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapUiExtension,
    })
  })

  test('UiExtension update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapUiExtension,
      actionMethod: 'update',
    })
  })

  test('UiExtension delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapUiExtension,
    })
  })

  test('UiExtension delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapUiExtension,
      actionMethod: 'delete',
    })
  })
})
