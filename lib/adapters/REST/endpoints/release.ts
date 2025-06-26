import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import type { GetReleaseEnvironmentParams, GetReleaseParams } from '../../../common-types'
import type {
  ReleasePayload,
  ReleasePayloadV2,
  ReleaseQueryOptions,
  ReleaseValidatePayload,
} from '../../../entities/release'
import type { RestEndpoint } from '../types'
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
  params: GetReleaseEnvironmentParams & { query?: ReleaseQueryOptions }
) => {
  // Set the schema version in the query if provided in params or query options
  const releaseSchemaVersion =
    params.query?.['sys.schemaVersion'] ?? params.releaseSchemaVersion ?? undefined

  if (releaseSchemaVersion !== undefined) {
    params.query = { ...params.query, 'sys.schemaVersion': releaseSchemaVersion }
  }

  return raw.get(http, `/spaces/${params.spaceId}/environments/${params.environmentId}/releases`, {
    params: params.query,
  })
}

export const create: RestEndpoint<'Release', 'create'> = (
  http: AxiosInstance,
  params: GetReleaseEnvironmentParams,
  payload: ReleasePayload | ReleasePayloadV2
) => {
  const releaseSchemaVersion = payload.sys?.schemaVersion ?? params.releaseSchemaVersion

  if (releaseSchemaVersion === 'Release.v2') {
    payload.sys = { ...payload.sys, type: 'Release', schemaVersion: 'Release.v2' }
  }
  return raw.post(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases`,
    payload
  )
}

export const update: RestEndpoint<'Release', 'update'> = (
  http: AxiosInstance,
  params: GetReleaseParams & { version: number },
  payload: ReleasePayload | ReleasePayloadV2,
  headers?: RawAxiosRequestHeaders
) => {
  const releaseSchemaVersion = payload.sys?.schemaVersion ?? params.releaseSchemaVersion

  if (releaseSchemaVersion === 'Release.v2') {
    payload.sys = { ...payload.sys, type: 'Release', schemaVersion: 'Release.v2' }
  }
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
  headers?: RawAxiosRequestHeaders
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
  headers?: RawAxiosRequestHeaders
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
