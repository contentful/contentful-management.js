/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosInstance, RawAxiosRequestConfig } from 'axios'
import type { RestEndpoint } from '../types.js'
import * as raw from './raw.js'

export const get: RestEndpoint<'Http', 'get'> = <T = any>(
  http: AxiosInstance,
  { url, config }: { url: string; config?: RawAxiosRequestConfig }
) => {
  return raw.get<T>(http, url, config)
}

export const post: RestEndpoint<'Http', 'post'> = <T = any>(
  http: AxiosInstance,
  { url, config }: { url: string; config?: RawAxiosRequestConfig },
  payload?: any
) => {
  return raw.post<T>(http, url, payload, config)
}

export const put: RestEndpoint<'Http', 'put'> = <T = any>(
  http: AxiosInstance,
  { url, config }: { url: string; config?: RawAxiosRequestConfig },
  payload?: any
) => {
  return raw.put<T>(http, url, payload, config)
}

export const patch: RestEndpoint<'Http', 'patch'> = <T = any>(
  http: AxiosInstance,
  { url, config }: { url: string; config?: RawAxiosRequestConfig },
  payload?: any
) => {
  return raw.patch<T>(http, url, payload, config)
}

export const del: RestEndpoint<'Http', 'delete'> = <T = any>(
  http: AxiosInstance,
  { url, config }: { url: string; config?: RawAxiosRequestConfig }
) => {
  return raw.del<T>(http, url, config)
}

export const request: RestEndpoint<'Http', 'request'> = <T = any>(
  http: AxiosInstance,
  { url, config }: { url: string; config?: RawAxiosRequestConfig }
) => {
  return raw.http<T>(http, url, config)
}
