import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import type { GetSpaceEnvironmentParams } from '../../../common-types'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import type { AiActionInvocationType } from '../../../entities/ai-action-invocation'

export const invoke: RestEndpoint<'AiActionInvocation', 'invoke'> = (
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

export const getInvocation: RestEndpoint<'AiActionInvocation', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { aiActionId: string; invocationId: string },
  headers?: RawAxiosRequestHeaders
) => {
  return raw.get(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/ai/actions/${params.aiActionId}/invocations/${params.invocationId}`,
    { headers }
  )
}
