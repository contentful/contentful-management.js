/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosInstance, RawAxiosRequestConfig } from 'axios'
import { errorHandler } from 'contentful-sdk-core'

function getBaseUrl(http: AxiosInstance) {
  return http.defaults.baseURL?.split('/spaces')[0]
}

export function get<T = any>(http: AxiosInstance, url: string, config?: RawAxiosRequestConfig) {
  return http
    .get<T>(url, {
      baseURL: getBaseUrl(http),
      ...config,
    })
    .then((response) => response.data, errorHandler)
}

export function patch<T = any>(
  http: AxiosInstance,
  url: string,
  payload?: any,
  config?: RawAxiosRequestConfig
) {
  return http
    .patch<T>(url, payload, {
      baseURL: getBaseUrl(http),
      ...config,
    })
    .then((response) => response.data, errorHandler)
}

export function post<T = any>(
  http: AxiosInstance,
  url: string,
  payload?: any,
  config?: RawAxiosRequestConfig
) {
  return http
    .post<T>(url, payload, {
      baseURL: getBaseUrl(http),
      ...config,
    })
    .then((response) => response.data, errorHandler)
}

export function put<T = any>(
  http: AxiosInstance,
  url: string,
  payload?: any,
  config?: RawAxiosRequestConfig
) {
  return http
    .put<T>(url, payload, {
      baseURL: getBaseUrl(http),
      ...config,
    })
    .then((response) => response.data, errorHandler)
}

export function del<T = any>(http: AxiosInstance, url: string, config?: RawAxiosRequestConfig) {
  return http
    .delete<T>(url, {
      baseURL: getBaseUrl(http),
      ...config,
    })
    .then((response) => response.data, errorHandler)
}

export function http<T = any>(
  http: AxiosInstance,
  url: string,
  config?: Omit<RawAxiosRequestConfig, 'url'>
) {
  return http(url, {
    baseURL: getBaseUrl(http),
    ...config,
  }).then((response) => response.data as T, errorHandler)
}
