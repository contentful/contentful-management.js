import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'

import {
  wrapScheduledAction,
  wrapScheduledActionCollection,
} from '../../../lib/entities/scheduled-action'
import {
  entityCollectionWrappedTest,
  entityDeleteTest,
  entityWrappedTest,
  failingActionTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('scheduledAction'),
  }
}

describe('Entity ScheduledAction', () => {
  test('Scheduled action is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapScheduledAction,
    })
  })

  test('Scheduled action collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapScheduledActionCollection,
    })
  })

  test('Scheduled actions delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapScheduledAction,
    })
  })

  test('Schedule action delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapScheduledAction,
      actionMethod: 'delete',
    })
  })
})
