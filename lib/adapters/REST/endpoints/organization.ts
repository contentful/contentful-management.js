import type { AxiosInstance } from 'contentful-sdk-core'
import { CollectionProp, GetOrganizationParams } from '../../../common-types'
import { OrganizationProp } from '../../../entities/organization'
import { RestEndpoint } from '../types'
import * as raw from './raw'

export const getAll: RestEndpoint<'Organization', 'getAll'> = (http: AxiosInstance) => {
  return raw.get<CollectionProp<OrganizationProp>>(http, `/organizations`)
}

export const get: RestEndpoint<'Organization', 'get'> = (
  http: AxiosInstance,
  params: GetOrganizationParams
) => {
  return getAll(http).then((data) => {
    const org = data.items.find((org) => org.sys.id === params.organizationId)
    if (!org) {
      const error = new Error(
        `No organization was found with the ID ${
          params.organizationId
        } instead got ${JSON.stringify(data)}`
      )
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      error.status = 404
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      error.statusText = 'Not Found'
      return Promise.reject(error)
    }
    return org
  })
}
