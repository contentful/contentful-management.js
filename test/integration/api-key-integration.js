import { expect } from 'chai'
import { after, before, describe, test } from 'mocha'
import { client, createTestSpace, generateRandomId } from '../helpers'

describe('ApiKey api', () => {
  let space

  before(async () => {
    space = await createTestSpace(client(), 'ApiKey')
  })

  after(async () => {
    return space.delete()
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
