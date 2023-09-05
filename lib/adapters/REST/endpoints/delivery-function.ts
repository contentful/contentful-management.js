import { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import { normalizeSelect } from './utils'
import { CollectionProp, GetAppDefinitionParams, QueryParams } from '../../../common-types'
import { RestEndpoint } from '../types'
import { DeliveryFunctionProps } from '../../../entities/delivery-function'

const getBaseUrl = (params: GetAppDefinitionParams) =>
  `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/delivery_functions`

export const getMany: RestEndpoint<'DeliveryFunction', 'getMany'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams & QueryParams
) => {
  return raw.get<CollectionProp<DeliveryFunctionProps>>(http, getBaseUrl(params), {
    params: normalizeSelect(params.query),
  })
}
