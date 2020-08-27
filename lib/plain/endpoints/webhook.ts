import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { QueryParams, GetSpaceParams } from './common-types'
import { AppDefinitionProps } from '../../entities/app-definition'
import { normalizeSelect } from './utils'

const getBaseUrl = (params: GetSpaceParams) => `/spaces/${params.spaceId}/webhook_definitions`

export const get = (http: AxiosInstance, params: GetSpaceParams & QueryParams) => {
  return raw.get<AppDefinitionProps>(http, getBaseUrl(params), {
    params: normalizeSelect(params.query),
  })
}
