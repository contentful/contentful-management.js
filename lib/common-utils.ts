/* eslint-disable @typescript-eslint/ban-ts-ignore */

import { toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  Collection,
  CollectionProp,
  CursorCollectionProp,
  CursorCollection,
  MakeRequest,
} from './common-types'

export const wrapCollection =
  <R, T, Rest extends any[]>(fn: (makeRequest: MakeRequest, entity: T, ...rest: Rest) => R) =>
  (makeRequest: MakeRequest, data: CollectionProp<T>, ...rest: Rest): Collection<R, T> => {
    const collectionData = toPlainObject(copy(data))
    // @ts-expect-error
    collectionData.items = collectionData.items.map((entity) => fn(makeRequest, entity, ...rest))
    // @ts-expect-error
    return collectionData
  }

export const wrapCursorPaginatedCollection =
  <R, T, Rest extends any[]>(fn: (makeRequest: MakeRequest, entity: T, ...rest: Rest) => R) =>
  (
    makeRequest: MakeRequest,
    data: CursorCollectionProp<T>,
    ...rest: Rest
  ): CursorCollection<R, T> => {
    const collectionData = toPlainObject(copy(data))
    // @ts-expect-error
    collectionData.items = collectionData.items.map((entity) => fn(makeRequest, entity, ...rest))
    // @ts-expect-error
    return collectionData
  }
