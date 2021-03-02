/**
 * @packageDocumentation
 * @hidden
 */

import { Adapter } from './common-types'
import { RestAdapter, RestAdapterParams } from './adapters/REST/rest-adapter'

export type AdapterParams = {
  apiAdapter: Adapter
}

/**
 * @private
 */
export function createAdapter(params: RestAdapterParams & AdapterParams): Adapter {
  if (params.apiAdapter) {
    return params.apiAdapter
  } else {
    return new RestAdapter(params)
  }
}
