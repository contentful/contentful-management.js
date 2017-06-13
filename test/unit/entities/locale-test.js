/* global jest, test */
import {cloneMock} from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import {wrapLocale, wrapLocaleCollection} from '../../../lib/entities/locale'
import {
  entityWrappedTest,
  entityCollectionWrappedTest,
  entityUpdateTest,
  entityDeleteTest,
  failingActionTest,
  failingVersionActionTest
} from '../test-creators/instance-entity-methods'

function setup (promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('locale')
  }
}

test('Locale is wrapped', () => {
  entityWrappedTest(jest, setup, {
    wrapperMethod: wrapLocale
  })
})

test('Locale collection is wrapped', () => {
  return entityCollectionWrappedTest(jest, setup, {
    wrapperMethod: wrapLocaleCollection
  })
})

test('Locale update', () => {
  return entityUpdateTest(jest, setup, {
    wrapperMethod: wrapLocale
  })
})

test('Locale update fails', () => {
  return failingVersionActionTest(jest, setup, {
    wrapperMethod: wrapLocale,
    actionMethod: 'update'
  })
})

test('Locale delete', () => {
  return entityDeleteTest(jest, setup, {
    wrapperMethod: wrapLocale
  })
})

test('Locale delete fails', () => {
  return failingActionTest(jest, setup, {
    wrapperMethod: wrapLocale,
    actionMethod: 'delete'
  })
})
