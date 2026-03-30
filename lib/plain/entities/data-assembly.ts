import type { RawAxiosRequestHeaders } from 'axios'
import type {
  CursorPaginatedCollectionProp,
  GetDataAssemblyParams,
  GetSpaceEnvironmentParams,
} from '../../common-types'
import type {
  CreateDataAssemblyProps,
  DataAssemblyProps,
  DataAssemblyQueryOptions,
  UpdateDataAssemblyProps,
} from '../../entities/data-assembly'
import type { OptionalDefaults } from '../wrappers/wrap'

export type DataAssemblyPlainClientAPI = {
  /**
   * Fetches all data assemblies for a space and environment
   * @param params the space, environment IDs and query options (see {@link DataAssemblyQueryOptions})
   * @returns a collection of data assemblies
   * @throws if the request fails, or the space or environment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const dataAssemblies = await client.dataAssembly.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   query: {
   *     limit: 10,
   *   },
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { query: DataAssemblyQueryOptions }>,
  ): Promise<CursorPaginatedCollectionProp<DataAssemblyProps>>

  /**
   * Fetches a single data assembly by ID
   * @param params the space, environment, and data assembly IDs
   * @returns the data assembly
   * @throws if the request fails, or the data assembly is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const dataAssembly = await client.dataAssembly.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   dataAssemblyId: '<data_assembly_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetDataAssemblyParams>): Promise<DataAssemblyProps>

  /**
   * Creates a new data assembly
   * @param params the space and environment IDs
   * @param rawData the data assembly data to create
   * @param headers optional custom headers
   * @returns the created data assembly
   * @throws if the request fails
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const dataAssembly = await client.dataAssembly.create({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   * }, {
   *   sys: { type: 'DataAssembly', dataType: [] },
   *   metadata: { tags: [] },
   *   name: 'My Assembly',
   *   description: 'A data assembly',
   *   parameters: {},
   *   resolvers: {},
   *   return: {},
   * });
   * ```
   */
  create(
    params: OptionalDefaults<GetSpaceEnvironmentParams>,
    rawData: CreateDataAssemblyProps,
    headers?: RawAxiosRequestHeaders,
  ): Promise<DataAssemblyProps>

  /**
   * Updates a data assembly
   * @param params the space, environment, and data assembly IDs
   * @param rawData the data assembly data to update (must include sys.version)
   * @param headers optional custom headers
   * @returns the updated data assembly
   * @throws if the request fails, or the data assembly is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const updated = await client.dataAssembly.update(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     dataAssemblyId: '<data_assembly_id>',
   *   },
   *   { ...dataAssembly, name: 'Updated Name' },
   * );
   * ```
   */
  update(
    params: OptionalDefaults<GetDataAssemblyParams>,
    rawData: UpdateDataAssemblyProps,
    headers?: RawAxiosRequestHeaders,
  ): Promise<DataAssemblyProps>

  /**
   * Deletes a data assembly
   * @param params the space, environment, and data assembly IDs
   * @returns void
   * @throws if the request fails, or the data assembly is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * await client.dataAssembly.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   dataAssemblyId: '<data_assembly_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetDataAssemblyParams>): Promise<void>

  /**
   * Publishes a data assembly
   * @param params the space, environment, and data assembly IDs, and the version number
   * @returns the published data assembly
   * @throws if the request fails, or the data assembly is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const dataAssembly = await client.dataAssembly.publish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   dataAssemblyId: '<data_assembly_id>',
   *   version: 1,
   * });
   * ```
   */
  publish(
    params: OptionalDefaults<GetDataAssemblyParams & { version: number }>,
  ): Promise<DataAssemblyProps>

  /**
   * Unpublishes a data assembly
   * @param params the space, environment, and data assembly IDs, and the version number
   * @returns the unpublished data assembly
   * @throws if the request fails, or the data assembly is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const dataAssembly = await client.dataAssembly.unpublish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   dataAssemblyId: '<data_assembly_id>',
   *   version: 1,
   * });
   * ```
   */
  unpublish(
    params: OptionalDefaults<GetDataAssemblyParams & { version: number }>,
  ): Promise<DataAssemblyProps>
}
