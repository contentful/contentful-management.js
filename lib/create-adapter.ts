/**
 * @packageDocumentation
 * @hidden
 */

import { Adapter } from './common-types'
import { RestAdapter, RestAdapterParams } from './adapters/REST/rest-adapter'

type AdapterParams = {
  cmaAdapter: Adapter
}

export type ClientParams = RestAdapterParams & AdapterParams

/**
 * @private
 */
export function createAdapter(params: ClientParams): Adapter {
  if (params.cmaAdapter) {
    return params.cmaAdapter
  } else {
    return new RestAdapter(params)
  }
}
