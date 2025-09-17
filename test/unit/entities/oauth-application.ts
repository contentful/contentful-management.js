import { describe, test } from 'vitest'
import { cloneMock } from '../mocks/entities.js'
import setupMakeRequest from '../mocks/makeRequest.js'

import {
  wrapOAuthApplication,
  wrapOAuthApplicationCollection,
} from '../../../lib/entities/oauth-application.js'
import {
  entityWrappedTest,
  entityUpdateTest,
  entityDeleteTest,
  failingActionTest,
  entityCollectionWrappedTest,
} from '../test-creators/instance-entity-methods.js'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('oauthApplication'),
  }
}

describe('Entity OAuthApplication', () => {
  test('OAuthApplication is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapOAuthApplication,
    })
  })

  test('OAuthApplication collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapOAuthApplicationCollection,
    })
  })

  test('OAuthApplication update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapOAuthApplication,
    })
  })

  test('OAuthApplication update fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapOAuthApplication,
      actionMethod: 'update',
    })
  })

  test('OAuthApplication delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapOAuthApplication,
    })
  })

  test('OAuthApplication delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapOAuthApplication,
      actionMethod: 'delete',
    })
  })
})
