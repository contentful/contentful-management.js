import type { AxiosInstance } from 'contentful-sdk-core'
import type {
  CollectionProp,
  GetOrganizationParams,
  PaginationQueryParams,
} from '../../../common-types.js'
import type { OrganizationProps } from '../../../entities/organization.js'
import type { RestEndpoint } from '../types.js'
import * as raw from './raw.js'

export const getMany: RestEndpoint<'Organization', 'getMany'> = (
  http: AxiosInstance,
  params?: PaginationQueryParams
) => {
  return raw.get<CollectionProp<OrganizationProps>>(http, `/organizations`, {
    params: params?.query,
  })
}

export const get: RestEndpoint<'Organization', 'get'> = (
  http: AxiosInstance,
  params: GetOrganizationParams
) => {
  return getMany(http, { query: { limit: 100 } }).then((data) => {
    const org = data.items.find((org) => org.sys.id === params.organizationId)
    if (!org) {
      const error = new Error(
        `No organization was found with the ID ${
          params.organizationId
        } instead got ${JSON.stringify(data)}`
      )
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      error.status = 404
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      error.statusText = 'Not Found'
      return Promise.reject(error)
    }
    return org
  })
}
