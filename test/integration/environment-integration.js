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

    const environment = await space.createEnvironment({ name: envName })
    await waitForEnvironmentToBeReady(space, environment)

    expect(environment.sys.type).equals('Environment', 'env is created')
    expect(environment.name).equals(envName, 'env is created with name')
  })

  test('creates an environment with an id', async () => {
    const envName = 'env-name'
    const envId = generateRandomId('env')

    const environment = await space.createEnvironmentWithId(envId, { name: envName })
    await waitForEnvironmentToBeReady(space, environment)

    expect(environment.sys.type).equals('Environment', 'env is created')
    expect(environment.name).equals(envName, 'env was created with correct name')
    expect(environment.sys.id).equals(envId, 'env was created with correct id')
  })
})
