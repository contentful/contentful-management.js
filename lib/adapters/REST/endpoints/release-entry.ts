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
  Link,
  CollectionProp,
} from '../../../common-types'
import type { CreateEntryProps, EntryProps } from '../../../entities/entry'
import copy from 'fast-copy'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import type { RawAxiosRequestHeaders } from 'axios'
import type { SetOptional } from 'type-fest'
import type { OpPatch } from 'json-patch'
import { normalizeSelect } from './utils'

type ReleaseEntryProps = EntryProps<unknown, { release: Link<'Release'> }>

export const get: RestEndpoint<'ReleaseEntry', 'get'> = (
  http: AxiosInstance,
  params: GetReleaseEntryParams & QueryParams,
  rawData?: unknown,
  headers?: RawAxiosRequestHeaders
) => {
  return raw.get<ReleaseEntryProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/entries/${params.entryId}`,
    {
      params: normalizeSelect(params.query),
      headers: { ...headers },
    }
  )
}

export const getMany: RestEndpoint<'ReleaseEntry', 'getMany'> = (
  http: AxiosInstance,
  params: GetManyReleaseEntryParams & QueryParams,
  rawData?: unknown,
  headers?: RawAxiosRequestHeaders
) => {
  return raw.get<CollectionProp<ReleaseEntryProps>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/entries`,
    {
      params: normalizeSelect(params.query),
      headers: { ...headers },
    }
  )
}

export const update: RestEndpoint<'ReleaseEntry', 'update'> = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: UpdateReleaseEntryParams,
  rawData: EntryProps<T>,
  headers?: RawAxiosRequestHeaders
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys
  return raw.put<ReleaseEntryProps>(
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
  params: PatchReleaseEntryParams,
  data: OpPatch[],
  headers?: RawAxiosRequestHeaders
) => {
  return raw.patch<ReleaseEntryProps>(
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
  params: CreateReleaseEntryParams,
  rawData: CreateEntryProps<T>,
  headers?: RawAxiosRequestHeaders
) => {
  const data = copy(rawData)

  return raw.post<ReleaseEntryProps>(
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
  params: CreateWithIdReleaseEntryParams,
  rawData: CreateEntryProps<T>,
  headers?: RawAxiosRequestHeaders
) => {
  const data = copy(rawData)

  return raw.put<ReleaseEntryProps>(
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
