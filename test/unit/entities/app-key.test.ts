import { describe, test } from 'vitest'
import { wrapAppKey, wrapAppKeyCollection } from '../../../lib/entities/app-key'
import { appKeyMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  entityCollectionWrappedTest,
  entityDeleteTest,
  entityWrappedTest,
  failingActionTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: appKeyMock,
  }
}

describe('AppKey', () => {
  test('Key is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapAppKey,
    })
  })

  test('AppKey collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapAppKeyCollection,
    })
  })

  test('AppKey delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapAppKey,
    })
  })

  test('AppKey delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapAppKey,
      actionMethod: 'delete',
    })
  })
})
