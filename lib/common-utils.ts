/* eslint-disable @typescript-eslint/ban-ts-ignore */

import copy from 'fast-copy'
import type { AxiosInstance } from 'contentful-sdk-core'
import { toPlainObject } from 'contentful-sdk-core'
import { CollectionProp, Collection } from './common-types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const wrapCollection = <R, T, Rest extends any[]>(
  fn: (http: AxiosInstance, entity: T, ...rest: Rest) => R
) => (http: AxiosInstance, data: CollectionProp<T>, ...rest: Rest): Collection<R, T> => {
  const collectionData = toPlainObject(copy(data))
  // @ts-ignore
  collectionData.items = collectionData.items.map((entity) => fn(http, entity, ...rest))
  // @ts-ignore
  return collectionData
}
