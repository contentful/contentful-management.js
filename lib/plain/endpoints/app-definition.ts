import { AxiosInstance } from 'axios'
import * as raw from './raw'
import cloneDeep from 'lodash/cloneDeep'
import { GetOrganizationParams, QueryParams } from './common-types'
import { AppDefinitionProps } from '../../entities/app-definition'
import { normalizeSelect } from './utils'
import { CollectionProp } from '../../common-types'

type GetAppDefinitionParams = GetOrganizationParams & { appDefinitionId: string }

const getBaseUrl = (params: GetOrganizationParams) =>
  `/organizations/${params.organizationId}/app_definitions`

export const getAppDefinitionUrl = (params: GetAppDefinitionParams) =>
  getBaseUrl(params) + `/${params.appDefinitionId}`

export const get = (http: AxiosInstance, params: GetAppDefinitionParams & QueryParams) => {
  return raw.get<AppDefinitionProps>(http, getAppDefinitionUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const getMany = (http: AxiosInstance, params: GetOrganizationParams & QueryParams) => {
  return raw.get<CollectionProp<AppDefinitionProps>>(http, getBaseUrl(params), {
    params: params.query,
  })
}

export const create = (http: AxiosInstance, params: GetAppDefinitionParams, rawData: ) => {
  const data = cloneDeep(rawData)

  return raw.post<AppDefinitionProps>(http, getBaseUrl(params), data)
}
