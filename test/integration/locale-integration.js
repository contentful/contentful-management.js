import { after, before, describe, test } from 'mocha'
import { client, createTestEnvironment, createTestSpace } from "../helpers";
import { expect } from 'chai'

// check
describe('Locale Api', function () {
  this.timeout(60000)

  let space
  let environment

  before(async () => {
    space = await createTestSpace(client(), 'Locale')
    environment = await createTestEnvironment(space, 'Test')
  })

  after(async () => {
    return space.delete()
  })

  test('Gets locales', async () => {
    return environment.getLocales().then((response) => {
      expect(response.items[0].name).equals('English (United States)')
      expect(response.items[0].code).equals('en-US')
    })
  })

  test('Creates, gets, updates and deletes a locale', async () => {
    return environment
      .createLocale({
        name: 'German (Austria)',
        code: 'de-AT',
      })
      .then((response) => {
        expect(response.code).equals('de-AT', 'locale code after creation')
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              environment.getLocale(response.sys.id).then((locale) => {
                expect(locale.code).equals('de-AT', 'locale code after getting')
                locale.name = 'Deutsch (Österreich)'
                locale.fallbackCode = 'en-US'
                return locale.update().then((updatedLocale) => {
                  expect(updatedLocale.name).equals(
                    'Deutsch (Österreich)',
                    'locale name after update'
                  )
                  expect(updatedLocale.fallbackCode).equals(
                    'en-US',
                    'locale fallbackCode after update'
                  )
                  return updatedLocale.delete()
                })
              })
            )
          }, 3000)
        })
      })
  })
})
