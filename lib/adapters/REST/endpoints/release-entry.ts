import type { AxiosInstance } from 'contentful-sdk-core'
import type {
  GetReleaseEntryParams,
  GetSpaceEnvironmentParams,
  KeyValueMap,
  QueryParams,
  UpdateReleaseEntryParams,
} from '../../../common-types'
import type { EntryProps } from '../../../entities/entry'
import copy from 'fast-copy'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import type { RawAxiosRequestHeaders } from 'axios'
import type { SetOptional } from 'type-fest'

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
  params: GetSpaceEnvironmentParams & QueryParams & { releaseId: string }
) => {
  params.query = { ...params.query, 'sys.schemaVersion': 'Release.V2' }

  return raw.get(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/entries`
  )
}

export const update: RestEndpoint<'ReleaseEntry', 'update'> = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: UpdateReleaseEntryParams & { entryId: string } & QueryParams & { releaseId: string },
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
