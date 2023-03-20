import type { AxiosInstance } from 'contentful-sdk-core'
import {
  CollectionProp,
  GetSnapshotForContentTypeParams,
  GetSnapshotForEntryParams,
  KeyValueMap,
  QueryParams,
} from '../../../common-types'
import { ContentTypeProps } from '../../../entities/content-type'
import { EntryProps } from '../../../entities/entry'
import { SnapshotProps } from '../../../entities/snapshot'
import { RestEndpoint } from '../types'
import * as raw from './raw'
import { normalizeSelect } from './utils'

const getBaseEntryUrl = (params: GetSnapshotForEntryParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/snapshots`

const getEntryUrl = (params: GetSnapshotForEntryParams & { snapshotId: string }) =>
  getBaseEntryUrl(params) + `/${params.snapshotId}`

export const getManyForEntry: RestEndpoint<'Snapshot', 'getManyForEntry'> = <
  T extends KeyValueMap = KeyValueMap
>(
  http: AxiosInstance,
  params: GetSnapshotForEntryParams & QueryParams
) => {
  return raw.get<CollectionProp<SnapshotProps<Omit<EntryProps<T>, 'metadata'>>>>(
    http,
    getBaseEntryUrl(params),
    {
      params: normalizeSelect(params.query),
    }
  )
}

export const getForEntry: RestEndpoint<'Snapshot', 'getForEntry'> = <
  T extends KeyValueMap = KeyValueMap
>(
  http: AxiosInstance,
  params: GetSnapshotForEntryParams & { snapshotId: string }
) => {
  return raw.get<SnapshotProps<Omit<EntryProps<T>, 'metadata'>>>(http, getEntryUrl(params))
}

const getBaseContentTypeUrl = (params: GetSnapshotForContentTypeParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/content_types/${params.contentTypeId}/snapshots`

const getContentTypeUrl = (params: GetSnapshotForContentTypeParams & { snapshotId: string }) =>
  getBaseContentTypeUrl(params) + `/${params.snapshotId}`

export const getManyForContentType: RestEndpoint<'Snapshot', 'getManyForContentType'> = (
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

export const getForContentType: RestEndpoint<'Snapshot', 'getForContentType'> = (
  http: AxiosInstance,
  params: GetSnapshotForContentTypeParams & { snapshotId: string }
) => {
  return raw.get<SnapshotProps<ContentTypeProps>>(http, getContentTypeUrl(params))
}
