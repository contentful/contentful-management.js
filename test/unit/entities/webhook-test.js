/* global jest, test, expect */
import {cloneMock} from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import {wrapWebhook, wrapWebhookCollection} from '../../../lib/entities/webhook'
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
    entityMock: cloneMock('webhook')
  }
}

test('Webhook is wrapped', () => {
  entityWrappedTest(jest, setup, {
    wrapperMethod: wrapWebhook
  })
})

test('Webhook collection is wrapped', () => {
  return entityCollectionWrappedTest(jest, setup, {
    wrapperMethod: wrapWebhookCollection
  })
})

test('Webhook update', () => {
  return entityUpdateTest(jest, setup, {
    wrapperMethod: wrapWebhook
  })
})

test('Webhook update fails', () => {
  return failingVersionActionTest(jest, setup, {
    wrapperMethod: wrapWebhook,
    actionMethod: 'update'
  })
})

test('Webhook delete', () => {
  return entityDeleteTest(jest, setup, {
    wrapperMethod: wrapWebhook
  })
})

test('Webhook delete fails', () => {
  return failingActionTest(jest, setup, {
    wrapperMethod: wrapWebhook,
    actionMethod: 'delete'
  })
})

test('Webhook list of calls', () => {
  expect.assertions(1)
  const {httpMock, entityMock} = setup()
  const entity = wrapWebhook(httpMock, entityMock)
  return entity.getCalls()
  .then((response) => {
    expect(httpMock.get.calls[0][0]).toBe('webhooks/id/calls')
  })
})

test('Webhook specific call', () => {
  expect.assertions(1)
  const {httpMock, entityMock} = setup()
  const entity = wrapWebhook(httpMock, entityMock)
  return entity.getCall('callid')
  .then((response) => {
    expect(httpMock.get.calls[0][0]).toBe('webhooks/id/calls/callid')
  })
})

test('Webhook health', () => {
  expect.assertions(1)
  const {httpMock, entityMock} = setup()
  const entity = wrapWebhook(httpMock, entityMock)
  return entity.getHealth()
  .then((response) => {
    expect(httpMock.get.calls[0][0]).toBe('webhooks/id/health')
  })
})
