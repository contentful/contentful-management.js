import { ApiKeyProps, CreateApiKeyProps } from './entities/api-key'
import { AppDefinitionProps, CreateAppDefinitionProps } from './entities/app-definition'
import { AppInstallationProps, CreateAppInstallationProps } from './entities/app-installation'
import {
  AssetFileProp,
  AssetProcessingForLocale,
  AssetProps,
  CreateAssetProps,
} from './entities/asset'
import { SpaceProps } from './entities/space'
import {
  CreateWebhooksProps,
  WebhookCallDetailsProps,
  WebhookCallOverviewProps,
  WebhookHealthProps,
  WebhookProps,
} from './entities/webhook'

export interface DefaultElements<TPlainObject extends object = object> {
  toPlainObject(): TPlainObject
}

/**
 * Link is a reference object to another entity that can be resolved using tools such as contentful-resolve
 */
export interface Link<T extends string> {
  sys: {
    type: 'Link'
    linkType: T
    id: string
  }
}

/** String will be in ISO8601 datetime format e.g. 2013-06-26T13:57:24Z */
export type ISO8601Timestamp = string

export interface PaginationQueryOptions {
  skip?: number
  limit?: number
  order?: string
}

export interface QueryOptions extends PaginationQueryOptions {
  content_type?: string
  include?: number
  select?: string
  links_to_entry?: string
  [key: string]: any
}

export interface BasicMetaSysProps {
  type: string
  id: string
  version: number
  createdBy?: SysLink
  createdAt: string
  updatedBy?: SysLink
  updatedAt: string
}

export interface MetaSysProps extends BasicMetaSysProps {
  space?: SysLink
  status?: SysLink
  publishedVersion?: number
  archivedVersion?: number
  archivedBy?: SysLink
  archivedAt?: string
  deletedVersion?: number
  deletedBy?: SysLink
  deletedAt?: string
}

export interface EntityMetaSysProps extends MetaSysProps {
  space: SysLink
  contentType: SysLink
  environment: SysLink
  publishedBy?: SysLink
  publishedAt?: string
  firstPublishedAt?: string
  publishedCounter?: number
}

export interface MetaLinkProps {
  type: string
  linkType: string
  id: string
}

export interface MetadataProps {
  tags: Link<'Tag'>[]
}

export interface SysLink {
  sys: MetaLinkProps
}

export interface CollectionProp<TObj> {
  sys: {
    type: 'Array'
  }
  total: number
  skip: number
  limit: number
  items: TObj[]
}

export interface Collection<T, TPlain>
  extends CollectionProp<T>,
    DefaultElements<CollectionProp<TPlain>> {}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface QueryOptions extends BasicQueryOptions {
  content_type?: string
  include?: number
  select?: string
}

export interface BasicQueryOptions {
  skip?: number
  limit?: number
  [key: string]: any
}

export interface BasicCursorPaginationOptions {
  prev?: string
  next?: string
}

export type KeyValueMap = Record<string, any>

