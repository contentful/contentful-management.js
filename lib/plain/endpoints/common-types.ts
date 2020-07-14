import { QueryOptions, PaginationQueryOptions } from '../../common-types'

export type GetSpaceParams = { spaceId: string }
export type GetEnvironmentParams = { environmentId: string }
export type GetOrganizationParams = { organizationId: string }

export type QueryParams = { query?: QueryOptions }
export type PaginationQueryParams = { query?: PaginationQueryOptions }

export type { CollectionProp, KeyValueMap } from '../../common-types'
