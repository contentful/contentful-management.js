import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { CollectionProp, GetSpaceEnvironmentParams, KeyValueMap, QueryParams } from './common-types'
import { EntryProps } from '../../entities/entry'
import { normalizeSelect } from './utils'
import { SnapshotProps } from '../../entities/snapshot'
import { ContentTypeProps } from '../../entities/content-type'

type GetSnapshotForEntryParams = GetSpaceEnvironmentParams & { entryId: string }

const getBaseEntryUrl = (params: GetSnapshotForEntryParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/snapshots`

const getEntryUrl = (params: GetSnapshotForEntryParams & { snapshotId: string }) =>
  getBaseEntryUrl(params) + `/${params.snapshotId}`

export const getManyForEntry = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: GetSnapshotForEntryParams & QueryParams
) => {
  return raw.get<CollectionProp<SnapshotProps<EntryProps<T>>>>(http, getBaseEntryUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const getForEntry = <T extends KeyValueMap = KeyValueMap>(
  http: AxiosInstance,
  params: GetSnapshotForEntryParams & { snapshotId: string }
) => {
  return raw.get<SnapshotProps<EntryProps<T>>>(http, getEntryUrl(params))
}

type GetSnapshotForContentTypeParams = GetSpaceEnvironmentParams & { contentTypeId: string }

const getBaseContentTypeUrl = (params: GetSnapshotForContentTypeParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/content_types/${params.contentTypeId}/snapshots`

const getContentTypeUrl = (params: GetSnapshotForContentTypeParams & { snapshotId: string }) =>
  getBaseContentTypeUrl(params) + `/${params.snapshotId}`

export const getManyForContentType = (
  http: AxiosInstance,
  params: GetSnapshotForContentTypeParams & QueryParams
) => {
  return raw.get<CollectionProp<SnapshotProps<ContentTypeProps>>>(
    http,
    getBaseContentTypeUrl(params),
    {
      params: normalizeSelect(params.query),
    }
  )
}

export const getForContentType = (
  http: AxiosInstance,
  params: GetSnapshotForContentTypeParams & { snapshotId: string }
) => {
  return raw.get<SnapshotProps<ContentTypeProps>>(http, getContentTypeUrl(params))
}
