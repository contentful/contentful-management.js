import test from 'blue-tape'
import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'

import {
  wrapScheduledAction,
  wrapScheduledActionCollection,
} from '../../../lib/entities/scheduled-action'
import {
  entityWrappedTest,
  entityCollectionWrappedTest,
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

// test('Environment alias update', (t) => {
//   return entityUpdateTest(t, setup, {
//     wrapperMethod: wrapEnvironmentAlias,
//   })
// })

// test('Environment alias update fails', (t) => {
//   return failingVersionActionTest(t, setup, {
//     wrapperMethod: wrapEnvironmentAlias,
//     actionMethod: 'update',
//   })
// })
