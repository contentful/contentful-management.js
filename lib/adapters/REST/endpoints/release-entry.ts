import type { AxiosInstance } from 'contentful-sdk-core'
import type {
  CreateReleaseEntryParams,
  GetReleaseEntryParams,
  GetManyReleaseEntryParams,
  KeyValueMap,
  PatchReleaseEntryParams,
  QueryParams,
  UpdateReleaseEntryParams,
  CreateWithIdReleaseEntryParams,
} from '../../../common-types'
import type { CreateEntryProps, EntryProps } from '../../../entities/entry'
import copy from 'fast-copy'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import type { RawAxiosRequestHeaders } from 'axios'
import type { SetOptional } from 'type-fest'
import type { OpPatch } from 'json-patch'

export const get: RestEndpoint<'ReleaseEntry', 'get'> = (
  http: AxiosInstance,
  params: GetReleaseEntryParams
) => {
  //TODO: not fully implemented yet, only the get method
  return raw.get(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/entries/${params.entryId}`
  )
}

export const getMany: RestEndpoint<'ReleaseEntry', 'getMany'> = (
  http: AxiosInstance,
  params: GetManyReleaseEntryParams & QueryParams
) => {
  params.query = { ...params.query, 'sys.schemaVersion': 'Release.V2' }

  return raw.get(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/entries`
  )
}

export const update: RestEndpoint<'ReleaseEntry', 'update'> = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: UpdateReleaseEntryParams & QueryParams,
  rawData: EntryProps<T>,
  headers?: RawAxiosRequestHeaders
) => {
  params.query = { ...params.query, 'sys.schemaVersion': 'Release.V2' }
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys
  return raw.put<
    EntryProps<
      T,
      {
        release: {
          sys: {
            type: 'Link'
            linkType: 'Entry' | 'Asset'
            id: string
          }
        }
      }
    >
  >(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/entries/${params.entryId}`,
    data,
    {
      headers: {
        'X-Contentful-Version': rawData.sys.version ?? 0,
        ...headers,
      },
    }
  )
}

export const patch: RestEndpoint<'ReleaseEntry', 'patch'> = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: PatchReleaseEntryParams & QueryParams,
  data: OpPatch[],
  headers?: RawAxiosRequestHeaders
) => {
  params.query = { ...params.query, 'sys.schemaVersion': 'Release.V2' }
  return raw.patch<EntryProps<T, any>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/entries/${params.entryId}`,
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

export const create: RestEndpoint<'ReleaseEntry', 'create'> = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: CreateReleaseEntryParams & QueryParams,
  rawData: CreateEntryProps<T>,
  headers?: RawAxiosRequestHeaders
) => {
  params.query = { ...params.query, 'sys.schemaVersion': 'Release.V2' }
  const data = copy(rawData)

  return raw.post<
    EntryProps<
      T,
      {
        release: {
          sys: {
            type: 'Link'
            linkType: 'Entry' | 'Asset'
            id: string
          }
        }
      }
    >
  >(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/entries`,
    data,
    {
      headers: {
        'X-Contentful-Content-Type': params.contentTypeId,
        ...headers,
      },
    }
  )
}

export const createWithId: RestEndpoint<'ReleaseEntry', 'createWithId'> = <
  T extends KeyValueMap = KeyValueMap
>(
  http: AxiosInstance,
  params: CreateWithIdReleaseEntryParams & QueryParams,
  rawData: CreateEntryProps<T>,
  headers?: RawAxiosRequestHeaders
) => {
  params.query = { ...params.query, 'sys.schemaVersion': 'Release.V2' }
  const data = copy(rawData)

  return raw.put<
    EntryProps<
      T,
      {
        release: {
          sys: {
            type: 'Link'
            linkType: 'Entry' | 'Asset'
            id: string
          }
        }
      }
    >
  >(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/entries/${params.entryId}`,
    data,
    {
      headers: {
        'X-Contentful-Content-Type': params.contentTypeId,
        ...headers,
      },
    }
  )
}
