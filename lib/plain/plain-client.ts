import { GetContentTypeParams, GetSpaceEnvironmentParams, MakeRequest } from '../common-types'
import { ALPHA_FEATURE_WORKFLOWS } from '../adapters/REST/endpoints/workflow-definition'
import { omitAndDeleteField } from '../methods/content-type'
import { AlphaExtensions, AlphaPlainClientAPI, PlainClientAPI } from './common-types'
import { DefaultParams, wrap } from './wrappers/wrap'

export type { DefaultParams } from './wrappers/wrap'

/**
 * @private
 */
export const createPlainClient = (
  makeRequest: MakeRequest,
  defaults: DefaultParams | undefined,
  alphaFeatures?: string[]
): PlainClientAPI | AlphaPlainClientAPI => {
  const wrapParams = { makeRequest, defaults }

  return {
    raw: {
      getDefaultParams: () => defaults,
      get: (url, config) =>
        makeRequest({
          entityType: 'Http',
          action: 'get',
          params: { url, config },
        }),
      patch: (url, payload, config) =>
        makeRequest({
          entityType: 'Http',
          action: 'patch',
          params: { url, config },
          payload,
        }),
      post: (url, payload, config) =>
        makeRequest({
          entityType: 'Http',
          action: 'post',
          params: { url, config },
          payload,
        }),
      put: (url, payload, config) =>
        makeRequest({
          entityType: 'Http',
          action: 'put',
          params: { url, config },
          payload,
        }),
      delete: (url, config) =>
        makeRequest({
          entityType: 'Http',
          action: 'delete',
          params: { url, config },
        }),
      http: (url, config) =>
        makeRequest({
          entityType: 'Http',
          action: 'request',
          params: { url, config },
        }),
    },
    appAction: {
      get: wrap(wrapParams, 'AppAction', 'get'),
      getMany: wrap(wrapParams, 'AppAction', 'getMany'),
      getManyForEnvironment: wrap(wrapParams, 'AppAction', 'getManyForEnvironment'),
      delete: wrap(wrapParams, 'AppAction', 'delete'),
      create: wrap(wrapParams, 'AppAction', 'create'),
      update: wrap(wrapParams, 'AppAction', 'update'),
    },
    appActionCall: {
      create: wrap(wrapParams, 'AppActionCall', 'create'),
    },
    appBundle: {
      get: wrap(wrapParams, 'AppBundle', 'get'),
      getMany: wrap(wrapParams, 'AppBundle', 'getMany'),
      delete: wrap(wrapParams, 'AppBundle', 'delete'),
      create: wrap(wrapParams, 'AppBundle', 'create'),
    },
    appDetails: {
      upsert: wrap(wrapParams, 'AppDetails', 'upsert'),
      get: wrap(wrapParams, 'AppDetails', 'get'),
      delete: wrap(wrapParams, 'AppDetails', 'delete'),
    },
    appSignedRequest: {
      create: wrap(wrapParams, 'AppSignedRequest', 'create'),
    },
    appSigningSecret: {
      upsert: wrap(wrapParams, 'AppSigningSecret', 'upsert'),
      get: wrap(wrapParams, 'AppSigningSecret', 'get'),
      delete: wrap(wrapParams, 'AppSigningSecret', 'delete'),
    },
    editorInterface: {
      get: wrap(wrapParams, 'EditorInterface', 'get'),
      getMany: wrap(wrapParams, 'EditorInterface', 'getMany'),
      update: wrap(wrapParams, 'EditorInterface', 'update'),
    },
    space: {
      get: wrap(wrapParams, 'Space', 'get'),
      getMany: wrap(wrapParams, 'Space', 'getMany'),
      update: wrap(wrapParams, 'Space', 'update'),
      delete: wrap(wrapParams, 'Space', 'delete'),
      create: wrap(wrapParams, 'Space', 'create'),
    },
    environment: {
      get: wrap(wrapParams, 'Environment', 'get'),
      getMany: wrap(wrapParams, 'Environment', 'getMany'),
      create: wrap(wrapParams, 'Environment', 'create'),
      createWithId: wrap(wrapParams, 'Environment', 'createWithId'),
      update: wrap(wrapParams, 'Environment', 'update'),
      delete: wrap(wrapParams, 'Environment', 'delete'),
    },
    environmentAlias: {
      get: wrap(wrapParams, 'EnvironmentAlias', 'get'),
      getMany: wrap(wrapParams, 'EnvironmentAlias', 'getMany'),
      createWithId: wrap(wrapParams, 'EnvironmentAlias', 'createWithId'),
      update: wrap(wrapParams, 'EnvironmentAlias', 'update'),
      delete: wrap(wrapParams, 'EnvironmentAlias', 'delete'),
    },
    bulkAction: {
      get: wrap(wrapParams, 'BulkAction', 'get'),
      publish: wrap(wrapParams, 'BulkAction', 'publish'),
      unpublish: wrap(wrapParams, 'BulkAction', 'unpublish'),
      validate: wrap(wrapParams, 'BulkAction', 'validate'),
    },
    comment: {
      get: wrap(wrapParams, 'Comment', 'get'),
      getMany: wrap(wrapParams, 'Comment', 'getMany'),
      create: wrap(wrapParams, 'Comment', 'create'),
      update: wrap(wrapParams, 'Comment', 'update'),
      delete: wrap(wrapParams, 'Comment', 'delete'),
    },
    contentType: {
      get: wrap(wrapParams, 'ContentType', 'get'),
      getMany: wrap(wrapParams, 'ContentType', 'getMany'),
      update: wrap(wrapParams, 'ContentType', 'update'),
      delete: wrap(wrapParams, 'ContentType', 'delete'),
      publish: wrap(wrapParams, 'ContentType', 'publish'),
      unpublish: wrap(wrapParams, 'ContentType', 'unpublish'),
      create: wrap(wrapParams, 'ContentType', 'create'),
      createWithId: wrap(wrapParams, 'ContentType', 'createWithId'),
      omitAndDeleteField: (params, contentType, fieldId) =>
        omitAndDeleteField(
          makeRequest,
          { ...({ ...defaults, ...params } as GetContentTypeParams), fieldId },
          contentType
        ),
    },
    user: {
      getManyForSpace: wrap(wrapParams, 'User', 'getManyForSpace'),
      getForSpace: wrap(wrapParams, 'User', 'getForSpace'),
      getCurrent: wrap(wrapParams, 'User', 'getCurrent'),
      getForOrganization: wrap(wrapParams, 'User', 'getForOrganization'),
      getManyForOrganization: wrap(wrapParams, 'User', 'getManyForOrganization'),
    },
    task: {
      get: wrap(wrapParams, 'Task', 'get'),
      getMany: wrap(wrapParams, 'Task', 'getMany'),
      create: wrap(wrapParams, 'Task', 'create'),
      update: wrap(wrapParams, 'Task', 'update'),
      delete: wrap(wrapParams, 'Task', 'delete'),
    },
    entry: {
      getMany: wrap(wrapParams, 'Entry', 'getMany'),
      get: wrap(wrapParams, 'Entry', 'get'),
      update: wrap(wrapParams, 'Entry', 'update'),
      patch: wrap(wrapParams, 'Entry', 'patch'),
      delete: wrap(wrapParams, 'Entry', 'delete'),
      publish: wrap(wrapParams, 'Entry', 'publish'),
      unpublish: wrap(wrapParams, 'Entry', 'unpublish'),
      archive: wrap(wrapParams, 'Entry', 'archive'),
      unarchive: wrap(wrapParams, 'Entry', 'unarchive'),
      create: wrap(wrapParams, 'Entry', 'create'),
      createWithId: wrap(wrapParams, 'Entry', 'createWithId'),
      references: wrap(wrapParams, 'Entry', 'references'),
    },
    asset: {
      getMany: wrap(wrapParams, 'Asset', 'getMany'),
      get: wrap(wrapParams, 'Asset', 'get'),
      update: wrap(wrapParams, 'Asset', 'update'),
      delete: wrap(wrapParams, 'Asset', 'delete'),
      publish: wrap(wrapParams, 'Asset', 'publish'),
      unpublish: wrap(wrapParams, 'Asset', 'unpublish'),
      archive: wrap(wrapParams, 'Asset', 'archive'),
      unarchive: wrap(wrapParams, 'Asset', 'unarchive'),
      create: wrap(wrapParams, 'Asset', 'create'),
      createWithId: wrap(wrapParams, 'Asset', 'createWithId'),
      createFromFiles: wrap(wrapParams, 'Asset', 'createFromFiles'),
      processForAllLocales: (params, asset, options) =>
        makeRequest({
          entityType: 'Asset',
          action: 'processForAllLocales',
          params: {
            ...({ ...defaults, ...params } as GetSpaceEnvironmentParams),
            options,
            asset,
          },
        }),
      processForLocale: (params, asset, locale, options) =>
        makeRequest({
          entityType: 'Asset',
          action: 'processForLocale',
          params: {
            ...({ ...defaults, ...params } as GetSpaceEnvironmentParams),
            locale,
            asset,
            options,
          },
        }),
    },
    appUpload: {
      get: wrap(wrapParams, 'AppUpload', 'get'),
      delete: wrap(wrapParams, 'AppUpload', 'delete'),
      create: wrap(wrapParams, 'AppUpload', 'create'),
    },
    assetKey: {
      create: wrap(wrapParams, 'AssetKey', 'create'),
    },
    upload: {
      get: wrap(wrapParams, 'Upload', 'get'),
      create: wrap(wrapParams, 'Upload', 'create'),
      delete: wrap(wrapParams, 'Upload', 'delete'),
    },
    locale: {
      get: wrap(wrapParams, 'Locale', 'get'),
      getMany: wrap(wrapParams, 'Locale', 'getMany'),
      delete: wrap(wrapParams, 'Locale', 'delete'),
      update: wrap(wrapParams, 'Locale', 'update'),
      create: wrap(wrapParams, 'Locale', 'create'),
    },
    personalAccessToken: {
      get: wrap(wrapParams, 'PersonalAccessToken', 'get'),
      getMany: wrap(wrapParams, 'PersonalAccessToken', 'getMany'),
      create: (data, headers) =>
        makeRequest({
          entityType: 'PersonalAccessToken',
          action: 'create',
          params: {},
          headers,
          payload: data,
        }),
      revoke: wrap(wrapParams, 'PersonalAccessToken', 'revoke'),
    },
    usage: {
      getManyForSpace: wrap(wrapParams, 'Usage', 'getManyForSpace'),
      getManyForOrganization: wrap(wrapParams, 'Usage', 'getManyForOrganization'),
    },
    release: {
      archive: wrap(wrapParams, 'Release', 'archive'),
      get: wrap(wrapParams, 'Release', 'get'),
      query: wrap(wrapParams, 'Release', 'query'),
      create: wrap(wrapParams, 'Release', 'create'),
      update: wrap(wrapParams, 'Release', 'update'),
      delete: wrap(wrapParams, 'Release', 'delete'),
      publish: wrap(wrapParams, 'Release', 'publish'),
      unarchive: wrap(wrapParams, 'Release', 'unarchive'),
      unpublish: wrap(wrapParams, 'Release', 'unpublish'),
      validate: wrap(wrapParams, 'Release', 'validate'),
    },
    releaseAction: {
      get: wrap(wrapParams, 'ReleaseAction', 'get'),
      getMany: wrap(wrapParams, 'ReleaseAction', 'getMany'),
      queryForRelease: wrap(wrapParams, 'ReleaseAction', 'queryForRelease'),
    },
    role: {
      get: wrap(wrapParams, 'Role', 'get'),
      getMany: wrap(wrapParams, 'Role', 'getMany'),
      create: wrap(wrapParams, 'Role', 'create'),
      createWithId: wrap(wrapParams, 'Role', 'createWithId'),
      update: wrap(wrapParams, 'Role', 'update'),
      delete: wrap(wrapParams, 'Role', 'delete'),
    },
    scheduledActions: {
      get: wrap(wrapParams, 'ScheduledAction', 'get'),
      getMany: wrap(wrapParams, 'ScheduledAction', 'getMany'),
      create: wrap(wrapParams, 'ScheduledAction', 'create'),
      delete: wrap(wrapParams, 'ScheduledAction', 'delete'),
      update: wrap(wrapParams, 'ScheduledAction', 'update'),
    },
    previewApiKey: {
      get: wrap(wrapParams, 'PreviewApiKey', 'get'),
      getMany: wrap(wrapParams, 'PreviewApiKey', 'getMany'),
    },
    apiKey: {
      get: wrap(wrapParams, 'ApiKey', 'get'),
      getMany: wrap(wrapParams, 'ApiKey', 'getMany'),
      create: wrap(wrapParams, 'ApiKey', 'create'),
      createWithId: wrap(wrapParams, 'ApiKey', 'createWithId'),
      update: wrap(wrapParams, 'ApiKey', 'update'),
      delete: wrap(wrapParams, 'ApiKey', 'delete'),
    },
    appDefinition: {
      get: wrap(wrapParams, 'AppDefinition', 'get'),
      getMany: wrap(wrapParams, 'AppDefinition', 'getMany'),
      create: wrap(wrapParams, 'AppDefinition', 'create'),
      update: wrap(wrapParams, 'AppDefinition', 'update'),
      delete: wrap(wrapParams, 'AppDefinition', 'delete'),
      getInstallationsForOrg: wrap(wrapParams, 'AppDefinition', 'getInstallationsForOrg'),
    },
    appInstallation: {
      get: wrap(wrapParams, 'AppInstallation', 'get'),
      getMany: wrap(wrapParams, 'AppInstallation', 'getMany'),
      upsert: wrap(wrapParams, 'AppInstallation', 'upsert'),
      delete: wrap(wrapParams, 'AppInstallation', 'delete'),
    },
    extension: {
      get: wrap(wrapParams, 'Extension', 'get'),
      getMany: wrap(wrapParams, 'Extension', 'getMany'),
      create: wrap(wrapParams, 'Extension', 'create'),
      createWithId: wrap(wrapParams, 'Extension', 'createWithId'),
      update: wrap(wrapParams, 'Extension', 'update'),
      delete: wrap(wrapParams, 'Extension', 'delete'),
    },
    webhook: {
      get: wrap(wrapParams, 'Webhook', 'get'),
      getMany: wrap(wrapParams, 'Webhook', 'getMany'),
      getHealthStatus: wrap(wrapParams, 'Webhook', 'getHealthStatus'),
      getCallDetails: wrap(wrapParams, 'Webhook', 'getCallDetails'),
      getManyCallDetails: wrap(wrapParams, 'Webhook', 'getManyCallDetails'),
      create: wrap(wrapParams, 'Webhook', 'create'),
      update: wrap(wrapParams, 'Webhook', 'update'),
      delete: wrap(wrapParams, 'Webhook', 'delete'),
    },
    snapshot: {
      getManyForEntry: wrap(wrapParams, 'Snapshot', 'getManyForEntry'),
      getForEntry: wrap(wrapParams, 'Snapshot', 'getForEntry'),
      getManyForContentType: wrap(wrapParams, 'Snapshot', 'getManyForContentType'),
      getForContentType: wrap(wrapParams, 'Snapshot', 'getForContentType'),
    },
    tag: {
      get: wrap(wrapParams, 'Tag', 'get'),
      getMany: wrap(wrapParams, 'Tag', 'getMany'),
      createWithId: wrap(wrapParams, 'Tag', 'createWithId'),
      update: wrap(wrapParams, 'Tag', 'update'),
      delete: wrap(wrapParams, 'Tag', 'delete'),
    },
    organization: {
      getAll: wrap(wrapParams, 'Organization', 'getMany'),
      get: wrap(wrapParams, 'Organization', 'get'),
    },
    organizationInvitation: {
      get: wrap(wrapParams, 'OrganizationInvitation', 'get'),
      create: wrap(wrapParams, 'OrganizationInvitation', 'create'),
    },
    organizationMembership: {
      get: wrap(wrapParams, 'OrganizationMembership', 'get'),
      getMany: wrap(wrapParams, 'OrganizationMembership', 'getMany'),
      update: wrap(wrapParams, 'OrganizationMembership', 'update'),
      delete: wrap(wrapParams, 'OrganizationMembership', 'delete'),
    },
    spaceMember: {
      get: wrap(wrapParams, 'SpaceMember', 'get'),
      getMany: wrap(wrapParams, 'SpaceMember', 'getMany'),
    },
    spaceMembership: {
      get: wrap(wrapParams, 'SpaceMembership', 'get'),
      getMany: wrap(wrapParams, 'SpaceMembership', 'getMany'),
      getForOrganization: wrap(wrapParams, 'SpaceMembership', 'getForOrganization'),
      getManyForOrganization: wrap(wrapParams, 'SpaceMembership', 'getManyForOrganization'),
      create: wrap(wrapParams, 'SpaceMembership', 'create'),
      createWithId: wrap(wrapParams, 'SpaceMembership', 'createWithId'),
      update: wrap(wrapParams, 'SpaceMembership', 'update'),
      delete: wrap(wrapParams, 'SpaceMembership', 'delete'),
    },
    team: {
      get: wrap(wrapParams, 'Team', 'get'),
      getMany: wrap(wrapParams, 'Team', 'getMany'),
      getManyForSpace: wrap(wrapParams, 'Team', 'getManyForSpace'),
      create: wrap(wrapParams, 'Team', 'create'),
      update: wrap(wrapParams, 'Team', 'update'),
      delete: wrap(wrapParams, 'Team', 'delete'),
    },
    teamMembership: {
      get: wrap(wrapParams, 'TeamMembership', 'get'),
      getManyForOrganization: wrap(wrapParams, 'TeamMembership', 'getManyForOrganization'),
      getManyForTeam: wrap(wrapParams, 'TeamMembership', 'getManyForTeam'),
      create: wrap(wrapParams, 'TeamMembership', 'create'),
      update: wrap(wrapParams, 'TeamMembership', 'update'),
      delete: wrap(wrapParams, 'TeamMembership', 'delete'),
    },
    teamSpaceMembership: {
      get: wrap(wrapParams, 'TeamSpaceMembership', 'get'),
      getMany: wrap(wrapParams, 'TeamSpaceMembership', 'getMany'),
      getForOrganization: wrap(wrapParams, 'TeamSpaceMembership', 'getForOrganization'),
      getManyForOrganization: wrap(wrapParams, 'TeamSpaceMembership', 'getManyForOrganization'),
      create: wrap(wrapParams, 'TeamSpaceMembership', 'create'),
      update: wrap(wrapParams, 'TeamSpaceMembership', 'update'),
      delete: wrap(wrapParams, 'TeamSpaceMembership', 'delete'),
    },
    uiConfig: {
      get: wrap(wrapParams, 'UIConfig', 'get'),
      update: wrap(wrapParams, 'UIConfig', 'update'),
    },
    userUIConfig: {
      get: wrap(wrapParams, 'UserUIConfig', 'get'),
      update: wrap(wrapParams, 'UserUIConfig', 'update'),
    },
    ...addAlphaFeatures(makeRequest, defaults, alphaFeatures),
  }
}

