import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
  CollectionProp,
  GetSpaceEnvironmentParams,
  GetSpaceParams,
  QueryParams,
} from '../../../common-types'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import type { AiActionProps, CreateAiActionProps } from '../../../entities/ai-action'
import type { AiActionInvocationType } from '../../../entities/ai-action-invocation'

export const get: RestEndpoint<'AiAction', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { aiActionId: string },
  headers?: RawAxiosRequestHeaders
) => {
  return raw.get<AiActionProps>(http, `/spaces/${params.spaceId}/ai/actions/${params.aiActionId}`, {
    headers,
  })
}

export const getMany: RestEndpoint<'AiAction', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceParams & QueryParams,
  headers?: RawAxiosRequestHeaders
) => {
  return raw.get<CollectionProp<AiActionProps>>(http, `/spaces/${params.spaceId}/ai/actions`, {
    params: params.query,
    headers,
  })
}

export const create: RestEndpoint<'AiAction', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceParams,
  data: CreateAiActionProps,
  headers?: RawAxiosRequestHeaders
) => {
  return raw.post<AiActionProps>(http, `/spaces/${params.spaceId}/ai/actions`, data, { headers })
}

export const update: RestEndpoint<'AiAction', 'update'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { aiActionId: string },
  rawData: AiActionProps,
  headers?: RawAxiosRequestHeaders
) => {
  const data = copy(rawData)
  const { sys, ...payload } = data
  return raw.put<AiActionProps>(
    http,
    `/spaces/${params.spaceId}/ai/actions/${params.aiActionId}`,
    payload,
    {
      headers: {
        'X-Contentful-Version': rawData.sys.version ?? 0,
        ...headers,
      },
    }
  )
}

export const del: RestEndpoint<'AiAction', 'delete'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { aiActionId: string },
  headers?: RawAxiosRequestHeaders
) => {
  return raw.del(http, `/spaces/${params.spaceId}/ai/actions/${params.aiActionId}`, { headers })
}

export const publish: RestEndpoint<'AiAction', 'publish'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { aiActionId: string },
  rawData: AiActionProps,
  headers?: RawAxiosRequestHeaders
) => {
  return raw.put<AiActionProps>(
    http,
    `/spaces/${params.spaceId}/ai/actions/${params.aiActionId}/published`,
    null,
    {
      headers: {
        'X-Contentful-Version': rawData.sys.version,
        ...headers,
      },
    }
  )
}

export const unpublish: RestEndpoint<'AiAction', 'unpublish'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { aiActionId: string },
  headers?: RawAxiosRequestHeaders
) => {
  return raw.del(http, `/spaces/${params.spaceId}/ai/actions/${params.aiActionId}/published`, {
    headers,
  })
}

export const invoke: RestEndpoint<'AiAction', 'invoke'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { aiActionId: string },
  data: AiActionInvocationType,
  headers?: RawAxiosRequestHeaders
) => {
  return raw.post(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/ai/actions/${params.aiActionId}/invoke`,
    data,
    { headers }
  )
}