type MRInternal<UA extends boolean> = {
  (opts: MROpts<'ApiKey', 'get', UA>): MRReturn<'ApiKey', 'get'>
  (opts: MROpts<'ApiKey', 'getMany', UA>): MRReturn<'ApiKey', 'getMany'>
  (opts: MROpts<'ApiKey', 'create', UA>): MRReturn<'ApiKey', 'create'>
  (opts: MROpts<'ApiKey', 'createWithId', UA>): MRReturn<'ApiKey', 'createWithId'>
  (opts: MROpts<'ApiKey', 'update', UA>): MRReturn<'ApiKey', 'update'>
  (opts: MROpts<'ApiKey', 'delete', UA>): MRReturn<'ApiKey', 'delete'>

  (opts: MROpts<'AppDefinition', 'getMany', UA>): MRReturn<'AppDefinition', 'getMany'>
  (opts: MROpts<'AppDefinition', 'create', UA>): MRReturn<'AppDefinition', 'create'>
  (opts: MROpts<'AppDefinition', 'update', UA>): MRReturn<'AppDefinition', 'update'>
  (opts: MROpts<'AppDefinition', 'delete', UA>): MRReturn<'AppDefinition', 'delete'>

  (opts: MROpts<'AppInstallation', 'get', UA>): MRReturn<'AppInstallation', 'get'>
  (opts: MROpts<'AppInstallation', 'getMany', UA>): MRReturn<'AppInstallation', 'getMany'>
  (opts: MROpts<'AppInstallation', 'upsert', UA>): MRReturn<'AppInstallation', 'upsert'>
  (opts: MROpts<'AppInstallation', 'delete', UA>): MRReturn<'AppInstallation', 'delete'>

  (opts: MROpts<'Asset', 'getMany', UA>): MRReturn<'Asset', 'getMany'>
  (opts: MROpts<'Asset', 'get', UA>): MRReturn<'Asset', 'get'>
  (opts: MROpts<'Asset', 'update', UA>): MRReturn<'Asset', 'update'>
  (opts: MROpts<'Asset', 'delete', UA>): MRReturn<'Asset', 'delete'>
  (opts: MROpts<'Asset', 'publish', UA>): MRReturn<'Asset', 'publish'>
  (opts: MROpts<'Asset', 'unpublish', UA>): MRReturn<'Asset', 'unpublish'>
  (opts: MROpts<'Asset', 'archive', UA>): MRReturn<'Asset', 'archive'>
  (opts: MROpts<'Asset', 'unarchive', UA>): MRReturn<'Asset', 'unarchive'>
  (opts: MROpts<'Asset', 'create', UA>): MRReturn<'Asset', 'create'>
  (opts: MROpts<'Asset', 'createWithId', UA>): MRReturn<'Asset', 'createWithId'>
  (opts: MROpts<'Asset', 'createFromFiles', UA>): MRReturn<'Asset', 'createFromFiles'>
  (opts: MROpts<'Asset', 'processForAllLocales', UA>): MRReturn<'Asset', 'processForAllLocales'>
  (opts: MROpts<'Asset', 'processForLocale', UA>): MRReturn<'Asset', 'processForLocale'>

  (opts: MROpts<'Space', 'getMany', UA>): MRReturn<'Space', 'getMany'>
  (opts: MROpts<'Space', 'create', UA>): MRReturn<'Space', 'create'>
  (opts: MROpts<'Space', 'update', UA>): MRReturn<'Space', 'update'>
  (opts: MROpts<'Space', 'delete', UA>): MRReturn<'Space', 'delete'>

  (opts: MROpts<'Webhook', 'get', UA>): MRReturn<'Webhook', 'get'>
  (opts: MROpts<'Webhook', 'getCallDetails', UA>): MRReturn<'Webhook', 'getCallDetails'>
  (opts: MROpts<'Webhook', 'getHealthStatus', UA>): MRReturn<'Webhook', 'getHealthStatus'>
  (opts: MROpts<'Webhook', 'getMany', UA>): MRReturn<'Webhook', 'getMany'>
  (opts: MROpts<'Webhook', 'getManyCallDetails', UA>): MRReturn<'Webhook', 'getManyCallDetails'>
  (opts: MROpts<'Webhook', 'create', UA>): MRReturn<'Webhook', 'create'>
  (opts: MROpts<'Webhook', 'update', UA>): MRReturn<'Webhook', 'update'>
  (opts: MROpts<'Webhook', 'delete', UA>): MRReturn<'Webhook', 'delete'>
}

export type MakeRequestWithUserAgent = MRInternal<true>
export type MakeRequest = MRInternal<false>

export interface Adapter {
  makeRequest: MakeRequestWithUserAgent
}

