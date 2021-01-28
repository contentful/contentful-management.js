/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosInstance, AxiosRequestConfig } from 'axios'
import errorHandler from '../../error-handler'

function getBaseUrl(http: AxiosInstance) {
  return http.defaults.baseURL?.split('/spaces')[0]
}

export function get<T = any>(http: AxiosInstance, url: string, config?: AxiosRequestConfig) {
  return http
    .get<T>(url, {
      baseURL: getBaseUrl(http),
      ...config,
    })
    .then((response) => response.data, errorHandler)
}

export function post<T = any>(
  http: AxiosInstance,
  url: string,
  payload?: any,
  config?: AxiosRequestConfig
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
  config?: AxiosRequestConfig
) {
  return http
    .put<T>(url, payload, {
      baseURL: getBaseUrl(http),
      ...config,
    })
    .then((response) => response.data, errorHandler)
}

export function del<T = any>(http: AxiosInstance, url: string, config?: AxiosRequestConfig) {
  return http
    .delete<T>(url, {
      baseURL: getBaseUrl(http),
      ...config,
    })
    .then((response) => response.data, errorHandler)
}

export function http<T = any>(http: AxiosInstance, url: string, config?: AxiosRequestConfig) {
  return http(url, {
    baseURL: getBaseUrl(http),
    ...config,
  }).then((response) => response.data as T, errorHandler)
}
