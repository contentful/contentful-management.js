/**
 * @module asset
 * @category Plain Client
 */
import type { RawAxiosRequestHeaders } from 'axios'
import type {
  CollectionProp,
  CursorBasedParams,
  CursorPaginatedCollectionProp,
  GetSpaceEnvironmentParams,
  QueryParams,
} from '../../common-types'
import type {
  AssetFileProp,
  AssetProcessingForLocale,
  AssetProps,
  CreateAssetProps,
} from '../../entities/asset'
import type { OptionalDefaults } from '../wrappers/wrap'

export type AssetAPI = {
  /**
   * Fetch a collection of published assets, using offset/limit pagination.
   * Use {@link getPublishedWithCursor} when you need cursor-based pagination over large result sets.
   * @param params the space and environment IDs, along with optional query parameters to filter results
   * @returns a collection of published assets
   * @throws if the space or environment are not found
   * @example
   * ```javascript
   * const assets = await client.asset.getPublished({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   * })
   * ```
   */
  getPublished(
    params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>,
    rawData?: unknown,
    headers?: RawAxiosRequestHeaders,
  ): Promise<CollectionProp<AssetProps>>
  /**
   * Fetch a collection of published assets, using cursor-based pagination.
   * Prefer this over {@link getPublished} when iterating through large result sets,
   * as cursor pagination is more stable under concurrent writes.
   * @param params the space and environment IDs, along with cursor-based pagination parameters
   * @returns a cursor-paginated collection of published assets
   * @throws if the space or environment are not found
   * @example
   * ```javascript
   * const assets = await client.asset.getPublishedWithCursor({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   * })
   * ```
   */
  getPublishedWithCursor(
    params: OptionalDefaults<GetSpaceEnvironmentParams & CursorBasedParams>,
    rawData?: unknown,
    headers?: RawAxiosRequestHeaders,
  ): Promise<CursorPaginatedCollectionProp<AssetProps>>
  /**
   * Fetch a collection of assets (published and unpublished), using offset/limit pagination.
   * Use {@link getManyWithCursor} when you need cursor-based pagination over large result sets.
   * @param params the space and environment IDs, an optional release ID, and optional query parameters
   * @returns a collection of assets
   * @throws if the space or environment are not found
   * @example
   * ```javascript
   * const assets = await client.asset.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   query: { limit: 100 },
   * })
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams & { releaseId?: string }>,
    rawData?: unknown,
    headers?: RawAxiosRequestHeaders,
  ): Promise<CollectionProp<AssetProps>>
  /**
   * Fetch a collection of assets (published and unpublished), using cursor-based pagination.
   * Prefer this over {@link getMany} when iterating through large result sets,
   * as cursor pagination is more stable under concurrent writes.
   * @param params the space and environment IDs, an optional release ID, and cursor-based pagination parameters
   * @returns a cursor-paginated collection of assets
   * @throws if the space or environment are not found
   * @example
   * ```javascript
   * const assets = await client.asset.getManyWithCursor({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   * })
   * ```
   */
  getManyWithCursor(
    params: OptionalDefaults<
      GetSpaceEnvironmentParams & CursorBasedParams & { releaseId?: string }
    >,
    rawData?: unknown,
    headers?: RawAxiosRequestHeaders,
  ): Promise<CursorPaginatedCollectionProp<AssetProps>>
  /**
   * Fetch a single asset by ID
   * @param params the asset ID, space and environment IDs, an optional release ID, and optional query parameters
   * @returns the asset
   * @throws if the space, environment, or asset are not found
   * @example
   * ```javascript
   * const asset = await client.asset.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   assetId: '<asset_id>',
   * })
   * ```
   */
  get(
    params: OptionalDefaults<
      GetSpaceEnvironmentParams & { assetId: string; releaseId?: string } & QueryParams
    >,
    rawData?: unknown,
    headers?: RawAxiosRequestHeaders,
  ): Promise<AssetProps>
  /**
   * Update an asset by replacing its full field set.
   * Requires the asset's current `sys.version` in `rawData` for optimistic concurrency.
   * @param params the asset ID, space and environment IDs, and an optional release ID
   * @param rawData the complete updated asset data including the current `sys.version`
   * @returns the updated asset
   * @throws if the space, environment, or asset are not found, the version is stale, or `rawData` is invalid
   * @example
   * ```javascript
   * let asset = await client.asset.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   assetId: '<asset_id>',
   * })
   *
   * asset = await client.asset.update(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     assetId: '<asset_id>',
   *   },
   *   {
   *     ...asset,
   *     fields: { title: { 'en-US': 'Updated title' } },
   *   }
   * )
   * ```
   */
  update(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string; releaseId?: string }>,
    rawData: AssetProps,
    headers?: RawAxiosRequestHeaders,
  ): Promise<AssetProps>
  /**
   * Delete an asset
   * @param params the asset ID, space and environment IDs
   * @throws if the space, environment, or asset are not found
   * @example
   * ```javascript
   * await client.asset.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   assetId: '<asset_id>',
   * })
   * ```
   */
  delete(params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string }>): Promise<any>
  /**
   * Publish an asset, making it available via the Content Delivery API.
   * Optionally scope publishing to specific locales.
   * @param params the asset ID, space and environment IDs, and optional locales to publish
   * @param rawData the current asset data (used for version validation)
   * @returns the published asset
   * @throws if the space, environment, or asset are not found, or the asset has unprocessed files
   * @example
   * ```javascript
   * const asset = await client.asset.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   assetId: '<asset_id>',
   * })
   *
   * const published = await client.asset.publish(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     assetId: '<asset_id>',
   *   },
   *   asset
   * )
   * ```
   */
  publish(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string; locales?: string[] }>,
    rawData: AssetProps,
  ): Promise<AssetProps>
  /**
   * Unpublish an asset, removing it from the Content Delivery API.
   * Optionally scope unpublishing to specific locales.
   * @param params the asset ID, space and environment IDs, and optional locales to unpublish
   * @param rawData optional current asset data
   * @returns the unpublished asset
   * @throws if the space, environment, or asset are not found
   * @example
   * ```javascript
   * const asset = await client.asset.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   assetId: '<asset_id>',
   * })
   *
   * const unpublished = await client.asset.unpublish(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     assetId: '<asset_id>',
   *   },
   *   asset
   * )
   * ```
   */
  unpublish(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string; locales?: string[] }>,
    rawData?: AssetProps,
  ): Promise<AssetProps>
  /**
   * Archive an asset, hiding it from normal queries without deleting it
   * @param params the asset ID, space and environment IDs
   * @returns the archived asset
   * @throws if the space, environment, or asset are not found
   * @example
   * ```javascript
   * const asset = await client.asset.archive({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   assetId: '<asset_id>',
   * })
   * ```
   */
  archive(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string }>,
  ): Promise<AssetProps>
  /**
   * Unarchive an asset, restoring it to normal draft status
   * @param params the asset ID, space and environment IDs
   * @returns the unarchived asset
   * @throws if the space, environment, or asset are not found
   * @example
   * ```javascript
   * const asset = await client.asset.unarchive({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   assetId: '<asset_id>',
   * })
   * ```
   */
  unarchive(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string }>,
  ): Promise<AssetProps>
  /**
   * Create a new asset with a system-generated ID
   * @param params the space and environment IDs and an optional release ID
   * @param rawData the asset fields (title, description, and file metadata — no binary upload)
   * @returns the created asset
   * @throws if the space or environment are not found, or `rawData` is invalid
   * @example
   * ```javascript
   * const asset = await client.asset.create(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *   },
   *   {
   *     fields: {
   *       title: { 'en-US': 'My image' },
   *       file: {
   *         'en-US': {
   *           contentType: 'image/png',
   *           fileName: 'image.png',
   *           upload: 'https://example.com/image.png',
   *         },
   *       },
   *     },
   *   }
   * )
   * ```
   */
  create(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { releaseId?: string }>,
    rawData: CreateAssetProps,
  ): Promise<AssetProps>
  /**
   * Create a new asset with a specific user-supplied ID
   * @param params the space and environment IDs, the desired asset ID, and an optional release ID
   * @param rawData the asset fields
   * @returns the created asset
   * @throws if the space or environment are not found, an asset with that ID already exists, or `rawData` is invalid
   * @example
   * ```javascript
   * const asset = await client.asset.createWithId(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     assetId: '<asset_id>',
   *   },
   *   {
   *     fields: {
   *       title: { 'en-US': 'My image' },
   *       file: {
   *         'en-US': {
   *           contentType: 'image/png',
   *           fileName: 'image.png',
   *           upload: 'https://example.com/image.png',
   *         },
   *       },
   *     },
   *   }
   * )
   * ```
   */
  createWithId(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string; releaseId?: string }>,
    rawData: CreateAssetProps,
  ): Promise<AssetProps>
  /**
   * Create a new asset by uploading binary file data directly.
   * Handles the upload and asset record creation in a single call.
   * @param params the space and environment IDs and an optional release ID
   * @param data the asset file payload (without `sys`)
   * @returns the created asset
   * @throws if the space or environment are not found, or the file data is invalid
   * @example
   * ```javascript
   * const asset = await client.asset.createFromFiles(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *   },
   *   {
   *     fields: {
   *       title: { 'en-US': 'My image' },
   *       file: {
   *         'en-US': {
   *           contentType: 'image/png',
   *           fileName: 'image.png',
   *           file: '<binary data>',
   *         },
   *       },
   *     },
   *   }
   * )
   * ```
   */
  createFromFiles(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { releaseId?: string }>,
    data: Omit<AssetFileProp, 'sys'>,
  ): Promise<AssetProps>
  /**
   * Trigger Contentful's processing pipeline for all locales of an asset.
   * Must be called after creating or updating an asset's file before publishing.
   * @param params the space and environment IDs and an optional release ID
   * @param asset the asset to process
   * @param processingOptions optional processing configuration (e.g. image transformation)
   * @returns the asset after processing completes
   * @throws if the space, environment, or asset are not found, or processing fails
   * @example
   * ```javascript
   * const processed = await client.asset.processForAllLocales(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *   },
   *   asset
   * )
   * ```
   */
  processForAllLocales(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { releaseId?: string }>,
    asset: AssetProps,
    processingOptions?: AssetProcessingForLocale,
  ): Promise<AssetProps>
  /**
   * Trigger Contentful's processing pipeline for a single locale of an asset.
   * Use this when you only need to process one locale's file rather than all locales.
   * @param params the space and environment IDs and an optional release ID
   * @param asset the asset to process
   * @param locale the locale code to process (e.g. `'en-US'`)
   * @param processingOptions optional processing configuration (e.g. image transformation)
   * @returns the asset after processing completes for the given locale
   * @throws if the space, environment, asset, or locale are not found, or processing fails
   * @example
   * ```javascript
   * const processed = await client.asset.processForLocale(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *   },
   *   asset,
   *   'en-US'
   * )
   * ```
   */
  processForLocale(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { releaseId?: string }>,
    asset: AssetProps,
    locale: string,
    processingOptions?: AssetProcessingForLocale,
  ): Promise<AssetProps>
}
