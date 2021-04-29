/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { RestEndpoint } from '../types'
import * as raw from './raw'

export const get: RestEndpoint<'Http', 'get'> = <T = any>(
  http: AxiosInstance,
  { url, config }: { url: string; config?: AxiosRequestConfig }
) => {
  return raw.get<T>(http, url, config)
}

export const post: RestEndpoint<'Http', 'post'> = <T = any>(
  http: AxiosInstance,
  { url, config }: { url: string; config?: AxiosRequestConfig },
  payload?: any
) => {
  return raw.post<T>(http, url, payload, config)
}

export const put: RestEndpoint<'Http', 'put'> = <T = any>(
  http: AxiosInstance,
  { url, config }: { url: string; config?: AxiosRequestConfig },
  payload?: any
) => {
  return raw.put<T>(http, url, payload, config)
}

export const del: RestEndpoint<'Http', 'delete'> = <T = any>(
  http: AxiosInstance,
  { url, config }: { url: string; config?: AxiosRequestConfig }
) => {
  return raw.del<T>(http, url, config)
}

export const request: RestEndpoint<'Http', 'request'> = <T = any>(
  http: AxiosInstance,
  { url, config }: { url: string; config?: AxiosRequestConfig }
) => {
  return raw.http<T>(http, url, config)
}
