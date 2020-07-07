import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { CollectionProp } from './common-types'
import { OrganizationProp } from '../../entities/organization'

export const getAll = (http: AxiosInstance) => {
  return raw.get<CollectionProp<OrganizationProp>>(http, `/organizations`)
}

export const get = (http: AxiosInstance, params: { organizationId: string }) => {
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
