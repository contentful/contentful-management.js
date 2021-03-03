/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import * as raw from './raw'

export function get<T = any>(
  http: AxiosInstance,
  { url, config }: { url: string; config?: AxiosRequestConfig }
) {
  return raw.get<T>(http, url, config)
}

export function post<T = any>(
  http: AxiosInstance,
  { url, config }: { url: string; config?: AxiosRequestConfig },
  payload?: any
) {
  return raw.post<T>(http, url, config, payload)
}

export function put<T = any>(
  http: AxiosInstance,
  { url, config }: { url: string; config?: AxiosRequestConfig },
  payload?: any
) {
  return raw.put<T>(http, url, config, payload)
}

export function del<T = any>(
  http: AxiosInstance,
  { url, config }: { url: string; config?: AxiosRequestConfig }
) {
  return raw.del<T>(http, url, config)
}

export function request<T = any>(
  http: AxiosInstance,
  { url, config }: { url: string; config?: AxiosRequestConfig }
) {
  return raw.http<T>(http, url, config)
}
