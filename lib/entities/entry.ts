import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
  CollectionProp,
  DefaultElements,
  EntryMetaSysProps,
  KeyValueMap,
  MakeRequest,
  MetadataProps,
} from '../common-types'
import { wrapCollection } from '../common-utils'
import type { ContentfulEntryApi } from '../create-entry-api'
import createEntryApi from '../create-entry-api'
import enhanceWithMethods from '../enhance-with-methods'
import type { AssetProps } from './asset'

export type EntryProps<T = KeyValueMap> = {
  sys: EntryMetaSysProps
  metadata?: MetadataProps
  fields: T
}

export type CreateEntryProps<TFields = KeyValueMap> = Omit<EntryProps<TFields>, 'sys'>

export type EntryReferenceError = {
  sys: {
    type: 'error'
    id: 'notResolvable'
  }
  details: {
    type: 'Link'
    linkType: 'Entry' | 'Asset'
    id: string
  }
}

export interface EntryReferenceProps extends CollectionProp<EntryProps> {
  includes?: {
    Entry?: EntryProps[]
    Asset?: AssetProps[]
  }
  errors?: EntryReferenceError[]
}

export type EntryReferenceOptionsProps = {
  include?: number
}

export interface Entry extends EntryProps, DefaultElements<EntryProps>, ContentfulEntryApi {}

export type WithResourceName<T extends { sys: unknown }> = T extends { sys: infer Sys }
  ? Omit<T, 'sys'> & {
      sys: Sys & { urn: string }
    }
  : never

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
