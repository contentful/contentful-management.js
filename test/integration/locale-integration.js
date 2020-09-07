import { after, before, describe, test } from 'mocha'
import { client, createTestSpace } from '../helpers'
import { expect } from 'chai'

describe('Locale Api', function () {
  this.timeout(60000)

  let space

  before(async () => {
    space = await createTestSpace(client(), 'Locale')
  })

  after(async () => {
    return space.delete()
  })

  test('Gets locales', async () => {
    return space.getLocales().then((response) => {
      expect(response.items[0].name).equals('English (United States)')
      expect(response.items[0].code).equals('en-US')
    })
  })

  test('Creates, gets, updates and deletes a locale', async () => {
    return space
      .createLocale({
        name: 'German (Austria)',
        code: 'de-AT',
      })
      .then((response) => {
        expect(response.code).equals('de-AT', 'locale code after creation')
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              space.getLocale(response.sys.id).then((locale) => {
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
