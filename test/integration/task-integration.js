import { expect } from 'chai'
import { before, describe, test, after } from 'mocha'
import { initClient, createTestEnvironment, createTestSpace } from '../helpers'

describe('Task Api', () => {
  let space
  let environment
  let entry

  before(async () => {
    space = await createTestSpace(initClient(), 'Task')
    environment = await createTestEnvironment(space, 'Task Testing Environment')
    const contentType = await environment.createContentType({ name: 'Content Type' })
    await contentType.publish()
    entry = await environment.createEntry(contentType.sys.id, { fields: {} })
  })

  after(async () => {
    if (space) {
      return space.delete()
    }
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
    expect(response.items.map((item) => item.sys.id)).to.include(id)

    const task = await entry.getTask(id)
    expect(task.body).to.eq('Body')
    await task.delete()
  })

  // Tasks API now throws a 500 when you update a task
  // with a user that does not exists on the space
  // (even though the update gets applied).
  // Skipping until there's a fix.
  test.skip('Create, update, delete task', async () => {
    const task = await entry.createTask({
      body: 'Body',
      status: 'active',
      assignedTo: { sys: { id: 'user-id', linkType: 'User', type: 'Link' } },
    })

    expect(task.body).to.eq('Body', 'body is set')
    task.body = 'new body'

    const updatedBody = await task.update()
    expect(updatedBody.body).to.eq('new body')

    await updatedBody.delete()
  })
})
