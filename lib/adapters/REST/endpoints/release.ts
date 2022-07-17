import { AxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import { GetReleaseParams, GetSpaceEnvironmentParams } from '../../../common-types'
import {
  ReleasePayload,
  ReleaseQueryOptions,
  ReleaseValidatePayload,
} from '../../../entities/release'
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
  params: GetSpaceEnvironmentParams & { query?: ReleaseQueryOptions }
) => {
  return raw.get(http, `/spaces/${params.spaceId}/environments/${params.environmentId}/releases`, {
    params: params.query,
  })
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
  headers?: AxiosRequestHeaders
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

export const publish: RestEndpoint<'Release', 'publish'> = (
  http: AxiosInstance,
  params: GetReleaseParams & { version: number },
  headers?: AxiosRequestHeaders
) => {
  return raw.put(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/published`,
    null,
    {
      headers: {
        'X-Contentful-Version': params.version,
        ...headers,
      },
    }
  )
}

export const unpublish: RestEndpoint<'Release', 'unpublish'> = (
  http: AxiosInstance,
  params: GetReleaseParams & { version: number },
  headers?: AxiosRequestHeaders
) => {
  return raw.del(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/published`,
    {
      headers: {
        'X-Contentful-Version': params.version,
        ...headers,
      },
    }
  )
}

export const validate: RestEndpoint<'Release', 'validate'> = (
  http: AxiosInstance,
  params: GetReleaseParams,
  payload?: ReleaseValidatePayload
) => {
  return raw.post(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/validate`,
    payload
  )
}

export const archive: RestEndpoint<'Release', 'archive'> = (
  http: AxiosInstance,
  params: GetReleaseParams & { version: string | number }
) => {
  return raw.put(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/archived`,
    null,
    {
      headers: {
        'X-Contentful-Version': params.version,
      },
    }
  )
}

export const unarchive: RestEndpoint<'Release', 'unarchive'> = (
  http: AxiosInstance,
  params: GetReleaseParams & { version: string | number }
) => {
  return raw.del(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/archived`,
    {
      headers: {
        'X-Contentful-Version': params.version,
      },
    }
  )
}
