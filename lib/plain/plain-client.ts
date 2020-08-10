import { createCMAHttpClient, ClientParams } from '../create-cma-http-client'
import * as endpoints from './endpoints'
import { wrap, wrapHttp, DefaultParams } from './wrappers/wrap'

type RestParamsType<F> = F extends (p1: any, ...rest: infer REST) => any ? REST : never

export const createPlainClient = (params: ClientParams, defaults?: DefaultParams) => {
  const http = createCMAHttpClient(params)
  const wrapParams = { http, defaults }

  return {
    editorInterface: {
      get: wrap(wrapParams, endpoints.editorInterface.get),
      update: wrap(wrapParams, endpoints.editorInterface.update),
    },
    organization: {
      getAll: wrapHttp(http, endpoints.organization.getAll),
      get: wrap(wrapParams, endpoints.organization.get),
    },
    space: {
      get: wrap(wrapParams, endpoints.space.get),
      getMany: wrap(wrapParams, endpoints.space.getMany),
      update: wrap(wrapParams, endpoints.space.update),
      delete: wrap(wrapParams, endpoints.space.del),
      create: wrap(wrapParams, endpoints.space.create),
    },
    environment: {
      get: wrap(wrapParams, endpoints.environment.get),
      getMany: wrap(wrapParams, endpoints.environment.getMany),
      create: wrap(wrapParams, endpoints.environment.create),
      createWithId: wrap(wrapParams, endpoints.environment.createWithId),
      update: wrap(wrapParams, endpoints.environment.update),
      delete: wrap(wrapParams, endpoints.environment.del),
    },
    contentType: {
      get: wrap(wrapParams, endpoints.contentType.get),
      getMany: wrap(wrapParams, endpoints.contentType.getMany),
      update: wrap(wrapParams, endpoints.contentType.update),
      delete: wrap(wrapParams, endpoints.contentType.del),
      publish: wrap(wrapParams, endpoints.contentType.publish),
      unpublish: wrap(wrapParams, endpoints.contentType.unpublish),
      omitAndDeleteField: wrap(wrapParams, endpoints.contentType.omitAndDeleteField),
    },
    user: {
      getManyForSpace: wrap(wrapParams, endpoints.user.getManyForSpace),
      getForSpace: wrap(wrapParams, endpoints.user.getForSpace),
      getCurrent: wrapHttp(http, endpoints.user.getCurrent),
      getForOrganization: wrap(wrapParams, endpoints.user.getForOrganization),
      getManyForOrganization: wrap(wrapParams, endpoints.user.getManyForOrganization),
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
      get: wrap(wrapParams, endpoints.locale.get),
      getMany: wrap(wrapParams, endpoints.locale.getMany),
      delete: wrap(wrapParams, endpoints.locale.del),
      update: wrap(wrapParams, endpoints.locale.update),
      create: wrap(wrapParams, endpoints.locale.create),
    },
    personalAccessToken: {
      get: wrap(wrapParams, endpoints.personalAccessToken.get),
      getMany: wrap(wrapParams, endpoints.personalAccessToken.getMany),
      create: (...args: RestParamsType<typeof endpoints.personalAccessToken.create>) => {
        return endpoints.personalAccessToken.create(http, ...args)
      },
      revoke: wrap(wrapParams, endpoints.personalAccessToken.revoke),
    },
    usage: {
      getForSpace: wrap(wrapParams, endpoints.usage.getForSpace),
      getForOrganization: wrap(wrapParams, endpoints.usage.getForOrganization),
    },
    role: {
      get: wrap(wrapParams, endpoints.role.get),
      getMany: wrap(wrapParams, endpoints.role.getMany),
      create: wrap(wrapParams, endpoints.role.create),
      createWithId: wrap(wrapParams, endpoints.role.createWithId),
      update: wrap(wrapParams, endpoints.role.update),
      delete: wrap(wrapParams, endpoints.role.del),
    },
    scheduledActons: {
      query: wrap(wrapParams, endpoints.scheduledAction.query),
      create: wrap(wrapParams, endpoints.scheduledAction.create),
      delete: wrap(wrapParams, endpoints.scheduledAction.del),
    },
    previewApiKey: {
      get: wrap(wrapParams, endpoints.previewApiKey.get),
      getMany: wrap(wrapParams, endpoints.previewApiKey.getMany),
    },
    apiKey: {
      get: wrap(wrapParams, endpoints.apiKey.get),
      getMany: wrap(wrapParams, endpoints.apiKey.getMany),
      create: wrap(wrapParams, endpoints.apiKey.create),
      createWithId: wrap(wrapParams, endpoints.apiKey.createWithId),
      update: wrap(wrapParams, endpoints.apiKey.update),
      delete: wrap(wrapParams, endpoints.apiKey.del),
    },
    raw: {
      getDefaultParams: () => defaults,
      get: (...args: RestParamsType<typeof endpoints.raw.get>) => endpoints.raw.get(http, ...args),
      post: (...args: RestParamsType<typeof endpoints.raw.post>) =>
        endpoints.raw.post(http, ...args),
      put: (...args: RestParamsType<typeof endpoints.raw.put>) => endpoints.raw.put(http, ...args),
      delete: (...args: RestParamsType<typeof endpoints.raw.del>) =>
        endpoints.raw.del(http, ...args),
    },
  }
}
