import type { RawAxiosRequestHeaders } from 'axios'
import type {
  OpPatch,
  CollectionProp,
  CursorBasedParams,
  CursorPaginatedCollectionProp,
  GetSpaceEnvironmentParams,
  KeyValueMap,
  QueryParams,
} from '../../common-types'
import type { CreateEntryProps, EntryProps, EntryReferenceProps } from '../../entities/entry'
import type { OptionalDefaults } from '../wrappers/wrap'

export type EntryPlainClientAPI = {
  /**
   * Fetch a collection of published entries, using offset/limit pagination.
   * Use {@link getPublishedWithCursor} when you need cursor-based pagination over large result sets.
   * @param params the space and environment IDs, along with optional query parameters to filter results
   * @returns a collection of published entries
   * @throws if the space or environment are not found
   * @example
   * ```javascript
   * const entries = await client.entry.getPublished({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   query: { content_type: '<content_type_id>' },
   * })
   * ```
   */
  getPublished<T extends KeyValueMap = KeyValueMap>(
    params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>,
    rawData?: unknown,
    headers?: RawAxiosRequestHeaders,
  ): Promise<CollectionProp<EntryProps<T>>>
  /**
   * Fetch a collection of published entries, using cursor-based pagination.
   * Prefer this over {@link getPublished} when iterating through large result sets,
   * as cursor pagination is more stable under concurrent writes.
   * @param params the space and environment IDs, along with cursor-based pagination parameters
   * @returns a cursor-paginated collection of published entries
   * @throws if the space or environment are not found
   * @example
   * ```javascript
   * const entries = await client.entry.getPublishedWithCursor({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   * })
   * ```
   */
  getPublishedWithCursor<T extends KeyValueMap = KeyValueMap>(
    params: OptionalDefaults<GetSpaceEnvironmentParams & CursorBasedParams>,
    rawData?: unknown,
    headers?: RawAxiosRequestHeaders,
  ): Promise<CursorPaginatedCollectionProp<EntryProps<T>>>
  /**
   * Fetch a collection of entries (published and unpublished), using offset/limit pagination.
   * Use {@link getManyWithCursor} when you need cursor-based pagination over large result sets.
   * @param params the space and environment IDs, an optional release ID, and optional query parameters
   * @returns a collection of entries
   * @throws if the space or environment are not found
   * @example
   * ```javascript
   * const entries = await client.entry.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   query: { content_type: '<content_type_id>', limit: 100 },
   * })
   * ```
   */
  getMany<T extends KeyValueMap = KeyValueMap>(
    params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams & { releaseId?: string }>,
    rawData?: unknown,
    headers?: RawAxiosRequestHeaders,
  ): Promise<CollectionProp<EntryProps<T>>>
  /**
   * Fetch a collection of entries (published and unpublished), using cursor-based pagination.
   * Prefer this over {@link getMany} when iterating through large result sets,
   * as cursor pagination is more stable under concurrent writes.
   * @param params the space and environment IDs, an optional release ID, and cursor-based pagination parameters
   * @returns a cursor-paginated collection of entries
   * @throws if the space or environment are not found
   * @example
   * ```javascript
   * const entries = await client.entry.getManyWithCursor({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   * })
   * ```
   */
  getManyWithCursor<T extends KeyValueMap = KeyValueMap>(
    params: OptionalDefaults<
      GetSpaceEnvironmentParams & CursorBasedParams & { releaseId?: string }
    >,
    rawData?: unknown,
    headers?: RawAxiosRequestHeaders,
  ): Promise<CursorPaginatedCollectionProp<EntryProps<T>>>
  /**
   * Fetch a single entry by ID
   * @param params the entry ID, space and environment IDs, and an optional release ID
   * @returns the entry
   * @throws if the space, environment, or entry are not found
   * @example
   * ```javascript
   * const entry = await client.entry.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   entryId: '<entry_id>',
   * })
   * ```
   */
  get<T extends KeyValueMap = KeyValueMap>(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string; releaseId?: string }>,
    rawData?: unknown,
    headers?: RawAxiosRequestHeaders,
  ): Promise<EntryProps<T>>
  /**
   * Update an entry by replacing its full field set.
   * Requires the entry's current `sys.version` in `rawData` for optimistic concurrency.
   * Use {@link patch} if you only need to change specific fields.
   * @param params the entry ID, space and environment IDs, and an optional release ID
   * @param rawData the complete updated entry data including the current `sys.version`
   * @returns the updated entry
   * @throws if the space, environment, or entry are not found, the version is stale, or `rawData` is invalid
   * @example
   * ```javascript
   * let entry = await client.entry.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   entryId: '<entry_id>',
   * })
   *
   * entry = await client.entry.update(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     entryId: '<entry_id>',
   *   },
   *   {
   *     ...entry,
   *     fields: { title: { 'en-US': 'Updated title' } },
   *   }
   * )
   * ```
   */
  update<T extends KeyValueMap = KeyValueMap>(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string; releaseId?: string }>,
    rawData: EntryProps<T>,
    headers?: RawAxiosRequestHeaders,
  ): Promise<EntryProps<T>>
  /**
   * Apply a JSON Patch document to an entry, updating only the specified fields.
   * Requires the target version via `params.version` for optimistic concurrency.
   * Use {@link update} to replace the full entry payload instead.
   * @param params the entry ID, space and environment IDs, the target `version`, and an optional release ID
   * @param rawData an array of JSON Patch operations (RFC 6902)
   * @returns the patched entry
   * @throws if the space, environment, or entry are not found, the version is stale, or the patch is invalid
   * @example
   * ```javascript
   * const entry = await client.entry.patch(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     entryId: '<entry_id>',
   *     version: 1,
   *   },
   *   [{ op: 'replace', path: '/fields/title/en-US', value: 'Patched title' }]
   * )
   * ```
   */
  patch<T extends KeyValueMap = KeyValueMap>(
    params: OptionalDefaults<
      GetSpaceEnvironmentParams & { entryId: string; version: number; releaseId?: string }
    >,
    rawData: OpPatch[],
    headers?: RawAxiosRequestHeaders,
  ): Promise<EntryProps<T>>
  /**
   * Delete an entry
   * @param params the entry ID, space and environment IDs
   * @throws if the space, environment, or entry are not found
   * @example
   * ```javascript
   * await client.entry.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   entryId: '<entry_id>',
   * })
   * ```
   */
  delete(params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string }>): Promise<any>
  /**
   * Publish an entry, making it available via the Content Delivery API.
   * Optionally scope publishing to specific locales.
   * @param params the entry ID, space and environment IDs, and optional locales to publish
   * @param rawData the current entry data (used for version validation)
   * @returns the published entry
   * @throws if the space, environment, or entry are not found, or validation fails
   * @example
   * ```javascript
   * const entry = await client.entry.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   entryId: '<entry_id>',
   * })
   *
   * const published = await client.entry.publish(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     entryId: '<entry_id>',
   *   },
   *   entry
   * )
   * ```
   */
  publish<T extends KeyValueMap = KeyValueMap>(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string; locales?: string[] }>,
    rawData: EntryProps<T>,
  ): Promise<EntryProps<T>>
  /**
   * Unpublish an entry, removing it from the Content Delivery API.
   * Optionally scope unpublishing to specific locales.
   * @param params the entry ID, space and environment IDs, and optional locales to unpublish
   * @param rawData optional current entry data
   * @returns the unpublished entry
   * @throws if the space, environment, or entry are not found
   * @example
   * ```javascript
   * const entry = await client.entry.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   entryId: '<entry_id>',
   * })
   *
   * const unpublished = await client.entry.unpublish(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     entryId: '<entry_id>',
   *   },
   *   entry
   * )
   * ```
   */
  unpublish<T extends KeyValueMap = KeyValueMap>(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string; locales?: string[] }>,
    rawData?: EntryProps<T>,
  ): Promise<EntryProps<T>>
  /**
   * Archive an entry, hiding it from normal queries without deleting it
   * @param params the entry ID, space and environment IDs
   * @returns the archived entry
   * @throws if the space, environment, or entry are not found
   * @example
   * ```javascript
   * const entry = await client.entry.archive({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   entryId: '<entry_id>',
   * })
   * ```
   */
  archive<T extends KeyValueMap = KeyValueMap>(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string }>,
  ): Promise<EntryProps<T>>
  /**
   * Unarchive an entry, restoring it to normal draft status
   * @param params the entry ID, space and environment IDs
   * @returns the unarchived entry
   * @throws if the space, environment, or entry are not found
   * @example
   * ```javascript
   * const entry = await client.entry.unarchive({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   entryId: '<entry_id>',
   * })
   * ```
   */
  unarchive<T extends KeyValueMap = KeyValueMap>(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string }>,
  ): Promise<EntryProps<T>>
  /**
   * Create a new entry with a system-generated ID
   * @param params the space and environment IDs, the content type ID, and an optional release ID
   * @param rawData the entry fields
   * @returns the created entry
   * @throws if the space or environment are not found, or `rawData` is invalid
   * @example
   * ```javascript
   * const entry = await client.entry.create(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     contentTypeId: '<content_type_id>',
   *   },
   *   {
   *     fields: { title: { 'en-US': 'Hello World' } },
   *   }
   * )
   * ```
   */
  create<T extends KeyValueMap = KeyValueMap>(
    params: OptionalDefaults<
      GetSpaceEnvironmentParams & { contentTypeId: string; releaseId?: string }
    >,
    rawData: CreateEntryProps<T>,
  ): Promise<EntryProps<T>>
  /**
   * Create a new entry with a specific user-supplied ID
   * @param params the space and environment IDs, the desired entry ID, the content type ID, and an optional release ID
   * @param rawData the entry fields
   * @returns the created entry
   * @throws if the space or environment are not found, an entry with that ID already exists, or `rawData` is invalid
   * @example
   * ```javascript
   * const entry = await client.entry.createWithId(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     entryId: '<entry_id>',
   *     contentTypeId: '<content_type_id>',
   *   },
   *   {
   *     fields: { title: { 'en-US': 'Hello World' } },
   *   }
   * )
   * ```
   */
  createWithId<T extends KeyValueMap = KeyValueMap>(
    params: OptionalDefaults<
      GetSpaceEnvironmentParams & { entryId: string; contentTypeId: string; releaseId?: string }
    >,
    rawData: CreateEntryProps<T>,
  ): Promise<EntryProps<T>>
  /**
   * Fetch an entry together with all entries it links to, up to the specified depth.
   * Returns a flat collection of the entry and its resolved references rather than a nested tree.
   * @param params the entry ID, space and environment IDs, and optional `include` depth (1–10, default 1)
   * @returns a collection containing the requested entry and its linked entries
   * @throws if the space, environment, or entry are not found
   * @example
   * ```javascript
   * const tree = await client.entry.references({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   entryId: '<entry_id>',
   *   include: 5,
   * })
   * ```
   */
  references(
    params: OptionalDefaults<
      GetSpaceEnvironmentParams & {
        entryId: string
        include?: number
      }
    >,
  ): Promise<EntryReferenceProps>
}
