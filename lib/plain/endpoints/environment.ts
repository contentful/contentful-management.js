import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { EnvironmentProps } from '../../entities/environment'
import cloneDeep from 'lodash/cloneDeep'
import { GetSpaceParams } from './space'

export type GetEnvironmentParams = GetSpaceParams & { environmentId: string }

export const get = (http: AxiosInstance, params: GetEnvironmentParams) => {
  return raw.get<EnvironmentProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}`
  )
}

export const update = (
  http: AxiosInstance,
  params: GetEnvironmentParams,
  rawData: EnvironmentProps
) => {
  const data = cloneDeep(rawData)
  delete data.sys

  return raw.put<EnvironmentProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}`,
    data,
    {
      headers: {
        'X-Contentful-Version': rawData.sys.version ?? 0,
      },
    }
  )
}
