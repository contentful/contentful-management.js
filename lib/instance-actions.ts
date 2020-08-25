import cloneDeep from 'lodash/cloneDeep'
import { AxiosInstance } from 'axios'
import type { MetaSysProps, DefaultElements } from './common-types'

import errorHandler from './error-handler'
import * as checks from './plain/checks'

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

/**
 * @private
 */
export function createPublishEntity<T>({
  http,
  entityPath,
  wrapperMethod,
}: {
  http: AxiosInstance
  entityPath: string
  wrapperMethod: WrapperMethod<T>
}) {
  return function () {
    const self = this as ThisContext
    return http
      .put<T>(entityPath + '/' + self.sys.id + '/published', null, {
        headers: {
          'X-Contentful-Version': self.sys.version,
        },
      })
      .then((response) => wrapperMethod(http, response.data), errorHandler)
  }
}

/**
 * @private
 */
export function createUnpublishEntity<T>({
  http,
  entityPath,
  wrapperMethod,
}: {
  http: AxiosInstance
  entityPath: string
  wrapperMethod: WrapperMethod<T>
}) {
  return function () {
    const self = this as ThisContext
    return http
      .delete<T>(entityPath + '/' + self.sys.id + '/published')
      .then((response) => wrapperMethod(http, response.data), errorHandler)
  }
}

/**
 * @private
 */
export function createArchiveEntity<T>({
  http,
  entityPath,
  wrapperMethod,
}: {
  http: AxiosInstance
  entityPath: string
  wrapperMethod: WrapperMethod<T>
}) {
  return function () {
    const self = this as ThisContext
    return http
      .put<T>(entityPath + '/' + self.sys.id + '/archived')
      .then((response) => wrapperMethod(http, response.data), errorHandler)
  }
}

/**
 * @private
 */
export function createUnarchiveEntity<T>({
  http,
  entityPath,
  wrapperMethod,
}: {
  http: AxiosInstance
  entityPath: string
  wrapperMethod: WrapperMethod<T>
}) {
  return function () {
    const self = this
    return http
      .delete<T>(entityPath + '/' + self.sys.id + '/archived')
      .then((response) => wrapperMethod(http, response.data), errorHandler)
  }
}

/**
 * @private
 */
export function createPublishedChecker() {
  return function () {
    const self = this as ThisContext
    return checks.isPublished({ sys: self.sys })
  }
}

/**
 * @private
 */
export function createUpdatedChecker() {
  return function () {
    const self = this as ThisContext
    return checks.isUpdated({ sys: self.sys })
  }
}

/**
 * @private
 */
export function createDraftChecker() {
  return function () {
    const self = this as ThisContext
    return checks.isDraft({ sys: self.sys })
  }
}

/**
 * @private
 */
export function createArchivedChecker() {
  return function () {
    const self = this as ThisContext
    return checks.isArchived({ sys: self.sys })
  }
}
