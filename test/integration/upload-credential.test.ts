import { expect, describe, test, beforeAll, afterAll } from 'vitest'
import type { Environment, PlainClientAPI, Space } from '../../lib/export-types'
import {
  createTestEnvironment,
  createTestSpace,
  initClient,
  initPlainClient,
  waitForEnvironmentToBeReady,
} from '../helpers'

describe('Upload Credential Integration', () => {
  let space: Space
  let environment: Environment
  let client: PlainClientAPI

  beforeAll(async () => {
    space = (await createTestSpace(initClient(), 'Entry')) as Space
    environment = (await createTestEnvironment(space, 'Testing Environment')) as Environment
    client = initPlainClient()
    await waitForEnvironmentToBeReady(space, environment)
  })

  afterAll(() => {
    if (space) {
      return space.delete()
    }
  })

  test('create a upload credential', async () => {
    const result = await client.uploadCredential.create({
      spaceId: space.sys.id,
      environmentId: environment.sys.id,
    })

    expect(result.sys.type).equals('UploadCredential')
    expect(result.uploadCredentials.policy).to.be.a('string')
    expect(result.uploadCredentials.signature).to.be.a('string')
    expect(result.uploadCredentials.expiresAt).to.be.a('string')
    expect(result.uploadCredentials.createdAt).to.be.a('string')
  })
})
