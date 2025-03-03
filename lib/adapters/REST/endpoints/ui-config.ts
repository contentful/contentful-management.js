import type { AxiosInstance } from 'contentful-sdk-core'
import type { SetOptional } from 'type-fest'
import type { GetUIConfigParams } from '../../../common-types'
import type { UIConfigProps } from '../../../entities/ui-config'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import copy from 'fast-copy'

const getUrl = (params: GetUIConfigParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/ui_config`

export const get: RestEndpoint<'UIConfig', 'get'> = (
  http: AxiosInstance,
  params: GetUIConfigParams
) => {
  return raw.get<UIConfigProps>(http, getUrl(params))
}

export const update: RestEndpoint<'UIConfig', 'update'> = async(
  http: AxiosInstance,
  params: GetUIConfigParams,
  rawData: UIConfigProps
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys
  try{
    return await raw.put<UIConfigProps>(http, getUrl(params), data, {
      headers: {
        'X-Contentful-Version': rawData.sys.version ?? 0,
      },
    })
  } catch(error){
    throw {
      sys: {
        type: 'Error',
        id: 'Failed',
      },
      message: 'Update has failed',
      details: 'Saved view could not be updated',
      message_code: 'savedViews.update.Failed',
    }
  }
}

