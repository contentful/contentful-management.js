import {
  CollectionProp,
  GetOrganizationParams,
  GetSpaceParams,
  QueryParams,
} from '../../common-types'
import { CreateRoleProps, RoleProps } from '../../export-types'
import { OptionalDefaults } from '../wrappers/wrap'
import { CreateOrUpdate } from './base'

export type RolePlainClientAPI = {
  /** Fetches a Role
   *
   * @param params Space ID and Role ID
   * @returns the Role
   * @throws if the request fails, or the Role is not found
   * @example
   * ```javascript
   * const role = await client.role.get({
   *  spaceId: '<space_id>',
   *  roleId: '<role_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetSpaceParams & { roleId: string }>): Promise<RoleProps>
  /** Fetches all Roles for the given Space
   *
   * @param params Space ID and query parameters
   * @returns All the Roles for the given Space
   * @throws if the request fails, or the Space is not found
   * @example
   * ```javascript
   * const results = await client.role.getMany({
   *  spaceId: '<space_id>',
   *  query: {
   *   limit: 100,
   *  }
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceParams & QueryParams>
  ): Promise<CollectionProp<RoleProps>>
  /** Fetches all Roles for the given Organization
   *
   * @param params Organization ID and query parameters
   * @returns All the Roles for the given Organization
   * @throws if the request fails, or the Organization is not found
   * @example
   * ```javascript
   * const results = await client.role.getManyForOrganization({
   *  organizationId: '<organization_id>',
   *  query: {
   *   limit: 100,
   *  }
   * });
   * ```
   */
  getManyForOrganization(
    params: OptionalDefaults<GetOrganizationParams & QueryParams>
  ): Promise<CollectionProp<RoleProps>>
  /** Creates a Role
   *
   * @param params Space ID and the Role to create
   * @returns the created Role
   * @throws if the request fails, the Space is not found, or the payload is malformed
   * @example
   * ```javascript
   * const role = await client.role.create(
   * {
   *  spaceId: '<space_id>',
   * },
   * {
   *  name: 'My role',
   *  description: 'My role description',
   *  permissions: {
   *   ContentModel: [
   *    'read'
   *   ],
   *   ContentDelivery: 'all',
   *   Environments: 'all',
   *   EnvironmentAliases: 'all',
   *   Settings: 'all'
   *  },
   *  policies: [
   *   {
   *    effect: 'allow',
   *    actions: [
   *     'read',
   *     'create',
   *     'update',
   *     'delete',
   *     'publish',
   *     'unpublish',
   *     'archive',
   *     'unarchive'
   *    ],
   *    constraint: {
   *     and: [
   *     [
   *      'equals',
   *      {
   *       doc: 'sys.type'
   *      },
   *      'Entry'
   *     ]
   *    ]
   *   }
   *  }
   * ]
   * });
   * ```
   */
  create: CreateOrUpdate<GetSpaceParams, CreateRoleProps, RoleProps>
  /** Creates a Role with a given ID
   *
   * @param params Space ID, Role ID, and the Role to create
   * @returns the created Role
   * @throws if the request fails, the Space is not found, or the payload is malformed
   * @example
   * ```javascript
   * const role = await client.role.createWithId(
   * {
   *  spaceId: '<space_id>',
   *  roleId: '<role_id>',
   * },
   * {
   *  name: 'My role',
   *  description: 'My role description',
   *  permissions: {
   *   ContentModel: [
   *    'read'
   *   ],
   *   ContentDelivery: 'all',
   *   Environments: 'all',
   *   EnvironmentAliases: 'all',
   *   Settings: 'all'
   *  },
   *  policies: [
   *   {
   *    effect: 'allow',
   *    actions: [
   *     'read',
   *     'create',
   *     'update',
   *     'delete',
   *     'publish',
   *     'unpublish',
   *     'archive',
   *     'unarchive'
   *    ],
   *    constraint: {
   *     and: [
   *     [
   *      'equals',
   *      {
   *       doc: 'sys.type'
   *      },
   *      'Entry'
   *     ]
   *    ]
   *   }
   *  }
   * ]
   * });
   * ```
   */
  createWithId: CreateOrUpdate<GetSpaceParams & { roleId: string }, CreateRoleProps, RoleProps>
  /** Updates a Role
   *
   * @param params Space ID and Role ID
   * @param rawData the Role update
   * @returns the updated Role
   * @throws if the request fails, the Role is not found, or the payload is malformed
   * @example
   * ```javascript
   * const role = await client.role.update(
   * {
   *  spaceId: '<space_id>',
   *  roleId: '<role_id>',
   * },
   * {
   *  name: 'My role',
   *  description: 'My role description',
   *  permissions: {
   *   ContentModel: [
   *    'read'
   *   ],
   *   ContentDelivery: 'all',
   *   Environments: 'all',
   *   EnvironmentAliases: 'all',
   *   Settings: 'all'
   *  },
   *  policies: [
   *   {
   *    effect: 'allow',
   *    actions: [
   *     'read',
   *     'create',
   *     'update',
   *     'delete',
   *     'publish',
   *     'unpublish',
   *     'archive',
   *     'unarchive'
   *    ],
   *    constraint: {
   *     and: [
   *     [
   *      'equals',
   *      {
   *       doc: 'sys.type'
   *      },
   *      'Entry'
   *     ]
   *    ]
   *   }
   *  }
   * ]
   * });
   * ```
   */
  update: CreateOrUpdate<GetSpaceParams & { roleId: string }, RoleProps, RoleProps>
  /** Deletes a Role
   *
   * @param params Space ID and Role ID
   * @throws if the request fails, or the Role is not found
   * @example
   * ```javascript
   * await client.role.delete({
   *  spaceId: '<space_id>',
   *  roleId: '<role_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetSpaceParams & { roleId: string }>): Promise<any>
}
