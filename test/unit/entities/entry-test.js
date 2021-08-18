import { describe, test } from 'mocha'
import { wrapEntry, wrapEntryCollection } from '../../../lib/entities/entry'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  entityCollectionWrappedTest,
  entityWrappedTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('entry'),
  }
}

describe('Entity Entry', () => {
  test('Entry is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapEntry,
    })
  })

  test('Entry collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapEntryCollection,
    })
  })
})
