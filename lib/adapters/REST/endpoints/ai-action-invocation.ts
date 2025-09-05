import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import type { GetSpaceEnvironmentParams } from '../../../common-types.js'
import type { RestEndpoint } from '../types.js'
import * as raw from './raw.js'

export const get: RestEndpoint<'AiActionInvocation', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { aiActionId: string; invocationId: string },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/ai/actions/${params.aiActionId}/invocations/${params.invocationId}`,
    { headers },
  )
}
