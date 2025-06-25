import type { AxiosInstance } from 'contentful-sdk-core'
import type { GetReleaseEntryParams } from '../../../common-types'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

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

