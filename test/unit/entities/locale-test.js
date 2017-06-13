/* global test */
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
  entityWrappedTest(setup, {
    wrapperMethod: wrapLocale
  })
})

test('Locale collection is wrapped', () => {
  return entityCollectionWrappedTest(setup, {
    wrapperMethod: wrapLocaleCollection
  })
})

test('Locale update', () => {
  return entityUpdateTest(setup, {
    wrapperMethod: wrapLocale
  })
})

test('Locale update fails', () => {
  return failingVersionActionTest(setup, {
    wrapperMethod: wrapLocale,
    actionMethod: 'update'
  })
})

test('Locale delete', () => {
  return entityDeleteTest(setup, {
    wrapperMethod: wrapLocale
  })
})

test('Locale delete fails', () => {
  return failingActionTest(setup, {
    wrapperMethod: wrapLocale,
    actionMethod: 'delete'
  })
})
