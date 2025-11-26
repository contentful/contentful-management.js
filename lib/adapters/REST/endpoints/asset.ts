import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import { errorHandler } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { SetOptional } from 'type-fest'
import type {
  CollectionProp,
  CreateReleaseAssetParams,
  CreateWithFilesReleaseAssetParams,
  CreateWithIdReleaseAssetParams,
  GetReleaseAssetParams,
  GetSpaceEnvironmentParams,
  Link,
  QueryParams,
  UpdateReleaseAssetParams,
} from '../../../common-types.js'
import type {
  AssetFileProp,
  AssetProcessingForLocale,
  AssetProps,
  CreateAssetProps,
} from '../../../entities/asset.js'
import { getUploadHttpClient } from '../../../upload-http-client.js'
import type { RestEndpoint } from '../types.js'
import * as raw from './raw.js'
import { create as createUpload } from './upload.js'
import { normalizeSelect } from './utils.js'
import * as releaseAsset from './release-asset.js'

export const get: RestEndpoint<'Asset', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { assetId: string; releaseId?: string } & QueryParams,
  rawData?: unknown,
  headers?: RawAxiosRequestHeaders,
) => {
  if (params.releaseId) {
    return releaseAsset.get(http, params as GetReleaseAssetParams)
  }

  return raw.get<AssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}`,
    {
      params: normalizeSelect(params.query),
      headers: headers ? { ...headers } : undefined,
    },
  )
}

export const getPublished: RestEndpoint<'Asset', 'getPublished'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & QueryParams,
  rawData?: unknown,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<CollectionProp<AssetProps>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/public/assets`,
    {
      params: normalizeSelect(params.query),
      headers: headers ? { ...headers } : undefined,
    },
  )
}

export const getMany: RestEndpoint<'Asset', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & QueryParams & { releaseId?: string },
  rawData?: unknown,
  headers?: RawAxiosRequestHeaders,
) => {
  if (params.releaseId) {
    return releaseAsset.getMany(http, params as GetReleaseAssetParams)
  }

  return raw.get<CollectionProp<AssetProps>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets`,
    {
      params: normalizeSelect(params.query),
      headers: headers ? { ...headers } : undefined,
    },
  )
}

export const update: RestEndpoint<'Asset', 'update'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { assetId: string; releaseId?: string },
  rawData: AssetProps,
  headers?: RawAxiosRequestHeaders,
) => {
  if (params.releaseId) {
    return releaseAsset.update(http, params as UpdateReleaseAssetParams, rawData, headers ?? {})
  }

  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
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
    },
  )
}

export const del: RestEndpoint<'Asset', 'delete'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { assetId: string },
) => {
  return raw.del(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}`,
  )
}

export const publish: RestEndpoint<'Asset', 'publish'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { assetId: string; locales?: string[] },
  rawData: AssetProps,
) => {
  const payload = params.locales?.length ? { add: { fields: { '*': params.locales } } } : null

  return raw.put<AssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}/published`,
    payload,
    {
      headers: {
        'X-Contentful-Version': rawData.sys.version ?? 0,
      },
    },
  )
}

export const unpublish: RestEndpoint<'Asset', 'unpublish'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { assetId: string; locales?: string[] },
  rawData?: AssetProps,
) => {
  if (params.locales?.length) {
    const payload = { remove: { fields: { '*': params.locales } } }
    return raw.put<AssetProps>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}/published`,
      payload,
      {
        headers: {
          'X-Contentful-Version': rawData?.sys.version,
        },
      },
    )
  } else {
    return raw.del<AssetProps>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}/published`,
    )
  }
}

export const archive: RestEndpoint<'Asset', 'archive'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { assetId: string },
) => {
  return raw.put<AssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}/archived`,
  )
}

export const unarchive: RestEndpoint<'Asset', 'unarchive'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { assetId: string },
) => {
  return raw.del<AssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}/archived`,
  )
}

export const create: RestEndpoint<'Asset', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { releaseId?: string },
  rawData: CreateAssetProps,
) => {
  if (params.releaseId) {
    return releaseAsset.create(http, params as CreateReleaseAssetParams, rawData, {})
  }

  const data = copy(rawData)

  return raw.post<AssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets`,
    data,
  )
}

export const createWithId: RestEndpoint<'Asset', 'createWithId'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { assetId: string; releaseId?: string },
  rawData: CreateAssetProps,
) => {
  if (params.releaseId) {
    return releaseAsset.createWithId(http, params as CreateWithIdReleaseAssetParams, rawData, {})
  }

  const data = copy(rawData)

  return raw.put<AssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}`,
    data,
  )
}

export const createFromFiles: RestEndpoint<'Asset', 'createFromFiles'> = async (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { uploadTimeout?: number; releaseId?: string },
  data: Omit<AssetFileProp, 'sys'>,
) => {
  if (params.releaseId) {
    return releaseAsset.createFromFiles(http, params as CreateWithFilesReleaseAssetParams, data, {})
  }

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
    }),
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

async function checkIfAssetHasUrl(
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
  } & AssetProcessingForLocale,
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
        processingCheckWait,
      )
    }
  })
}

export const processForLocale: RestEndpoint<'Asset', 'processForLocale'> = async (
  http: AxiosInstance,
  {
    asset,
    locale,
    options: { processingCheckRetries, processingCheckWait } = {},
    ...params
  }: GetSpaceEnvironmentParams & {
    asset: AssetProps
    locale: string
    options?: AssetProcessingForLocale
  },
) => {
  if (asset.sys.release) {
    return releaseAsset.processForLocale(http, {
      asset: asset as AssetProps<{ release: Link<'Release'> }>,
      locale,
      options: { processingCheckRetries, processingCheckWait },
      ...params,
    })
  }

  return raw
    .put<AssetProps>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${asset.sys.id}/files/${locale}/process`,
      null,
      {
        headers: {
          'X-Contentful-Version': asset.sys.version,
        },
      },
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
            resolve,
            reject,
            locale,
            processingCheckWait,
            processingCheckRetries,
          },
        ),
      )
    })
}

export const processForAllLocales: RestEndpoint<'Asset', 'processForAllLocales'> = async (
  http: AxiosInstance,
  {
    asset,
    options = {},
    ...params
  }: GetSpaceEnvironmentParams & { asset: AssetProps; options?: AssetProcessingForLocale },
) => {
  if (asset.sys.release) {
    return releaseAsset.processForAllLocales(http, {
      asset: asset as AssetProps<{ release: Link<'Release'> }>,
      options,
      ...params,
    })
  }

  const locales = Object.keys(asset.fields.file || {})

  let mostUpToDateAssetVersion: AssetProps = asset

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
    }),
  )

  return Promise.all(allProcessingLocales).then(() => mostUpToDateAssetVersion)
}
