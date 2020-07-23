import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { CreateEntryProps, EntryProps } from '../../entities/entry'
import { normalizeSelect } from './utils'
import cloneDeep from 'lodash/cloneDeep'
import { QueryParams, CollectionProp, KeyValueMap, GetSpaceEnvironmentParams } from './common-types'

export const get = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { entryId: string } & QueryParams
) => {
  return raw.get<EntryProps<T>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}`,
    {
      params: normalizeSelect(params.query),
    }
  )
}

export const getMany = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & QueryParams
) => {
  return raw.get<CollectionProp<EntryProps<T>>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/entries`,
    {
      params: normalizeSelect(params.query),
    }
  )
}

export const update = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { entryId: string },
  rawData: EntryProps<T>,
  headers?: Record<string, unknown>
) => {
  const data = cloneDeep(rawData)
  delete data.sys
  return raw.put<EntryProps<T>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}`,
    data,
    {
      headers: {
        'X-Contentful-Version': rawData.sys.version ?? 0,
        ...headers,
      },
    }
  )
}

export const del = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { entryId: string }
) => {
  return raw.del(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}`
  )
}

export const publish = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { entryId: string },
  rawData: EntryProps<T>
) => {
  return raw.put<EntryProps<T>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/published`,
    null,
    {
      headers: {
        'X-Contentful-Version': rawData.sys.version ?? 0,
      },
    }
  )
}

export const unpublish = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { entryId: string }
) => {
  return raw.del<EntryProps<T>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/published`
  )
}

export const archive = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { entryId: string }
) => {
  return raw.put<EntryProps<T>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/archived`
  )
}

export const unarchive = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { entryId: string }
) => {
  return raw.del<EntryProps<T>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/archived`
  )
}

export const create = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { contentTypeId: string },
  rawData: CreateEntryProps<T>
) => {
  const data = cloneDeep(rawData)

  return raw.post<EntryProps<T>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/entries`,
    data,
    {
      headers: {
        'X-Contentful-Content-Type': params.contentTypeId,
      },
    }
  )
}

export const createWithId = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { entryId: string; contentTypeId: string },
  rawData: CreateEntryProps<T>
) => {
  const data = cloneDeep(rawData)

  return raw.put<EntryProps<T>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}`,
    data,
    {
      headers: {
        'X-Contentful-Content-Type': params.contentTypeId,
      },
    }
  )
}
