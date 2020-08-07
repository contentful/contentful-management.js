import test from 'blue-tape'
import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'

import {
  wrapScheduledAction,
  wrapScheduledActionCollection,
} from '../../../lib/entities/scheduled-action'
import {
  entityDeleteTest,
  entityWrappedTest,
  entityCollectionWrappedTest,
  failingActionTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('scheduledAction'),
  }
}

test('Scheduled action is wrapped', (t) => {
  entityWrappedTest(t, setup, {
    wrapperMethod: wrapScheduledAction,
  })
})

test('Scheduled action collection is wrapped', (t) => {
  return entityCollectionWrappedTest(t, setup, {
    wrapperMethod: wrapScheduledActionCollection,
  })
})

test('Scheduled actions delete', (t) => {
  return entityDeleteTest(t, setup, {
    wrapperMethod: wrapScheduledAction,
  })
})

test('Schedule action delete fails', (t) => {
  return failingActionTest(t, setup, {
    wrapperMethod: wrapScheduledAction,
    actionMethod: 'delete',
  })
})
