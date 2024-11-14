/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosInstance } from 'contentful-sdk-core'
import type { GetReleaseParams, GetSpaceEnvironmentParams } from '../../../common-types'
import type { ReleaseActionQueryOptions } from '../../../entities/release-action'
import type { RestEndpoint } from '../types'
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

export const getMany: RestEndpoint<'ReleaseAction', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query?: ReleaseActionQueryOptions }
) => {
  return raw.get(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/release_actions`,
    {
      params: params.query,
    }
  )
}

export const queryForRelease: RestEndpoint<'ReleaseAction', 'queryForRelease'> = (
  http: AxiosInstance,
  params: GetReleaseParams & { query?: ReleaseActionQueryOptions }
) => {
  return raw.get(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/release_actions`,
    {
      params: {
        'sys.release.sys.id[in]': params.releaseId,
        ...params.query,
      },
    }
  )
}
