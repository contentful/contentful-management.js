import type { RawAxiosRequestHeaders } from 'axios'
import type {
  CollectionProp,
  GetOrganizationParams,
  GetSpaceParams,
  QueryParams,
} from '../../common-types.js'
import type { OptionalDefaults } from '../wrappers/wrap.js'
import type { CreateRoleProps, RoleProps } from '../../entities/role.js'

export type RolePlainClientAPI = {
  /** Fetches a Role
   *
   * @param params Space ID and Role ID
   * @returns the Role
   * @throws if the request fails, or the Role is not found
   * @example
   * ```javascript
   * const role = await client.role.get({
   *   spaceId: '<space_id>',
   *   roleId: '<role_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetSpaceParams & { roleId: string }>): Promise<RoleProps>
  /** Fetches all Roles for the given Space
   *
   * @param params Space ID and optional query parameters
   * @returns All the Roles for the given Space
   * @throws if the request fails, or the Space is not found
   * @example
   * ```javascript
   * const results = await client.role.getMany({
   *   spaceId: '<space_id>',
   *   query: {
   *     limit: 100,
   *   }
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceParams & QueryParams>,
  ): Promise<CollectionProp<RoleProps>>
  /** Fetches all Roles for the given Organization
   *
   * @param params Organization ID and optional query parameters
   * @returns All the Roles for the given Organization
   * @throws if the request fails, or the Organization is not found
   * @example
   * ```javascript
   * const results = await client.role.getManyForOrganization({
   *   organizationId: '<organization_id>',
   *   query: {
   *     limit: 100,
   *   }
   * });
   * ```
   */
  getManyForOrganization(
    params: OptionalDefaults<GetOrganizationParams & QueryParams>,
  ): Promise<CollectionProp<RoleProps>>
  /** Creates a Role
   *
   * @param params Space ID and the Role to create
   * @returns the created Role
   * @throws if the request fails, the Space is not found, or the payload is malformed
   * @example
   * ```javascript
   * const role = await client.role.create(
   *   {
   *      spaceId: '<space_id>',
   *   },
   *   {
   *      name: 'My role',
   *      description: 'My role description',
   *      permissions: {
   *        ContentModel: [
   *         'read'
   *        ],
   *        ContentDelivery: 'all',
   *        Environments: 'all',
   *        EnvironmentAliases: 'all',
   *        Settings: 'all'
   *      },
   *     policies: [
   *       {
   *         effect: 'allow',
   *         actions: [
   *           'read',
   *           'create',
   *           'update',
   *           'delete',
   *           'publish',
   *           'unpublish',
   *           'archive',
   *           'unarchive'
   *         ],
   *         constraint: {
   *           and: [
   *           [
   *            'equals',
   *            {
   *              doc: 'sys.type'
   *            },
   *            'Entry'
   *           ]
   *         ]
   *       }
   *     }
   *   ]
   * });
   * ```
   */
  create(
    params: OptionalDefaults<GetSpaceParams>,
    data: CreateRoleProps,
    headers?: RawAxiosRequestHeaders,
  ): Promise<RoleProps>
  /** Creates a Role with a given ID
   *
   * @param params Space ID, Role ID, and the Role to create
   * @returns the created Role
   * @throws if the request fails, the Space is not found, or the payload is malformed
   * @example
   * ```javascript
   * const role = await client.role.create(
   *   {
   *      spaceId: '<space_id>',
   *      roleId: '<role_id>',
   *   },
   *   {
   *      name: 'My role',
   *      description: 'My role description',
   *      permissions: {
   *        ContentModel: [
   *         'read'
   *        ],
   *        ContentDelivery: 'all',
   *        Environments: 'all',
   *        EnvironmentAliases: 'all',
   *        Settings: 'all'
   *      },
   *     policies: [
   *       {
   *         effect: 'allow',
   *         actions: [
   *           'read',
   *           'create',
   *           'update',
   *           'delete',
   *           'publish',
   *           'unpublish',
   *           'archive',
   *           'unarchive'
   *         ],
   *         constraint: {
   *           and: [
   *           [
   *            'equals',
   *            {
   *              doc: 'sys.type'
   *            },
   *            'Entry'
   *           ]
   *         ]
   *       }
   *     }
   *   ]
   * });
   * ```
   */
  createWithId(
    params: OptionalDefaults<GetSpaceParams & { roleId: string }>,
    data: CreateRoleProps,
    headers?: RawAxiosRequestHeaders,
  ): Promise<RoleProps>
  /** Updates a Role
   *
   * @param params Space ID and Role ID
   * @param rawData the Role update
   * @returns the updated Role
   * @throws if the request fails, the Role is not found, or the payload is malformed
   * @example
   * ```javascript
   * let role = await client.role.get({
   *   spaceId: '<space_id>',
   *   roleId: '<role_id>',
   * });
   *
   * role = await client.role.update(
   *   {
   *     spaceId: '<space_id>',
   *     roleId: '<role_id>',
   *   },
   *   {
   *     ...role,
   *     name: 'My updated role name',
   *   }
   * );
   * ```
   */
  update(
    params: OptionalDefaults<GetSpaceParams & { roleId: string }>,
    rawData: RoleProps,
    headers?: RawAxiosRequestHeaders,
  ): Promise<RoleProps>
  /** Deletes a Role
   *
   * @param params Space ID and Role ID
   * @throws if the request fails, or the Role is not found
   * @example
   * ```javascript
   * await client.role.delete({
   *   spaceId: '<space_id>',
   *   roleId: '<role_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetSpaceParams & { roleId: string }>): Promise<any>
}
