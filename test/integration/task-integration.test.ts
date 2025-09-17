import { describe, it, beforeAll, afterAll } from 'vitest'
import { expect } from 'vitest'
import {
  defaultClient,
  createTestSpace,
  getTestUser,
  waitForEnvironmentToBeReady,
  timeoutToCalmRateLimiting,
} from '../helpers.js'
import type { Space, Environment, Entry, Task, Link } from '../../lib/export-types.js'

describe('Task API', () => {
  let space: Space
  let environment: Environment
  let entry: Entry
  let assignee: Link<'User'>
  const taskBody = 'JS SDK Task Integration Test'

  beforeAll(async () => {
    const testUser = await getTestUser()
    assignee = { sys: { id: testUser.sys.id, linkType: 'User', type: 'Link' } }
  })

  beforeAll(async () => {
    space = await createTestSpace(defaultClient, 'Task')
    environment = await space.createEnvironment({ name: 'Task Testing Environment' })
    await waitForEnvironmentToBeReady(space, environment)
    const contentType = await environment.createContentType({ name: 'Content Type', fields: [] })
    await contentType.publish()
    entry = await environment.createEntry(contentType.sys.id, { fields: {} })
  })

  afterAll(async () => {
    if (space) {
      await space.delete()
    }

    await timeoutToCalmRateLimiting()
  })

  it('Gets tasks', async () => {
    const {
      sys: { id },
    } = await entry.createTask({
      body: taskBody,
      status: 'active',
      assignedTo: assignee,
    })

    const response = await entry.getTasks()
    expect(response.items).toBeInstanceOf(Array)
    expect(response.items.map((item: Task) => item.sys.id)).toContain(id)

    const task = await entry.getTask(id)
    expect(task.body).toBe(taskBody)
    await task.delete()
  })

  it('Creates, updates, deletes task', async () => {
    const task = await entry.createTask({
      body: taskBody,
      status: 'active',
      assignedTo: assignee,
    })

    expect(task.body).toBe(taskBody)
    task.body = 'new body'

    const updatedTask = await task.update()
    expect(updatedTask.body).toBe('new body')

    await updatedTask.delete()
  })
})
