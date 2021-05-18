/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosInstance } from 'contentful-sdk-core'
import { GetReleaseParams } from '../../../common-types'
import { ReleaseActionQueryOptions } from '../../../entities/release-action'
import { RestEndpoint } from '../types'
import * as raw from './raw'

export const get: RestEndpoint<'ReleaseAction', 'get'> = (
  http: AxiosInstance,
  params: GetReleaseParams & { actionId: string }
) => {
  return raw.get(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/actions/${params.actionId}`
  )
}

export const query: RestEndpoint<'ReleaseAction', 'query'> = (
  http: AxiosInstance,
  params: GetReleaseParams & { query?: ReleaseActionQueryOptions }
) => {
  return raw.get(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/actions`,
    {
      params: params.query,
    }
  )
}
