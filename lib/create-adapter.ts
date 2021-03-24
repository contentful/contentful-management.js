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
export function createAdapter(params: RestAdapterParams | AdapterParams): Adapter {
  if ('apiAdapter' in params) {
    return params.apiAdapter
  } else {
    return new RestAdapter(params)
  }
}
