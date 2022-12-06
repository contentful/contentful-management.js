import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { OpPatch } from 'json-patch'
import { Stream } from 'stream'
import { AppActionProps, CreateAppActionProps } from './entities/app-action'
import { AppActionCallProps, CreateAppActionCallProps } from './entities/app-action-call'
import { AppBundleProps, CreateAppBundleProps } from './entities/app-bundle'
import { ApiKeyProps, CreateApiKeyProps } from './entities/api-key'
import { AppDefinitionProps, CreateAppDefinitionProps } from './entities/app-definition'
import { AppInstallationProps, CreateAppInstallationProps } from './entities/app-installation'
import {
  AssetFileProp,
  AssetProcessingForLocale,
  AssetProps,
  CreateAssetProps,
} from './entities/asset'
import { ContentTypeProps, CreateContentTypeProps } from './entities/content-type'
import {
  CreateCommentParams,
  CreateCommentProps,
  DeleteCommentParams,
  CommentProps,
  UpdateCommentParams,
  UpdateCommentProps,
} from './entities/comment'
import { EditorInterfaceProps } from './entities/editor-interface'
import { CreateEntryProps, EntryProps, EntryReferenceProps } from './entities/entry'
import { CreateEnvironmentProps, EnvironmentProps } from './entities/environment'
import { CreateEnvironmentAliasProps, EnvironmentAliasProps } from './entities/environment-alias'
import { CreateLocaleProps, LocaleProps } from './entities/locale'
import { AppInstallationsForOrganizationProps } from './entities/app-definition'
import { OrganizationProp } from './entities/organization'
import {
  CreateOrganizationInvitationProps,
  OrganizationInvitationProps,
} from './entities/organization-invitation'
import { OrganizationMembershipProps } from './entities/organization-membership'
import {
  CreatePersonalAccessTokenProps,
  PersonalAccessTokenProp,
} from './entities/personal-access-token'
import { PreviewApiKeyProps } from './entities/preview-api-key'
import { CreateRoleProps, RoleProps } from './entities/role'
import { ScheduledActionProps } from './entities/scheduled-action'
import { SnapshotProps } from './entities/snapshot'
import { SpaceProps } from './entities/space'
import { SpaceMemberProps } from './entities/space-member'
import { CreateSpaceMembershipProps, SpaceMembershipProps } from './entities/space-membership'
import { CreateTagProps, DeleteTagParams, TagProps, UpdateTagProps } from './entities/tag'
import { CreateTeamProps, TeamProps } from './entities/team'
import { CreateTeamMembershipProps, TeamMembershipProps } from './entities/team-membership'
import {
  CreateTeamSpaceMembershipProps,
  TeamSpaceMembershipProps,
} from './entities/team-space-membership'
import { CreateExtensionProps, ExtensionProps } from './entities/extension'
import { UsageProps } from './entities/usage'
import { UserProps } from './entities/user'
import {
  CreateWebhooksProps,
  WebhookCallDetailsProps,
  WebhookCallOverviewProps,
  WebhookHealthProps,
  WebhookProps,
} from './entities/webhook'
import { AssetKeyProps, CreateAssetKeyProps } from './entities/asset-key'
import { AppUploadProps } from './entities/app-upload'
import { AppDetailsProps, CreateAppDetailsProps } from './entities/app-details'
import { AppSignedRequestProps, CreateAppSignedRequestProps } from './entities/app-signed-request'
import { AppSigningSecretProps, CreateAppSigningSecretProps } from './entities/app-signing-secret'
import {
  BulkActionProps,
  BulkActionPublishPayload,
  BulkActionUnpublishPayload,
  BulkActionValidatePayload,
} from './entities/bulk-action'
import {
  ReleasePayload,
  ReleaseProps,
  ReleaseQueryOptions,
  ReleaseValidatePayload,
} from './entities/release'
import {
  ReleaseAction,
  ReleaseActionProps,
  ReleaseActionQueryOptions,
} from './entities/release-action'

import {
  CreateTaskParams,
  CreateTaskProps,
  DeleteTaskParams,
  TaskProps,
  UpdateTaskParams,
  UpdateTaskProps,
} from './entities/task'

import {
  CreateWorkflowDefinitionParams,
  CreateWorkflowDefinitionProps,
  DeleteWorkflowDefinitionParams,
  WorkflowDefinitionProps,
  WorkflowDefinitionQueryOptions,
} from './entities/workflow-definition'
import {
  CompleteWorkflowParams,
  CreateWorkflowParams,
  CreateWorkflowProps,
  DeleteWorkflowParams,
  WorkflowProps,
  WorkflowQueryOptions,
} from './entities/workflow'
import {
  WorkflowsChangelogEntryProps,
  WorkflowsChangelogQueryOptions,
} from './entities/workflows-changelog-entry'
import { UIConfigProps } from './entities/ui-config'
import { UserUIConfigProps } from './entities/user-ui-config'
import {
  CreateEnvironmentTemplateProps,
  EnvironmentTemplateProps,
} from './entities/environment-template'
import {
  CreateEnvironmentTemplateInstallationProps,
  EnvironmentTemplateInstallationProps,
  ValidateEnvironmentTemplateInstallationProps,
  EnvironmentTemplateValidationProps,
} from './entities/environment-template-installation'

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

export interface VersionedLink<T extends string> {
  sys: {
    type: 'Link'
    linkType: T
    id: string
    version: number
  }
}

