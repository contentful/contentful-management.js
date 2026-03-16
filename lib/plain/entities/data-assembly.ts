import type {
  CursorPaginatedCollectionProp,
  GetDataAssemblyParams,
  GetSpaceEnvironmentParams,
} from '../../common-types'
import type { DataAssemblyProps, DataAssemblyQueryOptions } from '../../entities/data-assembly'
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
}
