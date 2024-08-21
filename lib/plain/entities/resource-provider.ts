import type { RawAxiosRequestHeaders } from 'axios'
import type { GetResourceProviderParams } from '../../common-types'
import type {
  UpsertResourceProviderProps,
  ResourceProviderProps,
} from '../../entities/resource-provider'
import type { OptionalDefaults } from '../wrappers/wrap'

export type ResourceProviderPlainClientAPI = {
  get(params: OptionalDefaults<GetResourceProviderParams>): Promise<ResourceProviderProps>
  upsert(
    params: OptionalDefaults<GetResourceProviderParams>,
    rawData: UpsertResourceProviderProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<ResourceProviderProps>
  delete(params: OptionalDefaults<GetResourceProviderParams>): Promise<any>
}
