import type { AxiosInstance } from 'contentful-sdk-core'

type UploadHttpClientOpts = {
  uploadTimeout?: number
}

/**
 * @private
 */
export function getUploadHttpClient(
  http: AxiosInstance,
  options?: UploadHttpClientOpts
): AxiosInstance {
  const { hostUpload, defaultHostnameUpload, timeout } = http.httpClientParams as Record<
    string,
    any
  >
  const uploadHttp = http.cloneWithNewParams({
    host: hostUpload || defaultHostnameUpload,
    // Using client presets, options or 5 minute default timeout
    timeout: timeout ?? options?.uploadTimeout ?? 300000,
  })
  return uploadHttp
}
