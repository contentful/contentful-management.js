import { isNil, isObject, omitBy } from 'lodash'

export type LocalizedEntity<
  Entity,
  LocalizedFields extends keyof Entity,
  Locales extends string
> = {
  [K in keyof Entity]: K extends LocalizedFields ? { [Locale in Locales]: Entity[K] } : Entity[K]
}

export function toUrlParams(params: Record<string, string | number> | undefined = {}) {
  const urlQuery = new URLSearchParams()

  Object.entries(sanitizeParams(params)).forEach(([key, value]) => {
    urlQuery.set(key, `${value}`)
  })

  const result = urlQuery.toString()
  return result ? `?${result}` : ''
}

/*
 * @desc recursively removes nullable values from an object
 */
export function sanitizeParams<T extends Record<string, string | number>>(params: T): Partial<T> {
  for (const key in params) {
    if (isObject(params[key])) {
      // @ts-expect-error ts(2322) TS is not happy with `any` value type
      params[key] = sanitizeParams(params[key])
    }
  }
  return omitBy(params, isNil) as T
}
