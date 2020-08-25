import { AxiosInstance } from 'axios'
import * as raw from './raw'
import errorHandler from '../../error-handler'
import { CreateAssetProps, AssetProps, AssetFileProp } from '../../entities/asset'
import { normalizeSelect } from './utils'
import cloneDeep from 'lodash/cloneDeep'
import { create as createUpload } from './upload'

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
  const data = cloneDeep(rawData)
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
  const data = cloneDeep(rawData)

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
  const data = cloneDeep(rawData)

  return raw.put<AssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}`,
    data
  )
}

export const createFromFiles = (httpUpload: AxiosInstance) => (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  data: Omit<AssetFileProp, 'sys'>
) => {
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
