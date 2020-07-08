/* eslint-disable @typescript-eslint/ban-ts-ignore */

import cloneDeep from 'lodash/cloneDeep'
import { AxiosInstance } from 'axios'
import { toPlainObject } from 'contentful-sdk-core'
import { CollectionProp, Collection } from './common-types'

export const wrapCollection = <R, T>(fn: (http: AxiosInstance, entity: T) => R) => (
  http: AxiosInstance,
  data: CollectionProp<T>
): Collection<R, T> => {
  const collectionData = toPlainObject(cloneDeep(data))
  // @ts-ignore
  collectionData.items = collectionData.items.map((entity) => fn(http, entity))
  // @ts-ignore
  return collectionData
}

export const VersionHeader = (version?: number) => ({
  headers: {
    'X-Contentful-Version': Number.isInteger(version) ? version : 0,
  },
})
