import type { AxiosInstance } from 'contentful-sdk-core'

/**
 * @private
 */
export function getUploadHttpClient(http: AxiosInstance): AxiosInstance {
  const { hostUpload, defaultHostnameUpload } = http.httpClientParams as Record<string, any>
  const uploadHttp = http.cloneWithNewParams({
    host: hostUpload || defaultHostnameUpload,
  })
  return uploadHttp
}
