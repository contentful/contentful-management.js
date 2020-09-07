import { after, before, describe, test } from 'mocha'
import { client, createTestSpace, waitForEnvironmentToBeReady } from '../helpers'
import { expect } from 'chai'

describe('Environment Api', function () {
  this.timeout(60000)

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

  test('env is created with master as source when no source id is provided', async () => {
    return space
      .createContentTypeWithId('testEntity', { name: 'testEntity' })
      .then((contentType) => contentType.publish())
      .then(() => space.createEnvironmentWithId('newEnv', { name: 'newEnv' }))
      .then((environment) => {
        expect(environment.name).equals('newEnv', 'env is created with correct name')
        expect(environment.sys.id).equals('newEnv', 'env is created with correct id')
        return waitForEnvironmentToBeReady(space, environment)
      })
      .then((readyEnv) => readyEnv.getContentType('testEntity'))
      .then((testCts) => {
        expect(testCts).ok
        expect(testCts.sys.id).equals(
          'testEntity',
          'new env still has content type, created from master'
        )
      })
  })

  test.skip('creates environment from given source environment', async () => {
    let fromMasterCtCount = 0
    // create an env from master, note how many contentTypes it has
    return (
      space
        .createEnvironmentWithId('fromMaster', { name: 'fromMaster' })
        .then((environment) => waitForEnvironmentToBeReady(space, environment))
        .then((readyEnvironment) => readyEnvironment.getContentTypes())
        .then((contentTypes) => {
          fromMasterCtCount = contentTypes.items.length
        })
        // write something to master
        .then(() => space.createContentTypeWithId('myNewEntity', { name: 'myNewEntity' }))
        .then((contentType) => contentType.publish())
        // confirm num cts in master
        .then(() => space.getContentTypes())
        .then((masterCts) => {
          expect(masterCts).equals(
            fromMasterCtCount,
            'master has more content types than "fromMaster" env'
          )
        })
        // create a new env with "fromMaster" as the source
        .then(() =>
          space.createEnvironmentWithId('newEmptyEnv', { name: 'newEmptyEnv' }, 'fromMaster')
        )
        .then((newEnv) => waitForEnvironmentToBeReady(space, newEnv))
        .then((readyNewEnv) => readyNewEnv.getContentTypes())
        // expect cts to be same as "fromMaster"
        .then((cts) => {
          expect(cts.items.length).equals(
            fromMasterCtCount,
            'new env with non-master source has correct num content types'
          )
        })
    )
  })
})
