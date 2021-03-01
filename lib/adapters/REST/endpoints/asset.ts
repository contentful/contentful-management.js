import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import errorHandler from '../../error-handler'
import {
  CreateAssetProps,
  AssetProps,
  AssetFileProp,
  AssetProcessingForLocale,
} from '../../entities/asset'
import { normalizeSelect } from './utils'
import copy from 'fast-copy'
import { create as createUpload } from './upload'
import { getUploadHttpClient } from '../../upload-http-client'

import { QueryParams, CollectionProp, GetSpaceEnvironmentParams } from './common-types'

export const get = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { assetId: string } & QueryParams
) => {
  return raw.get<AssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}`,
    {
      params: normalizeSelect(params.query),
    }
  )
}

export const getMany = (http: AxiosInstance, params: GetSpaceEnvironmentParams & QueryParams) => {
  return raw.get<CollectionProp<AssetProps>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets`,
    {
      params: normalizeSelect(params.query),
    }
  )
}

export const update = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { assetId: string },
  rawData: AssetProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)
  delete data.sys
  return raw.put<AssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}`,
    data,
    {
      headers: {
        'X-Contentful-Version': rawData.sys.version ?? 0,
        ...headers,
      },
    }
  )
}

export const del = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { assetId: string }
) => {
  return raw.del(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}`
  )
}

export const publish = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { assetId: string },
  rawData: AssetProps
) => {
  return raw.put<AssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}/published`,
    null,
    {
      headers: {
        'X-Contentful-Version': rawData.sys.version ?? 0,
      },
    }
  )
}

export const unpublish = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { assetId: string }
) => {
  return raw.del<AssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}/published`
  )
}

export const archive = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { assetId: string }
) => {
  return raw.put<AssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}/archived`
  )
}

export const unarchive = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { assetId: string }
) => {
  return raw.del<AssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}/archived`
  )
}

export const create = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: CreateAssetProps
) => {
  const data = copy(rawData)

  return raw.post<AssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets`,
    data
  )
}

export const createWithId = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { assetId: string },
  rawData: CreateAssetProps
) => {
  const data = copy(rawData)

  return raw.put<AssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}`,
    data
  )
}

export const createFromFiles = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  data: Omit<AssetFileProp, 'sys'>
) => {
  const httpUpload = getUploadHttpClient(http)

  const { file } = data.fields
  return Promise.all(
    Object.keys(file).map((locale) => {
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
      return create(http, params, asset)
    })
    .catch(errorHandler)
}

/**
 * Asset processing
 */

const ASSET_PROCESSING_CHECK_WAIT = 3000
const ASSET_PROCESSING_CHECK_RETRIES = 10

function checkIfAssetHasUrl(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { assetId: string },
  {
    resolve,
    reject,
    locale,
    processingCheckWait = ASSET_PROCESSING_CHECK_WAIT,
    processingCheckRetries = ASSET_PROCESSING_CHECK_RETRIES,
    checkCount = 0,
  }: {
    resolve: (asset: AssetProps) => unknown
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

export function processForLocale(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  asset: AssetProps,
  locale: string,
  { processingCheckWait, processingCheckRetries }: AssetProcessingForLocale = {}
) {
  return raw
    .put<AssetProps>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${asset.sys.id}/files/${locale}/process`,
      null,
      {
        headers: {
          'X-Contentful-Version': asset.sys.version,
        },
      }
    )
    .then(() => {
      return new Promise<AssetProps>((resolve, reject) =>
        checkIfAssetHasUrl(
          http,
          {
            spaceId: params.spaceId,
            environmentId: params.environmentId,
            assetId: asset.sys.id,
          },
          {
            resolve: resolve,
            reject: reject,
            locale: locale,
            processingCheckWait: processingCheckWait,
            processingCheckRetries: processingCheckRetries,
          }
        )
      )
    })
}

export function processForAllLocales(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  asset: AssetProps,
  options: AssetProcessingForLocale = {}
) {
  const locales = Object.keys(asset.fields.file || {})

  let mostUpToDateAssetVersion: AssetProps = asset

  // Let all the locales process
  // Since they all resolve at different times,
  // we need to pick the last resolved value
  // to reflect the most recent state
  const allProcessingLocales = locales.map((locale) =>
    processForLocale(http, params, asset, locale, options).then((result) => {
      // Side effect of always setting the most up to date asset version
      // The last one to call this will be the last one that finished
      // and thus the most up to date
      mostUpToDateAssetVersion = result
    })
  )

  return Promise.all(allProcessingLocales).then(() => mostUpToDateAssetVersion)
}
