import { toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
  Collection,
  CollectionProp,
  CursorPaginatedCollection,
  CursorPaginatedCollectionProp,
  MakeRequest,
} from './common-types'

/**
 * @private
 */
export const wrapCollection =
  <R, T, Rest extends any[]>(fn: (makeRequest: MakeRequest, entity: T, ...rest: Rest) => R) =>
  (makeRequest: MakeRequest, data: CollectionProp<T>, ...rest: Rest): Collection<R, T> => {
    const collectionData = toPlainObject(copy(data))

    return {
      ...collectionData,
      items: collectionData.items.map((entity) => fn(makeRequest, entity, ...rest)),
    }
  }

export const wrapCursorPaginatedCollection =
  <R, T, Rest extends any[]>(fn: (makeRequest: MakeRequest, entity: T, ...rest: Rest) => R) =>
  (
    makeRequest: MakeRequest,
    data: CursorPaginatedCollectionProp<T>,
    ...rest: Rest
  ): CursorPaginatedCollection<R, T> => {
    const collectionData = toPlainObject(copy(data))
    return {
      ...collectionData,
      items: collectionData.items.map((entity) => fn(makeRequest, entity, ...rest)),
    }
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
