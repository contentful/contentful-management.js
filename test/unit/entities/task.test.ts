import { describe, expect, expectTypeOf, test } from 'vitest'
import type { Link } from '../../../lib/common-types'
import type { TaskProps } from '../../../lib/entities/task'
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

  test('Task parent entity typing supports ExO entities', () => {
    expectTypeOf<TaskProps['sys']['parentEntity']>().toEqualTypeOf<
      Link<'Entry' | 'Experience' | 'Fragment' | 'Template' | 'ComponentType'>
    >()
  })

  test('Task update uses parent entity params', async () => {
    const { makeRequest, entityMock } = setup(Promise.resolve({}))
    entityMock.sys.parentEntity.sys.linkType = 'Experience'
    entityMock.sys.parentEntity.sys.id = 'experience-id'

    const task = wrapTask(makeRequest, entityMock)
    await task.update()

    expect(makeRequest.mock.calls[0][0].params).toMatchObject({
      parentEntityType: 'Experience',
      parentEntityId: 'experience-id',
      taskId: entityMock.sys.id,
    })
  })
})
