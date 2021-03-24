import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { CollectionProp, GetSpaceEnvironmentParams, QueryParams } from '../../../common-types'
import { CreateLocaleProps, LocaleProps } from '../../../entities/locale'
import { RestEndpoint } from '../types'
import * as raw from './raw'
import { normalizeSelect } from './utils'

export const get: RestEndpoint<'Locale', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { localeId: string }
) => {
  return raw.get<LocaleProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/locales/${params.localeId}`
  )
}

export const getMany: RestEndpoint<'Locale', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & QueryParams
) => {
  return raw.get<CollectionProp<LocaleProps>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/locales`,
    {
      params: normalizeSelect(params.query),
    }
  )
}

export const create: RestEndpoint<'Locale', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  data: CreateLocaleProps,
  headers?: Record<string, unknown>
) => {
  return raw.post<LocaleProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/locales`,
    data,
    {
      headers,
    }
  )
}

export const update: RestEndpoint<'Locale', 'update'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { localeId: string },
  rawData: LocaleProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)
  delete data.sys
  delete data.default // we should not send this back
  return raw.put<LocaleProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/locales/${params.localeId}`,
    data,
    {
      headers: {
        ...headers,
        'X-Contentful-Version': rawData.sys.version ?? 0,
      },
    }
  )
}

export const del: RestEndpoint<'Locale', 'delete'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { localeId: string }
) => {
  return raw.del(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/locales/${params.localeId}`
  )
}
