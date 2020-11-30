import { after, before, describe, test } from 'mocha'
import { client, createTestSpace, generateRandomId, waitForEnvironmentToBeReady } from '../helpers'
import { expect } from 'chai'

describe('Environment Api', function () {
  let space

  before(async () => {
    space = await createTestSpace(client(), 'Environment')
  })

  after(async () => {
    if (space) {
      return space.delete()
    }
  })

  test('creates an environment', async () => {
    return space
      .createEnvironment({ name: 'test-env' })
      .then(async (env) => {
        await waitForEnvironmentToBeReady(space, env)
        return env
      })
      .then((response) => {
        expect(response.sys.type).equals('Environment', 'env is created')
        expect(response.name).equals('test-env', 'env is created with name')
      })
  })

  test('creates an environment with an id', async () => {
    const id = generateRandomId('env')
    return space
      .createEnvironmentWithId(id, { name: 'myId' })
      .then(async (env) => {
        await waitForEnvironmentToBeReady(space, env)
        return env
      })
      .then((response) => {
        expect(response.name).equals('myId', 'env was created with correct name')
        expect(response.sys.id).equals(id, 'env was created with id')
      })
  })
})
