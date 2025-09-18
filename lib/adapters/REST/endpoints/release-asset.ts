import type { RawAxiosRequestHeaders } from 'axios'
import { errorHandler, type AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { SetOptional } from 'type-fest'
import type {
  CollectionProp,
  CreateReleaseAssetParams,
  CreateWithFilesReleaseAssetParams,
  CreateWithIdReleaseAssetParams,
  GetManyReleaseAssetParams,
  GetReleaseAssetParams,
  Link,
  ProcessForAllLocalesReleaseAssetParams,
  ProcessForLocaleReleaseAssetParams,
  QueryParams,
  UpdateReleaseAssetParams,
} from '../../../common-types'
import type {
  AssetFileProp,
  AssetProcessingForLocale,
  AssetProps,
  CreateAssetProps,
} from '../../../entities/asset'
import { getUploadHttpClient } from '../../../upload-http-client'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import { create as createUpload } from './upload'
import { normalizeSelect } from './utils'

type ReleaseAssetProps = AssetProps<{ release: Link<'Release'> }>

export const get: RestEndpoint<'ReleaseAsset', 'get'> = (
  http: AxiosInstance,
  params: GetReleaseAssetParams & QueryParams,
  rawData?: unknown,
  headers?: RawAxiosRequestHeaders
) => {
  return raw.get<ReleaseAssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/assets/${params.assetId}`,
    {
      params: normalizeSelect(params.query),
      headers: headers ? { ...headers } : undefined,
    }
  )
}

export const getMany: RestEndpoint<'ReleaseAsset', 'getMany'> = (
  http: AxiosInstance,
  params: GetManyReleaseAssetParams & QueryParams,
  rawData?: unknown,
  headers?: RawAxiosRequestHeaders
) => {
  params.query = { ...params.query, 'sys.schemaVersion': 'Release.V2' }

  return raw.get<CollectionProp<ReleaseAssetProps>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/assets`,
    {
      params: normalizeSelect(params.query),
      headers: headers ? { ...headers } : undefined,
    }
  )
}

export const update: RestEndpoint<'ReleaseAsset', 'update'> = (
  http: AxiosInstance,
  params: UpdateReleaseAssetParams & QueryParams,
  rawData: AssetProps,
  headers?: RawAxiosRequestHeaders
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys
  return raw.put<ReleaseAssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/assets/${params.assetId}`,
    data,
    {
      headers: {
        'X-Contentful-Version': rawData.sys.version ?? 0,
        ...headers,
      },
    }
  )
}

export const create: RestEndpoint<'ReleaseAsset', 'create'> = (
  http: AxiosInstance,
  params: CreateReleaseAssetParams,
  rawData: CreateAssetProps,
  headers?: RawAxiosRequestHeaders
) => {
  const data = copy(rawData)

  return raw.post<ReleaseAssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/assets`,
    data,
    {
      headers,
    }
  )
}

export const createWithId: RestEndpoint<'ReleaseAsset', 'createWithId'> = (
  http: AxiosInstance,
  params: CreateWithIdReleaseAssetParams,
  rawData: CreateAssetProps,
  headers?: RawAxiosRequestHeaders
) => {
  const data = copy(rawData)

  return raw.put<ReleaseAssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/assets/${params.assetId}`,
    data,
    {
      headers,
    }
  )
}

export const createFromFiles: RestEndpoint<'ReleaseAsset', 'createFromFiles'> = async (
  http: AxiosInstance,
  params: CreateWithFilesReleaseAssetParams,
  data: Omit<AssetFileProp, 'sys'>
) => {
  const httpUpload = getUploadHttpClient(http, { uploadTimeout: params.uploadTimeout })

  const { file } = data.fields
  return Promise.all(
    Object.keys(file).map(async (locale) => {
      const { contentType, fileName } = file[locale]

      return createUpload(httpUpload, params, file[locale]).then((upload) => {
        return {
          [locale]: {
            contentType,
            fileName,
            uploadFrom: {
              sys: {
                type: 'Link',
                linkType: 'Upload',
                id: upload.sys.id,
              },
            },
          },
        }
      })
    })
  )
    .then((uploads) => {
      const file = uploads.reduce((fieldsData, upload) => ({ ...fieldsData, ...upload }), {})
      const asset = {
        ...data,
        fields: {
          ...data.fields,
          file,
        },
      }
      return create(http, params, asset, {})
    })
    .catch(errorHandler)
}

/**
 * Asset processing
 */

const ASSET_PROCESSING_CHECK_WAIT = 3000
const ASSET_PROCESSING_CHECK_RETRIES = 10

async function checkIfAssetHasUrl(
  http: AxiosInstance,
  params: GetReleaseAssetParams,
  {
    resolve,
    reject,
    locale,
    processingCheckWait = ASSET_PROCESSING_CHECK_WAIT,
    processingCheckRetries = ASSET_PROCESSING_CHECK_RETRIES,
    checkCount = 0,
  }: {
    resolve: (asset: ReleaseAssetProps) => unknown
    reject: (err: Error) => unknown
    locale: string
    checkCount?: number
  } & AssetProcessingForLocale
) {
  return get(http, params).then((asset) => {
    if (asset.fields.file[locale].url) {
      resolve(asset)
    } else if (checkCount === processingCheckRetries) {
      const error = new Error()
      error.name = 'AssetProcessingTimeout'
      error.message = 'Asset is taking longer then expected to process.'
      reject(error)
    } else {
      checkCount++
      setTimeout(
        () =>
          checkIfAssetHasUrl(http, params, {
            resolve: resolve,
            reject: reject,
            locale: locale,
            checkCount: checkCount,
            processingCheckWait,
            processingCheckRetries,
          }),
        processingCheckWait
      )
    }
  })
}

export const processForLocale: RestEndpoint<'ReleaseAsset', 'processForLocale'> = async (
  http: AxiosInstance,
  {
    asset,
    locale,
    options: { processingCheckRetries, processingCheckWait } = {},
    ...params
  }: ProcessForLocaleReleaseAssetParams
) => {
  return raw
    .put<ReleaseAssetProps>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${asset.sys.release.sys.id}/assets/${asset.sys.id}/files/${locale}/process`,
      null,
      {
        headers: {
          'X-Contentful-Version': asset.sys.version,
        },
      }
    )
    .then(() => {
      return new Promise<ReleaseAssetProps>((resolve, reject) =>
        checkIfAssetHasUrl(
          http,
          {
            spaceId: params.spaceId,
            environmentId: params.environmentId,
            assetId: asset.sys.id,
            releaseId: asset.sys.release.sys.id,
          },
          {
            resolve,
            reject,
            locale,
            processingCheckWait,
            processingCheckRetries,
          }
        )
      )
    })
}

export const processForAllLocales: RestEndpoint<'ReleaseAsset', 'processForAllLocales'> = async (
  http: AxiosInstance,
  { asset, options = {}, ...params }: ProcessForAllLocalesReleaseAssetParams
) => {
  const locales = Object.keys(asset.fields.file || {})

  let mostUpToDateAssetVersion: ReleaseAssetProps = asset

  // Let all the locales process
  // Since they all resolve at different times,
  // we need to pick the last resolved value
  // to reflect the most recent state
  const allProcessingLocales = locales.map((locale) =>
    processForLocale(http, { ...params, asset, locale, options }).then((result) => {
      // Side effect of always setting the most up to date asset version
      // The last one to call this will be the last one that finished
      // and thus the most up to date
      mostUpToDateAssetVersion = result
    })
  )

  return Promise.all(allProcessingLocales).then(() => mostUpToDateAssetVersion)
}
