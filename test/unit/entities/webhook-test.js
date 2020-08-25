import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import { wrapWebhook, wrapWebhookCollection } from '../../../lib/entities/webhook'
import {
  entityWrappedTest,
  entityCollectionWrappedTest,
  entityUpdateTest,
  entityDeleteTest,
  failingActionTest,
  failingVersionActionTest,
} from '../test-creators/instance-entity-methods'
import { expect } from 'chai'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
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

  test('Webhook list of calls', async () => {
    const { httpMock, entityMock } = setup()
    const entity = wrapWebhook(httpMock, entityMock)
    return entity.getCalls().then(() => {
      expect(httpMock.get.args[0][0]).equals('webhooks/id/calls', 'id is sent')
    })
  })

  test('Webhook specific call', async () => {
    const { httpMock, entityMock } = setup()
    const entity = wrapWebhook(httpMock, entityMock)
    return entity.getCall('callid').then(() => {
      expect(httpMock.get.args[0][0]).equals('webhooks/id/calls/callid', 'id is sent')
    })
  })

  test('Webhook health', async () => {
    const { httpMock, entityMock } = setup()
    const entity = wrapWebhook(httpMock, entityMock)
    return entity.getHealth().then(() => {
      expect(httpMock.get.args[0][0]).equals('webhooks/id/health', 'id is sent')
    })
  })
})
