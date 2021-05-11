/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosInstance } from 'contentful-sdk-core'
import { GetReleaseParams, GetSpaceEnvironmentParams } from '../../../common-types'
import { ReleasePayload } from '../../../entities/release'
import { RestEndpoint } from '../types'
import * as raw from './raw'

export const get: RestEndpoint<'Release', 'get'> = (
  http: AxiosInstance,
  params: GetReleaseParams
) => {
  return raw.get(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}`
  )
}

export const query: RestEndpoint<'Release', 'query'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams
) => {
  return raw.get(http, `/spaces/${params.spaceId}/environments/${params.environmentId}/releases`)
}

export const create: RestEndpoint<'Release', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  payload: ReleasePayload
) => {
  return raw.post(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases`,
    payload
  )
}

export const update: RestEndpoint<'Release', 'update'> = (
  http: AxiosInstance,
  params: GetReleaseParams & { version: number },
  payload: ReleasePayload,
  headers?: Record<string, unknown>
) => {
  return raw.put(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}`,
    payload,
    {
      headers: {
        'X-Contentful-Version': params.version,
        ...headers,
      },
    }
  )
}

export const del: RestEndpoint<'Release', 'delete'> = (
  http: AxiosInstance,
  params: GetReleaseParams
) => {
  return raw.del(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}`
  )
}
