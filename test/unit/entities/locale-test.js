import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapLocale, wrapLocaleCollection } from '../../../lib/entities/locale'
import {
  entityCollectionWrappedTest,
  entityDeleteTest,
  entityUpdateTest,
  entityWrappedTest,
  failingActionTest,
  failingVersionActionTest,
} from '../test-creators/instance-entity-methods'
import { describe, test } from 'mocha'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('locale'),
  }
}

describe('Entity Locale', () => {
  test('Locale is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapLocale,
    })
  })

  test('Locale collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapLocaleCollection,
    })
  })

  test('Locale update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapLocale,
    })
  })

  test.skip('Locale update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapLocale,
      actionMethod: 'update',
    })
  })

  test('Locale delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapLocale,
    })
  })

  test.skip('Locale delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapLocale,
      actionMethod: 'delete',
    })
  })
})
