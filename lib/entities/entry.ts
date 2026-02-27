/**
 * @module
 * @category Entities
 */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
  CollectionProp,
  CursorPaginatedCollectionProp,
  DefaultElements,
  EntryMetaSysProps,
  KeyValueMap,
  MakeRequest,
  MetadataProps,
} from '../common-types'
import { wrapCollection, wrapCursorPaginatedCollection } from '../common-utils'
import type { ContentfulEntryAPI } from '../create-entry-api'
import createEntryApi from '../create-entry-api'
import enhanceWithMethods from '../enhance-with-methods'
import type { AssetProps } from './asset'

/** Properties of a Contentful entry containing localized field data */
export type EntryProps<T = KeyValueMap, S = unknown> = {
  sys: EntryMetaSysProps & S
  metadata?: MetadataProps
  fields: T
}

/** Properties required to create a new entry */
export type CreateEntryProps<TFields = KeyValueMap> = Omit<EntryProps<TFields>, 'sys'>

/** Error returned when a referenced entry or asset cannot be resolved */
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

/** Collection of entry references with optional included linked entries and assets */
export interface EntryReferenceProps extends CollectionProp<EntryProps> {
  includes?: {
    Entry?: EntryProps[]
    Asset?: AssetProps[]
  }
  errors?: EntryReferenceError[]
}

/** Options for fetching entry references, controlling depth of included links */
export type EntryReferenceOptionsProps = {
  include?: number
}

/** A Contentful entry with methods to update, publish, archive, and delete */
export interface Entry extends EntryProps, DefaultElements<EntryProps>, ContentfulEntryAPI {}

/** Extends an entity type to include a URN identifier in its sys metadata */
export type WithResourceName<T extends { sys: unknown }> = T extends { sys: infer Sys }
  ? Omit<T, 'sys'> & {
      sys: Sys & { urn: string }
    }
  : never

/**
 * @internal
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw entry data
 * @returns Wrapped entry data
 */
export function wrapEntry(makeRequest: MakeRequest, data: EntryProps): Entry {
  const entry = toPlainObject(copy(data))
  const entryWithMethods = enhanceWithMethods(entry, createEntryApi(makeRequest))
  return freezeSys(entryWithMethods)
}

/**
 * Data is also mixed in with link getters if links exist and includes were requested
 * @internal
 */
export const wrapEntryCollection = wrapCollection(wrapEntry)

/**
 * @internal
 */
export const wrapEntryTypeCursorPaginatedCollection = wrapCursorPaginatedCollection(wrapEntry)
