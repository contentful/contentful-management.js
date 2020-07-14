import { AxiosInstance } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { CollectionProp } from '../../common-types'
import { LocaleProps, CreateLocaleProps } from '../../entities/locale'
import { normalizeSelect } from './utils'
import * as raw from './raw'
import { QueryParams, GetEnvironmentParams, GetSpaceParams } from './common-types'

export const get = (
  http: AxiosInstance,
  params: GetSpaceParams & GetEnvironmentParams & { localeId: string }
) => {
  return raw.get<LocaleProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/locales/${params.localeId}`
  )
}

export const getMany = (
  http: AxiosInstance,
  params: GetSpaceParams & GetEnvironmentParams & QueryParams
) => {
  return raw.get<CollectionProp<LocaleProps>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/locales`,
    {
      params: normalizeSelect(params.query),
    }
  )
}

export const create = (
  http: AxiosInstance,
  params: GetSpaceParams & GetEnvironmentParams,
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

export const update = (
  http: AxiosInstance,
  params: GetSpaceParams & GetEnvironmentParams & { localeId: string },
  rawData: LocaleProps,
  headers?: Record<string, unknown>
) => {
  const data = cloneDeep(rawData)
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

export const del = (
  http: AxiosInstance,
  params: GetSpaceParams & GetEnvironmentParams & { localeId: string }
) => {
  return raw.del(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/locales/${params.localeId}`
  )
}
