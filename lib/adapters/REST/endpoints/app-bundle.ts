import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import { normalizeSelect } from './utils'
import type {
  CollectionProp,
  GetAppBundleParams,
  GetAppDefinitionParams,
  QueryParams,
} from '../../../common-types'
import type { RestEndpoint } from '../types'
import type { AppBundleProps, CreateAppBundleProps } from '../../../entities/app-bundle'

const getBaseUrl = (params: GetAppDefinitionParams) =>
  `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/app_bundles`

const getAppBundleUrl = (params: GetAppBundleParams) =>
  `${getBaseUrl(params)}/${params.appBundleId}`

export const get: RestEndpoint<'AppBundle', 'get'> = (
  http: AxiosInstance,
  params: GetAppBundleParams,
) => {
  return raw.get<AppBundleProps>(http, getAppBundleUrl(params))
}

export const getMany: RestEndpoint<'AppBundle', 'getMany'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams & QueryParams,
) => {
  return raw.get<CollectionProp<AppBundleProps>>(http, getBaseUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const del: RestEndpoint<'AppBundle', 'delete'> = (
  http: AxiosInstance,
  params: GetAppBundleParams,
) => {
  return raw.del<void>(http, getAppBundleUrl(params))
}

export const create: RestEndpoint<'AppBundle', 'create'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams,
  payload: CreateAppBundleProps,
) => {
  const { appUploadId, comment, actions, functions } = payload

  const data = {
    upload: {
      sys: {
        type: 'Link',
        linkType: 'AppUpload',
        id: appUploadId,
      },
    },
    comment,
    actions,
    functions,
  }

  return raw.post<AppBundleProps>(http, getBaseUrl(params), data)
}
