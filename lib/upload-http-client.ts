import { AxiosInstance } from 'axios'

type SdkHttpClient = AxiosInstance & {
  httpClientParams: Record<string, any>
  cloneWithNewParams: (newParams: Record<string, any>) => SdkHttpClient
}

export function getUploadHttpClient(http: AxiosInstance): AxiosInstance {
  const sdkHttp = http as SdkHttpClient
  const { hostUpload, defaultHostnameUpload } = sdkHttp.httpClientParams
  const uploadHttp = sdkHttp.cloneWithNewParams({
    host: hostUpload || defaultHostnameUpload,
  })
  return uploadHttp
}
