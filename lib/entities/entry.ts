/**
 * Entry data shapes and legacy wrapper.
 *
 * **Shared (both clients):** `EntryProps`, `CreateEntryProps`, `EntryReferenceProps`
 *
 * **Legacy client only:** `Entry` — extends `EntryProps` with chainable instance
 * methods (`.publish()`, `.archive()`, `.update()`, etc.). Plain client users
 * receive `EntryProps` directly from `client.entry.get()` and never interact
 * with `Entry`.
 * @module
 * @category Shared Types
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

export type EntryProps<T = KeyValueMap, S = unknown> = {
  sys: EntryMetaSysProps & S
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

/**
 * A Contentful entry as returned by the legacy chainable client.
 *
 * Extends {@link EntryProps} with instance methods for lifecycle operations.
 * Use these methods to publish, archive, update, or delete an entry without
 * constructing a full API request manually.
 *
 * **Legacy client only.** If you are using the plain client, you receive
 * {@link EntryProps} directly and call methods via `client.entry.*` instead.
 *
 * @example
 * ```javascript
 * const entry = await environment.getEntry('<entry_id>')
 * await entry.publish()
 * await entry.update()
 * await entry.delete()
 * ```
 */
export interface Entry extends EntryProps, DefaultElements<EntryProps>, ContentfulEntryAPI {}

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
