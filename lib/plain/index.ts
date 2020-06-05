import { AxiosInstance, AxiosRequestConfig } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { SpaceProps } from '../types/space'
import { EnvironmentProps } from '../types/environment'
import { ContentTypeProps } from '../types/content-type'
import { EntryProps, CreateEntryProps } from '../types/entry'
import { UserProps } from '../entities/user'
import { LocaleProps } from '../entities/locale'
import { CollectionProp, QueryOptions, KeyValueMap } from '../types/common-types'
import errorHandler from '../error-handler'
import merge from 'lodash/merge'

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

type PaginatedResult<T, C> = Promise<C> & AsyncIterable<T>

function getMany<T = any, C extends CollectionProp<any> = CollectionProp<T>>(
  http: AxiosInstance,
  url: string,
  config?: AxiosRequestConfig
): PaginatedResult<T, C> {
  const options = cloneDeep(config ?? {})
  const get = () =>
    http
      .get<C>(url, {
        baseURL: getBaseUrl(http),
        ...options,
      })
      .then((response) => response.data, errorHandler)
  const result = get()

  return Object.assign(result, {
    [Symbol.asyncIterator]() {
      let currentResult = result

      return {
        current: 0,
        async next() {
          const { total, items, skip, limit } = await currentResult

          if (total === this.current) {
            return { done: true }
          }

          const value = items[this.current++ - skip]
          const endOfPage = this.current % limit === 0
          const endOfList = this.current === total

          if (endOfPage && !endOfList) {
            merge(options, { params: { skip: skip + limit } })
            currentResult = get()
          }

          return { done: false, value }
        },
      }
    },
  }) as PaginatedResult<T, C>
}

function post<T = any>(
  http: AxiosInstance,
  url: string,
  payload?: any,
  config?: AxiosRequestConfig
) {
  return http
    .post<T>(url, payload, {
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

export const raw = {
  get: get,
  post: post,
  put: put,
  delete: del,
}

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

/**
 * Environment
 */

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

/**
 * Content type
 */

export type GetManyContentTypesParams = GetEnvironmentParams & QueryParams

export const contentType = {
  getMany(http: AxiosInstance, params: GetManyContentTypesParams) {
    return getMany<ContentTypeProps>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/content_types`,
      {
        params: params.query,
      }
    )
  },
}

/**
 * User
 */

export type GetManyUsersParams = GetSpaceParams & QueryParams

export const user = {
  getManyForSpace(http: AxiosInstance, params: GetManyUsersParams) {
    return getMany<UserProps>(http, `/spaces/${params.spaceId}/users`, {
      params: params.query,
    })
  },
}

export type GetManyEntriesParams = GetEnvironmentParams & QueryParams

/**
 * Entry
 */

export const entry = {
  get<T extends KeyValueMap = KeyValueMap>(
    http: AxiosInstance,
    params: GetEnvironmentParams & { entryId: string } & QueryParams
  ) {
    return get<EntryProps<T>>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}`,
      {
        params: normalizeSelect(params.query),
      }
    )
  },
  getMany<T extends KeyValueMap = KeyValueMap>(http: AxiosInstance, params: GetManyEntriesParams) {
    return get<CollectionProp<EntryProps<T>>>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/entries`,
      {
        params: normalizeSelect(params.query),
      }
    )
  },
  update<T extends KeyValueMap = KeyValueMap>(
    http: AxiosInstance,
    params: GetEnvironmentParams & { entryId: string },
    raw: EntryProps<T>
  ) {
    const data = cloneDeep(raw)
    delete data.sys
    return put<EntryProps<T>>(
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
  publish<T extends KeyValueMap = KeyValueMap>(
    http: AxiosInstance,
    params: GetEnvironmentParams & { entryId: string },
    raw: EntryProps<T>
  ) {
    return put<EntryProps<T>>(
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
  unpublish<T extends KeyValueMap = KeyValueMap>(
    http: AxiosInstance,
    params: GetEnvironmentParams & { entryId: string }
  ) {
    return del<EntryProps<T>>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/published`
    )
  },
  archive<T extends KeyValueMap = KeyValueMap>(
    http: AxiosInstance,
    params: GetEnvironmentParams & { entryId: string }
  ) {
    return put<EntryProps<T>>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/archived`
    )
  },
  unarchive<T extends KeyValueMap = KeyValueMap>(
    http: AxiosInstance,
    params: GetEnvironmentParams & { entryId: string }
  ) {
    return del<EntryProps<T>>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/archived`
    )
  },
  create<T extends KeyValueMap = KeyValueMap>(
    http: AxiosInstance,
    params: GetEnvironmentParams & { contentTypeId: string },
    raw: CreateEntryProps<T>
  ) {
    const data = cloneDeep(raw)
    return post<EntryProps<T>>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/entries`,
      data,
      {
        headers: {
          'X-Contentful-Content-Type': params.contentTypeId,
        },
      }
    )
  },
  createWithId<T extends KeyValueMap = KeyValueMap>(
    http: AxiosInstance,
    params: GetEnvironmentParams & { entryId: string; contentTypeId: string },
    raw: CreateEntryProps<T>
  ) {
    const data = cloneDeep(raw)
    return put<EntryProps<T>>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}`,
      data,
      {
        headers: {
          'X-Contentful-Content-Type': params.contentTypeId,
        },
      }
    )
  },
}

/**
 * Locale
 */

export const locale = {
  getMany(http: AxiosInstance, params: GetEnvironmentParams & QueryParams) {
    return get<CollectionProp<LocaleProps>>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/locales`,
      {
        params: normalizeSelect(params.query),
      }
    )
  },
}
