/* global test, expect */
import { getSpace } from './utils'

export function localeTests () {
  test('Gets locales', () => {
    return getSpace()
      .then((space) => {
        return space.getLocales()
          .then((response) => {
            expect(response.items[0].name).toBeTruthy()
            expect(response.items[0].code).toBeTruthy()
          })
      })
  })

  test('Creates, gets, updates and deletes a locale', () => {
    return getSpace()
      .then((space) => {
        return space.createLocale({
          name: 'German (Austria)',
          code: 'de-AT'
        })
          .then((response) => {
            expect(response.code).toBe('de-AT')
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(space.getLocale(response.sys.id)
                  .then((locale) => {
                    expect(locale.code).toBe('de-AT')
                    locale.name = 'Deutsch (Österreich)'
                    return locale.update()
                      .then((updatedLocale) => {
                        expect(updatedLocale.name).toBe('Deutsch (Österreich)')
                        return updatedLocale.delete()
                      })
                  }))
              }, 3000)
            })
          })
      })
  })
}
