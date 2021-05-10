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
      assignedTo: { sys: { id: 'user-id', linkType: 'User', type: 'Link' } },
    })

    const response = await entry.getTasks()
    expect(response.items).to.be.an('array')
    expect(response.items).lengthOf(1)
    expect(response.items[0].body).to.be('Body')

    const task = await entry.getTask(id)
    expect(task.body).to.eq('Body')
    await task.delete()
  })

  test('Create, update, delete task', async () => {
    const task = await entry.createTask({
      body: 'Body',
      status: 'active',
      assignedTo: { sys: { id: 'user-id', linkType: 'User', type: 'Link' } },
    })

    expect(task.body).to.eq('Body', 'body is set')
    task.body = 'new body'

    const updatedBody = await task.update()
    expect(updatedBody).to.eq('new body')

    await updatedBody.delete()
  })
})
