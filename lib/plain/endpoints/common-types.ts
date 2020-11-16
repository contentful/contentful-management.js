import { QueryOptions, PaginationQueryOptions } from '../../common-types'

export type GetSpaceParams = { spaceId: string }
export type GetSpaceEnvironmentParams = { spaceId: string; environmentId: string }
export type GetOrganizationParams = { organizationId: string }
export type GetTeamParams = { organizationId: string; teamId: string }

export type QueryParams = { query?: QueryOptions }
export type PaginationQueryParams = { query?: PaginationQueryOptions }

export type { CollectionProp, KeyValueMap } from '../../common-types'
