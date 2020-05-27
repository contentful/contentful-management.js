import { AxiosInstance, AxiosRequestConfig } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import errorHandler from '../error-handler'

function get<T = any>(http: AxiosInstance, url: string, config?: AxiosRequestConfig) {
  return http
    .get<T>(url, {
      baseURL: http.defaults.baseURL?.replace('/spaces', ''),
      ...config,
    })
    .then((response) => response.data, errorHandler)
}

function update<T = any>(
  http: AxiosInstance,
  url: string,
  payload?: any,
  config?: AxiosRequestConfig
) {
  return http
    .put<T>(url, payload, {
      baseURL: http.defaults.baseURL?.replace('/spaces/', '/'),
      ...config,
    })
    .then((response) => response.data, errorHandler)
}

function del<T = any>(http: AxiosInstance, url: string, config?: AxiosRequestConfig) {
  return http
    .delete<T>(url, {
      baseURL: http.defaults.baseURL?.replace('/spaces/', '/'),
      ...config,
    })
    .then((response) => response.data, errorHandler)
}

/**
 * Space
 */

export const space = {
  get(http: AxiosInstance, params: { spaceId: string }) {
    return get(http, `/spaces/${params.spaceId}`)
  },
  update(http: AxiosInstance, params: { spaceId: string }, raw: any) {
    const data = cloneDeep(raw)
    delete data.sys
    return update(http, `/spaces/${params.spaceId}`, data, {
      headers: {
        'X-Contentful-Version': raw.sys.version ?? 0,
      },
    })
  },
  delete(http: AxiosInstance, params: { spaceId: string }) {
    return del(http, `/spaces/${params.spaceId}`)
  },
}

export const environment = {
  get(http: AxiosInstance, params: { spaceId: string; environmentId: string }) {
    return http
      .get(`/spaces/${params.spaceId}/environments/${params.environmentId}`)
      .then((response) => response.data, errorHandler)
  },
  update(http: AxiosInstance, params: { spaceId: string; environmentId: string }, raw: any) {
    const data = cloneDeep(raw)
    delete data.sys
    return update(http, `/spaces/${params.spaceId}/environments/${params.environmentId}`, data, {
      headers: {
        'X-Contentful-Version': raw.sys.version ?? 0,
      },
    })
  },
}
