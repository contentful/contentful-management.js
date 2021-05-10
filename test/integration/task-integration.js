import { expect } from 'chai'
import { before, describe, test } from 'mocha'
import { client } from '../helpers'

describe('Task Api', () => {
  let space
  let environment
  let entry
  before(async () => {
    space = await client().getSpace('ezs1swce23xe')
    environment = await space.getEnvironment('master')
    entry = await environment.getEntry('5ETMRzkl9KM4omyMwKAOki')
  })

  test('Get tasks', async () => {
    const {
      sys: { id },
    } = await entry.createTask({
      body: 'Body',
      status: 'active',
      assignedTo: { sys: { id: 'user-id', type: 'User' } },
    })

    const tasks = await entry.getTasks()
    expect(tasks).lengthOf(1)
    expect(tasks[0].body).to.be('Body')

    const task = await entry.getTask(id)
    expect(task.body).to.be('Body')
    await task.delete()
  })

  test('Create, update, delete task', async () => {
    const task = await entry.createTask({
      body: 'Body',
      status: 'active',
      assignedTo: { sys: { id: 'user-id', type: 'User' } },
    })

    expect(task.body).to.be('Body', 'body is set')
    task.body = 'new body'

    const updatedBody = await task.update()
    expect(updatedBody).to.be('new body')

    await updatedBody.delete()
  })
})
