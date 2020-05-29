import { createCMAHttpClient, ClientParams } from '../create-cma-http-client'
import * as endpoints from './index'

import { wrapWithHttp } from './wrappers/wrapWithHttp'
import { wrapWithDefaultParams } from './wrappers/wrapWithDefaultParams'

type DefaultParams = {
  spaceId?: string
  environmentId?: string
  organizationId?: string
}

export const createPlainClient = (params: ClientParams, defaults?: DefaultParams) => {
  const http = createCMAHttpClient(params)

  return {
    space: wrapWithDefaultParams(wrapWithHttp(endpoints.space, http), defaults),
    environment: wrapWithDefaultParams(wrapWithHttp(endpoints.environment, http), defaults),
    contentType: wrapWithDefaultParams(wrapWithHttp(endpoints.contentType, http), defaults),
    user: wrapWithDefaultParams(wrapWithHttp(endpoints.user, http), defaults),
    entry: wrapWithDefaultParams(wrapWithHttp(endpoints.entry, http), defaults),
  }
}
