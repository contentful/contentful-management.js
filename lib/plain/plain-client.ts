import { createCMAHttpClient, ClientParams } from '../create-cma-http-client'
import * as endpoints from './index'

export type DefaultParams = {
  spaceId?: string
  environmentId?: string
  organizationId?: string
}

import { wrapWithHttp } from './wrappers/wrapWithHttp'
import { wrapWithDefaultParams } from './wrappers/wrapWithDefaultParams'

export const createPlainClient = (params: ClientParams, defaultParams?: DefaultParams) => {
  const http = createCMAHttpClient(params)

  return {
    space: wrapWithDefaultParams(wrapWithHttp(endpoints.space, http), defaultParams),
    environment: wrapWithDefaultParams(wrapWithHttp(endpoints.environment, http), defaultParams),
    contentType: wrapWithDefaultParams(wrapWithHttp(endpoints.contentType, http), defaultParams),
    user: wrapWithDefaultParams(wrapWithHttp(endpoints.user, http), defaultParams),
    entry: wrapWithDefaultParams(wrapWithHttp(endpoints.entry, http), defaultParams),
  }
}

const client = createPlainClient({ accessToken: '' })

client.space.get({})
