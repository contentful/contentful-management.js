import { describe, test } from 'mocha'
import { wrapWebhook, wrapWebhookCollection } from '../../../lib/entities/webhook'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  entityCollectionWrappedTest,
  entityDeleteTest,
  entityUpdateTest,
  entityWrappedTest,
  failingActionTest,
  failingVersionActionTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('webhook'),
  }
}

describe('Entity Webhook', () => {
  test('Webhook is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapWebhook,
    })
  })

  test('Webhook collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapWebhookCollection,
    })
  })

  test('Webhook update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapWebhook,
    })
  })

  test('Webhook update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapWebhook,
      actionMethod: 'update',
    })
  })

  test('Webhook delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapWebhook,
    })
  })

  test('Webhook delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapWebhook,
      actionMethod: 'delete',
    })
  })
})
