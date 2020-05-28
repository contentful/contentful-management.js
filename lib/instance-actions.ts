import cloneDeep from 'lodash/cloneDeep'
import { AxiosInstance } from 'axios'
import type { MetaSysProps, DefaultElements } from './types/common-types'

import errorHandler from './error-handler'

type ThisContext = { sys: MetaSysProps } & DefaultElements<{ sys: MetaSysProps }>

/**
 * @private
 */
export function createUpdateEntity<T = unknown>({
  http,
  entityPath,
  wrapperMethod,
  headers,
}: {
  http: AxiosInstance
  entityPath: string
  wrapperMethod: Function
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
export function createPublishEntity<T = unknown>({
  http,
  entityPath,
  wrapperMethod,
}: {
  http: AxiosInstance
  entityPath: string
  wrapperMethod: Function
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
export function createUnpublishEntity<T = unknown>({
  http,
  entityPath,
  wrapperMethod,
}: {
  http: AxiosInstance
  entityPath: string
  wrapperMethod: Function
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
export function createArchiveEntity<T = unknown>({
  http,
  entityPath,
  wrapperMethod,
}: {
  http: AxiosInstance
  entityPath: string
  wrapperMethod: Function
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
export function createUnarchiveEntity<T = unknown>({
  http,
  entityPath,
  wrapperMethod,
}: {
  http: AxiosInstance
  entityPath: string
  wrapperMethod: Function
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
    return !!self.sys.publishedVersion
  }
}

/**
 * @private
 */
export function createUpdatedChecker() {
  return function () {
    const self = this as ThisContext
    // The act of publishing an entity increases its version by 1, so any entry which has
    // 2 versions higher or more than the publishedVersion has unpublished changes.
    return !!(self.sys.publishedVersion && self.sys.version > self.sys.publishedVersion + 1)
  }
}

/**
 * @private
 */
export function createDraftChecker() {
  return function () {
    const self = this as ThisContext
    return !self.sys.publishedVersion
  }
}

/**
 * @private
 */
export function createArchivedChecker() {
  return function () {
    const self = this as ThisContext
    return !!self.sys.archivedVersion
  }
}
