import { describe, test } from 'mocha'
import { wrapAppEventSubscription } from '../../../lib/entities/app-event-subscription'
import { appEventSubscriptionMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import setupMakeRequest from '../mocks/makeRequest'
import {
  entityDeleteTest,
  entityWrappedTest,
  failingActionTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    httpMock: setupHttpMock(promise),
    entityMock: appEventSubscriptionMock,
  }
}

describe('AppEventSubscription', () => {
  test('EventSubscription is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapAppEventSubscription,
    })
  })

  test('AppEventSubscription delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapAppEventSubscription,
    })
  })

  test('AppEventSubscription delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapAppEventSubscription,
      actionMethod: 'delete',
    })
  })
})
