import { after, before, describe, test } from 'mocha'
import { client, createTestSpace } from '../helpers'
import { expect } from 'chai'

// check
describe('Environment Api', function () {
  let space

  before(async () => {
    space = await createTestSpace(client(), 'Environment')
  })

  after(async () => {
    return space.delete()
  })

  test('creates an environment', async () => {
    return space.createEnvironment({ name: 'test-env' }).then((response) => {
      expect(response.sys.type).equals('Environment', 'env is created')
      expect(response.name).equals('test-env', 'env is created with name')
    })
  })

  test('creates an environment with an id', async () => {
    return space.createEnvironmentWithId('myId', { name: 'myId' }).then((response) => {
      expect(response.name).equals('myId', 'env was created with correct name')
      expect(response.sys.id).equals('myId', 'env was created with id')
    })
  })
})