const addAlphaFeatures = (
  makeRequest: MakeRequest,
  defaults: DefaultParams | undefined,
  alphaFeatures?: string[]
): AlphaExtensions | Record<string, never> => {
  const wrapParams = { makeRequest, defaults }
  const alphaInterface: AlphaExtensions = {} as AlphaExtensions

  if (alphaFeatures?.includes(ALPHA_FEATURE_WORKFLOWS)) {
    alphaInterface.workflowDefinition = {
      get: wrap(wrapParams, 'WorkflowDefinition', 'get'),
      getMany: wrap(wrapParams, 'WorkflowDefinition', 'getMany'),
      create: wrap(wrapParams, 'WorkflowDefinition', 'create'),
      update: wrap(wrapParams, 'WorkflowDefinition', 'update'),
      delete: wrap(wrapParams, 'WorkflowDefinition', 'delete'),
    }
    alphaInterface.workflow = {
      getMany: wrap(wrapParams, 'Workflow', 'getMany'),
      create: wrap(wrapParams, 'Workflow', 'create'),
      update: wrap(wrapParams, 'Workflow', 'update'),
      delete: wrap(wrapParams, 'Workflow', 'delete'),
      complete: wrap(wrapParams, 'Workflow', 'complete'),
    }
    alphaInterface.workflowsChangelog = {
      getMany: wrap(wrapParams, 'WorkflowsChangelog', 'getMany'),
    }
  }

  return alphaInterface
}
