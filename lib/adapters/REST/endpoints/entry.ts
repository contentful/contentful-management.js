import { AxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { OpPatch } from 'json-patch'
import { SetOptional } from 'type-fest'
import {
  CollectionProp,
  GetSpaceEnvironmentParams,
  KeyValueMap,
  QueryParams,
} from '../../../common-types'
import { CreateEntryProps, EntryProps, EntryReferenceProps } from '../../../entities/entry'
import { RestEndpoint } from '../types'
import * as raw from './raw'
import { normalizeSelect } from './utils'

export const get: RestEndpoint<'Entry', 'get'> = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { entryId: string } & QueryParams,
  rawData?: unknown,
  headers?: AxiosRequestHeaders
) => {
  return raw.get<EntryProps<T>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}`,
    {
      params: normalizeSelect(params.query),
      headers: { ...headers },
    }
  )
}

export const getPublished: RestEndpoint<'Entry', 'getPublished'> = <
  T extends KeyValueMap = KeyValueMap
>(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & QueryParams,
  rawData?: unknown,
  headers?: AxiosRequestHeaders
) => {
  return raw.get<CollectionProp<EntryProps<T>>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/entries`,
    {
      params: normalizeSelect(params.query),
      headers: { ...headers },
    }
  )
}

export const getMany: RestEndpoint<'Entry', 'getMany'> = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & QueryParams,
  rawData?: unknown,
  headers?: AxiosRequestHeaders
) => {
  return raw.get<CollectionProp<EntryProps<T>>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/entries`,
    {
      params: normalizeSelect(params.query),
      headers: { ...headers },
    }
  )
}

export const patch: RestEndpoint<'Entry', 'patch'> = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { entryId: string; version: number },
  data: OpPatch[],
  headers?: AxiosRequestHeaders
) => {
  return raw.patch<EntryProps<T>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}`,
    data,
    {
      headers: {
        'X-Contentful-Version': params.version,
        'Content-Type': 'application/json-patch+json',
        ...headers,
      },
    }
  )
}

export const update: RestEndpoint<'Entry', 'update'> = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { entryId: string },
  rawData: EntryProps<T>,
  headers?: AxiosRequestHeaders
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
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

export const del: RestEndpoint<'Entry', 'delete'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { entryId: string }
) => {
  return raw.del(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}`
  )
}

export const publish: RestEndpoint<'Entry', 'publish'> = <T extends KeyValueMap = KeyValueMap>(
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
        'X-Contentful-Version': rawData.sys.version,
      },
    }
  )
}

export const unpublish: RestEndpoint<'Entry', 'unpublish'> = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { entryId: string }
) => {
  return raw.del<EntryProps<T>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/published`
  )
}

export const archive: RestEndpoint<'Entry', 'archive'> = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { entryId: string }
) => {
  return raw.put<EntryProps<T>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/archived`
  )
}

export const unarchive: RestEndpoint<'Entry', 'unarchive'> = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { entryId: string }
) => {
  return raw.del<EntryProps<T>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/archived`
  )
}

export const create: RestEndpoint<'Entry', 'create'> = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { contentTypeId: string },
  rawData: CreateEntryProps<T>
) => {
  const data = copy(rawData)

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

export const createWithId: RestEndpoint<'Entry', 'createWithId'> = <
  T extends KeyValueMap = KeyValueMap
>(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { entryId: string; contentTypeId: string },
  rawData: CreateEntryProps<T>
) => {
  const data = copy(rawData)

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

export const references: RestEndpoint<'Entry', 'references'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & {
    entryId: string
    include?: number
  }
): Promise<EntryReferenceProps> => {
  const { spaceId, environmentId, entryId, include } = params

  const level = include || 2

  return raw.get<EntryReferenceProps>(
    http,
    `/spaces/${spaceId}/environments/${environmentId}/entries/${entryId}/references?include=${level}`
  )
}
