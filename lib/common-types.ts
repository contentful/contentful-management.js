import { SpaceProps } from './entities/space'

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
  (opts: MROpts<'Space', 'get', UA>): MRReturn<'Space', 'get'>
  (opts: MROpts<'Space', 'getMany', UA>): MRReturn<'Space', 'getMany'>
  (opts: MROpts<'Space', 'create', UA>): MRReturn<'Space', 'create'>
  (opts: MROpts<'Space', 'update', UA>): MRReturn<'Space', 'update'>
  (opts: MROpts<'Space', 'delete', UA>): MRReturn<'Space', 'delete'>
}

export type MakeRequestWithUserAgent = MRInternal<true>
export type MakeRequest = MRInternal<false>

export interface Adapter {
  makeRequest: MakeRequestWithUserAgent
}

export type MRActions = {
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

export type EntityType =
  | 'ApiKey'
  | 'AppDefinition'
  | 'AppInstallation'
  | 'Asset'
  | 'ContentType'
  | 'EditorInterface'
  | 'Entry'
  | 'Environment'
  | 'EnvironmentAlias'
  | 'Http'
  | 'Locale'
  | 'Organization'
  | 'OrganizationInvitation'
  | 'OrganizationMembership'
  | 'PersonalAccessToken'
  | 'PreviewApiKey'
  | 'Role'
  | 'ScheduledAction'
  | 'Snapshot'
  | 'Space'
  | 'SpaceMember'
  | 'SpaceMembership'
  | 'Tag'
  | 'Team'
  | 'TeamMembership'
  | 'TeamSpaceMembership'
  | 'UIExtension'
  | 'Upload'
  | 'Usage'
  | 'User'
  | 'Webhook'

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
