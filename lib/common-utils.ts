/* eslint-disable @typescript-eslint/ban-ts-comment */

import { toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
  CursorPaginatedCollection,
  CursorPaginatedCollectionProp,
  MakeRequest,
  OptionalCursorApi,
  WrappedCollection,
} from './common-types'

/**
 * @private
 */
export function withOptionalCursorApi<T, TPlain>(
  fn: OptionalCursorApi<T, TPlain>,
): OptionalCursorApi<T, TPlain> {
  return function (args) {
    return fn.bind(this)(args)
  }
}

/**
 * @private
 */
export const wrapCollection =
  <R, T, Rest extends unknown[]>(
    fn: (makeRequest: MakeRequest, entity: T, ...rest: Rest) => R,
  ): WrappedCollection<R, T, Rest> =>
  (makeRequest, data, ...rest): any => {
    const collectionData = toPlainObject(copy(data))
    // @ts-expect-error
    collectionData.items = collectionData.items.map((entity) => fn(makeRequest, entity, ...rest))
    return collectionData
  }

export const wrapCursorPaginatedCollection =
  <R, T, Rest extends any[]>(fn: (makeRequest: MakeRequest, entity: T, ...rest: Rest) => R) =>
  (
    makeRequest: MakeRequest,
    data: CursorPaginatedCollectionProp<T>,
    ...rest: Rest
  ): CursorPaginatedCollection<R, T> => {
    const collectionData = toPlainObject(copy(data))
    // @ts-expect-error
    collectionData.items = collectionData.items.map((entity) => fn(makeRequest, entity, ...rest))
    // @ts-expect-error
    return collectionData
  }

export function isSuccessful(statusCode: number) {
  return statusCode < 300
}

export function shouldRePoll(statusCode: number) {
  return [404, 422, 429, 400].includes(statusCode)
}

export async function waitFor(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