export type MRActions = {
  ApiKey: {
    get: { params: GetSpaceParams & { apiKeyId: string }; return: ApiKeyProps }
    getMany: { params: GetSpaceParams & QueryParams; return: CollectionProp<ApiKeyProps> }
    create: {
      params: GetSpaceParams
      payload: CreateApiKeyProps
      headers?: Record<string, unknown>
      return: ApiKeyProps
    }
    createWithId: {
      params: GetSpaceParams & { apiKeyId: string }
      payload: CreateApiKeyProps
      headers?: Record<string, unknown>
      return: ApiKeyProps
    }
    update: {
      params: GetSpaceParams & { apiKeyId: string }
      payload: ApiKeyProps
      headers?: Record<string, unknown>
      return: ApiKeyProps
    }
    delete: { params: GetSpaceParams & { apiKeyId: string }; return: any }
  }
  AppDefinition: {
    get: {
      params: GetOrganizationParams & { appDefinitionId: string } & QueryParams
      return: AppDefinitionProps
    }
    getMany: {
      params: GetOrganizationParams & QueryParams
      return: CollectionProp<AppDefinitionProps>
    }
    create: {
      params: GetOrganizationParams
      payload: CreateAppDefinitionProps
      return: AppDefinitionProps
    }
    update: {
      params: GetAppDefinitionParams
      payload: AppDefinitionProps
      headers?: Record<string, unknown>
      return: AppDefinitionProps
    }
    delete: { params: GetAppDefinitionParams; return: any }
  }
  AppInstallation: {
    get: { params: GetAppInstallationParams; return: AppInstallationProps }
    getMany: {
      params: GetSpaceEnvironmentParams & PaginationQueryParams
      return: CollectionProp<AppInstallationProps>
    }
    upsert: {
      params: GetAppInstallationParams
      payload: CreateAppInstallationProps
      headers?: Record<string, unknown>
      return: AppInstallationProps
    }
    delete: { params: GetAppInstallationParams; return: any }
  }
  Asset: {
    getMany: { params: GetSpaceEnvironmentParams & QueryParams; return: CollectionProp<AssetProps> }
    get: {
      params: GetSpaceEnvironmentParams & { assetId: string } & QueryParams
      return: AssetProps
    }
    update: {
      params: GetSpaceEnvironmentParams & { assetId: string }
      payload: AssetProps
      headers?: Record<string, unknown>
      return: AssetProps
    }
    delete: { params: GetSpaceEnvironmentParams & { assetId: string }; return: any }
    publish: {
      params: GetSpaceEnvironmentParams & { assetId: string }
      payload: AssetProps
      return: AssetProps
    }
    unpublish: { params: GetSpaceEnvironmentParams & { assetId: string }; return: AssetProps }
    archive: { params: GetSpaceEnvironmentParams & { assetId: string }; return: AssetProps }
    unarchive: { params: GetSpaceEnvironmentParams & { assetId: string }; return: AssetProps }
    create: { params: GetSpaceEnvironmentParams; payload: CreateAssetProps; return: AssetProps }
    createWithId: {
      params: GetSpaceEnvironmentParams & { assetId: string }
      payload: CreateAssetProps
      return: AssetProps
    }
    createFromFiles: {
      params: GetSpaceEnvironmentParams
      payload: Omit<AssetFileProp, 'sys'>
      return: AssetProps
    }
    processForAllLocales: {
      params: GetSpaceEnvironmentParams & {
        asset: AssetProps
        options?: AssetProcessingForLocale
      }
      return: AssetProps
    }
    processForLocale: {
      params: GetSpaceEnvironmentParams & {
        asset: AssetProps
        locale: string
        options?: AssetProcessingForLocale
      }
      return: AssetProps
    }
  }
  Space: {
    get: { params: GetSpaceParams; return: SpaceProps }
    getMany: { params: QueryParams; return: CollectionProp<SpaceProps> }
    create: {
      params: { organizationId?: string }
      payload: Omit<SpaceProps, 'sys'>
      headers?: Record<string, unknown>
      return: any
    }
    update: {
      params: GetSpaceParams
      payload: SpaceProps
      headers?: Record<string, unknown>
      return: SpaceProps
    }
    delete: { params: GetSpaceParams; return: void }
  }
  Webhook: {
    get: { params: GetWebhookParams; return: WebhookProps }
    getCallDetails: { params: GetWebhookCallDetailsUrl; return: WebhookCallDetailsProps }
    getHealthStatus: { params: GetWebhookParams; return: WebhookHealthProps }
    getMany: { params: GetWebhookParams & QueryParams; return: CollectionProp<WebhookProps> }
    getManyCallDetails: {
      params: GetWebhookParams & QueryParams
      return: CollectionProp<WebhookCallOverviewProps>
    }
    create: {
      params: GetWebhookParams
      payload: CreateWebhooksProps
      headers?: Record<string, unknown>
      return: WebhookProps
    }
    update: { params: GetWebhookParams; payload: WebhookProps; return: WebhookProps }
    delete: { params: GetWebhookParams; return: void }
    createWithId: {
      params: GetWebhookParams
      payload: CreateWebhooksProps
      headers?: Record<string, unknown>
      return: void
    }
  }
}

