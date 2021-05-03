import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  DefaultElements,
  EntityMetaSysProps,
  KeyValueMap,
  MakeRequest,
  MetadataProps,
} from '../common-types'
import { wrapCollection } from '../common-utils'
import createEntryApi, { ContentfulEntryApi } from '../create-entry-api'
import enhanceWithMethods from '../enhance-with-methods'

export type EntryProps<T = KeyValueMap> = {
  sys: EntityMetaSysProps
  metadata?: MetadataProps

  fields: T
}

export type CreateEntryProps<TFields = KeyValueMap> = Omit<EntryProps<TFields>, 'sys'>

export interface Entry extends EntryProps, DefaultElements<EntryProps>, ContentfulEntryApi {}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw entry data
 * @return Wrapped entry data
 */
export function wrapEntry(makeRequest: MakeRequest, data: EntryProps): Entry {
  const entry = toPlainObject(copy(data))
  const entryWithMethods = enhanceWithMethods(entry, createEntryApi(makeRequest))
  return freezeSys(entryWithMethods)
}

/**
 * Data is also mixed in with link getters if links exist and includes were requested
 * @private
 */
export const wrapEntryCollection = wrapCollection(wrapEntry)
