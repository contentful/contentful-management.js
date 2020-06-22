import { AxiosInstance } from 'axios'
import { CollectionProp } from '../../common-types'
import { LocaleProps } from '../../entities/locale'
import { normalizeSelect } from './utils'
import { get } from './raw'
import { GetEnvironmentParams } from './environment'
import { QueryParams } from './common-types'

const getMany = (http: AxiosInstance, params: GetEnvironmentParams & QueryParams) => {
  return get<CollectionProp<LocaleProps>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/locales`,
    {
      params: normalizeSelect(params.query),
    }
  )
}

export { getMany }
