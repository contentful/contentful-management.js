/* eslint-disable @typescript-eslint/ban-ts-comment */

import { toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
  Collection,
  CollectionProp,
  CursorPaginatedCollection,
  CursorPaginatedCollectionProp,
  MakeRequest,
  OptionalCursorApi,
} from './common-types'

/**
 * @private
 */
export const wrapCollection =
  <R, T, Rest extends any[]>(fn: (makeRequest: MakeRequest, entity: T, ...rest: Rest) => R) =>
  (makeRequest: MakeRequest, data: CollectionProp<T>, ...rest: Rest): Collection<R, T> => {
    const collectionData = toPlainObject(copy(data))
    // @ts-expect-error
    collectionData.items = collectionData.items.map((entity) => fn(makeRequest, entity, ...rest))
    // @ts-expect-error
    return collectionData
  }

/**
 * @private
 * Function for endpoints allowing `?cursor=true` wrapping the call
 * to ensure the correct return type for cursor based pagination
 * when `cursor: true`.
 */
export const withOptionalCursorApi = <P, T, TPlain>(
  fn: (query?: P) => Promise<Collection<T, TPlain> | CursorPaginatedCollection<T, TPlain>>,
): OptionalCursorApi<P, T, TPlain> => {
  return function (this: unknown, args?: P) {
    return fn.call(this, args)
  } as OptionalCursorApi<P, T, TPlain>
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