export type MROpts<
  ET extends keyof MRActions,
  Action extends keyof MRActions[ET],
  UA extends boolean
> = Omit<
  {
    entityType: ET
    action: Action
    params: 'params' extends keyof MRActions[ET][Action] ? MRActions[ET][Action]['params'] : never
    payload: 'payload' extends keyof MRActions[ET][Action]
      ? MRActions[ET][Action]['payload']
      : never
    headers: 'headers' extends keyof MRActions[ET][Action]
      ? MRActions[ET][Action]['headers']
      : never
    userAgent: string
  },
  | ('params' extends keyof MRActions[ET][Action] ? never : 'params')
  | ('payload' extends keyof MRActions[ET][Action] ? never : 'payload')
  | ('headers' extends keyof MRActions[ET][Action] ? never : 'headers')
  | (UA extends true ? never : 'userAgent')
>

export type MRReturn<
  ET extends keyof MRActions,
  Action extends keyof MRActions[ET]
> = 'return' extends keyof MRActions[ET][Action] ? Promise<MRActions[ET][Action]['return']> : never

export interface MakeRequestOptions {
  entityType: EntityType
  action: string
  params?: Record<string, unknown>
  payload?: Record<string, unknown>
  headers?: Record<string, unknown>
  userAgent: string
}

export type EntityType = keyof MRActions

export type GetSpaceParams = { spaceId: string }
export type GetSpaceEnvironmentParams = { spaceId: string; environmentId: string }
export type GetOrganizationParams = { organizationId: string }
export type GetTeamParams = { organizationId: string; teamId: string }
export type GetAppDefinitionParams = GetOrganizationParams & { appDefinitionId: string }
export type GetAppInstallationParams = GetSpaceEnvironmentParams & { appDefinitionId: string }
export type GetContentTypeParams = GetSpaceEnvironmentParams & { contentTypeId: string }
export type GetEditorInterfaceParams = GetSpaceEnvironmentParams & { contentTypeId: string }
export type GetSpaceEnvAliasParams = GetSpaceParams & { environmentAliasId: string }
export type GetSnapshotForContentTypeParams = GetSpaceEnvironmentParams & { contentTypeId: string }
export type GetSnapshotForEntryParams = GetSpaceEnvironmentParams & { entryId: string }
export type GetSpaceMembershipProps = GetSpaceParams & { spaceMembershipId: string }
export type GetTagParams = GetSpaceEnvironmentParams & { tagId: string }
export type GetTeamMembershipParams = GetTeamParams & { teamMembershipId: string }
export type GetTeamSpaceMembershipParams = GetSpaceParams & { teamSpaceMembershipId: string }
export type GetUiExtensionParams = GetSpaceEnvironmentParams & { extensionId: string }
export type GetWebhookCallDetailsUrl = GetWebhookParams & { callId: string }
export type GetWebhookParams = GetSpaceParams & { webhookDefinitionId: string }
export type GetOrganizationMembershipProps = GetOrganizationParams & {
  organizationMembershipId: string
}

export type QueryParams = { query?: QueryOptions }
export type PaginationQueryParams = { query?: PaginationQueryOptions }
