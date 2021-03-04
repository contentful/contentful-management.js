/* eslint-disable @typescript-eslint/ban-ts-ignore */

import { toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { Collection, CollectionProp, MakeRequestWithoutUserAgent } from './common-types'

export const wrapCollection = <R, T, Rest extends any[]>(
  fn: (makeRequest: MakeRequestWithoutUserAgent, entity: T, ...rest: Rest) => R
) => (
  makeRequest: MakeRequestWithoutUserAgent,
  data: CollectionProp<T>,
  ...rest: Rest
): Collection<R, T> => {
  const collectionData = toPlainObject(copy(data))
  return {
    ...collectionData,
    items: collectionData.items.map((entity) => fn(makeRequest, entity, ...rest)),
  }
}
