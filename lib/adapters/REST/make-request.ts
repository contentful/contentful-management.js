import type { AxiosInstance } from 'contentful-sdk-core'
import type { MakeRequestOptions, MakeRequestPayload } from '../../common-types'
import type { OpPatch } from 'json-patch'
import type { RawAxiosRequestHeaders } from 'axios'
import endpoints from './endpoints'

type makeAxiosRequest = MakeRequestOptions & {
  axiosInstance: AxiosInstance
}
export const makeRequest = async <R>({
  axiosInstance,
  entityType,
  action: actionInput,
  params,
  payload,
  headers,
  userAgent,
}: makeAxiosRequest): Promise<R> => {
  // `delete` is a reserved keyword. Therefore, the methods are called `del`.
  const action = actionInput === 'delete' ? 'del' : actionInput

  const endpoint: (
    http: AxiosInstance,
    params?: Record<string, unknown>,
    payload?: Record<string, unknown> | OpPatch[] | MakeRequestPayload,
    headers?: RawAxiosRequestHeaders
  ) => Promise<R> =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    endpoints[entityType]?.[action]

  if (endpoint === undefined) {
    throw new Error('Unknown endpoint')
  }

  const response = await endpoint(axiosInstance, params, payload, {
    ...headers,
    // overwrite the userAgent with the one passed in the request
    ...(userAgent ? { 'X-Contentful-User-Agent': userAgent } : {}),
  })

  if (response instanceof ReadableStream) {
    return await new Response(response).json()
  }

  return response
}
