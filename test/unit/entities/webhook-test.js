/* global test, expect */
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
  entityWrappedTest(setup, {
    wrapperMethod: wrapWebhook
  })
})

test('Webhook collection is wrapped', () => {
  return entityCollectionWrappedTest(setup, {
    wrapperMethod: wrapWebhookCollection
  })
})

test('Webhook update', () => {
  return entityUpdateTest(setup, {
    wrapperMethod: wrapWebhook
  })
})

test('Webhook update fails', () => {
  return failingVersionActionTest(setup, {
    wrapperMethod: wrapWebhook,
    actionMethod: 'update'
  })
})

test('Webhook delete', () => {
  return entityDeleteTest(setup, {
    wrapperMethod: wrapWebhook
  })
})

test('Webhook delete fails', () => {
  return failingActionTest(setup, {
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
    expect(httpMock.get.mock.calls[0][0]).toBe('webhooks/id/calls')
  })
})

test('Webhook specific call', () => {
  expect.assertions(1)
  const {httpMock, entityMock} = setup()
  const entity = wrapWebhook(httpMock, entityMock)
  return entity.getCall('callid')
  .then((response) => {
    expect(httpMock.get.mock.calls[0][0]).toBe('webhooks/id/calls/callid')
  })
})

test('Webhook health', () => {
  expect.assertions(1)
  const {httpMock, entityMock} = setup()
  const entity = wrapWebhook(httpMock, entityMock)
  return entity.getHealth()
  .then((response) => {
    expect(httpMock.get.mock.calls[0][0]).toBe('webhooks/id/health')
  })
})
