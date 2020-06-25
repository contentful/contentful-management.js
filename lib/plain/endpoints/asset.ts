import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { CreateAssetProps, AssetProps } from '../../entities/asset'
import { normalizeSelect } from './utils'
import cloneDeep from 'lodash/cloneDeep'
import { GetEnvironmentParams } from './environment'
import { QueryParams, CollectionProp } from './common-types'

export type GetManyAssetsParams = GetEnvironmentParams & QueryParams

export const get = (
  http: AxiosInstance,
  params: GetEnvironmentParams & { assetId: string } & QueryParams
) => {
  return raw.get<AssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}`,
    {
      params: normalizeSelect(params.query),
    }
  )
}

export const getMany = (http: AxiosInstance, params: GetManyAssetsParams) => {
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
  params: GetEnvironmentParams & { assetId: string },
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

export const del = (http: AxiosInstance, params: GetEnvironmentParams & { assetId: string }) => {
  return raw.del(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}`
  )
}

export const publish = (
  http: AxiosInstance,
  params: GetEnvironmentParams & { assetId: string },
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
  params: GetEnvironmentParams & { assetId: string }
) => {
  return raw.del<AssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}/published`
  )
}

export const archive = (
  http: AxiosInstance,
  params: GetEnvironmentParams & { assetId: string }
) => {
  return raw.put<AssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}/archived`
  )
}

export const unarchive = (
  http: AxiosInstance,
  params: GetEnvironmentParams & { assetId: string }
) => {
  return raw.del<AssetProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}/archived`
  )
}

export const create = (
  http: AxiosInstance,
  params: GetEnvironmentParams,
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
  params: GetEnvironmentParams & { assetId: string },
  rawData: CreateAssetProps
) => {
  const data = cloneDeep(rawData)

  return raw.put<AssetProps>(http, `assets/${params.assetId}`, data)
}
