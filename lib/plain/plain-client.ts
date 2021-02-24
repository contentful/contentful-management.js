import { RestAdapter } from '../adapters/REST/rest-adapter'
import { Adapter } from '../common-types'
import * as endpoints from './endpoints'
import { PlainClientAPI } from './endpoints/common-types'
import { DefaultParams, wrap, wrapAdapter, wrapHttp } from './wrappers/wrap'

export type { DefaultParams } from './wrappers/wrap'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RestParamsType<F> = F extends (p1: any, ...rest: infer REST) => any ? REST : never

export const createPlainClient = (adapter: Adapter, defaults?: DefaultParams): PlainClientAPI => {
  const http = (adapter as RestAdapter).http
  const wrapParams = { http, defaults }
  const adapterWrapParams = { adapter, defaults, clientType: 'plain' as const }

  return {
    raw: {
      getDefaultParams: () => defaults,
      get: <T = unknown>(...args: RestParamsType<typeof endpoints.raw.get>) =>
        endpoints.raw.get<T>(http, ...args),
      post: <T = unknown>(...args: RestParamsType<typeof endpoints.raw.post>) =>
        endpoints.raw.post<T>(http, ...args),
      put: <T = unknown>(...args: RestParamsType<typeof endpoints.raw.put>) =>
        endpoints.raw.put<T>(http, ...args),
      delete: <T = unknown>(...args: RestParamsType<typeof endpoints.raw.del>) =>
        endpoints.raw.del<T>(http, ...args),
      http: <T = unknown>(...args: RestParamsType<typeof endpoints.raw.http>) =>
        endpoints.raw.http<T>(http, ...args),
    },
    editorInterface: {
      get: wrap(wrapParams, endpoints.editorInterface.get),
      getMany: wrap(wrapParams, endpoints.editorInterface.getMany),
      update: wrap(wrapParams, endpoints.editorInterface.update),
    },
    space: {
      get: wrapAdapter(adapterWrapParams, 'Space', 'get'),
      getMany: wrapAdapter(adapterWrapParams, 'Space', 'getMany'),
      update: wrapAdapter(adapterWrapParams, 'Space', 'save'),
      delelete: wrapAdapter(adapterWrapParams, 'Space', 'delete'),
      create: wrapAdapter(adapterWrapParams, 'Space', 'create'),
    },
    environment: {
      get: wrap(wrapParams, endpoints.environment.get),
      getMany: wrap(wrapParams, endpoints.environment.getMany),
      create: wrap(wrapParams, endpoints.environment.create),
      createWithId: wrap(wrapParams, endpoints.environment.createWithId),
      update: wrap(wrapParams, endpoints.environment.update),
      delete: wrap(wrapParams, endpoints.environment.del),
    },
    environmentAlias: {
      get: wrap(wrapParams, endpoints.environmentAlias.get),
      getMany: wrap(wrapParams, endpoints.environmentAlias.getMany),
      createWithId: wrap(wrapParams, endpoints.environmentAlias.createWithId),
      update: wrap(wrapParams, endpoints.environmentAlias.update),
      delete: wrap(wrapParams, endpoints.environmentAlias.del),
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
      getCurrent: (...args: RestParamsType<typeof endpoints.user.getCurrent>) => {
        return endpoints.user.getCurrent(http, ...args)
      },
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
      createFromFiles: wrap(wrapParams, endpoints.asset.createFromFiles),
      processForAllLocales: wrap(wrapParams, endpoints.asset.processForAllLocales),
      processForLocale: wrap(wrapParams, endpoints.asset.processForLocale),
    },
    upload: {
      get: wrap(wrapParams, endpoints.upload.get),
      create: wrap(wrapParams, endpoints.upload.create),
      delete: wrap(wrapParams, endpoints.upload.del),
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
      getManyForSpace: wrap(wrapParams, endpoints.usage.getManyForSpace),
      getManyForOrganization: wrap(wrapParams, endpoints.usage.getManyForOrganization),
    },
    role: {
      get: wrap(wrapParams, endpoints.role.get),
      getMany: wrap(wrapParams, endpoints.role.getMany),
      create: wrap(wrapParams, endpoints.role.create),
      createWithId: wrap(wrapParams, endpoints.role.createWithId),
      update: wrap(wrapParams, endpoints.role.update),
      delete: wrap(wrapParams, endpoints.role.del),
    },
    scheduledActions: {
      getMany: wrap(wrapParams, endpoints.scheduledAction.getMany),
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
    appDefinition: {
      get: wrap(wrapParams, endpoints.appDefinition.get),
      getMany: wrap(wrapParams, endpoints.appDefinition.getMany),
      create: wrap(wrapParams, endpoints.appDefinition.create),
      update: wrap(wrapParams, endpoints.appDefinition.update),
      delete: wrap(wrapParams, endpoints.appDefinition.del),
    },
    appInstallation: {
      get: wrap(wrapParams, endpoints.appInstallation.get),
      getMany: wrap(wrapParams, endpoints.appInstallation.getMany),
      upsert: wrap(wrapParams, endpoints.appInstallation.upsert),
      delete: wrap(wrapParams, endpoints.appInstallation.del),
    },
    extension: {
      get: wrap(wrapParams, endpoints.uiExtension.get),
      getMany: wrap(wrapParams, endpoints.uiExtension.getMany),
      create: wrap(wrapParams, endpoints.uiExtension.create),
      createWithId: wrap(wrapParams, endpoints.uiExtension.createWithId),
      update: wrap(wrapParams, endpoints.uiExtension.update),
      delete: wrap(wrapParams, endpoints.uiExtension.del),
    },
    webhook: {
      get: wrap(wrapParams, endpoints.webhook.get),
      getMany: wrap(wrapParams, endpoints.webhook.getMany),
      getHealthStatus: wrap(wrapParams, endpoints.webhook.getHealthStatus),
      getCallDetails: wrap(wrapParams, endpoints.webhook.getCallDetails),
      getManyCallDetails: wrap(wrapParams, endpoints.webhook.getManyCallDetails),
      create: wrap(wrapParams, endpoints.webhook.create),
      update: wrap(wrapParams, endpoints.webhook.update),
      delete: wrap(wrapParams, endpoints.webhook.del),
    },
    snapshot: {
      getManyForEntry: wrap(wrapParams, endpoints.snapshot.getManyForEntry),
      getForEntry: wrap(wrapParams, endpoints.snapshot.getForEntry),
      getManyForContentType: wrap(wrapParams, endpoints.snapshot.getManyForContentType),
      getForContentType: wrap(wrapParams, endpoints.snapshot.getForContentType),
    },
    tag: {
      get: wrap(wrapParams, endpoints.tag.get),
      getMany: wrap(wrapParams, endpoints.tag.getMany),
      createWithId: wrap(wrapParams, endpoints.tag.createWithId),
      update: wrap(wrapParams, endpoints.tag.update),
      delete: wrap(wrapParams, endpoints.tag.del),
    },
    organization: {
      getAll: wrapHttp(http, endpoints.organization.getAll),
      get: wrap(wrapParams, endpoints.organization.get),
    },
    organizationInvitation: {
      get: wrap(wrapParams, endpoints.organizationInvitation.get),
      create: wrap(wrapParams, endpoints.organizationInvitation.create),
    },
    organizationMembership: {
      get: wrap(wrapParams, endpoints.organizationMembership.get),
      getMany: wrap(wrapParams, endpoints.organizationMembership.getMany),
      update: wrap(wrapParams, endpoints.organizationMembership.update),
      delete: wrap(wrapParams, endpoints.organizationMembership.del),
    },
    spaceMember: {
      get: wrap(wrapParams, endpoints.spaceMember.get),
      getMany: wrap(wrapParams, endpoints.spaceMember.getMany),
    },
    spaceMembership: {
      get: wrap(wrapParams, endpoints.spaceMembership.get),
      getMany: wrap(wrapParams, endpoints.spaceMembership.getMany),
      getForOrganization: wrap(wrapParams, endpoints.spaceMembership.getForOrganization),
      getManyForOrganization: wrap(wrapParams, endpoints.spaceMembership.getManyForOrganization),
      create: wrap(wrapParams, endpoints.spaceMembership.create),
      createWithId: wrap(wrapParams, endpoints.spaceMembership.createWithId),
      update: wrap(wrapParams, endpoints.spaceMembership.update),
      delete: wrap(wrapParams, endpoints.spaceMembership.del),
    },
    team: {
      get: wrap(wrapParams, endpoints.team.get),
      getMany: wrap(wrapParams, endpoints.team.getMany),
      create: wrap(wrapParams, endpoints.team.create),
      update: wrap(wrapParams, endpoints.team.update),
      delete: wrap(wrapParams, endpoints.team.del),
    },
    teamMembership: {
      get: wrap(wrapParams, endpoints.teamMembership.get),
      getManyForOrganization: wrap(wrapParams, endpoints.teamMembership.getManyForOrganization),
      getManyForTeam: wrap(wrapParams, endpoints.teamMembership.getManyForTeam),
      create: wrap(wrapParams, endpoints.teamMembership.create),
      update: wrap(wrapParams, endpoints.teamMembership.update),
      delete: wrap(wrapParams, endpoints.teamMembership.del),
    },
    teamSpaceMembership: {
      get: wrap(wrapParams, endpoints.teamSpaceMembership.get),
      getMany: wrap(wrapParams, endpoints.teamSpaceMembership.getMany),
      getForOrganization: wrap(wrapParams, endpoints.teamSpaceMembership.getForOrganization),
      getManyForOrganization: wrap(
        wrapParams,
        endpoints.teamSpaceMembership.getManyForOrganization
      ),
      create: wrap(wrapParams, endpoints.teamSpaceMembership.create),
      update: wrap(wrapParams, endpoints.teamSpaceMembership.update),
      delete: wrap(wrapParams, endpoints.teamSpaceMembership.del),
    },
  }
}
