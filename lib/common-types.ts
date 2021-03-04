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

export interface Adapter {
  makeRequest(options: MakeRequestOptions): Promise<any>
}

export type MakeRequestWithUserAgent = Adapter['makeRequest']
export type MakeRequest = (options: Omit<MakeRequestOptions, 'userAgent'>) => Promise<any>

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
