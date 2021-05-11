import { describe, test } from 'mocha'
import { wrapTask, wrapTaskCollection } from '../../../lib/entities/task'
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
    entityMock: cloneMock('task'),
  }
}

describe('Entity Task', () => {
  test('Task is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapTask,
    })
  })

  test('Task collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapTaskCollection,
    })
  })

  test('Task update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapTask,
    })
  })

  test('Task update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapTask,
      actionMethod: 'update',
    })
  })

  test('Task delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapTask,
    })
  })

  test('Task delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapTask,
      actionMethod: 'delete',
    })
  })
})
