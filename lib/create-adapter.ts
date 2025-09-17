/**
 * @packageDocumentation
 * @hidden
 */

import type { Adapter } from './common-types.js'
import type { RestAdapterParams } from './adapters/REST/rest-adapter.js'
import { RestAdapter } from './adapters/REST/rest-adapter.js'

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
