import { after, before, describe, test } from 'mocha'
import { initClient, createTestEnvironment, createTestSpace } from '../helpers'
import { expect } from 'chai'

describe('Locale Api', function () {
  let space
  let environment

  before(async () => {
    space = await createTestSpace(initClient(), 'Locale')
    environment = await createTestEnvironment(space, 'Test')
  })

  after(async () => {
    if (space) {
      return space.delete()
    }
  })

  test('Gets locales', async () => {
    return environment.getLocales().then((response) => {
      expect(response.items[0].name).equals('English (United States)')
      expect(response.items[0].code).equals('en-US')
    })
  })

  test('Gets locales respects skip', async () => {
    return environment.getLocales({ skip: 1 }).then((response) => {
      expect(response.items.length).equals(0)
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

  test('Creates, gets page (respects limit), deletes a locale', async () => {
    const createdLocal = await environment.createLocale({
      name: 'Chinese (Simplified, China)',
      code: 'zh-Hans-CN',
    })
    // wait for the locale to be created
    await new Promise((res) => setTimeout(res, 3000))
    const pagedLocales = await environment.getLocales({ limit: 1 })
    expect(pagedLocales.items.length).equals(1)
    expect(pagedLocales.total).equals(2)
    await createdLocal.delete()
  })
})
