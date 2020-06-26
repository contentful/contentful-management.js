import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { CollectionProp } from './common-types'
import { OrganizationProp } from '../../entities/organization'

export const getAll = (http: AxiosInstance) => {
  return raw.get<CollectionProp<OrganizationProp>>(http, `/organizations`)
}
