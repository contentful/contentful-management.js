import cloneDeep from 'lodash/cloneDeep'
import { AxiosInstance } from 'axios'
import type { MetaSysProps, DefaultElements } from './common-types'

import errorHandler from './error-handler'

type ThisContext = { sys: MetaSysProps } & DefaultElements<{ sys: MetaSysProps }>
type WrapperMethod<E, A extends AxiosInstance = AxiosInstance> = (http: A, data: any) => E

/**
 * @private
 */
export function createUpdateEntity<T>({
  http,
  entityPath,
  wrapperMethod,
  headers,
}: {
  http: AxiosInstance
  entityPath: string
  wrapperMethod: WrapperMethod<T>
  headers?: Record<string, unknown>
}): () => Promise<T> {
  return function () {
    const self = this as ThisContext
    const raw = self.toPlainObject()
    const data = cloneDeep(raw)
    delete data.sys
    return http
      .put(entityPath + '/' + self.sys.id, data, {
        headers: {
          'X-Contentful-Version': self.sys.version || 0, // if there is no sys.version, just send 0
          ...headers,
        },
      })
      .then((response) => wrapperMethod(http, response.data), errorHandler)
  }
}

/**
 * @private
 */
export function createDeleteEntity({
  http,
  entityPath,
}: {
  http: AxiosInstance
  entityPath: string
}) {
  return function () {
    const self = this as ThisContext
    return http.delete(entityPath + '/' + self.sys.id).then(() => {
      // do nothing
    }, errorHandler)
  }
}
