import { createCMAHttpClient, ClientParams } from '../create-cma-http-client'
import * as endpoints from './endpoints'
import { wrap, wrapHttp, DefaultParams } from './wrappers/wrap'

type RestParamsType<F> = F extends (p1: any, ...rest: infer REST) => any ? REST : never

export const createPlainClient = (params: ClientParams, defaults?: DefaultParams) => {
  const http = createCMAHttpClient(params)
  const wrapParams = { http, defaults }

  return {
    organization: {
      getAll: wrapHttp(http, endpoints.organization.getAll),
    },
    space: {
      get: wrap(wrapParams, endpoints.space.get),
      update: wrap(wrapParams, endpoints.space.update),
      delete: wrap(wrapParams, endpoints.space.del),
    },
    environment: {
      get: wrap(wrapParams, endpoints.environment.get),
      update: wrap(wrapParams, endpoints.environment.update),
    },
    contentType: {
      getMany: wrap(wrapParams, endpoints.contentType.getMany),
    },
    user: {
      getManyForSpace: wrap(wrapParams, endpoints.user.getManyForSpace),
      getCurrent: wrapHttp(http, endpoints.user.getCurrent),
    },
    entry: {
      getMany: wrap(wrapParams, endpoints.entry.getMany),
      get: wrap(wrapParams, endpoints.entry.get),
      update: wrap(wrapParams, endpoints.entry.update),
      delete: wrap(wrapParams, endpoints.entry.del),
      publish: wrap(wrapParams, endpoints.entry.publish),
      unpublish: wrap(wrapParams, endpoints.entry.unpublish),
      archive: wrap(wrapParams, endpoints.entry.archive),
      unarchive: wrap(wrapParams, endpoints.entry.unarchive),
      create: wrap(wrapParams, endpoints.entry.create),
      createWithId: wrap(wrapParams, endpoints.entry.createWithId),
    },
    asset: {
      getMany: wrap(wrapParams, endpoints.asset.getMany),
      get: wrap(wrapParams, endpoints.asset.get),
      update: wrap(wrapParams, endpoints.asset.update),
      delete: wrap(wrapParams, endpoints.asset.del),
      publish: wrap(wrapParams, endpoints.asset.publish),
      unpublish: wrap(wrapParams, endpoints.asset.unpublish),
      archive: wrap(wrapParams, endpoints.asset.archive),
      unarchive: wrap(wrapParams, endpoints.asset.unarchive),
      create: wrap(wrapParams, endpoints.asset.create),
      createWithId: wrap(wrapParams, endpoints.asset.createWithId),
    },
    locale: {
      getMany: wrap(wrapParams, endpoints.locale.getMany),
    },
    raw: {
      getDefaultParams: () => defaults,
      get: (...args: RestParamsType<typeof endpoints.raw.get>) => endpoints.raw.get(http, ...args),
      post: (...args: RestParamsType<typeof endpoints.raw.post>) =>
        endpoints.raw.post(http, ...args),
      put: (...args: RestParamsType<typeof endpoints.raw.put>) => endpoints.raw.put(http, ...args),
      delete: (...args: RestParamsType<typeof endpoints.raw.del>) =>
        endpoints.raw.get(http, ...args),
    },
  }
}
