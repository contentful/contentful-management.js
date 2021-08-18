import { after, before, describe, test } from 'mocha'
import {
  initClient,
  createTestSpace,
  generateRandomId,
  waitForEnvironmentToBeReady,
} from '../helpers'
import { expect } from 'chai'

describe('Environment Api', function () {
  let space

  before(async () => {
    space = await createTestSpace(initClient(), 'Environment')
  })

  after(async () => {
    if (space) {
      return space.delete()
    }
  })

  test('creates an environment', async () => {
    const envName = 'test-env'

    return space
      .createEnvironment({ name: envName })
      .then(async (env) => {
        await waitForEnvironmentToBeReady(space, env)
        return env
      })
      .then((response) => {
        expect(response.sys.type).equals('Environment', 'env is created')
        expect(response.name).equals(envName, 'env is created with name')
      })
  })

  test('creates an environment with an id', async () => {
    const envName = 'env-name'
    const envId = generateRandomId('env')
    return space
      .createEnvironmentWithId(envId, { name: envName })
      .then(async (env) => {
        await waitForEnvironmentToBeReady(space, env)
        return env
      })
      .then((response) => {
        expect(response.sys.type).equals('Environment', 'env is created')
        expect(response.name).equals(envName, 'env was created with correct name')
        expect(response.sys.id).equals(envId, 'env was created with correct id')
      })
  })
})
