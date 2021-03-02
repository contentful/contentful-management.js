import { AxiosRequestConfig } from 'axios'
import { QueryOptions, PaginationQueryOptions, CollectionProp } from '../../common-types'
import { SpaceProps } from '../../entities/space'
import { DefaultParams } from '../wrappers/wrap'

export type GetSpaceParams = { spaceId: string }
export type GetSpaceEnvironmentParams = { spaceId: string; environmentId: string }
export type GetOrganizationParams = { organizationId: string }
export type GetTeamParams = { organizationId: string; teamId: string }

export type QueryParams = { query?: QueryOptions }
export type PaginationQueryParams = { query?: PaginationQueryOptions }

export type { CollectionProp, KeyValueMap } from '../../common-types'

export type PlainClientAPI = {
  raw: {
    getDefaultParams(): DefaultParams | undefined
    get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
    post<T = unknown>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<T>
    put<T = unknown>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<T>
    delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
    http<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
  }
  space: {
    get(params: GetSpaceParams): Promise<SpaceProps>
    getMany(params: QueryParams): Promise<CollectionProp<SpaceProps>>
    create(
      params: { organizationId?: string },
      payload: Omit<SpaceProps, 'sys'>,
      headers?: Record<string, unknown>
    ): Promise<any>
    update(
      params: GetSpaceParams,
      payload: SpaceProps,
      headers?: Record<string, unknown>
    ): Promise<SpaceProps>
    delelete(params: GetSpaceParams): Promise<any>
  }
} & any // TODO: remove. This is just to make typescript happy during the transition
