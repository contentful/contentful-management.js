import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import { Except, SetOptional } from 'type-fest'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import { BasicMetaSysProps, SysLink, DefaultElements, MakeRequest } from '../common-types'

export type LocaleProps = {
  sys: BasicMetaSysProps & { space: SysLink; environment: SysLink }
  /**
   * Locale name
   */
  name: string
  /**
   * Locale code (example: en-us)
   */
  code: string
  /**
   * Internal locale code
   */
  internal_code: string
  /**
   * Locale code to fallback to when there is not content for the current locale
   */
  fallbackCode: string | null
  /**
   *  If the content under this locale should be available on the CDA (for public reading)
   */
  contentDeliveryApi: boolean
  /**
   * If the content under this locale should be available on the CMA (for editing)
   */
  contentManagementApi: boolean
  /**
   * If this is the default locale
   */
  default: boolean
  /**
   * If the locale needs to be filled in on entries or not
   */
  optional: boolean
}

export type CreateLocaleProps = Omit<
  SetOptional<
    Except<LocaleProps, 'sys'>,
    'optional' | 'contentManagementApi' | 'default' | 'contentDeliveryApi'
  >,
  'internal_code'
>

export interface Locale extends LocaleProps, DefaultElements<LocaleProps> {
  /**
   * Deletes this object on the server.
   * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment_id>'))
   * .then((environment) => environment.getLocale('<locale_id>'))
   * .then((locale) => locale.delete())
   * .then(() => console.log(`locale deleted.`))
   * .catch(console.error)
   * ```
   */
  delete(): Promise<void>
  /**
   * Sends an update to the server with any changes made to the object's properties
   * @return Object returned from the server with updated changes.
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment_id>'))
   * .then((environment) => environment.getLocale('<locale_id>'))
   * .then((locale) => {
   *   locale.name = 'New locale name'
   *   return locale.update()
   * })
   * .then((locale) => console.log(`locale ${locale.sys.id} updated.`))
   * .catch(console.error)
   * ```
   */
  update(): Promise<Locale>
}

/**
 * @private
 */
function createLocaleApi(makeRequest: MakeRequest) {
  const getParams = (locale: LocaleProps) => ({
    spaceId: locale.sys.space.sys.id,
    environmentId: locale.sys.environment.sys.id,
    localeId: locale.sys.id,
  })

  return {
    update: function () {
      const raw = this.toPlainObject() as LocaleProps
      return makeRequest({
        entityType: 'Locale',
        action: 'update',
        params: getParams(raw),
        payload: raw,
      }).then((data) => wrapLocale(makeRequest, data))
    },

    delete: function () {
      const raw = this.toPlainObject() as LocaleProps
      return makeRequest({
        entityType: 'Locale',
        action: 'delete',
        params: getParams(raw),
      }).then(() => {
        // noop
      })
    },
  }
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw locale data
 * @return Wrapped locale data
 */
export function wrapLocale(makeRequest: MakeRequest, data: LocaleProps): Locale {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  delete data.internal_code
  const locale = toPlainObject(copy(data))
  const localeWithMethods = enhanceWithMethods(locale, createLocaleApi(makeRequest))
  return freezeSys(localeWithMethods)
}

/**
 * @private
 */
export const wrapLocaleCollection = wrapCollection(wrapLocale)
