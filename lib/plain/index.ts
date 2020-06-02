import { AxiosInstance, AxiosRequestConfig } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { SpaceProps } from '../types/space'
import { EnvironmentProps } from '../types/environment'
import { ContentTypeProps } from '../types/content-type'
import { EntryProps } from '../types/entry'
import { UserProps } from '../entities/user'
import { LocaleProps } from '../types/locale'
import { CollectionProp, QueryOptions } from '../types/common-types'
import errorHandler from '../error-handler'

function getBaseUrl(http: AxiosInstance) {
  return http.defaults.baseURL?.split('/spaces')[0]
}

function normalizeSelect(query?: QueryOptions): QueryOptions | undefined {
  if (query && query.select && !/sys/i.test(query.select)) {
    return {
      ...query,
      select: query.select + ',sys',
    }
  }
  return query
}

function get<T = any>(http: AxiosInstance, url: string, config?: AxiosRequestConfig) {
  return http
    .get<T>(url, {
      baseURL: getBaseUrl(http),
      ...config,
    })
    .then((response) => response.data, errorHandler)
}

function put<T = any>(
  http: AxiosInstance,
  url: string,
  payload?: any,
  config?: AxiosRequestConfig
) {
  return http
    .put<T>(url, payload, {
      baseURL: getBaseUrl(http),
      ...config,
    })
    .then((response) => response.data, errorHandler)
}

function del<T = any>(http: AxiosInstance, url: string, config?: AxiosRequestConfig) {
  return http
    .delete<T>(url, {
      baseURL: getBaseUrl(http),
      ...config,
    })
    .then((response) => response.data, errorHandler)
}

export type QueryParams = { query?: QueryOptions }

/**
 * Space
 */
export type GetSpaceParams = { spaceId: string }

export const space = {
  get(http: AxiosInstance, params: GetSpaceParams) {
    return get<SpaceProps>(http, `/spaces/${params.spaceId}`)
  },
  update(http: AxiosInstance, params: GetSpaceParams, raw: SpaceProps) {
    const data = cloneDeep(raw)
    delete data.sys
    return put<SpaceProps>(http, `/spaces/${params.spaceId}`, data, {
      headers: {
        'X-Contentful-Version': raw.sys.version ?? 0,
      },
    })
  },
  delete(http: AxiosInstance, params: GetSpaceParams) {
    return del(http, `/spaces/${params.spaceId}`)
  },
}

export type GetEnvironmentParams = GetSpaceParams & { environmentId: string }

export const environment = {
  get(http: AxiosInstance, params: GetEnvironmentParams) {
    return get<EnvironmentProps>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}`
    )
  },
  update(http: AxiosInstance, params: GetEnvironmentParams, raw: EnvironmentProps) {
    const data = cloneDeep(raw)
    delete data.sys
    return put<EnvironmentProps>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}`,
      data,
      {
        headers: {
          'X-Contentful-Version': raw.sys.version ?? 0,
        },
      }
    )
  },
}

export type GetManyContentTypesParams = GetEnvironmentParams & QueryParams

export const contentType = {
  getMany(http: AxiosInstance, params: GetManyContentTypesParams) {
    return get<CollectionProp<ContentTypeProps>>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/content_types`,
      {
        params: params.query,
      }
    )
  },
}

export type GetManyUsersParams = GetSpaceParams & QueryParams

export const user = {
  getManyForSpace(http: AxiosInstance, params: GetManyUsersParams) {
    return get<CollectionProp<UserProps>>(http, `/spaces/${params.spaceId}/users`, {
      params: params.query,
    })
  },
}

export type GetManyEntriesParams = GetEnvironmentParams & QueryParams

export const entry = {
  get(http: AxiosInstance, params: GetEnvironmentParams & { entryId: string } & QueryParams) {
    return get<EntryProps>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}`,
      {
        params: normalizeSelect(params.query),
      }
    )
  },
  getMany(http: AxiosInstance, params: GetManyEntriesParams) {
    return get<CollectionProp<EntryProps>>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/entries`,
      {
        params: normalizeSelect(params.query),
      }
    )
  },
  update(http: AxiosInstance, params: GetEnvironmentParams & { entryId: string }, raw: EntryProps) {
    const data = cloneDeep(raw)
    delete data.sys
    return put<EntryProps>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}`,
      data,
      {
        headers: {
          'X-Contentful-Version': raw.sys.version ?? 0,
        },
      }
    )
  },
  delete(http: AxiosInstance, params: GetEnvironmentParams & { entryId: string }) {
    return del(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}`
    )
  },
  publish(
    http: AxiosInstance,
    params: GetEnvironmentParams & { entryId: string },
    raw: EntryProps
  ) {
    return put<EntryProps>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/published`,
      null,
      {
        headers: {
          'X-Contentful-Version': raw.sys.version ?? 0,
        },
      }
    )
  },
  unpublish(http: AxiosInstance, params: GetEnvironmentParams & { entryId: string }) {
    return del<EntryProps>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/published`
    )
  },
  archive(http: AxiosInstance, params: GetEnvironmentParams & { entryId: string }) {
    return put<EntryProps>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/archived`
    )
  },
  unarchive(http: AxiosInstance, params: GetEnvironmentParams & { entryId: string }) {
    return del<EntryProps>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/archived`
    )
  },
}

export const locale = {
  getMany(http: AxiosInstance, params: GetEnvironmentParams) {
    return get<CollectionProp<LocaleProps>>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/locales`
    )
  },
}
