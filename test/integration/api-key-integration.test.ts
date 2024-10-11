import { expect, describe, test, beforeAll, afterAll } from 'vitest'
import { initClient, createTestSpace, generateRandomId } from '../helpers'

describe('ApiKey api', { sequential: true }, () => {
  let space

  beforeAll(async () => {
    space = await createTestSpace(initClient({}), 'ApiKey')
  })

  afterAll(async () => {
    if (space) {
      return space.delete()
    }
  })

  test('Gets apiKeys', async () => {
    return space.getApiKeys().then((response) => {
      expect(response.sys, 'sys').to.be.ok
      expect(response.items, 'fields').to.be.ok
    })
  })

  test('Create apiKey with id', async () => {
    const id = generateRandomId('apiKey')
    return space
      .createApiKeyWithId(id, {
        name: generateRandomId('testapiKey'),
        description: 'test api key',
      })
      .then((apiKey) => {
        expect(apiKey.sys.id).equals(id, 'id')
        return apiKey.delete()
      })
  })

  test('Create and update apiKey', async () => {
    const name = generateRandomId('name')
    return space
      .createApiKey({
        name: name,
        description: 'test api key',
      })
      .then((apiKey) => {
        expect(apiKey.name).equals(name, 'name')
        const updatedname = generateRandomId('updatedname')
        apiKey.name = updatedname
        return apiKey.update().then((updatedApiKey) => {
          expect(updatedApiKey.name).equals(updatedname, 'name')
          return updatedApiKey.delete()
        })
      })
  })
})
