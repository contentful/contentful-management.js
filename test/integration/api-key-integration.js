/* global expect, test */
import generateRandomId from './generate-random-id'
import {getSpace} from './utils'

export function apiKeyTests () {
  test('Gets apiKeys', () => {
    return getSpace()
      .then((space) => {
        return space.getApiKeys()
          .then((response) => {
            expect(response.sys).toBeTruthy()
            expect(response.items).toBeTruthy()
          })
      })
  })

  test('Create apiKey with id', () => {
    const id = generateRandomId('apiKey')
    return getSpace()
      .then((space) => {
        return space.createApiKeyWithId(id, {
          name: generateRandomId('testapiKey'),
          description: 'test api key'
        })
          .then((apiKey) => {
            expect(apiKey.sys.id).toBe(id)
            return apiKey.delete()
          })
      })
  })

  test('Create apiKey', () => {
    const name = generateRandomId('name')
    return getSpace()
      .then((space) => {
        return space.createApiKey({
          name: name,
          description: 'test api key'
        })
          .then((apiKey) => {
            expect(apiKey.name).toBe(name)
            const updatedname = generateRandomId('updatedname')
            apiKey.name = updatedname
            apiKey.update()
              .then((updatedApiKey) => {
                expect(updatedApiKey.name).toBe(updatedname)
                return updatedApiKey.delete()
              })
          })
      })
  })
}
