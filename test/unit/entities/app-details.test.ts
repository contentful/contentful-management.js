import { wrapAppDetails } from '../../../lib/entities/app-details.js'
import {
  entityWrappedTest,
  entityDeleteTest,
  failingActionTest,
} from '../test-creators/instance-entity-methods.js'
import { appDetailsMock } from '../mocks/entities.js'
import { describe, test } from 'vitest'
import setupMakeRequest from '../mocks/makeRequest.js'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: appDetailsMock,
  }
}

describe('App Details', () => {
  test('Details is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapAppDetails,
    })
  })

  test('Details delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapAppDetails,
    })
  })

  test('Details delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapAppDetails,
      actionMethod: 'delete',
    })
  })
})