export interface BaseCollection<T> {
  sys: { type: 'Array' }
  items: T[]
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

export interface SpaceQueryOptions extends PaginationQueryOptions {
  spaceId?: string
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
  publishedBy?: Link<'User'> | Link<'AppDefinition'>
  publishedAt?: string
  firstPublishedAt?: string
  publishedCounter?: number
  locale?: string
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

export interface CursorPaginatedCollectionProp<TObj>
  extends Omit<CollectionProp<TObj>, 'total' | 'skip'> {
  pages?: {
    next?: string
    prev?: string
  }
}

export interface Collection<T, TPlain>
  extends CollectionProp<T>,
    DefaultElements<CollectionProp<TPlain>> {}

export interface CursorPaginatedCollection<T, TPlain>
  extends CursorPaginatedCollectionProp<T>,
    DefaultElements<CursorPaginatedCollectionProp<TPlain>> {}

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

export interface BasicCursorPaginationOptions extends Omit<BasicQueryOptions, 'skip'> {
  pageNext?: string
  pagePrev?: string
}

export type KeyValueMap = Record<string, any>

/**
 * @private
 */
type MRInternal<UA extends boolean> = {
  (opts: MROpts<'Http', 'get', UA>): MRReturn<'Http', 'get'>
  (opts: MROpts<'Http', 'patch', UA>): MRReturn<'Http', 'patch'>
  (opts: MROpts<'Http', 'post', UA>): MRReturn<'Http', 'post'>
  (opts: MROpts<'Http', 'put', UA>): MRReturn<'Http', 'put'>
  (opts: MROpts<'Http', 'delete', UA>): MRReturn<'Http', 'delete'>
  (opts: MROpts<'Http', 'request', UA>): MRReturn<'Http', 'request'>

  (opts: MROpts<'AppAction', 'get', UA>): MRReturn<'AppAction', 'get'>
  (opts: MROpts<'AppAction', 'getMany', UA>): MRReturn<'AppAction', 'getMany'>
  (opts: MROpts<'AppAction', 'delete', UA>): MRReturn<'AppAction', 'delete'>
  (opts: MROpts<'AppAction', 'create', UA>): MRReturn<'AppAction', 'create'>
  (opts: MROpts<'AppAction', 'update', UA>): MRReturn<'AppAction', 'update'>

  (opts: MROpts<'AppActionCall', 'create', UA>): MRReturn<'AppActionCall', 'create'>

  (opts: MROpts<'AppBundle', 'get', UA>): MRReturn<'AppBundle', 'get'>
  (opts: MROpts<'AppBundle', 'getMany', UA>): MRReturn<'AppBundle', 'getMany'>
  (opts: MROpts<'AppBundle', 'delete', UA>): MRReturn<'AppBundle', 'delete'>
  (opts: MROpts<'AppBundle', 'create', UA>): MRReturn<'AppBundle', 'create'>

  (opts: MROpts<'ApiKey', 'get', UA>): MRReturn<'ApiKey', 'get'>
  (opts: MROpts<'ApiKey', 'getMany', UA>): MRReturn<'ApiKey', 'getMany'>
  (opts: MROpts<'ApiKey', 'create', UA>): MRReturn<'ApiKey', 'create'>
  (opts: MROpts<'ApiKey', 'createWithId', UA>): MRReturn<'ApiKey', 'createWithId'>
  (opts: MROpts<'ApiKey', 'update', UA>): MRReturn<'ApiKey', 'update'>
  (opts: MROpts<'ApiKey', 'delete', UA>): MRReturn<'ApiKey', 'delete'>

  (opts: MROpts<'AppDefinition', 'get', UA>): MRReturn<'AppDefinition', 'get'>
  (opts: MROpts<'AppDefinition', 'getMany', UA>): MRReturn<'AppDefinition', 'getMany'>
  (opts: MROpts<'AppDefinition', 'create', UA>): MRReturn<'AppDefinition', 'create'>
  (opts: MROpts<'AppDefinition', 'update', UA>): MRReturn<'AppDefinition', 'update'>
  (opts: MROpts<'AppDefinition', 'delete', UA>): MRReturn<'AppDefinition', 'delete'>
  (opts: MROpts<'AppDefinition', 'getInstallationsForOrg', UA>): MRReturn<
    'AppDefinition',
    'getInstallationsForOrg'
  >

  (opts: MROpts<'AppInstallation', 'get', UA>): MRReturn<'AppInstallation', 'get'>
  (opts: MROpts<'AppInstallation', 'getMany', UA>): MRReturn<'AppInstallation', 'getMany'>
  (opts: MROpts<'AppInstallation', 'upsert', UA>): MRReturn<'AppInstallation', 'upsert'>
  (opts: MROpts<'AppInstallation', 'delete', UA>): MRReturn<'AppInstallation', 'delete'>
  (opts: MROpts<'AppInstallation', 'getForOrganization', UA>): MRReturn<
    'AppInstallation',
    'getForOrganization'
  >

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

  (opts: MROpts<'AppUpload', 'get', UA>): MRReturn<'AppUpload', 'get'>
  (opts: MROpts<'AppUpload', 'delete', UA>): MRReturn<'AppUpload', 'delete'>
  (opts: MROpts<'AppUpload', 'create', UA>): MRReturn<'AppUpload', 'create'>

  (opts: MROpts<'AppDetails', 'upsert', UA>): MRReturn<'AppDetails', 'upsert'>
  (opts: MROpts<'AppDetails', 'get', UA>): MRReturn<'AppDetails', 'get'>
  (opts: MROpts<'AppDetails', 'delete', UA>): MRReturn<'AppDetails', 'delete'>

  (opts: MROpts<'AppSignedRequest', 'create', UA>): MRReturn<'AppSignedRequest', 'create'>

  (opts: MROpts<'AppSigningSecret', 'upsert', UA>): MRReturn<'AppSigningSecret', 'upsert'>
  (opts: MROpts<'AppSigningSecret', 'get', UA>): MRReturn<'AppSigningSecret', 'get'>
  (opts: MROpts<'AppSigningSecret', 'delete', UA>): MRReturn<'AppSigningSecret', 'delete'>

  (opts: MROpts<'AssetKey', 'create', UA>): MRReturn<'AssetKey', 'create'>

  (opts: MROpts<'BulkAction', 'get', UA>): MRReturn<'BulkAction', 'get'>
  (opts: MROpts<'BulkAction', 'publish', UA>): MRReturn<'BulkAction', 'publish'>
  (opts: MROpts<'BulkAction', 'unpublish', UA>): MRReturn<'BulkAction', 'unpublish'>
  (opts: MROpts<'BulkAction', 'validate', UA>): MRReturn<'BulkAction', 'validate'>

  (opts: MROpts<'Comment', 'get', UA>): MRReturn<'Comment', 'get'>
  (opts: MROpts<'Comment', 'getMany', UA>): MRReturn<'Comment', 'getMany'>
  (opts: MROpts<'Comment', 'getAll', UA>): MRReturn<'Comment', 'getAll'>
  (opts: MROpts<'Comment', 'create', UA>): MRReturn<'Comment', 'create'>
  (opts: MROpts<'Comment', 'update', UA>): MRReturn<'Comment', 'update'>
  (opts: MROpts<'Comment', 'delete', UA>): MRReturn<'Comment', 'delete'>

  (opts: MROpts<'ContentType', 'get', UA>): MRReturn<'ContentType', 'get'>
  (opts: MROpts<'ContentType', 'getMany', UA>): MRReturn<'ContentType', 'getMany'>
  (opts: MROpts<'ContentType', 'update', UA>): MRReturn<'ContentType', 'update'>
  (opts: MROpts<'ContentType', 'create', UA>): MRReturn<'ContentType', 'create'>
  (opts: MROpts<'ContentType', 'createWithId', UA>): MRReturn<'ContentType', 'createWithId'>
  (opts: MROpts<'ContentType', 'delete', UA>): MRReturn<'ContentType', 'delete'>
  (opts: MROpts<'ContentType', 'publish', UA>): MRReturn<'ContentType', 'publish'>
  (opts: MROpts<'ContentType', 'unpublish', UA>): MRReturn<'ContentType', 'unpublish'>

  (opts: MROpts<'EditorInterface', 'get', UA>): MRReturn<'EditorInterface', 'get'>
  (opts: MROpts<'EditorInterface', 'getMany', UA>): MRReturn<'EditorInterface', 'getMany'>
  (opts: MROpts<'EditorInterface', 'update', UA>): MRReturn<'EditorInterface', 'update'>

  (opts: MROpts<'Environment', 'get', UA>): MRReturn<'Environment', 'get'>
  (opts: MROpts<'Environment', 'getMany', UA>): MRReturn<'Environment', 'getMany'>
  (opts: MROpts<'Environment', 'create', UA>): MRReturn<'Environment', 'create'>
  (opts: MROpts<'Environment', 'createWithId', UA>): MRReturn<'Environment', 'createWithId'>
  (opts: MROpts<'Environment', 'update', UA>): MRReturn<'Environment', 'update'>
  (opts: MROpts<'Environment', 'delete', UA>): MRReturn<'Environment', 'delete'>

  (opts: MROpts<'EnvironmentAlias', 'get', UA>): MRReturn<'EnvironmentAlias', 'get'>
  (opts: MROpts<'EnvironmentAlias', 'getMany', UA>): MRReturn<'EnvironmentAlias', 'getMany'>
  (opts: MROpts<'EnvironmentAlias', 'createWithId', UA>): MRReturn<
    'EnvironmentAlias',
    'createWithId'
  >
  (opts: MROpts<'EnvironmentAlias', 'update', UA>): MRReturn<'EnvironmentAlias', 'update'>
  (opts: MROpts<'EnvironmentAlias', 'delete', UA>): MRReturn<'EnvironmentAlias', 'delete'>

  (opts: MROpts<'EnvironmentTemplate', 'get', UA>): MRReturn<'EnvironmentTemplate', 'get'>
  (opts: MROpts<'EnvironmentTemplate', 'getMany', UA>): MRReturn<'EnvironmentTemplate', 'getMany'>
  (opts: MROpts<'EnvironmentTemplate', 'create', UA>): MRReturn<'EnvironmentTemplate', 'create'>
  (opts: MROpts<'EnvironmentTemplate', 'update', UA>): MRReturn<'EnvironmentTemplate', 'update'>
  (opts: MROpts<'EnvironmentTemplate', 'delete', UA>): MRReturn<'EnvironmentTemplate', 'delete'>
  (opts: MROpts<'EnvironmentTemplate', 'versions', UA>): MRReturn<'EnvironmentTemplate', 'versions'>
  (opts: MROpts<'EnvironmentTemplate', 'versionUpdate', UA>): MRReturn<
    'EnvironmentTemplate',
    'versionUpdate'
  >
  (opts: MROpts<'EnvironmentTemplate', 'validate', UA>): MRReturn<'EnvironmentTemplate', 'validate'>
  (opts: MROpts<'EnvironmentTemplate', 'install', UA>): MRReturn<'EnvironmentTemplate', 'install'>
  (opts: MROpts<'EnvironmentTemplate', 'disconnect', UA>): MRReturn<
    'EnvironmentTemplate',
    'disconnect'
  >

  (opts: MROpts<'EnvironmentTemplateInstallation', 'getMany', UA>): MRReturn<
    'EnvironmentTemplateInstallation',
    'getMany'
  >
  (opts: MROpts<'EnvironmentTemplateInstallation', 'getForEnvironment', UA>): MRReturn<
    'EnvironmentTemplateInstallation',
    'getForEnvironment'
  >

  (opts: MROpts<'Entry', 'getMany', UA>): MRReturn<'Entry', 'getMany'>
  (opts: MROpts<'Entry', 'getPublished', UA>): MRReturn<'Entry', 'getPublished'>
  (opts: MROpts<'Entry', 'get', UA>): MRReturn<'Entry', 'get'>
  (opts: MROpts<'Entry', 'patch', UA>): MRReturn<'Entry', 'patch'>
  (opts: MROpts<'Entry', 'update', UA>): MRReturn<'Entry', 'update'>
  (opts: MROpts<'Entry', 'delete', UA>): MRReturn<'Entry', 'delete'>
  (opts: MROpts<'Entry', 'publish', UA>): MRReturn<'Entry', 'publish'>
  (opts: MROpts<'Entry', 'unpublish', UA>): MRReturn<'Entry', 'unpublish'>
  (opts: MROpts<'Entry', 'archive', UA>): MRReturn<'Entry', 'archive'>
  (opts: MROpts<'Entry', 'unarchive', UA>): MRReturn<'Entry', 'unarchive'>
  (opts: MROpts<'Entry', 'create', UA>): MRReturn<'Entry', 'create'>
  (opts: MROpts<'Entry', 'createWithId', UA>): MRReturn<'Entry', 'createWithId'>
  (opts: MROpts<'Entry', 'references', UA>): MRReturn<'Entry', 'references'>

  (opts: MROpts<'Extension', 'get', UA>): MRReturn<'Extension', 'get'>
  (opts: MROpts<'Extension', 'getMany', UA>): MRReturn<'Extension', 'getMany'>
  (opts: MROpts<'Extension', 'create', UA>): MRReturn<'Extension', 'create'>
  (opts: MROpts<'Extension', 'createWithId', UA>): MRReturn<'Extension', 'createWithId'>
  (opts: MROpts<'Extension', 'update', UA>): MRReturn<'Extension', 'update'>
  (opts: MROpts<'Extension', 'delete', UA>): MRReturn<'Extension', 'delete'>

  (opts: MROpts<'Locale', 'get', UA>): MRReturn<'Locale', 'get'>
  (opts: MROpts<'Locale', 'getMany', UA>): MRReturn<'Locale', 'getMany'>
  (opts: MROpts<'Locale', 'delete', UA>): MRReturn<'Locale', 'delete'>
  (opts: MROpts<'Locale', 'update', UA>): MRReturn<'Locale', 'update'>
  (opts: MROpts<'Locale', 'create', UA>): MRReturn<'Locale', 'create'>

  (opts: MROpts<'Organization', 'getMany', UA>): MRReturn<'Organization', 'getMany'>
  (opts: MROpts<'Organization', 'get', UA>): MRReturn<'Organization', 'get'>

  (opts: MROpts<'OrganizationInvitation', 'get', UA>): MRReturn<'OrganizationInvitation', 'get'>
  (opts: MROpts<'OrganizationInvitation', 'create', UA>): MRReturn<
    'OrganizationInvitation',
    'create'
  >

  (opts: MROpts<'OrganizationMembership', 'get', UA>): MRReturn<'OrganizationMembership', 'get'>
  (opts: MROpts<'OrganizationMembership', 'getMany', UA>): MRReturn<
    'OrganizationMembership',
    'getMany'
  >
  (opts: MROpts<'OrganizationMembership', 'update', UA>): MRReturn<
    'OrganizationMembership',
    'update'
  >
  (opts: MROpts<'OrganizationMembership', 'delete', UA>): MRReturn<
    'OrganizationMembership',
    'delete'
  >

  (opts: MROpts<'PersonalAccessToken', 'get', UA>): MRReturn<'PersonalAccessToken', 'get'>
  (opts: MROpts<'PersonalAccessToken', 'getMany', UA>): MRReturn<'PersonalAccessToken', 'getMany'>
  (opts: MROpts<'PersonalAccessToken', 'create', UA>): MRReturn<'PersonalAccessToken', 'create'>
  (opts: MROpts<'PersonalAccessToken', 'revoke', UA>): MRReturn<'PersonalAccessToken', 'revoke'>

  (opts: MROpts<'PreviewApiKey', 'get', UA>): MRReturn<'PreviewApiKey', 'get'>
  (opts: MROpts<'PreviewApiKey', 'getMany', UA>): MRReturn<'PreviewApiKey', 'getMany'>

  (opts: MROpts<'Release', 'archive', UA>): MRReturn<'Release', 'archive'>
  (opts: MROpts<'Release', 'get', UA>): MRReturn<'Release', 'get'>
  (opts: MROpts<'Release', 'query', UA>): MRReturn<'Release', 'query'>
  (opts: MROpts<'Release', 'create', UA>): MRReturn<'Release', 'create'>
  (opts: MROpts<'Release', 'update', UA>): MRReturn<'Release', 'update'>
  (opts: MROpts<'Release', 'delete', UA>): MRReturn<'Release', 'delete'>
  (opts: MROpts<'Release', 'publish', UA>): MRReturn<'Release', 'publish'>
  (opts: MROpts<'Release', 'unpublish', UA>): MRReturn<'Release', 'unpublish'>
  (opts: MROpts<'Release', 'unarchive', UA>): MRReturn<'Release', 'unarchive'>
  (opts: MROpts<'Release', 'validate', UA>): MRReturn<'Release', 'validate'>

  (opts: MROpts<'ReleaseAction', 'get', UA>): MRReturn<'ReleaseAction', 'get'>
  (opts: MROpts<'ReleaseAction', 'getMany', UA>): MRReturn<'ReleaseAction', 'getMany'>
  (opts: MROpts<'ReleaseAction', 'queryForRelease', UA>): MRReturn<
    'ReleaseAction',
    'queryForRelease'
  >

  (opts: MROpts<'Role', 'get', UA>): MRReturn<'Role', 'get'>
  (opts: MROpts<'Role', 'getMany', UA>): MRReturn<'Role', 'getMany'>
  (opts: MROpts<'Role', 'create', UA>): MRReturn<'Role', 'create'>
  (opts: MROpts<'Role', 'createWithId', UA>): MRReturn<'Role', 'createWithId'>
  (opts: MROpts<'Role', 'update', UA>): MRReturn<'Role', 'update'>
  (opts: MROpts<'Role', 'delete', UA>): MRReturn<'Role', 'delete'>

  (opts: MROpts<'ScheduledAction', 'get', UA>): MRReturn<'ScheduledAction', 'get'>
  (opts: MROpts<'ScheduledAction', 'getMany', UA>): MRReturn<'ScheduledAction', 'getMany'>
  (opts: MROpts<'ScheduledAction', 'create', UA>): MRReturn<'ScheduledAction', 'create'>
  (opts: MROpts<'ScheduledAction', 'update', UA>): MRReturn<'ScheduledAction', 'update'>
  (opts: MROpts<'ScheduledAction', 'delete', UA>): MRReturn<'ScheduledAction', 'delete'>

  (opts: MROpts<'Snapshot', 'getManyForEntry', UA>): MRReturn<'Snapshot', 'getManyForEntry'>
  (opts: MROpts<'Snapshot', 'getForEntry', UA>): MRReturn<'Snapshot', 'getForEntry'>
  (opts: MROpts<'Snapshot', 'getManyForContentType', UA>): MRReturn<
    'Snapshot',
    'getManyForContentType'
  >
  (opts: MROpts<'Snapshot', 'getForContentType', UA>): MRReturn<'Snapshot', 'getForContentType'>

  (opts: MROpts<'Space', 'get', UA>): MRReturn<'Space', 'get'>
  (opts: MROpts<'Space', 'getMany', UA>): MRReturn<'Space', 'getMany'>
  (opts: MROpts<'Space', 'create', UA>): MRReturn<'Space', 'create'>
  (opts: MROpts<'Space', 'update', UA>): MRReturn<'Space', 'update'>
  (opts: MROpts<'Space', 'delete', UA>): MRReturn<'Space', 'delete'>

  (opts: MROpts<'SpaceMember', 'get', UA>): MRReturn<'SpaceMember', 'get'>
  (opts: MROpts<'SpaceMember', 'getMany', UA>): MRReturn<'SpaceMember', 'getMany'>

  (opts: MROpts<'SpaceMembership', 'get', UA>): MRReturn<'SpaceMembership', 'get'>
  (opts: MROpts<'SpaceMembership', 'getMany', UA>): MRReturn<'SpaceMembership', 'getMany'>
  (opts: MROpts<'SpaceMembership', 'getForOrganization', UA>): MRReturn<
    'SpaceMembership',
    'getForOrganization'
  >
  (opts: MROpts<'SpaceMembership', 'getManyForOrganization', UA>): MRReturn<
    'SpaceMembership',
    'getManyForOrganization'
  >
  (opts: MROpts<'SpaceMembership', 'create', UA>): MRReturn<'SpaceMembership', 'create'>
  (opts: MROpts<'SpaceMembership', 'createWithId', UA>): MRReturn<'SpaceMembership', 'createWithId'>
  (opts: MROpts<'SpaceMembership', 'update', UA>): MRReturn<'SpaceMembership', 'update'>
  (opts: MROpts<'SpaceMembership', 'delete', UA>): MRReturn<'SpaceMembership', 'delete'>

  (opts: MROpts<'Tag', 'get', UA>): MRReturn<'Tag', 'get'>
  (opts: MROpts<'Tag', 'getMany', UA>): MRReturn<'Tag', 'getMany'>
  (opts: MROpts<'Tag', 'createWithId', UA>): MRReturn<'Tag', 'createWithId'>
  (opts: MROpts<'Tag', 'update', UA>): MRReturn<'Tag', 'update'>
  (opts: MROpts<'Tag', 'delete', UA>): MRReturn<'Tag', 'delete'>

  (opts: MROpts<'Task', 'get', UA>): MRReturn<'Task', 'get'>
  (opts: MROpts<'Task', 'getMany', UA>): MRReturn<'Task', 'getMany'>
  (opts: MROpts<'Task', 'getAll', UA>): MRReturn<'Task', 'getAll'>
  (opts: MROpts<'Task', 'create', UA>): MRReturn<'Task', 'create'>
  (opts: MROpts<'Task', 'update', UA>): MRReturn<'Task', 'update'>
  (opts: MROpts<'Task', 'delete', UA>): MRReturn<'Task', 'delete'>

  (opts: MROpts<'Team', 'get', UA>): MRReturn<'Team', 'get'>
  (opts: MROpts<'Team', 'getMany', UA>): MRReturn<'Team', 'getMany'>
  (opts: MROpts<'Team', 'getManyForSpace', UA>): MRReturn<'Team', 'getManyForSpace'>
  (opts: MROpts<'Team', 'create', UA>): MRReturn<'Team', 'create'>
  (opts: MROpts<'Team', 'update', UA>): MRReturn<'Team', 'update'>
  (opts: MROpts<'Team', 'delete', UA>): MRReturn<'Team', 'delete'>

  (opts: MROpts<'TeamMembership', 'get', UA>): MRReturn<'TeamMembership', 'get'>
  (opts: MROpts<'TeamMembership', 'getManyForOrganization', UA>): MRReturn<
    'TeamMembership',
    'getManyForOrganization'
  >
  (opts: MROpts<'TeamMembership', 'getManyForTeam', UA>): MRReturn<
    'TeamMembership',
    'getManyForTeam'
  >
  (opts: MROpts<'TeamMembership', 'create', UA>): MRReturn<'TeamMembership', 'create'>
  (opts: MROpts<'TeamMembership', 'update', UA>): MRReturn<'TeamMembership', 'update'>
  (opts: MROpts<'TeamMembership', 'delete', UA>): MRReturn<'TeamMembership', 'delete'>

  (opts: MROpts<'TeamSpaceMembership', 'get', UA>): MRReturn<'TeamSpaceMembership', 'get'>
  (opts: MROpts<'TeamSpaceMembership', 'getMany', UA>): MRReturn<'TeamSpaceMembership', 'getMany'>
  (opts: MROpts<'TeamSpaceMembership', 'getForOrganization', UA>): MRReturn<
    'TeamSpaceMembership',
    'getForOrganization'
  >
  (opts: MROpts<'TeamSpaceMembership', 'getManyForOrganization', UA>): MRReturn<
    'TeamSpaceMembership',
    'getManyForOrganization'
  >
  (opts: MROpts<'TeamSpaceMembership', 'create', UA>): MRReturn<'TeamSpaceMembership', 'create'>
  (opts: MROpts<'TeamSpaceMembership', 'update', UA>): MRReturn<'TeamSpaceMembership', 'update'>
  (opts: MROpts<'TeamSpaceMembership', 'delete', UA>): MRReturn<'TeamSpaceMembership', 'delete'>

  (opts: MROpts<'UIConfig', 'get', UA>): MRReturn<'UIConfig', 'get'>
  (opts: MROpts<'UIConfig', 'update', UA>): MRReturn<'UIConfig', 'update'>

  (opts: MROpts<'Upload', 'get', UA>): MRReturn<'Entry', 'get'>
  (opts: MROpts<'Upload', 'create', UA>): MRReturn<'Entry', 'create'>
  (opts: MROpts<'Upload', 'delete', UA>): MRReturn<'Entry', 'delete'>

  (opts: MROpts<'Usage', 'getManyForSpace', UA>): MRReturn<'Usage', 'getManyForSpace'>
  (opts: MROpts<'Usage', 'getManyForOrganization', UA>): MRReturn<'Usage', 'getManyForOrganization'>

  (opts: MROpts<'User', 'getManyForSpace', UA>): MRReturn<'User', 'getManyForSpace'>
  (opts: MROpts<'User', 'getForSpace', UA>): MRReturn<'User', 'getForSpace'>
  (opts: MROpts<'User', 'getCurrent', UA>): MRReturn<'User', 'getCurrent'>
  (opts: MROpts<'User', 'getForOrganization', UA>): MRReturn<'User', 'getForOrganization'>
  (opts: MROpts<'User', 'getManyForOrganization', UA>): MRReturn<'User', 'getManyForOrganization'>

  (opts: MROpts<'UserUIConfig', 'get', UA>): MRReturn<'UserUIConfig', 'update'>
  (opts: MROpts<'UserUIConfig', 'update', UA>): MRReturn<'UserUIConfig', 'update'>

  (opts: MROpts<'Webhook', 'get', UA>): MRReturn<'Webhook', 'get'>
  (opts: MROpts<'Webhook', 'getMany', UA>): MRReturn<'Webhook', 'getMany'>
  (opts: MROpts<'Webhook', 'getCallDetails', UA>): MRReturn<'Webhook', 'getCallDetails'>
  (opts: MROpts<'Webhook', 'getHealthStatus', UA>): MRReturn<'Webhook', 'getHealthStatus'>
  (opts: MROpts<'Webhook', 'getManyCallDetails', UA>): MRReturn<'Webhook', 'getManyCallDetails'>
  (opts: MROpts<'Webhook', 'create', UA>): MRReturn<'Webhook', 'create'>
  (opts: MROpts<'Webhook', 'createWithId', UA>): MRReturn<'Webhook', 'createWithId'>
  (opts: MROpts<'Webhook', 'update', UA>): MRReturn<'Webhook', 'update'>
  (opts: MROpts<'Webhook', 'delete', UA>): MRReturn<'Webhook', 'delete'>

  (opts: MROpts<'WorkflowDefinition', 'get', UA>): MRReturn<'WorkflowDefinition', 'get'>
  (opts: MROpts<'WorkflowDefinition', 'getMany', UA>): MRReturn<'WorkflowDefinition', 'getMany'>
  (opts: MROpts<'WorkflowDefinition', 'create', UA>): MRReturn<'WorkflowDefinition', 'create'>
  (opts: MROpts<'WorkflowDefinition', 'update', UA>): MRReturn<'WorkflowDefinition', 'update'>
  (opts: MROpts<'WorkflowDefinition', 'delete', UA>): MRReturn<'WorkflowDefinition', 'delete'>

  (opts: MROpts<'Workflow', 'getMany', UA>): MRReturn<'Workflow', 'getMany'>
  (opts: MROpts<'Workflow', 'create', UA>): MRReturn<'Workflow', 'create'>
  (opts: MROpts<'Workflow', 'update', UA>): MRReturn<'Workflow', 'update'>
  (opts: MROpts<'Workflow', 'delete', UA>): MRReturn<'Workflow', 'delete'>
  (opts: MROpts<'Workflow', 'complete', UA>): MRReturn<'Workflow', 'complete'>

  (opts: MROpts<'WorkflowsChangelog', 'getMany', UA>): MRReturn<'WorkflowsChangelog', 'getMany'>
}

/**
 * @private
 */
export type MakeRequestWithUserAgent = MRInternal<true>

/**
 * @private
 */
export type MakeRequest = MRInternal<false>

export interface Adapter {
  makeRequest: MakeRequestWithUserAgent
}

/**
 * @private
 */
export type MRActions = {
  Http: {
    get: { params: { url: string; config?: AxiosRequestConfig }; return: any }
    patch: { params: { url: string; config?: AxiosRequestConfig }; payload: any; return: any }
    post: { params: { url: string; config?: AxiosRequestConfig }; payload: any; return: any }
    put: { params: { url: string; config?: AxiosRequestConfig }; payload: any; return: any }
    delete: { params: { url: string; config?: AxiosRequestConfig }; return: any }
    request: { params: { url: string; config?: AxiosRequestConfig }; return: any }
  }
  AppAction: {
    get: { params: GetAppActionParams; return: AppActionProps }
    getMany: {
      params: GetAppDefinitionParams & QueryParams
      return: CollectionProp<AppActionProps>
    }
    getManyForEnvironment: {
      params: GetAppActionsForEnvParams & QueryParams
      return: CollectionProp<AppActionProps>
    }
    delete: { params: GetAppActionParams; return: void }
    create: {
      params: GetAppDefinitionParams
      payload: CreateAppActionProps
      return: AppActionProps
    }
    update: {
      params: GetAppActionParams
      payload: CreateAppActionProps
      return: AppActionProps
    }
  }
  AppActionCall: {
    create: {
      params: GetAppActionCallParams
      payload: CreateAppActionCallProps
      return: AppActionCallProps
    }
  }
  AppBundle: {
    get: { params: GetAppBundleParams; return: AppBundleProps }
    getMany: {
      params: GetAppDefinitionParams & QueryParams
      return: CollectionProp<AppBundleProps>
    }
    delete: { params: GetAppBundleParams; return: void }
    create: {
      params: GetAppDefinitionParams
      payload: CreateAppBundleProps
      return: AppBundleProps
    }
  }
  ApiKey: {
    get: { params: GetSpaceParams & { apiKeyId: string }; return: ApiKeyProps }
    getMany: { params: GetSpaceParams & QueryParams; return: CollectionProp<ApiKeyProps> }
    create: {
      params: GetSpaceParams
      payload: CreateApiKeyProps
      headers?: AxiosRequestHeaders
      return: ApiKeyProps
    }
    createWithId: {
      params: GetSpaceParams & { apiKeyId: string }
      payload: CreateApiKeyProps
      headers?: AxiosRequestHeaders
      return: ApiKeyProps
    }
    update: {
      params: GetSpaceParams & { apiKeyId: string }
      payload: ApiKeyProps
      headers?: AxiosRequestHeaders
      return: ApiKeyProps
    }
    delete: { params: GetSpaceParams & { apiKeyId: string }; return: any }
  }
  AppDefinition: {
    get: {
      params: GetOrganizationParams & { appDefinitionId: string }
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
      headers?: AxiosRequestHeaders
      return: AppDefinitionProps
    }
    delete: { params: GetAppDefinitionParams; return: any }
    getInstallationsForOrg: {
      params: GetOrganizationParams & { appDefinitionId: string } & SpaceQueryParams
      return: AppInstallationsForOrganizationProps
    }
  }
  AppInstallation: {
    get: { params: GetAppInstallationParams; return: AppInstallationProps }
    getMany: {
      params: GetSpaceEnvironmentParams & PaginationQueryParams
      return: CollectionProp<AppInstallationProps>
    }
    upsert: {
      params: GetAppInstallationParams & { acceptAllTerms?: boolean }
      payload: CreateAppInstallationProps
      headers?: AxiosRequestHeaders
      return: AppInstallationProps
    }
    delete: { params: GetAppInstallationParams; return: any }
    getForOrganization: {
      params: GetOrganizationParams & { appDefinitionId: string; spaceId?: string }
      return: AppInstallationsForOrganizationProps
    }
  }
  AppUpload: {
    get: {
      params: GetAppUploadParams
      return: AppUploadProps
    }
    delete: {
      params: GetAppUploadParams
      return: void
    }
    create: {
      params: GetOrganizationParams
      payload: { file: string | ArrayBuffer | Stream }
      return: AppUploadProps
    }
  }
  AppDetails: {
    upsert: {
      params: GetAppDefinitionParams
      payload: CreateAppDetailsProps
      return: AppDetailsProps
    }
    get: {
      params: GetAppDefinitionParams
      return: AppDetailsProps
    }
    delete: {
      params: GetAppDefinitionParams
      return: void
    }
  }
  AppSignedRequest: {
    create: {
      params: GetAppInstallationParams
      payload: CreateAppSignedRequestProps
      return: AppSignedRequestProps
    }
  }
  AppSigningSecret: {
    upsert: {
      params: GetAppDefinitionParams
      payload: CreateAppSigningSecretProps
      return: AppSigningSecretProps
    }
    get: {
      params: GetAppDefinitionParams
      return: AppSigningSecretProps
    }
    delete: {
      params: GetAppDefinitionParams
      return: void
    }
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
      headers?: AxiosRequestHeaders
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
      params: GetSpaceEnvironmentParams & { uploadTimeout?: number }
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
  AssetKey: {
    create: {
      params: GetSpaceEnvironmentParams
      payload: CreateAssetKeyProps
      return: AssetKeyProps
    }
  }
  BulkAction: {
    get: {
      params: GetBulkActionParams
      return: BulkActionProps
    }
    publish: {
      params: GetSpaceEnvironmentParams
      payload: BulkActionPublishPayload
      return: BulkActionProps<BulkActionPublishPayload>
    }
    unpublish: {
      params: GetSpaceEnvironmentParams
      payload: BulkActionUnpublishPayload
      return: BulkActionProps<BulkActionUnpublishPayload>
    }
    validate: {
      params: GetSpaceEnvironmentParams
      payload: BulkActionValidatePayload
      return: BulkActionProps<BulkActionValidatePayload>
    }
  }
  Comment: {
    get: { params: GetCommentParams; return: CommentProps }
    getMany: {
      params: GetEntryParams & QueryParams
      return: CollectionProp<CommentProps>
    }
    getAll: {
      params: GetEntryParams & QueryParams
      return: CollectionProp<CommentProps>
    }
    create: { params: CreateCommentParams; payload: CreateCommentProps; return: CommentProps }
    update: {
      params: UpdateCommentParams
      payload: UpdateCommentProps
      headers?: AxiosRequestHeaders
      return: CommentProps
    }
    delete: { params: DeleteCommentParams; return: void }
  }
  ContentType: {
    get: { params: GetContentTypeParams & QueryParams; return: ContentTypeProps }
    getMany: {
      params: GetSpaceEnvironmentParams & QueryParams
      return: CollectionProp<ContentTypeProps>
    }
    create: {
      params: GetSpaceEnvironmentParams
      payload: CreateContentTypeProps
      return: ContentTypeProps
    }
    createWithId: {
      params: GetContentTypeParams
      payload: CreateContentTypeProps
      return: ContentTypeProps
    }
    update: {
      params: GetContentTypeParams
      payload: ContentTypeProps
      headers?: AxiosRequestHeaders
      return: ContentTypeProps
    }
    delete: { params: GetContentTypeParams; return: any }
    publish: { params: GetContentTypeParams; payload: ContentTypeProps; return: ContentTypeProps }
    unpublish: { params: GetContentTypeParams; return: ContentTypeProps }
  }
  EditorInterface: {
    get: { params: GetEditorInterfaceParams; return: EditorInterfaceProps }
    getMany: {
      params: GetSpaceEnvironmentParams & QueryParams
      return: CollectionProp<EditorInterfaceProps>
    }
    update: {
      params: GetEditorInterfaceParams
      payload: EditorInterfaceProps
      headers?: AxiosRequestHeaders
      return: EditorInterfaceProps
    }
  }
  Environment: {
    get: { params: GetSpaceEnvironmentParams; return: EnvironmentProps }
    getMany: {
      params: GetSpaceParams & PaginationQueryParams
      return: CollectionProp<EnvironmentProps>
    }
    create: {
      params: GetSpaceParams
      payload: Partial<Pick<EnvironmentProps, 'name'>>
      headers?: AxiosRequestHeaders
      return: EnvironmentProps
    }
    createWithId: {
      params: GetSpaceEnvironmentParams & { sourceEnvironmentId?: string }
      payload: CreateEnvironmentProps
      headers?: AxiosRequestHeaders
      return: EnvironmentProps
    }
    update: {
      params: GetSpaceEnvironmentParams
      payload: EnvironmentProps
      headers?: AxiosRequestHeaders
      return: EnvironmentProps
    }
    delete: { params: GetSpaceEnvironmentParams; return: any }
  }
  EnvironmentAlias: {
    get: { params: GetSpaceEnvAliasParams; return: EnvironmentAliasProps }
    getMany: {
      params: GetSpaceParams & PaginationQueryParams
      return: CollectionProp<EnvironmentAliasProps>
    }
    createWithId: {
      params: GetSpaceEnvAliasParams
      payload: CreateEnvironmentAliasProps
      headers?: AxiosRequestHeaders
      return: EnvironmentAliasProps
    }
    update: {
      params: GetSpaceEnvAliasParams
      payload: EnvironmentAliasProps
      headers?: AxiosRequestHeaders
      return: EnvironmentAliasProps
    }
    delete: { params: GetSpaceEnvAliasParams; return: any }
  }
  EnvironmentTemplate: {
    get: {
      params: GetEnvironmentTemplateParams & {
        version?: number
      }
      return: EnvironmentTemplateProps
    }
    getMany: {
      params: BasicCursorPaginationOptions & GetOrganizationParams
      return: CursorPaginatedCollectionProp<EnvironmentTemplateProps>
    }
    create: {
      payload: CreateEnvironmentTemplateProps
      params: GetOrganizationParams
      return: EnvironmentTemplateProps
    }
    versionUpdate: {
      params: GetEnvironmentTemplateParams & {
        version: number
      }
      payload: {
        versionName: string
        versionDescription: string
      }
      return: EnvironmentTemplateProps
    }
    update: {
      params: GetEnvironmentTemplateParams
      payload: EnvironmentTemplateProps
      return: EnvironmentTemplateProps
    }
    delete: {
      params: GetEnvironmentTemplateParams
      return: void
    }
    versions: {
      params: GetEnvironmentTemplateParams & BasicCursorPaginationOptions
      return: CursorPaginatedCollectionProp<EnvironmentTemplateProps>
    }
    validate: {
      params: EnvironmentTemplateParams & {
        version?: number
      }
      payload: ValidateEnvironmentTemplateInstallationProps
      return: EnvironmentTemplateValidationProps
    }
    install: {
      params: EnvironmentTemplateParams
      payload: CreateEnvironmentTemplateInstallationProps
      return: EnvironmentTemplateInstallationProps
    }
    disconnect: {
      params: EnvironmentTemplateParams
      return: void
    }
  }
  EnvironmentTemplateInstallation: {
    getMany: {
      params: BasicCursorPaginationOptions & {
        environmentId?: string
        environmentTemplateId: string
        organizationId: string
        spaceId?: string
      }
      return: CursorPaginatedCollectionProp<EnvironmentTemplateInstallationProps>
    }
    getForEnvironment: {
      params: BasicCursorPaginationOptions &
        EnvironmentTemplateParams & {
          installationId?: string
        }
      return: CursorPaginatedCollectionProp<EnvironmentTemplateInstallationProps>
    }
  }
  Entry: {
    getPublished: {
      params: GetSpaceEnvironmentParams & QueryParams
      return: CollectionProp<EntryProps<any>>
    }
    getMany: {
      params: GetSpaceEnvironmentParams & QueryParams
      return: CollectionProp<EntryProps<any>>
    }
    get: {
      params: GetSpaceEnvironmentParams & { entryId: string } & QueryParams
      return: EntryProps<any>
    }
    patch: {
      params: GetSpaceEnvironmentParams & { entryId: string; version: number }
      payload: OpPatch[]
      headers?: AxiosRequestHeaders
      return: EntryProps<any>
    }
    update: {
      params: GetSpaceEnvironmentParams & { entryId: string }
      payload: EntryProps<any>
      headers?: AxiosRequestHeaders
      return: EntryProps<any>
    }
    delete: { params: GetSpaceEnvironmentParams & { entryId: string }; return: any }
    publish: {
      params: GetSpaceEnvironmentParams & { entryId: string }
      payload: EntryProps<any>
      return: EntryProps<any>
    }
    unpublish: {
      params: GetSpaceEnvironmentParams & { entryId: string }
      return: EntryProps<any>
    }
    archive: {
      params: GetSpaceEnvironmentParams & { entryId: string }
      return: EntryProps<any>
    }
    unarchive: {
      params: GetSpaceEnvironmentParams & { entryId: string }
      return: EntryProps<any>
    }
    create: {
      params: GetSpaceEnvironmentParams & { contentTypeId: string }
      payload: CreateEntryProps<any>
      return: EntryProps<any>
    }
    createWithId: {
      params: GetSpaceEnvironmentParams & { entryId: string; contentTypeId: string }
      payload: CreateEntryProps<any>
      return: EntryProps<any>
    }
    references: {
      params: GetSpaceEnvironmentParams & {
        entryId: string
        include?: number
      }
      return: EntryReferenceProps
    }
  }
  Extension: {
    get: { params: GetExtensionParams & QueryParams; return: ExtensionProps }
    getMany: {
      params: GetSpaceEnvironmentParams & QueryParams
      return: CollectionProp<ExtensionProps>
    }
    create: {
      params: GetSpaceEnvironmentParams
      payload: CreateExtensionProps
      headers?: AxiosRequestHeaders
      return: ExtensionProps
    }
    createWithId: {
      params: GetExtensionParams
      payload: CreateExtensionProps
      headers?: AxiosRequestHeaders
      return: ExtensionProps
    }
    update: {
      params: GetExtensionParams
      payload: ExtensionProps
      headers?: AxiosRequestHeaders
      return: ExtensionProps
    }
    delete: { params: GetExtensionParams; return: any }
  }
  Locale: {
    get: { params: GetSpaceEnvironmentParams & { localeId: string }; return: LocaleProps }
    getMany: {
      params: GetSpaceEnvironmentParams & QueryParams
      return: CollectionProp<LocaleProps>
    }
    delete: { params: GetSpaceEnvironmentParams & { localeId: string }; return: any }
    update: {
      params: GetSpaceEnvironmentParams & { localeId: string }
      payload: LocaleProps
      headers?: AxiosRequestHeaders
      return: LocaleProps
    }
    create: {
      params: GetSpaceEnvironmentParams
      payload: CreateLocaleProps
      headers?: AxiosRequestHeaders
      return: LocaleProps
    }
  }
  Organization: {
    getMany: { params: PaginationQueryParams; return: CollectionProp<OrganizationProp> }
    get: { params: GetOrganizationParams; return: OrganizationProp }
  }
  OrganizationInvitation: {
    get: {
      params: { organizationId: string; invitationId: string }
      headers?: AxiosRequestHeaders
      return: OrganizationInvitationProps
    }
    create: {
      params: { organizationId: string }
      payload: CreateOrganizationInvitationProps
      headers?: AxiosRequestHeaders
      return: OrganizationInvitationProps
    }
  }
  OrganizationMembership: {
    get: { params: GetOrganizationMembershipParams; return: OrganizationMembershipProps }
    getMany: {
      params: GetOrganizationParams & QueryParams
      return: CollectionProp<OrganizationMembershipProps>
    }
    update: {
      params: GetOrganizationMembershipParams
      payload: OrganizationMembershipProps
      headers?: AxiosRequestHeaders
      return: OrganizationMembershipProps
    }
    delete: { params: GetOrganizationMembershipParams; return: any }
  }
  PersonalAccessToken: {
    get: { params: { tokenId: string }; return: PersonalAccessTokenProp }
    getMany: { params: QueryParams; return: CollectionProp<PersonalAccessTokenProp> }
    create: {
      params: {}
      payload: CreatePersonalAccessTokenProps
      headers?: AxiosRequestHeaders
      return: PersonalAccessTokenProp
    }
    revoke: { params: { tokenId: string }; return: PersonalAccessTokenProp }
  }
  PreviewApiKey: {
    get: { params: GetSpaceParams & { previewApiKeyId: string }; return: PreviewApiKeyProps }
    getMany: { params: GetSpaceParams & QueryParams; return: CollectionProp<PreviewApiKeyProps> }
  }
  Release: {
    archive: {
      params: GetReleaseParams & { version: number }
      return: ReleaseProps
    }
    get: {
      params: GetReleaseParams
      return: ReleaseProps
    }
    query: {
      params: GetSpaceEnvironmentParams & { query?: ReleaseQueryOptions }
      return: CollectionProp<ReleaseProps>
    }
    create: {
      params: GetSpaceEnvironmentParams
      payload: ReleasePayload
      return: ReleaseProps
    }
    update: {
      params: GetReleaseParams & { version: number }
      payload: ReleasePayload
      return: ReleaseProps
    }
    delete: {
      params: GetReleaseParams
      return: void
    }
    publish: {
      params: GetReleaseParams & { version: number }
      return: ReleaseActionProps<'publish'>
    }
    unarchive: {
      params: GetReleaseParams & { version: number }
      return: ReleaseProps
    }
    unpublish: {
      params: GetReleaseParams & { version: number }
      return: ReleaseActionProps<'unpublish'>
    }
    validate: {
      params: GetReleaseParams
      payload?: ReleaseValidatePayload
      return: ReleaseActionProps<'validate'>
    }
  }
  ReleaseAction: {
    get: {
      params: GetReleaseParams & { actionId: string }
      return: ReleaseAction
    }
    getMany: {
      params: GetSpaceEnvironmentParams & { query?: ReleaseActionQueryOptions }
      return: Collection<ReleaseAction, ReleaseActionProps>
    }
    queryForRelease: {
      params: GetReleaseParams & { query?: ReleaseActionQueryOptions }
      return: Collection<ReleaseAction, ReleaseActionProps>
    }
  }
  Role: {
    get: { params: GetSpaceParams & { roleId: string }; return: RoleProps }
    getMany: { params: GetSpaceParams & QueryParams; return: CollectionProp<RoleProps> }
    create: {
      params: GetSpaceParams
      payload: CreateRoleProps
      headers?: AxiosRequestHeaders
      return: RoleProps
    }
    createWithId: {
      params: GetSpaceParams & { roleId: string }
      payload: CreateRoleProps
      headers?: AxiosRequestHeaders
      return: RoleProps
    }
    update: {
      params: GetSpaceParams & { roleId: string }
      payload: RoleProps
      headers?: AxiosRequestHeaders
      return: RoleProps
    }
    delete: { params: GetSpaceParams & { roleId: string }; return: any }
  }
  ScheduledAction: {
    get: {
      params: GetSpaceParams & { scheduledActionId: string; environmentId: string }
      return: ScheduledActionProps
    }
    getMany: { params: GetSpaceParams & QueryParams; return: CollectionProp<ScheduledActionProps> }
    create: {
      params: GetSpaceParams
      payload: Omit<ScheduledActionProps, 'sys'>
      return: ScheduledActionProps
    }
    update: {
      params: GetSpaceParams & { scheduledActionId: string; version: number }
      payload: Omit<ScheduledActionProps, 'sys'>
      return: ScheduledActionProps
    }
    delete: { params: GetSpaceEnvironmentParams & { scheduledActionId: string }; return: any }
  }
  Snapshot: {
    getManyForEntry: {
      params: GetSnapshotForEntryParams & QueryParams
      return: CollectionProp<SnapshotProps<EntryProps<any>>>
    }
    getForEntry: {
      params: GetSnapshotForEntryParams & { snapshotId: string }
      return: SnapshotProps<EntryProps<any>>
    }
    getManyForContentType: {
      params: GetSnapshotForContentTypeParams & QueryParams
      return: CollectionProp<SnapshotProps<ContentTypeProps>>
    }
    getForContentType: {
      params: GetSnapshotForContentTypeParams & { snapshotId: string }
      return: SnapshotProps<ContentTypeProps>
    }
  }
  Space: {
    get: { params: GetSpaceParams; return: SpaceProps }
    getMany: { params: QueryParams; return: CollectionProp<SpaceProps> }
    create: {
      params: { organizationId?: string }
      payload: Omit<SpaceProps, 'sys'>
      headers?: AxiosRequestHeaders
      return: any
    }
    update: {
      params: GetSpaceParams
      payload: SpaceProps
      headers?: AxiosRequestHeaders
      return: SpaceProps
    }
    delete: { params: GetSpaceParams; return: void }
  }
  SpaceMember: {
    get: { params: GetSpaceParams & { spaceMemberId: string }; return: SpaceMemberProps }
    getMany: { params: GetSpaceParams & QueryParams; return: CollectionProp<SpaceMemberProps> }
  }
  SpaceMembership: {
    get: { params: GetSpaceMembershipProps; return: SpaceMembershipProps }
    getMany: { params: GetSpaceParams & QueryParams; return: CollectionProp<SpaceMembershipProps> }
    getForOrganization: {
      params: GetOrganizationParams & { spaceMembershipId: string }
      return: SpaceMembershipProps
    }
    getManyForOrganization: {
      params: GetOrganizationParams & QueryParams
      return: CollectionProp<SpaceMembershipProps>
    }
    create: {
      params: GetSpaceParams
      payload: CreateSpaceMembershipProps
      headers?: AxiosRequestHeaders
      return: SpaceMembershipProps
    }
    createWithId: {
      params: GetSpaceMembershipProps
      payload: CreateSpaceMembershipProps
      headers?: AxiosRequestHeaders
      return: SpaceMembershipProps
    }
    update: {
      params: GetSpaceMembershipProps
      payload: SpaceMembershipProps
      headers?: AxiosRequestHeaders
      return: SpaceMembershipProps
    }
    delete: { params: GetSpaceMembershipProps; return: any }
  }
  Tag: {
    get: { params: GetTagParams; return: TagProps }
    getMany: { params: GetSpaceEnvironmentParams & QueryParams; return: CollectionProp<TagProps> }
    createWithId: { params: GetTagParams; payload: CreateTagProps; return: TagProps }
    update: {
      params: GetTagParams
      payload: UpdateTagProps
      headers?: AxiosRequestHeaders
      return: TagProps
    }
    delete: { params: DeleteTagParams; return: any }
  }
  Task: {
    get: { params: GetTaskParams; return: TaskProps }
    getMany: {
      params: GetEntryParams & QueryParams
      return: CollectionProp<TaskProps>
    }
    getAll: {
      params: GetEntryParams & QueryParams
      return: CollectionProp<TaskProps>
    }
    create: { params: CreateTaskParams; payload: CreateTaskProps; return: TaskProps }
    update: {
      params: UpdateTaskParams
      payload: UpdateTaskProps
      headers?: AxiosRequestHeaders
      return: TaskProps
    }
    delete: { params: DeleteTaskParams; return: void }
  }
  Team: {
    get: { params: GetTeamParams; return: TeamProps }
    getMany: { params: GetOrganizationParams & QueryParams; return: CollectionProp<TeamProps> }
    getManyForSpace: { params: GetSpaceParams & QueryParams; return: CollectionProp<TeamProps> }
    create: {
      params: GetOrganizationParams
      payload: CreateTeamProps
      headers?: AxiosRequestHeaders
      return: any
    }
    update: {
      params: GetTeamParams
      payload: TeamProps
      headers?: AxiosRequestHeaders
      return: TeamProps
    }
    delete: { params: GetTeamParams; return: any }
  }
  TeamMembership: {
    get: { params: GetTeamMembershipParams; return: TeamMembershipProps }
    getManyForOrganization: {
      params: GetOrganizationParams & QueryParams
      return: CollectionProp<TeamMembershipProps>
    }
    getManyForTeam: {
      params: GetTeamParams & QueryParams
      return: CollectionProp<TeamMembershipProps>
    }
    create: {
      params: GetTeamParams
      payload: CreateTeamMembershipProps
      headers?: AxiosRequestHeaders
      return: TeamMembershipProps
    }
    update: {
      params: GetTeamMembershipParams
      payload: TeamMembershipProps
      headers?: AxiosRequestHeaders
      return: TeamMembershipProps
    }
    delete: { params: GetTeamMembershipParams; return: any }
  }
  TeamSpaceMembership: {
    get: { params: GetTeamSpaceMembershipParams; return: TeamSpaceMembershipProps }
    getMany: {
      params: GetSpaceParams & QueryParams
      return: CollectionProp<TeamSpaceMembershipProps>
    }
    getForOrganization: {
      params: GetOrganizationParams & { teamSpaceMembershipId: string }
      return: TeamSpaceMembershipProps
    }
    getManyForOrganization: {
      params: GetOrganizationParams & QueryParams & { teamId?: string }
      return: CollectionProp<TeamSpaceMembershipProps>
    }
    create: {
      params: GetSpaceParams & { teamId: string }
      payload: CreateTeamSpaceMembershipProps
      headers?: AxiosRequestHeaders
      return: TeamSpaceMembershipProps
    }
    update: {
      params: GetTeamSpaceMembershipParams
      payload: TeamSpaceMembershipProps
      headers?: AxiosRequestHeaders
      return: TeamSpaceMembershipProps
    }
    delete: { params: GetTeamSpaceMembershipParams; return: any }
  }
  UIConfig: {
    get: { params: GetUIConfigParams; return: UIConfigProps }
    update: { params: GetUIConfigParams; payload: UIConfigProps; return: UIConfigProps }
  }
  Upload: {
    get: { params: GetSpaceParams & { uploadId: string }; return: any }
    create: {
      params: GetSpaceParams
      payload: { file: string | ArrayBuffer | Stream }
      return: any
    }
    delete: { params: GetSpaceParams & { uploadId: string }; return: any }
  }
  Usage: {
    getManyForSpace: {
      params: { organizationId: string } & QueryParams
      return: CollectionProp<UsageProps>
    }
    getManyForOrganization: {
      params: { organizationId: string } & QueryParams
      return: CollectionProp<UsageProps>
    }
  }
  User: {
    getManyForSpace: { params: GetSpaceParams & QueryParams; return: CollectionProp<UserProps> }
    getForSpace: { params: GetSpaceParams & { userId: string }; return: UserProps }
    getCurrent: { params?: QueryParams; return: any }
    getForOrganization: { params: GetOrganizationParams & { userId: string }; return: UserProps }
    getManyForOrganization: {
      params: GetOrganizationParams & QueryParams
      return: CollectionProp<UserProps>
    }
  }
  UserUIConfig: {
    get: { params: GetUserUIConfigParams; return: UserUIConfigProps }
    update: { params: GetUserUIConfigParams; payload: UserUIConfigProps; return: UserUIConfigProps }
  }
  Webhook: {
    get: { params: GetWebhookParams; return: WebhookProps }
    getMany: { params: GetSpaceParams & QueryParams; return: CollectionProp<WebhookProps> }
    getCallDetails: { params: GetWebhookCallDetailsUrl; return: WebhookCallDetailsProps }
    getHealthStatus: { params: GetWebhookParams; return: WebhookHealthProps }
    getManyCallDetails: {
      params: GetWebhookParams & QueryParams
      return: CollectionProp<WebhookCallOverviewProps>
    }
    create: {
      params: GetSpaceParams
      payload: CreateWebhooksProps
      headers?: AxiosRequestHeaders
      return: WebhookProps
    }
    createWithId: {
      params: GetWebhookParams
      payload: CreateWebhooksProps
      headers?: AxiosRequestHeaders
      return: WebhookProps
    }
    update: { params: GetWebhookParams; payload: WebhookProps; return: WebhookProps }
    delete: { params: GetWebhookParams; return: void }
  }
  WorkflowDefinition: {
    get: {
      params: GetWorkflowDefinitionParams
      headers?: AxiosRequestHeaders
      return: WorkflowDefinitionProps
    }
    getMany: {
      params: GetSpaceEnvironmentParams & { query?: WorkflowDefinitionQueryOptions }
      headers?: AxiosRequestHeaders
      return: CollectionProp<WorkflowDefinitionProps>
    }
    create: {
      params: CreateWorkflowDefinitionParams
      payload: CreateWorkflowDefinitionProps
      headers?: AxiosRequestHeaders
      return: WorkflowDefinitionProps
    }
    update: {
      params: GetWorkflowDefinitionParams
      payload: WorkflowDefinitionProps
      headers?: AxiosRequestHeaders
      return: WorkflowDefinitionProps
    }
    delete: {
      params: DeleteWorkflowDefinitionParams
      headers?: AxiosRequestHeaders
      return: void
    }
  }
  Workflow: {
    getMany: {
      params: GetSpaceEnvironmentParams & { query?: WorkflowQueryOptions }
      headers?: AxiosRequestHeaders
      return: CollectionProp<WorkflowProps>
    }
    create: {
      params: CreateWorkflowParams
      payload: CreateWorkflowProps
      headers?: AxiosRequestHeaders
      return: WorkflowProps
    }
    update: {
      params: GetWorkflowParams
      payload: WorkflowProps
      headers?: AxiosRequestHeaders
      return: WorkflowProps
    }
    delete: {
      params: DeleteWorkflowParams
      headers?: AxiosRequestHeaders
      return: void
    }
    complete: {
      params: CompleteWorkflowParams
      headers?: AxiosRequestHeaders
      return: void
    }
  }
  WorkflowsChangelog: {
    getMany: {
      params: GetSpaceEnvironmentParams & { query: WorkflowsChangelogQueryOptions }
      headers?: AxiosRequestHeaders
      return: CollectionProp<WorkflowsChangelogEntryProps>
    }
  }
}

/**
 * @private
 */
export type MROpts<
  ET extends keyof MRActions,
  Action extends keyof MRActions[ET],
  UA extends boolean = false
> = {
  entityType: ET
  action: Action
} & (UA extends true ? { userAgent: string } : {}) &
  ('params' extends keyof MRActions[ET][Action]
    ? undefined extends MRActions[ET][Action]['params']
      ? { params?: MRActions[ET][Action]['params'] }
      : { params: MRActions[ET][Action]['params'] }
    : {}) &
  ('payload' extends keyof MRActions[ET][Action]
    ? undefined extends MRActions[ET][Action]['payload']
      ? { payload?: MRActions[ET][Action]['payload'] }
      : { payload: MRActions[ET][Action]['payload'] }
    : {}) &
  ('headers' extends keyof MRActions[ET][Action]
    ? undefined extends MRActions[ET][Action]['headers']
      ? { headers?: MRActions[ET][Action]['headers'] }
      : { headers: MRActions[ET][Action]['headers'] }
    : {})

/**
 * @private
 */
export type MRReturn<
  ET extends keyof MRActions,
  Action extends keyof MRActions[ET]
> = 'return' extends keyof MRActions[ET][Action] ? Promise<MRActions[ET][Action]['return']> : never

/** Base interface for all Payload interfaces. Used as part of the MakeRequestOptions to simplify payload definitions. */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MakeRequestPayload {}

export interface MakeRequestOptions {
  entityType: keyof MRActions
  action: string
  params?: Record<string, unknown>
  payload?: Record<string, unknown> | OpPatch[] | MakeRequestPayload
  headers?: AxiosRequestHeaders
  userAgent: string
}

export type EnvironmentTemplateParams = {
  spaceId: string
  environmentId: string
  environmentTemplateId: string
}

export type GetAppActionParams = GetAppDefinitionParams & { appActionId: string }
export type GetAppActionsForEnvParams = GetSpaceParams & { environmentId?: string }
export type GetAppActionCallParams = GetAppInstallationParams & { appActionId: string }
export type GetAppBundleParams = GetAppDefinitionParams & { appBundleId: string }
export type GetAppDefinitionParams = GetOrganizationParams & { appDefinitionId: string }
export type GetAppInstallationsForOrgParams = GetOrganizationParams & {
  appDefinitionId: string
}
export type GetAppInstallationParams = GetSpaceEnvironmentParams & { appDefinitionId: string }
export type GetBulkActionParams = GetSpaceEnvironmentParams & { bulkActionId: string }
export type GetCommentParams = GetEntryParams & { commentId: string }
export type GetContentTypeParams = GetSpaceEnvironmentParams & { contentTypeId: string }
export type GetEditorInterfaceParams = GetSpaceEnvironmentParams & { contentTypeId: string }
export type GetEntryParams = GetSpaceEnvironmentParams & { entryId: string }
export type GetExtensionParams = GetSpaceEnvironmentParams & { extensionId: string }
export type GetEnvironmentTemplateParams = GetOrganizationParams & { environmentTemplateId: string }
export type GetOrganizationParams = { organizationId: string }
export type GetReleaseParams = GetSpaceEnvironmentParams & { releaseId: string }
export type GetSnapshotForContentTypeParams = GetSpaceEnvironmentParams & { contentTypeId: string }
export type GetSnapshotForEntryParams = GetSpaceEnvironmentParams & { entryId: string }
export type GetSpaceEnvAliasParams = GetSpaceParams & { environmentAliasId: string }
export type GetSpaceEnvironmentParams = { spaceId: string; environmentId: string }
export type GetSpaceMembershipProps = GetSpaceParams & { spaceMembershipId: string }
export type GetSpaceParams = { spaceId: string }
export type GetTagParams = GetSpaceEnvironmentParams & { tagId: string }
export type GetTaskParams = GetEntryParams & { taskId: string }
export type GetTeamMembershipParams = GetTeamParams & { teamMembershipId: string }
export type GetTeamParams = { organizationId: string; teamId: string }
export type GetTeamSpaceMembershipParams = GetSpaceParams & { teamSpaceMembershipId: string }
export type GetWebhookCallDetailsUrl = GetWebhookParams & { callId: string }
export type GetWebhookParams = GetSpaceParams & { webhookDefinitionId: string }
export type GetOrganizationMembershipParams = GetOrganizationParams & {
  organizationMembershipId: string
}

export type GetAppUploadParams = GetOrganizationParams & { appUploadId: string }
export type GetWorkflowDefinitionParams = GetSpaceEnvironmentParams & {
  workflowDefinitionId: string
}
export type GetWorkflowParams = GetSpaceEnvironmentParams & {
  workflowId: string
}
export type GetUIConfigParams = GetSpaceEnvironmentParams
export type GetUserUIConfigParams = GetUIConfigParams

export type QueryParams = { query?: QueryOptions }
export type SpaceQueryParams = { query?: SpaceQueryOptions }
export type PaginationQueryParams = { query?: PaginationQueryOptions }
export enum ScheduledActionReferenceFilters {
  contentTypeAnnotationNotIn = 'sys.contentType.metadata.annotations.ContentType[nin]',
}
