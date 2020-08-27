import { AxiosInstance } from 'axios'
import * as raw from './raw'
import cloneDeep from 'lodash/cloneDeep'
import { GetOrganizationParams, QueryParams } from './common-types'
import { AppDefinitionProps, CreateAppDefinitionProps } from '../../entities/app-definition'
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
