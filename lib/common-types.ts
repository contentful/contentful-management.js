import type { RawAxiosRequestConfig, RawAxiosRequestHeaders } from 'axios'
import type { OpPatch } from 'json-patch'
import type { Stream } from 'stream'
import type {
  AccessTokenProps,
  CreatePersonalAccessTokenProps as CreatePATProps,
} from './entities/access-token'
import type { ApiKeyProps, CreateApiKeyProps } from './entities/api-key'
import type { AppActionProps, CreateAppActionProps } from './entities/app-action'
import type {
  AppActionCallProps,
  AppActionCallResponse,
  AppActionCallRawResponseProps,
  CreateAppActionCallProps,
} from './entities/app-action-call'
import type { AppBundleProps, CreateAppBundleProps } from './entities/app-bundle'
import type {
  AppDefinitionProps,
  AppInstallationsForOrganizationProps,
  CreateAppDefinitionProps,
} from './entities/app-definition'
import type { AppDetailsProps, CreateAppDetailsProps } from './entities/app-details'
import type { AppInstallationProps, CreateAppInstallationProps } from './entities/app-installation'
import type {
  AppSignedRequestProps,
  CreateAppSignedRequestProps,
} from './entities/app-signed-request'
import type {
  AppSigningSecretProps,
  CreateAppSigningSecretProps,
} from './entities/app-signing-secret'
import type { AppUploadProps } from './entities/app-upload'
import type {
  AssetFileProp,
  AssetProcessingForLocale,
  AssetProps,
  CreateAssetProps,
} from './entities/asset'
import type { AssetKeyProps, CreateAssetKeyProps } from './entities/asset-key'
import type {
  BulkActionProps,
  BulkActionPublishPayload,
  BulkActionUnpublishPayload,
  BulkActionV2Payload,
  BulkActionValidatePayload,
  PublishBulkActionV2Payload,
  UnpublishBulkActionV2Payload,
  ValidateBulkActionV2Payload,
} from './entities/bulk-action'
import type {
  CommentProps,
  CreateCommentParams,
  CreateCommentProps,
  DeleteCommentParams,
  GetCommentParentEntityParams,
  GetManyCommentsParams,
  PlainTextBodyFormat,
  RichTextBodyFormat,
  RichTextCommentBodyPayload,
  RichTextCommentProps,
  UpdateCommentParams,
  UpdateCommentProps,
} from './entities/comment'
import type { ComponentTypeProps, ComponentTypeQueryOptions } from './entities/component-type'
import type { ContentTypeProps, CreateContentTypeProps } from './entities/content-type'
import type { EditorInterfaceProps } from './entities/editor-interface'
import type { CreateEntryProps, EntryProps, EntryReferenceProps } from './entities/entry'
import type { CreateEnvironmentProps, EnvironmentProps } from './entities/environment'
import type {
  CreateEnvironmentAliasProps,
  EnvironmentAliasProps,
} from './entities/environment-alias'
import type { CreateExtensionProps, ExtensionProps } from './entities/extension'
import type { CreateLocaleProps, LocaleProps } from './entities/locale'
import type { OrganizationProps } from './entities/organization'
import type {
  CreateOrganizationInvitationProps,
  OrganizationInvitationProps,
} from './entities/organization-invitation'
import type { OrganizationMembershipProps } from './entities/organization-membership'
import type {
  CreatePersonalAccessTokenProps,
  PersonalAccessTokenProps,
} from './entities/personal-access-token'
import type { PreviewApiKeyProps } from './entities/preview-api-key'
import type {
  ReleasePayload,
  ReleasePayloadV2,
  ReleaseProps,
  ReleaseQueryOptions,
  ReleaseValidatePayload,
} from './entities/release'
import type {
  ReleaseAction,
  ReleaseActionProps,
  ReleaseActionQueryOptions,
} from './entities/release-action'
import type { CreateRoleProps, RoleProps } from './entities/role'
import type { ScheduledActionProps } from './entities/scheduled-action'
import type { SnapshotProps } from './entities/snapshot'
import type { SpaceProps } from './entities/space'
import type { SpaceMemberProps } from './entities/space-member'
import type { CreateSpaceMembershipProps, SpaceMembershipProps } from './entities/space-membership'
import type { CreateTagProps, DeleteTagParams, TagProps, UpdateTagProps } from './entities/tag'
import type { CreateTeamProps, TeamProps } from './entities/team'
import type { CreateTeamMembershipProps, TeamMembershipProps } from './entities/team-membership'
import type {
  CreateTeamSpaceMembershipProps,
  TeamSpaceMembershipProps,
} from './entities/team-space-membership'
import type { UsageProps } from './entities/usage'
import type { UserProps } from './entities/user'
import type {
  CreateWebhooksProps,
  UpsertWebhookSigningSecretPayload,
  WebhookCallDetailsProps,
  WebhookCallOverviewProps,
  WebhookHealthProps,
  WebhookProps,
  WebhookRetryPolicyPayload,
  WebhookRetryPolicyProps,
  WebhookSigningSecretProps,
} from './entities/webhook'

import type {
  CreateTaskParams,
  CreateTaskProps,
  DeleteTaskParams,
  TaskProps,
  UpdateTaskParams,
  UpdateTaskProps,
} from './entities/task'

import type { AppAccessTokenProps, CreateAppAccessTokenProps } from './entities/app-access-token'
import type {
  AppEventSubscriptionProps,
  CreateAppEventSubscriptionProps,
} from './entities/app-event-subscription'
import type { AppKeyProps, CreateAppKeyProps } from './entities/app-key'
import type { ConceptProps, CreateConceptProps } from './entities/concept'
import type { ConceptSchemeProps, CreateConceptSchemeProps } from './entities/concept-scheme'
import type {
  CreateEnvironmentTemplateProps,
  EnvironmentTemplateProps,
} from './entities/environment-template'
import type {
  CreateEnvironmentTemplateInstallationProps,
  EnvironmentTemplateInstallationProps,
  EnvironmentTemplateValidationProps,
  ValidateEnvironmentTemplateInstallationProps,
} from './entities/environment-template-installation'
import type { FunctionProps } from './entities/function'
import type { ResourceProps, ResourceQueryOptions } from './entities/resource'
import type {
  ResourceProviderProps,
  UpsertResourceProviderProps,
} from './entities/resource-provider'
import type {
  ResourceTypeProps,
  SpaceEnvResourceTypeProps,
  UpsertResourceTypeProps,
} from './entities/resource-type'
import type { UIConfigProps } from './entities/ui-config'
import type { UserUIConfigProps } from './entities/user-ui-config'
import type {
  CompleteWorkflowParams,
  CreateWorkflowParams,
  CreateWorkflowProps,
  DeleteWorkflowParams,
  WorkflowProps,
  WorkflowQueryOptions,
} from './entities/workflow'
import type {
  CreateWorkflowDefinitionParams,
  CreateWorkflowDefinitionProps,
  DeleteWorkflowDefinitionParams,
  WorkflowDefinitionProps,
  WorkflowDefinitionQueryOptions,
} from './entities/workflow-definition'
import type {
  WorkflowsChangelogEntryProps,
  WorkflowsChangelogQueryOptions,
} from './entities/workflows-changelog-entry'
import type {
  CreateOAuthApplicationProps,
  OAuthApplicationProps,
  UpdateOAuthApplicationProps,
} from './entities/oauth-application'
import type { FunctionLogProps } from './entities/function-log'
import type { AiActionProps, AiActionQueryOptions, CreateAiActionProps } from './entities/ai-action'
import type {
  AiActionInvocationProps,
  AiActionInvocationType,
} from './entities/ai-action-invocation'
import type { AgentGeneratePayload, AgentProps } from './entities/agent'
import type { AgentRunProps, AgentRunQueryOptions } from './entities/agent-run'
import type {
  UpdateVectorizationStatusProps,
  VectorizationStatusProps,
} from './entities/vectorization-status'
import type {
  GetSemanticDuplicatesProps,
  SemanticDuplicatesProps,
} from './entities/semantic-duplicates'
import type {
  GetSemanticRecommendationsProps,
  SemanticRecommendationsProps,
} from './entities/semantic-recommendations'
import type {
  GetSemanticReferenceSuggestionsProps,
  SemanticReferenceSuggestionsProps,
} from './entities/semantic-reference-suggestions'
import type { GetSemanticSearchProps, SemanticSearchProps } from './entities/semantic-search'

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

/**
 * ResourceLink is a reference object to another entity outside of the current space/environment
 */
export interface ResourceLink<T extends string> {
  sys: {
    type: 'ResourceLink'
    linkType: T
    urn: string
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
  /**
   * @deprecated `status` only exists on entities. Please refactor to use a
   * type guard to get the correct `EntityMetaSysProps` type with this property.
   */
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
  /**
   * @deprecated `contentType` only exists on entries. Please refactor to use a
   * type guard to get the correct `EntryMetaSysProps` type with this property.
   */
  contentType: SysLink
  space: SysLink
  status?: SysLink
  environment: SysLink
  publishedBy?: Link<'User'> | Link<'AppDefinition'>
  publishedAt?: string
  firstPublishedAt?: string
  publishedCounter?: number
  locale?: string
  fieldStatus?: { '*': Record<string, 'draft' | 'changed' | 'published'> }
  release?: Link<'Release'>
}

export interface EntryMetaSysProps extends EntityMetaSysProps {
  contentType: SysLink
  automationTags: Link<'Tag'>[]
}

export interface MetaLinkProps {
  type: string
  linkType: string
  id: string
}

export interface MetadataProps {
  tags: Link<'Tag'>[]
  concepts?: Link<'TaxonomyConcept'>[]
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
  skip?: never
  pageNext?: string
  pagePrev?: string
}

// Base interface for shared fields
interface CursorPaginationBase {
  limit?: number
}

// Interfaces for each “exclusive” shape
interface CursorPaginationPageNext extends CursorPaginationBase {
  pageNext: string
  pagePrev?: never
}

interface CursorPaginationPagePrev extends CursorPaginationBase {
  pageNext?: never
  pagePrev: string
}

interface CursorPaginationNone extends CursorPaginationBase {
  pageNext?: never
  pagePrev?: never
}

type StartOperator = 'gt' | 'gte'
type EndOperator = 'lt' | 'lte'
type ComparisonOperator = StartOperator | EndOperator

// Helper type for creating property paths with comparison operators
// For example "sys.createdAt[gte]", P = sys.createdAt, O = gte
type WithComparisonOperator<P extends string, O extends ComparisonOperator> = `${P}[${O}]`

// Helper types to ensure only one start operator can be used and only one end operator can be used
type WithOneOperator<P extends string, C extends ComparisonOperator, O extends C> = {
  [K in WithComparisonOperator<P, O>]: string | Date
} & {
  [K in WithComparisonOperator<P, Exclude<C, O>>]?: never
}
type WithStartOperator<P extends string> =
  | WithOneOperator<P, StartOperator, 'gt'>
  | WithOneOperator<P, StartOperator, 'gte'>
type WithEndOperator<P extends string> =
  | WithOneOperator<P, EndOperator, 'lt'>
  | WithOneOperator<P, EndOperator, 'lte'>

// Type for valid date range combinations - only start, only end, or both
type IntervalQuery<P extends string> =
  | Partial<WithStartOperator<P>>
  | Partial<WithEndOperator<P>>
  | (Partial<WithStartOperator<P>> & Partial<WithEndOperator<P>>)

export type CreatedAtIntervalQueryOptions = IntervalQuery<'sys.createdAt'>
export interface AcceptsQueryOptions {
  'accepts[all]'?: string
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

  (opts: MROpts<'AiAction', 'get', UA>): MRReturn<'AiAction', 'get'>
  (opts: MROpts<'AiAction', 'getMany', UA>): MRReturn<'AiAction', 'getMany'>
  (opts: MROpts<'AiAction', 'create', UA>): MRReturn<'AiAction', 'create'>
  (opts: MROpts<'AiAction', 'update', UA>): MRReturn<'AiAction', 'update'>
  (opts: MROpts<'AiAction', 'delete', UA>): MRReturn<'AiAction', 'delete'>
  (opts: MROpts<'AiAction', 'publish', UA>): MRReturn<'AiAction', 'publish'>
  (opts: MROpts<'AiAction', 'unpublish', UA>): MRReturn<'AiAction', 'unpublish'>
  (opts: MROpts<'AiAction', 'invoke', UA>): MRReturn<'AiAction', 'invoke'>

  (opts: MROpts<'AiActionInvocation', 'get', UA>): MRReturn<'AiActionInvocation', 'get'>

  (opts: MROpts<'Agent', 'get', UA>): MRReturn<'Agent', 'get'>
  (opts: MROpts<'Agent', 'getMany', UA>): MRReturn<'Agent', 'getMany'>
  (opts: MROpts<'Agent', 'generate', UA>): MRReturn<'Agent', 'generate'>

  (opts: MROpts<'AgentRun', 'get', UA>): MRReturn<'AgentRun', 'get'>
  (opts: MROpts<'AgentRun', 'getMany', UA>): MRReturn<'AgentRun', 'getMany'>

  (opts: MROpts<'AppAction', 'get', UA>): MRReturn<'AppAction', 'get'>
  (opts: MROpts<'AppAction', 'getMany', UA>): MRReturn<'AppAction', 'getMany'>
  (opts: MROpts<'AppAction', 'delete', UA>): MRReturn<'AppAction', 'delete'>
  (opts: MROpts<'AppAction', 'create', UA>): MRReturn<'AppAction', 'create'>
  (opts: MROpts<'AppAction', 'update', UA>): MRReturn<'AppAction', 'update'>

  (opts: MROpts<'AppActionCall', 'create', UA>): MRReturn<'AppActionCall', 'create'>
  (
    opts: MROpts<'AppActionCall', 'createWithResponse', UA>,
  ): MRReturn<'AppActionCall', 'createWithResponse'>
  (opts: MROpts<'AppActionCall', 'getCallDetails', UA>): MRReturn<'AppActionCall', 'getCallDetails'>
  (opts: MROpts<'AppActionCall', 'get', UA>): MRReturn<'AppActionCall', 'get'>
  (
    opts: MROpts<'AppActionCall', 'createWithResult', UA>,
  ): MRReturn<'AppActionCall', 'createWithResult'>
  (opts: MROpts<'AppActionCall', 'getResponse', UA>): MRReturn<'AppActionCall', 'getResponse'>

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
  (
    opts: MROpts<'AppDefinition', 'getInstallationsForOrg', UA>,
  ): MRReturn<'AppDefinition', 'getInstallationsForOrg'>

  (opts: MROpts<'AppInstallation', 'get', UA>): MRReturn<'AppInstallation', 'get'>
  (opts: MROpts<'AppInstallation', 'getMany', UA>): MRReturn<'AppInstallation', 'getMany'>
  (opts: MROpts<'AppInstallation', 'upsert', UA>): MRReturn<'AppInstallation', 'upsert'>
  (opts: MROpts<'AppInstallation', 'delete', UA>): MRReturn<'AppInstallation', 'delete'>
  (
    opts: MROpts<'AppInstallation', 'getForOrganization', UA>,
  ): MRReturn<'AppInstallation', 'getForOrganization'>

  (opts: MROpts<'Asset', 'getMany', UA>): MRReturn<'Asset', 'getMany'>
  (opts: MROpts<'Asset', 'getManyWithCursor', UA>): MRReturn<'Asset', 'getManyWithCursor'>
  (opts: MROpts<'Asset', 'getPublished', UA>): MRReturn<'Asset', 'getPublished'>
  (opts: MROpts<'Asset', 'getPublishedWithCursor', UA>): MRReturn<'Asset', 'getPublishedWithCursor'>
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

  (opts: MROpts<'AppEventSubscription', 'upsert', UA>): MRReturn<'AppEventSubscription', 'upsert'>
  (opts: MROpts<'AppEventSubscription', 'get', UA>): MRReturn<'AppEventSubscription', 'get'>
  (opts: MROpts<'AppEventSubscription', 'delete', UA>): MRReturn<'AppEventSubscription', 'delete'>

  (opts: MROpts<'AppKey', 'get', UA>): MRReturn<'AppKey', 'get'>
  (opts: MROpts<'AppKey', 'getMany', UA>): MRReturn<'AppKey', 'getMany'>
  (opts: MROpts<'AppKey', 'create', UA>): MRReturn<'AppKey', 'create'>
  (opts: MROpts<'AppKey', 'delete', UA>): MRReturn<'AppKey', 'delete'>

  (opts: MROpts<'AppAccessToken', 'create', UA>): MRReturn<'AppAccessToken', 'create'>

  (opts: MROpts<'AssetKey', 'create', UA>): MRReturn<'AssetKey', 'create'>

  (opts: MROpts<'BulkAction', 'get', UA>): MRReturn<'BulkAction', 'get'>
  (opts: MROpts<'BulkAction', 'publish', UA>): MRReturn<'BulkAction', 'publish'>
  (opts: MROpts<'BulkAction', 'unpublish', UA>): MRReturn<'BulkAction', 'unpublish'>
  (opts: MROpts<'BulkAction', 'validate', UA>): MRReturn<'BulkAction', 'validate'>
  (opts: MROpts<'BulkAction', 'getV2', UA>): MRReturn<'BulkAction', 'getV2'>
  (opts: MROpts<'BulkAction', 'publishV2', UA>): MRReturn<'BulkAction', 'publishV2'>
  (opts: MROpts<'BulkAction', 'unpublishV2', UA>): MRReturn<'BulkAction', 'unpublishV2'>
  (opts: MROpts<'BulkAction', 'validateV2', UA>): MRReturn<'BulkAction', 'validateV2'>

  (opts: MROpts<'Comment', 'get', UA>): MRReturn<'Comment', 'get'>
  (opts: MROpts<'Comment', 'getMany', UA>): MRReturn<'Comment', 'getMany'>
  (opts: MROpts<'Comment', 'getAll', UA>): MRReturn<'Comment', 'getAll'>
  (opts: MROpts<'Comment', 'create', UA>): MRReturn<'Comment', 'create'>
  (opts: MROpts<'Comment', 'update', UA>): MRReturn<'Comment', 'update'>
  (opts: MROpts<'Comment', 'delete', UA>): MRReturn<'Comment', 'delete'>

  (opts: MROpts<'ComponentType', 'getMany', UA>): MRReturn<'ComponentType', 'getMany'>

  (opts: MROpts<'Concept', 'get', UA>): MRReturn<'Concept', 'get'>
  (opts: MROpts<'Concept', 'getMany', UA>): MRReturn<'Concept', 'getMany'>
  (opts: MROpts<'Concept', 'getTotal', UA>): MRReturn<'Concept', 'getTotal'>
  (opts: MROpts<'Concept', 'getDescendants', UA>): MRReturn<'Concept', 'getDescendants'>
  (opts: MROpts<'Concept', 'create', UA>): MRReturn<'Concept', 'create'>
  (opts: MROpts<'Concept', 'createWithId', UA>): MRReturn<'Concept', 'createWithId'>
  (opts: MROpts<'Concept', 'patch', UA>): MRReturn<'Concept', 'patch'>
  (opts: MROpts<'Concept', 'update', UA>): MRReturn<'Concept', 'update'>
  (opts: MROpts<'Concept', 'delete', UA>): MRReturn<'Concept', 'delete'>

  (opts: MROpts<'ConceptScheme', 'get', UA>): MRReturn<'ConceptScheme', 'get'>
  (opts: MROpts<'ConceptScheme', 'getMany', UA>): MRReturn<'ConceptScheme', 'getMany'>
  (opts: MROpts<'ConceptScheme', 'getTotal', UA>): MRReturn<'ConceptScheme', 'getTotal'>
  (opts: MROpts<'ConceptScheme', 'create', UA>): MRReturn<'ConceptScheme', 'create'>
  (opts: MROpts<'ConceptScheme', 'createWithId', UA>): MRReturn<'ConceptScheme', 'createWithId'>
  (opts: MROpts<'ConceptScheme', 'patch', UA>): MRReturn<'ConceptScheme', 'patch'>
  (opts: MROpts<'ConceptScheme', 'update', UA>): MRReturn<'ConceptScheme', 'update'>
  (opts: MROpts<'ConceptScheme', 'delete', UA>): MRReturn<'ConceptScheme', 'delete'>

  (opts: MROpts<'ContentType', 'get', UA>): MRReturn<'ContentType', 'get'>
  (opts: MROpts<'ContentType', 'getMany', UA>): MRReturn<'ContentType', 'getMany'>
  (
    opts: MROpts<'ContentType', 'getManyWithCursor', UA>,
  ): MRReturn<'ContentType', 'getManyWithCursor'>
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
  (
    opts: MROpts<'EnvironmentAlias', 'createWithId', UA>,
  ): MRReturn<'EnvironmentAlias', 'createWithId'>
  (opts: MROpts<'EnvironmentAlias', 'update', UA>): MRReturn<'EnvironmentAlias', 'update'>
  (opts: MROpts<'EnvironmentAlias', 'delete', UA>): MRReturn<'EnvironmentAlias', 'delete'>

  (opts: MROpts<'EnvironmentTemplate', 'get', UA>): MRReturn<'EnvironmentTemplate', 'get'>
  (opts: MROpts<'EnvironmentTemplate', 'getMany', UA>): MRReturn<'EnvironmentTemplate', 'getMany'>
  (opts: MROpts<'EnvironmentTemplate', 'create', UA>): MRReturn<'EnvironmentTemplate', 'create'>
  (opts: MROpts<'EnvironmentTemplate', 'update', UA>): MRReturn<'EnvironmentTemplate', 'update'>
  (opts: MROpts<'EnvironmentTemplate', 'delete', UA>): MRReturn<'EnvironmentTemplate', 'delete'>
  (opts: MROpts<'EnvironmentTemplate', 'versions', UA>): MRReturn<'EnvironmentTemplate', 'versions'>
  (
    opts: MROpts<'EnvironmentTemplate', 'versionUpdate', UA>,
  ): MRReturn<'EnvironmentTemplate', 'versionUpdate'>
  (opts: MROpts<'EnvironmentTemplate', 'validate', UA>): MRReturn<'EnvironmentTemplate', 'validate'>
  (opts: MROpts<'EnvironmentTemplate', 'install', UA>): MRReturn<'EnvironmentTemplate', 'install'>
  (
    opts: MROpts<'EnvironmentTemplate', 'disconnect', UA>,
  ): MRReturn<'EnvironmentTemplate', 'disconnect'>

  (
    opts: MROpts<'EnvironmentTemplateInstallation', 'getMany', UA>,
  ): MRReturn<'EnvironmentTemplateInstallation', 'getMany'>
  (
    opts: MROpts<'EnvironmentTemplateInstallation', 'getForEnvironment', UA>,
  ): MRReturn<'EnvironmentTemplateInstallation', 'getForEnvironment'>

  (opts: MROpts<'Entry', 'getMany', UA>): MRReturn<'Entry', 'getMany'>
  (opts: MROpts<'Entry', 'getManyWithCursor', UA>): MRReturn<'Entry', 'getManyWithCursor'>
  (opts: MROpts<'Entry', 'getPublished', UA>): MRReturn<'Entry', 'getPublished'>
  (opts: MROpts<'Entry', 'getPublishedWithCursor', UA>): MRReturn<'Entry', 'getPublishedWithCursor'>
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

  (opts: MROpts<'Function', 'get', UA>): MRReturn<'Function', 'get'>
  (opts: MROpts<'Function', 'getMany', UA>): MRReturn<'Function', 'getMany'>
  (
    opts: MROpts<'Function', 'getManyForEnvironment', UA>,
  ): MRReturn<'Function', 'getManyForEnvironment'>

  (opts: MROpts<'FunctionLog', 'get', UA>): MRReturn<'FunctionLog', 'get'>
  (opts: MROpts<'FunctionLog', 'getMany', UA>): MRReturn<'FunctionLog', 'getMany'>

  (opts: MROpts<'Locale', 'get', UA>): MRReturn<'Locale', 'get'>
  (opts: MROpts<'Locale', 'getMany', UA>): MRReturn<'Locale', 'getMany'>
  (opts: MROpts<'Locale', 'delete', UA>): MRReturn<'Locale', 'delete'>
  (opts: MROpts<'Locale', 'update', UA>): MRReturn<'Locale', 'update'>
  (opts: MROpts<'Locale', 'create', UA>): MRReturn<'Locale', 'create'>

  (opts: MROpts<'Organization', 'getMany', UA>): MRReturn<'Organization', 'getMany'>
  (opts: MROpts<'Organization', 'get', UA>): MRReturn<'Organization', 'get'>

  (opts: MROpts<'OrganizationInvitation', 'get', UA>): MRReturn<'OrganizationInvitation', 'get'>
  (
    opts: MROpts<'OrganizationInvitation', 'create', UA>,
  ): MRReturn<'OrganizationInvitation', 'create'>

  (opts: MROpts<'OrganizationMembership', 'get', UA>): MRReturn<'OrganizationMembership', 'get'>
  (
    opts: MROpts<'OrganizationMembership', 'getMany', UA>,
  ): MRReturn<'OrganizationMembership', 'getMany'>
  (
    opts: MROpts<'OrganizationMembership', 'update', UA>,
  ): MRReturn<'OrganizationMembership', 'update'>
  (
    opts: MROpts<'OrganizationMembership', 'delete', UA>,
  ): MRReturn<'OrganizationMembership', 'delete'>

  (opts: MROpts<'PersonalAccessToken', 'get', UA>): MRReturn<'PersonalAccessToken', 'get'>
  (opts: MROpts<'PersonalAccessToken', 'getMany', UA>): MRReturn<'PersonalAccessToken', 'getMany'>
  (opts: MROpts<'PersonalAccessToken', 'create', UA>): MRReturn<'PersonalAccessToken', 'create'>
  (opts: MROpts<'PersonalAccessToken', 'revoke', UA>): MRReturn<'PersonalAccessToken', 'revoke'>

  (opts: MROpts<'AccessToken', 'get', UA>): MRReturn<'AccessToken', 'get'>
  (opts: MROpts<'AccessToken', 'getMany', UA>): MRReturn<'AccessToken', 'getMany'>
  (
    opts: MROpts<'AccessToken', 'createPersonalAccessToken', UA>,
  ): MRReturn<'AccessToken', 'createPersonalAccessToken'>
  (opts: MROpts<'AccessToken', 'revoke', UA>): MRReturn<'AccessToken', 'revoke'>
  (
    opts: MROpts<'AccessToken', 'getManyForOrganization', UA>,
  ): MRReturn<'AccessToken', 'getManyForOrganization'>

  (opts: MROpts<'OAuthApplication', 'get', UA>): MRReturn<'OAuthApplication', 'get'>
  (
    opts: MROpts<'OAuthApplication', 'getManyForUser', UA>,
  ): MRReturn<'OAuthApplication', 'getManyForUser'>
  (opts: MROpts<'OAuthApplication', 'create', UA>): MRReturn<'OAuthApplication', 'create'>
  (opts: MROpts<'OAuthApplication', 'update', UA>): MRReturn<'OAuthApplication', 'update'>
  (opts: MROpts<'OAuthApplication', 'delete', UA>): MRReturn<'OAuthApplication', 'delete'>

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
  (
    opts: MROpts<'ReleaseAction', 'queryForRelease', UA>,
  ): MRReturn<'ReleaseAction', 'queryForRelease'>

  (opts: MROpts<'ReleaseAsset', 'get', UA>): MRReturn<'ReleaseAsset', 'get'>
  (opts: MROpts<'ReleaseAsset', 'getMany', UA>): MRReturn<'ReleaseAsset', 'getMany'>
  (opts: MROpts<'ReleaseAsset', 'update', UA>): MRReturn<'ReleaseAsset', 'update'>
  (opts: MROpts<'ReleaseAsset', 'create', UA>): MRReturn<'ReleaseAsset', 'create'>
  (opts: MROpts<'ReleaseAsset', 'createWithId', UA>): MRReturn<'ReleaseAsset', 'createWithId'>
  (opts: MROpts<'ReleaseAsset', 'createFromFiles', UA>): MRReturn<'ReleaseAsset', 'createFromFiles'>
  (
    opts: MROpts<'ReleaseAsset', 'processForAllLocales', UA>,
  ): MRReturn<'ReleaseAsset', 'processForAllLocales'>
  (
    opts: MROpts<'ReleaseAsset', 'processForLocale', UA>,
  ): MRReturn<'ReleaseAsset', 'processForLocale'>

  (opts: MROpts<'ReleaseEntry', 'get', UA>): MRReturn<'ReleaseEntry', 'get'>
  (opts: MROpts<'ReleaseEntry', 'getMany', UA>): MRReturn<'ReleaseEntry', 'getMany'>
  (opts: MROpts<'ReleaseEntry', 'update', UA>): MRReturn<'ReleaseEntry', 'update'>
  (opts: MROpts<'ReleaseEntry', 'patch', UA>): MRReturn<'ReleaseEntry', 'patch'>
  (opts: MROpts<'ReleaseEntry', 'create', UA>): MRReturn<'ReleaseEntry', 'create'>
  (opts: MROpts<'ReleaseEntry', 'createWithId', UA>): MRReturn<'ReleaseEntry', 'createWithId'>

  (opts: MROpts<'Resource', 'getMany', UA>): MRReturn<'Resource', 'getMany'>
  (opts: MROpts<'ResourceProvider', 'get', UA>): MRReturn<'ResourceProvider', 'get'>
  (opts: MROpts<'ResourceProvider', 'upsert', UA>): MRReturn<'ResourceProvider', 'upsert'>
  (opts: MROpts<'ResourceProvider', 'delete', UA>): MRReturn<'ResourceProvider', 'delete'>

  (opts: MROpts<'ResourceType', 'get', UA>): MRReturn<'ResourceType', 'get'>
  (opts: MROpts<'ResourceType', 'upsert', UA>): MRReturn<'ResourceType', 'upsert'>
  (opts: MROpts<'ResourceType', 'delete', UA>): MRReturn<'ResourceType', 'delete'>
  (
    opts: MROpts<'ResourceType', 'getForEnvironment', UA>,
  ): MRReturn<'ResourceType', 'getForEnvironment'>
  (opts: MROpts<'ResourceType', 'getMany', UA>): MRReturn<'ResourceType', 'getMany'>

  (opts: MROpts<'Role', 'get', UA>): MRReturn<'Role', 'get'>
  (opts: MROpts<'Role', 'getMany', UA>): MRReturn<'Role', 'getMany'>
  (opts: MROpts<'Role', 'getManyForOrganization', UA>): MRReturn<'Role', 'getManyForOrganization'>
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
  (
    opts: MROpts<'Snapshot', 'getManyForContentType', UA>,
  ): MRReturn<'Snapshot', 'getManyForContentType'>
  (opts: MROpts<'Snapshot', 'getForContentType', UA>): MRReturn<'Snapshot', 'getForContentType'>

  (opts: MROpts<'Space', 'get', UA>): MRReturn<'Space', 'get'>
  (opts: MROpts<'Space', 'getMany', UA>): MRReturn<'Space', 'getMany'>
  (opts: MROpts<'Space', 'getManyForOrganization', UA>): MRReturn<'Space', 'getManyForOrganization'>
  (opts: MROpts<'Space', 'create', UA>): MRReturn<'Space', 'create'>
  (opts: MROpts<'Space', 'update', UA>): MRReturn<'Space', 'update'>
  (opts: MROpts<'Space', 'delete', UA>): MRReturn<'Space', 'delete'>

  (opts: MROpts<'SpaceMember', 'get', UA>): MRReturn<'SpaceMember', 'get'>
  (opts: MROpts<'SpaceMember', 'getMany', UA>): MRReturn<'SpaceMember', 'getMany'>

  (opts: MROpts<'SpaceMembership', 'get', UA>): MRReturn<'SpaceMembership', 'get'>
  (opts: MROpts<'SpaceMembership', 'getMany', UA>): MRReturn<'SpaceMembership', 'getMany'>
  (
    opts: MROpts<'SpaceMembership', 'getForOrganization', UA>,
  ): MRReturn<'SpaceMembership', 'getForOrganization'>
  (
    opts: MROpts<'SpaceMembership', 'getManyForOrganization', UA>,
  ): MRReturn<'SpaceMembership', 'getManyForOrganization'>
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
  (
    opts: MROpts<'TeamMembership', 'getManyForOrganization', UA>,
  ): MRReturn<'TeamMembership', 'getManyForOrganization'>
  (
    opts: MROpts<'TeamMembership', 'getManyForTeam', UA>,
  ): MRReturn<'TeamMembership', 'getManyForTeam'>
  (opts: MROpts<'TeamMembership', 'create', UA>): MRReturn<'TeamMembership', 'create'>
  (opts: MROpts<'TeamMembership', 'update', UA>): MRReturn<'TeamMembership', 'update'>
  (opts: MROpts<'TeamMembership', 'delete', UA>): MRReturn<'TeamMembership', 'delete'>

  (opts: MROpts<'TeamSpaceMembership', 'get', UA>): MRReturn<'TeamSpaceMembership', 'get'>
  (opts: MROpts<'TeamSpaceMembership', 'getMany', UA>): MRReturn<'TeamSpaceMembership', 'getMany'>
  (
    opts: MROpts<'TeamSpaceMembership', 'getForOrganization', UA>,
  ): MRReturn<'TeamSpaceMembership', 'getForOrganization'>
  (
    opts: MROpts<'TeamSpaceMembership', 'getManyForOrganization', UA>,
  ): MRReturn<'TeamSpaceMembership', 'getManyForOrganization'>
  (opts: MROpts<'TeamSpaceMembership', 'create', UA>): MRReturn<'TeamSpaceMembership', 'create'>
  (opts: MROpts<'TeamSpaceMembership', 'update', UA>): MRReturn<'TeamSpaceMembership', 'update'>
  (opts: MROpts<'TeamSpaceMembership', 'delete', UA>): MRReturn<'TeamSpaceMembership', 'delete'>

  (opts: MROpts<'UIConfig', 'get', UA>): MRReturn<'UIConfig', 'get'>
  (opts: MROpts<'UIConfig', 'update', UA>): MRReturn<'UIConfig', 'update'>

  (opts: MROpts<'Upload', 'get', UA>): MRReturn<'Entry', 'get'>
  (opts: MROpts<'Upload', 'create', UA>): MRReturn<'Entry', 'create'>
  (opts: MROpts<'Upload', 'delete', UA>): MRReturn<'Entry', 'delete'>

  (opts: MROpts<'UploadCredential', 'create', UA>): MRReturn<'UploadCredential', 'create'>

  (opts: MROpts<'Usage', 'getManyForSpace', UA>): MRReturn<'Usage', 'getManyForSpace'>
  (opts: MROpts<'Usage', 'getManyForOrganization', UA>): MRReturn<'Usage', 'getManyForOrganization'>

  (opts: MROpts<'User', 'getManyForSpace', UA>): MRReturn<'User', 'getManyForSpace'>
  (opts: MROpts<'User', 'getForSpace', UA>): MRReturn<'User', 'getForSpace'>
  (opts: MROpts<'User', 'getCurrent', UA>): MRReturn<'User', 'getCurrent'>
  (opts: MROpts<'User', 'getForOrganization', UA>): MRReturn<'User', 'getForOrganization'>
  (opts: MROpts<'User', 'getManyForOrganization', UA>): MRReturn<'User', 'getManyForOrganization'>

  (opts: MROpts<'UserUIConfig', 'get', UA>): MRReturn<'UserUIConfig', 'update'>
  (opts: MROpts<'UserUIConfig', 'update', UA>): MRReturn<'UserUIConfig', 'update'>

  (opts: MROpts<'VectorizationStatus', 'get', UA>): MRReturn<'VectorizationStatus', 'get'>
  (opts: MROpts<'VectorizationStatus', 'update', UA>): MRReturn<'VectorizationStatus', 'update'>
  (opts: MROpts<'SemanticDuplicates', 'get', UA>): MRReturn<'SemanticDuplicates', 'get'>
  (opts: MROpts<'SemanticRecommendations', 'get', UA>): MRReturn<'SemanticRecommendations', 'get'>
  (
    opts: MROpts<'SemanticReferenceSuggestions', 'get', UA>,
  ): MRReturn<'SemanticReferenceSuggestions', 'get'>
  (opts: MROpts<'SemanticSearch', 'get', UA>): MRReturn<'SemanticSearch', 'get'>

  (opts: MROpts<'Webhook', 'get', UA>): MRReturn<'Webhook', 'get'>
  (opts: MROpts<'Webhook', 'getMany', UA>): MRReturn<'Webhook', 'getMany'>
  (opts: MROpts<'Webhook', 'getCallDetails', UA>): MRReturn<'Webhook', 'getCallDetails'>
  (opts: MROpts<'Webhook', 'getHealthStatus', UA>): MRReturn<'Webhook', 'getHealthStatus'>
  (opts: MROpts<'Webhook', 'getManyCallDetails', UA>): MRReturn<'Webhook', 'getManyCallDetails'>
  (opts: MROpts<'Webhook', 'getSigningSecret', UA>): MRReturn<'Webhook', 'getSigningSecret'>
  (opts: MROpts<'Webhook', 'getRetryPolicy', UA>): MRReturn<'Webhook', 'getRetryPolicy'>
  (opts: MROpts<'Webhook', 'create', UA>): MRReturn<'Webhook', 'create'>
  (opts: MROpts<'Webhook', 'createWithId', UA>): MRReturn<'Webhook', 'createWithId'>
  (opts: MROpts<'Webhook', 'update', UA>): MRReturn<'Webhook', 'update'>
  (opts: MROpts<'Webhook', 'upsertSigningSecret', UA>): MRReturn<'Webhook', 'upsertSigningSecret'>
  (opts: MROpts<'Webhook', 'upsertRetryPolicy', UA>): MRReturn<'Webhook', 'upsertRetryPolicy'>
  (opts: MROpts<'Webhook', 'delete', UA>): MRReturn<'Webhook', 'delete'>
  (opts: MROpts<'Webhook', 'deleteSigningSecret', UA>): MRReturn<'Webhook', 'deleteSigningSecret'>
  (opts: MROpts<'Webhook', 'deleteRetryPolicy', UA>): MRReturn<'Webhook', 'deleteRetryPolicy'>

  (opts: MROpts<'WorkflowDefinition', 'get', UA>): MRReturn<'WorkflowDefinition', 'get'>
  (opts: MROpts<'WorkflowDefinition', 'getMany', UA>): MRReturn<'WorkflowDefinition', 'getMany'>
  (opts: MROpts<'WorkflowDefinition', 'create', UA>): MRReturn<'WorkflowDefinition', 'create'>
  (opts: MROpts<'WorkflowDefinition', 'update', UA>): MRReturn<'WorkflowDefinition', 'update'>
  (opts: MROpts<'WorkflowDefinition', 'delete', UA>): MRReturn<'WorkflowDefinition', 'delete'>

  (opts: MROpts<'Workflow', 'get', UA>): MRReturn<'Workflow', 'get'>
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

/**
 * @private
 */
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }

/**
 * @private
 */
export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U

export interface Adapter {
  makeRequest: MakeRequestWithUserAgent
}

/**
 * @private
 */
export type MRActions = {
  Resource: {
    getMany: {
      params: GetResourceParams & { query?: ResourceQueryOptions }
      headers?: RawAxiosRequestHeaders
      return: CursorPaginatedCollectionProp<ResourceProps>
    }
  }
  ResourceProvider: {
    get: { params: GetResourceProviderParams; return: ResourceProviderProps }
    upsert: {
      params: GetResourceProviderParams
      payload: UpsertResourceProviderProps
      headers?: RawAxiosRequestHeaders
      return: ResourceProviderProps
    }
    delete: { params: GetResourceProviderParams; return: any }
  }
  ResourceType: {
    get: { params: GetResourceTypeParams; return: ResourceTypeProps }
    getMany: {
      params: Omit<GetResourceTypeParams, 'resourceTypeId'>
      return: CollectionProp<ResourceTypeProps>
    }
    upsert: {
      params: GetResourceTypeParams
      payload: UpsertResourceTypeProps
      headers?: RawAxiosRequestHeaders
      return: ResourceTypeProps
    }
    delete: { params: GetResourceTypeParams; return: any }
    getForEnvironment: {
      params: GetSpaceEnvironmentParams & { query?: BasicCursorPaginationOptions }
      return: CursorPaginatedCollectionProp<SpaceEnvResourceTypeProps>
    }
  }
  Http: {
    get: { params: { url: string; config?: RawAxiosRequestConfig }; return: any }
    patch: { params: { url: string; config?: RawAxiosRequestConfig }; payload: any; return: any }
    post: { params: { url: string; config?: RawAxiosRequestConfig }; payload: any; return: any }
    put: { params: { url: string; config?: RawAxiosRequestConfig }; payload: any; return: any }
    delete: { params: { url: string; config?: RawAxiosRequestConfig }; return: any }
    request: { params: { url: string; config?: RawAxiosRequestConfig }; return: any }
  }
  AiAction: {
    get: { params: GetSpaceParams & { aiActionId: string }; return: AiActionProps }
    getMany: {
      params: GetSpaceParams & { query: AiActionQueryOptions }
      return: CollectionProp<AiActionProps>
    }
    create: {
      params: GetSpaceParams
      payload: CreateAiActionProps
      headers?: RawAxiosRequestHeaders
      return: AiActionProps
    }
    update: {
      params: GetSpaceParams & { aiActionId: string }
      payload: AiActionProps
      headers?: RawAxiosRequestHeaders
      return: AiActionProps
    }
    delete: { params: GetSpaceParams & { aiActionId: string }; return: any }
    publish: {
      params: GetSpaceParams & { aiActionId: string; version: number }
      headers?: RawAxiosRequestHeaders
      return: AiActionProps
    }
    unpublish: {
      params: GetSpaceParams & { aiActionId: string }
      headers?: RawAxiosRequestHeaders
      return: AiActionProps
    }
    invoke: {
      params: GetSpaceEnvironmentParams & {
        aiActionId: string
        query?: { status?: 'all' | 'published' }
      }
      payload: AiActionInvocationType
      headers?: RawAxiosRequestHeaders
      return: AiActionInvocationProps
    }
  }
  AiActionInvocation: {
    get: {
      params: GetSpaceEnvironmentParams & { aiActionId: string; invocationId: string }
      return: AiActionInvocationProps
    }
  }
  Agent: {
    get: {
      params: GetSpaceEnvironmentParams & { agentId: string }
      headers?: RawAxiosRequestHeaders
      return: AgentProps
    }
    getMany: {
      params: GetSpaceEnvironmentParams
      headers?: RawAxiosRequestHeaders
      return: CollectionProp<AgentProps>
    }
    generate: {
      params: GetSpaceEnvironmentParams & { agentId: string }
      payload: AgentGeneratePayload
      headers?: RawAxiosRequestHeaders
      return: AgentRunProps
    }
  }
  AgentRun: {
    get: {
      params: GetSpaceEnvironmentParams & { runId: string }
      headers?: RawAxiosRequestHeaders
      return: AgentRunProps
    }
    getMany: {
      params: GetSpaceEnvironmentParams & { query?: AgentRunQueryOptions }
      headers?: RawAxiosRequestHeaders
      return: CollectionProp<AgentRunProps>
    }
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
    get: {
      params: GetAppActionCallParamsWithId
      return: AppActionCallProps
    }
    getCallDetails: {
      params: GetAppActionCallDetailsParams
      return: AppActionCallResponse
    }
    createWithResponse: {
      params: CreateWithResponseParams
      payload: CreateAppActionCallProps
      return: AppActionCallResponse
    }
    createWithResult: {
      params: CreateWithResultParams
      payload: CreateAppActionCallProps
      return: AppActionCallProps
    }
    getResponse: {
      params: GetAppActionCallParamsWithId
      return: AppActionCallRawResponseProps
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
      headers?: RawAxiosRequestHeaders
      return: ApiKeyProps
    }
    createWithId: {
      params: GetSpaceParams & { apiKeyId: string }
      payload: CreateApiKeyProps
      headers?: RawAxiosRequestHeaders
      return: ApiKeyProps
    }
    update: {
      params: GetSpaceParams & { apiKeyId: string }
      payload: ApiKeyProps
      headers?: RawAxiosRequestHeaders
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
      headers?: RawAxiosRequestHeaders
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
      headers?: RawAxiosRequestHeaders
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
  AppEventSubscription: {
    upsert: {
      params: GetAppDefinitionParams
      payload: CreateAppEventSubscriptionProps
      return: AppEventSubscriptionProps
    }
    get: {
      params: GetAppDefinitionParams
      return: AppEventSubscriptionProps
    }
    delete: {
      params: GetAppDefinitionParams
      return: void
    }
  }
  AppKey: {
    create: {
      params: GetAppDefinitionParams
      payload: CreateAppKeyProps
      return: AppKeyProps
    }
    get: {
      params: GetAppDefinitionParams & { fingerprint: string }
      return: AppKeyProps
    }
    getMany: {
      params: GetAppDefinitionParams & QueryParams
      return: CollectionProp<AppKeyProps>
    }
    delete: {
      params: GetAppDefinitionParams & { fingerprint: string }
      return: void
    }
  }
  AppAccessToken: {
    create: {
      params: GetAppInstallationParams
      payload: CreateAppAccessTokenProps
      return: AppAccessTokenProps
    }
  }
  Asset: {
    getPublished: {
      params: GetSpaceEnvironmentParams & QueryParams
      headers?: RawAxiosRequestHeaders
      return: CollectionProp<AssetProps>
    }
    getPublishedWithCursor: {
      params: GetSpaceEnvironmentParams & CursorBasedParams
      headers?: RawAxiosRequestHeaders
      return: CursorPaginatedCollectionProp<AssetProps>
    }
    getMany: {
      params: GetSpaceEnvironmentParams & QueryParams & { releaseId?: string }
      headers?: RawAxiosRequestHeaders
      return: CollectionProp<AssetProps>
    }
    getManyWithCursor: {
      params: GetSpaceEnvironmentParams & CursorBasedParams & { releaseId?: string }
      headers?: RawAxiosRequestHeaders
      return: CursorPaginatedCollectionProp<AssetProps>
    }
    get: {
      params: GetSpaceEnvironmentParams & { assetId: string; releaseId?: string } & QueryParams
      headers?: RawAxiosRequestHeaders
      return: AssetProps
    }
    update: {
      params: GetSpaceEnvironmentParams & { assetId: string; releaseId?: string }
      payload: AssetProps
      headers?: RawAxiosRequestHeaders
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
    create: {
      params: GetSpaceEnvironmentParams & { releaseId?: string }
      payload: CreateAssetProps
      return: AssetProps
    }
    createWithId: {
      params: GetSpaceEnvironmentParams & { assetId: string; releaseId?: string }
      payload: CreateAssetProps
      return: AssetProps
    }
    createFromFiles: {
      params: GetSpaceEnvironmentParams & { uploadTimeout?: number; releaseId?: string }
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
    getV2: {
      params: GetBulkActionParams
      return: BulkActionProps<BulkActionV2Payload>
    }
    publishV2: {
      params: GetSpaceEnvironmentParams
      payload: PublishBulkActionV2Payload<'add'>
      return: BulkActionProps<PublishBulkActionV2Payload<'add'>>
    }
    unpublishV2: {
      params: GetSpaceEnvironmentParams
      payload: PublishBulkActionV2Payload<'remove'> | UnpublishBulkActionV2Payload
      return: BulkActionProps<PublishBulkActionV2Payload<'remove'> | UnpublishBulkActionV2Payload>
    }
    validateV2: {
      params: GetSpaceEnvironmentParams
      payload: ValidateBulkActionV2Payload<'add'> | ValidateBulkActionV2Payload<'remove'>
      return: BulkActionProps<
        ValidateBulkActionV2Payload<'add'> | ValidateBulkActionV2Payload<'remove'>
      >
    }
  }
  Comment: {
    get:
      | { params: GetCommentParams & PlainTextBodyFormat; return: CommentProps }
      | { params: GetCommentParams & RichTextBodyFormat; return: RichTextCommentProps }
    getMany:
      | {
          params: GetManyCommentsParams & PlainTextBodyFormat & QueryParams
          return: CollectionProp<CommentProps>
        }
      | {
          params: GetManyCommentsParams & QueryParams & RichTextBodyFormat
          return: CollectionProp<RichTextCommentProps>
        }
    getAll:
      | {
          params: GetManyCommentsParams & QueryParams & PlainTextBodyFormat
          return: CollectionProp<CommentProps>
        }
      | {
          params: GetManyCommentsParams & QueryParams & RichTextBodyFormat
          return: CollectionProp<RichTextCommentProps>
        }
    create:
      | {
          params: CreateCommentParams & PlainTextBodyFormat
          payload: CreateCommentProps
          return: CommentProps
        }
      | {
          params: CreateCommentParams & RichTextBodyFormat
          payload: RichTextCommentBodyPayload
          return: RichTextCommentProps
        }
    update:
      | {
          params: UpdateCommentParams
          payload: UpdateCommentProps
          headers?: RawAxiosRequestHeaders
          return: CommentProps
        }
      | {
          params: UpdateCommentParams
          payload: Omit<UpdateCommentProps, 'body'> & RichTextCommentBodyPayload
          headers?: RawAxiosRequestHeaders
          return: RichTextCommentProps
        }
    delete: { params: DeleteCommentParams; return: void }
  }
  ComponentType: {
    getMany: {
      params: GetSpaceEnvironmentParams & { query: ComponentTypeQueryOptions }
      return: CollectionProp<ComponentTypeProps>
    }
  }
  Concept: {
    create: {
      params: GetOrganizationParams
      payload: CreateConceptProps
      return: ConceptProps
    }
    createWithId: {
      params: GetConceptParams
      payload: CreateConceptProps
      return: ConceptProps
    }
    patch: {
      params: UpdateConceptParams
      payload: OpPatch[]
      return: ConceptProps
    }
    update: {
      params: UpdateConceptParams
      payload: CreateConceptProps
      return: ConceptProps
    }
    delete: {
      params: DeleteConceptParams
      return: void
    }
    get: {
      params: GetConceptParams
      return: ConceptProps
    }
    getMany: {
      params: GetManyConceptParams
      return: CursorPaginatedCollectionProp<ConceptProps>
    }
    getTotal: {
      params: GetOrganizationParams
      return: { total: number }
    }
    getDescendants: {
      params: GetConceptDescendantsParams
      return: CursorPaginatedCollectionProp<ConceptProps>
    }
    getAncestors: {
      params: GetConceptDescendantsParams
      return: CursorPaginatedCollectionProp<ConceptProps>
    }
  }
  ConceptScheme: {
    create: {
      params: GetOrganizationParams
      payload: CreateConceptSchemeProps
      return: ConceptSchemeProps
    }
    createWithId: {
      params: GetConceptSchemeParams
      payload: CreateConceptSchemeProps
      return: ConceptSchemeProps
    }
    patch: {
      params: UpdateConceptSchemeParams
      payload: OpPatch[]
      return: ConceptSchemeProps
    }
    update: {
      params: UpdateConceptSchemeParams
      payload: CreateConceptSchemeProps
      return: ConceptSchemeProps
    }
    get: {
      params: GetConceptSchemeParams
      return: ConceptSchemeProps
    }
    getMany: {
      params: GetManyConceptSchemeParams
      return: CursorPaginatedCollectionProp<ConceptSchemeProps>
    }
    getTotal: {
      params: GetOrganizationParams
      return: { total: number }
    }
    delete: {
      params: DeleteConceptSchemeParams
      return: void
    }
  }
  ContentType: {
    get: { params: GetContentTypeParams & QueryParams; return: ContentTypeProps }
    getMany: {
      params: GetSpaceEnvironmentParams & QueryParams
      return: CollectionProp<ContentTypeProps>
    }
    getManyWithCursor: {
      params: GetSpaceEnvironmentParams & CursorBasedParams
      return: CursorPaginatedCollectionProp<ContentTypeProps>
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
      headers?: RawAxiosRequestHeaders
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
      headers?: RawAxiosRequestHeaders
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
      headers?: RawAxiosRequestHeaders
      return: EnvironmentProps
    }
    createWithId: {
      params: GetSpaceEnvironmentParams & { sourceEnvironmentId?: string }
      payload: CreateEnvironmentProps
      headers?: RawAxiosRequestHeaders
      return: EnvironmentProps
    }
    update: {
      params: GetSpaceEnvironmentParams
      payload: EnvironmentProps
      headers?: RawAxiosRequestHeaders
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
      headers?: RawAxiosRequestHeaders
      return: EnvironmentAliasProps
    }
    update: {
      params: GetSpaceEnvAliasParams
      payload: EnvironmentAliasProps
      headers?: RawAxiosRequestHeaders
      return: EnvironmentAliasProps
    }
    delete: { params: GetSpaceEnvAliasParams; return: any }
  }
  EnvironmentTemplate: {
    get: {
      params: GetEnvironmentTemplateParams & {
        version?: number
        query?: { select?: string }
      }
      return: EnvironmentTemplateProps
    }
    getMany: {
      params: GetOrganizationParams & {
        query?: BasicCursorPaginationOptions & { select?: string; forTemplatedSpaces?: boolean }
      }
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
      params: GetEnvironmentTemplateParams & {
        query?: BasicCursorPaginationOptions & { select?: string; installable?: boolean }
      }
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
        latestOnly?: boolean
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
    getPublishedWithCursor: {
      params: GetSpaceEnvironmentParams & CursorBasedParams
      return: CursorPaginatedCollectionProp<EntryProps<any>>
    }
    getMany: {
      params: GetSpaceEnvironmentParams & QueryParams & { releaseId?: string }
      return: CollectionProp<EntryProps<any>>
    }
    getManyWithCursor: {
      params: GetSpaceEnvironmentParams & CursorBasedParams & { releaseId?: string }
      return: CursorPaginatedCollectionProp<EntryProps<any>>
    }
    get: {
      params: GetSpaceEnvironmentParams & { entryId: string; releaseId?: string } & QueryParams
      return: EntryProps<any>
    }
    patch: {
      params: GetSpaceEnvironmentParams & { entryId: string; version: number; releaseId?: string }
      payload: OpPatch[]
      headers?: RawAxiosRequestHeaders
      return: EntryProps<any>
    }
    update: {
      params: GetSpaceEnvironmentParams & { entryId: string; releaseId?: string }
      payload: EntryProps<any>
      headers?: RawAxiosRequestHeaders
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
      params: GetSpaceEnvironmentParams & {
        contentTypeId: string
        releaseId?: string
      }
      payload: CreateEntryProps<any>
      return: EntryProps<any>
    }
    createWithId: {
      params: GetSpaceEnvironmentParams & {
        entryId: string
        contentTypeId: string
        releaseId?: string
      }
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
      headers?: RawAxiosRequestHeaders
      return: ExtensionProps
    }
    createWithId: {
      params: GetExtensionParams
      payload: CreateExtensionProps
      headers?: RawAxiosRequestHeaders
      return: ExtensionProps
    }
    update: {
      params: GetExtensionParams
      payload: ExtensionProps
      headers?: RawAxiosRequestHeaders
      return: ExtensionProps
    }
    delete: { params: GetExtensionParams; return: any }
  }
  Function: {
    get: { params: GetFunctionParams; return: FunctionProps }
    getMany: { params: GetManyFunctionParams; return: CollectionProp<FunctionProps> }
    getManyForEnvironment: {
      params: GetFunctionForEnvParams
      return: CollectionProp<FunctionProps>
    }
  }

  FunctionLog: {
    get: {
      params: GetFunctionLogParams
      return: FunctionLogProps
      headers?: RawAxiosRequestHeaders
    }
    getMany: {
      params: GetManyFunctionLogParams
      return: CollectionProp<FunctionLogProps>
      headers?: RawAxiosRequestHeaders
    }
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
      headers?: RawAxiosRequestHeaders
      return: LocaleProps
    }
    create: {
      params: GetSpaceEnvironmentParams
      payload: CreateLocaleProps
      headers?: RawAxiosRequestHeaders
      return: LocaleProps
    }
  }
  Organization: {
    getMany: { params: PaginationQueryParams; return: CollectionProp<OrganizationProps> }
    get: { params: GetOrganizationParams; return: OrganizationProps }
  }
  OrganizationInvitation: {
    get: {
      params: { organizationId: string; invitationId: string }
      headers?: RawAxiosRequestHeaders
      return: OrganizationInvitationProps
    }
    create: {
      params: { organizationId: string }
      payload: CreateOrganizationInvitationProps
      headers?: RawAxiosRequestHeaders
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
      headers?: RawAxiosRequestHeaders
      return: OrganizationMembershipProps
    }
    delete: { params: GetOrganizationMembershipParams; return: any }
  }
  PersonalAccessToken: {
    get: { params: { tokenId: string }; return: PersonalAccessTokenProps }
    getMany: { params: QueryParams; return: CollectionProp<PersonalAccessTokenProps> }
    create: {
      params: {}
      payload: CreatePersonalAccessTokenProps
      headers?: RawAxiosRequestHeaders
      return: PersonalAccessTokenProps
    }
    revoke: { params: { tokenId: string }; return: PersonalAccessTokenProps }
  }
  AccessToken: {
    get: { params: { tokenId: string }; return: AccessTokenProps }
    getMany: { params: QueryParams; return: CollectionProp<AccessTokenProps> }
    createPersonalAccessToken: {
      params: {}
      payload: CreatePATProps
      headers?: RawAxiosRequestHeaders
      return: AccessTokenProps
    }
    revoke: { params: { tokenId: string }; return: AccessTokenProps }
    getManyForOrganization: {
      params: GetOrganizationParams & QueryParams
      return: CollectionProp<AccessTokenProps>
    }
  }
  OAuthApplication: {
    get: { params: GetOAuthApplicationParams; return: OAuthApplicationProps }
    getManyForUser: {
      params: GetUserParams & QueryParams
      return: CursorPaginatedCollectionProp<OAuthApplicationProps>
    }
    create: {
      params: GetUserParams
      payload: CreateOAuthApplicationProps
      headers?: RawAxiosRequestHeaders
      return: OAuthApplicationProps
    }
    update: {
      params: GetOAuthApplicationParams
      payload: UpdateOAuthApplicationProps
      headers?: RawAxiosRequestHeaders
      return: OAuthApplicationProps
    }
    delete: { params: GetOAuthApplicationParams; return: void }
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
      params: ReleaseEnvironmentParams & { query?: ReleaseQueryOptions }
      return: CollectionProp<ReleaseProps>
    }
    create: {
      params: ReleaseEnvironmentParams
      payload: ReleasePayload | ReleasePayloadV2
      return: ReleaseProps
    }
    update: {
      params: GetReleaseParams & { version: number }
      payload: ReleasePayload | ReleasePayloadV2
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
  ReleaseAsset: {
    get: {
      params: GetReleaseAssetParams & QueryParams
      headers?: RawAxiosRequestHeaders
      return: AssetProps<{ release: Link<'Release'> }>
    }
    getMany: {
      params: GetManyReleaseAssetParams & QueryParams
      headers?: RawAxiosRequestHeaders
      return: CollectionProp<AssetProps<{ release: Link<'Release'> }>>
    }
    update: {
      params: UpdateReleaseAssetParams & QueryParams
      payload: AssetProps
      headers?: RawAxiosRequestHeaders
      return: AssetProps<{ release: Link<'Release'> }>
    }
    create: {
      params: CreateReleaseAssetParams & QueryParams
      payload: CreateAssetProps
      headers?: RawAxiosRequestHeaders
      return: AssetProps<{ release: Link<'Release'> }>
    }
    createWithId: {
      params: CreateWithIdReleaseAssetParams & QueryParams
      payload: CreateAssetProps
      headers?: RawAxiosRequestHeaders
      return: AssetProps<{ release: Link<'Release'> }>
    }
    createFromFiles: {
      params: CreateWithFilesReleaseAssetParams & QueryParams
      payload: Omit<AssetFileProp, 'sys'>
      headers?: RawAxiosRequestHeaders
      return: AssetProps<{ release: Link<'Release'> }>
    }
    processForAllLocales: {
      params: ProcessForAllLocalesReleaseAssetParams
      return: AssetProps<{ release: Link<'Release'> }>
    }
    processForLocale: {
      params: ProcessForLocaleReleaseAssetParams
      return: AssetProps<{ release: Link<'Release'> }>
    }
  }
  ReleaseEntry: {
    get: {
      params: GetReleaseEntryParams & QueryParams
      headers?: RawAxiosRequestHeaders
      return: EntryProps<any, { release: Link<'Release'> }>
    }
    getMany: {
      params: GetManyReleaseEntryParams & QueryParams
      headers?: RawAxiosRequestHeaders
      return: CollectionProp<EntryProps<any, { release: Link<'Release'> }>>
    }
    update: {
      params: UpdateReleaseEntryParams & QueryParams
      payload: EntryProps<any>
      headers?: RawAxiosRequestHeaders
      return: EntryProps<any, { release: Link<'Release'> }>
    }
    patch: {
      params: PatchReleaseEntryParams & QueryParams
      payload: OpPatch[]
      headers?: RawAxiosRequestHeaders
      return: EntryProps<any, { release: Link<'Release'> }>
    }
    create: {
      params: CreateReleaseEntryParams & QueryParams
      payload: CreateEntryProps<any>
      headers?: RawAxiosRequestHeaders
      return: EntryProps<any, { release: Link<'Release'> }>
    }
    createWithId: {
      params: CreateReleaseEntryParams & {
        entryId: string
      } & QueryParams
      payload: CreateEntryProps<any>
      headers?: RawAxiosRequestHeaders
      return: EntryProps<any, { release: Link<'Release'> }>
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
    getManyForOrganization: {
      params: GetOrganizationParams & QueryParams
      return: CollectionProp<RoleProps>
    }
    create: {
      params: GetSpaceParams
      payload: CreateRoleProps
      headers?: RawAxiosRequestHeaders
      return: RoleProps
    }
    createWithId: {
      params: GetSpaceParams & { roleId: string }
      payload: CreateRoleProps
      headers?: RawAxiosRequestHeaders
      return: RoleProps
    }
    update: {
      params: GetSpaceParams & { roleId: string }
      payload: RoleProps
      headers?: RawAxiosRequestHeaders
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
  SemanticDuplicates: {
    get: {
      params: GetSpaceEnvironmentParams
      headers?: RawAxiosRequestHeaders
      payload: GetSemanticDuplicatesProps
      return: SemanticDuplicatesProps
    }
  }
  SemanticRecommendations: {
    get: {
      params: GetSpaceEnvironmentParams
      headers?: RawAxiosRequestHeaders
      payload: GetSemanticRecommendationsProps
      return: SemanticRecommendationsProps
    }
  }
  SemanticReferenceSuggestions: {
    get: {
      params: GetSpaceEnvironmentParams
      headers?: RawAxiosRequestHeaders
      payload: GetSemanticReferenceSuggestionsProps
      return: SemanticReferenceSuggestionsProps
    }
  }
  SemanticSearch: {
    get: {
      params: GetSpaceEnvironmentParams
      headers?: RawAxiosRequestHeaders
      payload: GetSemanticSearchProps
      return: SemanticSearchProps
    }
  }
  Snapshot: {
    getManyForEntry: {
      params: GetSnapshotForEntryParams & QueryParams
      return: CollectionProp<SnapshotProps<Omit<EntryProps<any>, 'metadata'>>>
    }
    getForEntry: {
      params: GetSnapshotForEntryParams & { snapshotId: string }
      return: SnapshotProps<Omit<EntryProps<any>, 'metadata'>>
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
    getManyForOrganization: {
      params: GetOrganizationParams & QueryParams
      return: CollectionProp<SpaceProps>
    }
    create: {
      params: { organizationId?: string }
      payload: Omit<SpaceProps, 'sys'>
      headers?: RawAxiosRequestHeaders
      return: any
    }
    update: {
      params: GetSpaceParams
      payload: SpaceProps
      headers?: RawAxiosRequestHeaders
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
      headers?: RawAxiosRequestHeaders
      return: SpaceMembershipProps
    }
    createWithId: {
      params: GetSpaceMembershipProps
      payload: CreateSpaceMembershipProps
      headers?: RawAxiosRequestHeaders
      return: SpaceMembershipProps
    }
    update: {
      params: GetSpaceMembershipProps
      payload: SpaceMembershipProps
      headers?: RawAxiosRequestHeaders
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
      headers?: RawAxiosRequestHeaders
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
      headers?: RawAxiosRequestHeaders
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
      headers?: RawAxiosRequestHeaders
      return: any
    }
    update: {
      params: GetTeamParams
      payload: TeamProps
      headers?: RawAxiosRequestHeaders
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
      headers?: RawAxiosRequestHeaders
      return: TeamMembershipProps
    }
    update: {
      params: GetTeamMembershipParams
      payload: TeamMembershipProps
      headers?: RawAxiosRequestHeaders
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
      headers?: RawAxiosRequestHeaders
      return: TeamSpaceMembershipProps
    }
    update: {
      params: GetTeamSpaceMembershipParams
      payload: TeamSpaceMembershipProps
      headers?: RawAxiosRequestHeaders
      return: TeamSpaceMembershipProps
    }
    delete: { params: GetTeamSpaceMembershipParams; return: any }
  }
  UIConfig: {
    get: { params: GetUIConfigParams; return: UIConfigProps }
    update: { params: GetUIConfigParams; payload: UIConfigProps; return: UIConfigProps }
  }
  Upload: {
    get: { params: GetSpaceEnvironmentUploadParams; return: any }
    create: {
      params: GetSpaceEnvironmentParams
      payload: { file: string | ArrayBuffer | Stream }
      return: any
    }
    delete: { params: GetSpaceEnvironmentUploadParams; return: any }
  }
  UploadCredential: {
    create: {
      params: GetSpaceEnvironmentParams
      return: any
    }
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
  VectorizationStatus: {
    get: {
      params: GetOrganizationParams
      headers?: RawAxiosRequestHeaders
      return: VectorizationStatusProps
    }
    update: {
      params: GetOrganizationParams
      headers?: RawAxiosRequestHeaders
      payload: UpdateVectorizationStatusProps
      return: VectorizationStatusProps
    }
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
    getSigningSecret: { params: GetSpaceParams; return: WebhookSigningSecretProps }
    getRetryPolicy: { params: GetSpaceParams; return: WebhookRetryPolicyProps }
    create: {
      params: GetSpaceParams
      payload: CreateWebhooksProps
      headers?: RawAxiosRequestHeaders
      return: WebhookProps
    }
    createWithId: {
      params: GetWebhookParams
      payload: CreateWebhooksProps
      headers?: RawAxiosRequestHeaders
      return: WebhookProps
    }
    update: { params: GetWebhookParams; payload: WebhookProps; return: WebhookProps }
    upsertSigningSecret: {
      params: GetSpaceParams
      payload: UpsertWebhookSigningSecretPayload
      return: WebhookSigningSecretProps
    }
    upsertRetryPolicy: {
      params: GetSpaceParams
      payload: WebhookRetryPolicyPayload
      return: WebhookRetryPolicyProps
    }
    delete: { params: GetWebhookParams; return: void }
    deleteSigningSecret: { params: GetSpaceParams; return: void }
    deleteRetryPolicy: { params: GetSpaceParams; return: void }
  }
  WorkflowDefinition: {
    get: {
      params: GetWorkflowDefinitionParams
      headers?: RawAxiosRequestHeaders
      return: WorkflowDefinitionProps
    }
    getMany: {
      params: GetSpaceEnvironmentParams & { query?: WorkflowDefinitionQueryOptions }
      headers?: RawAxiosRequestHeaders
      return: CollectionProp<WorkflowDefinitionProps>
    }
    create: {
      params: CreateWorkflowDefinitionParams
      payload: CreateWorkflowDefinitionProps
      headers?: RawAxiosRequestHeaders
      return: WorkflowDefinitionProps
    }
    update: {
      params: GetWorkflowDefinitionParams
      payload: WorkflowDefinitionProps
      headers?: RawAxiosRequestHeaders
      return: WorkflowDefinitionProps
    }
    delete: {
      params: DeleteWorkflowDefinitionParams
      headers?: RawAxiosRequestHeaders
      return: void
    }
  }
  Workflow: {
    get: {
      params: GetWorkflowParams
      headers?: RawAxiosRequestHeaders
      return: WorkflowProps
    }
    getMany: {
      params: GetSpaceEnvironmentParams & { query?: WorkflowQueryOptions }
      headers?: RawAxiosRequestHeaders
      return: CollectionProp<WorkflowProps>
    }
    create: {
      params: CreateWorkflowParams
      payload: CreateWorkflowProps
      headers?: RawAxiosRequestHeaders
      return: WorkflowProps
    }
    update: {
      params: GetWorkflowParams
      payload: WorkflowProps
      headers?: RawAxiosRequestHeaders
      return: WorkflowProps
    }
    delete: {
      params: DeleteWorkflowParams
      headers?: RawAxiosRequestHeaders
      return: void
    }
    complete: {
      params: CompleteWorkflowParams
      headers?: RawAxiosRequestHeaders
      return: void
    }
  }
  WorkflowsChangelog: {
    getMany: {
      params: GetSpaceEnvironmentParams & { query: WorkflowsChangelogQueryOptions }
      headers?: RawAxiosRequestHeaders
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
  UA extends boolean = false,
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
  Action extends keyof MRActions[ET],
> = 'return' extends keyof MRActions[ET][Action] ? Promise<MRActions[ET][Action]['return']> : never

/** Base interface for all Payload interfaces. Used as part of the MakeRequestOptions to simplify payload definitions. */

export interface MakeRequestPayload {}

export interface MakeRequestOptions {
  entityType: keyof MRActions
  action: string
  params?: Record<string, unknown>
  payload?: Record<string, unknown> | OpPatch[] | MakeRequestPayload
  headers?: RawAxiosRequestHeaders
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

// Retry options used by createWithResponse and createWithResult. Kept separate for clarity.
export type AppActionCallRetryOptions = {
  retries?: number
  retryInterval?: number
}

export type CreateWithResponseParams = GetAppActionCallParams & AppActionCallRetryOptions

export type CreateWithResultParams = GetAppActionCallParams & AppActionCallRetryOptions
export type GetAppActionCallDetailsParams = GetSpaceEnvironmentParams & {
  appActionId: string
  callId: string
}

// New route params for fetching structured call or raw response
export type GetAppActionCallParamsWithId = GetAppActionCallParams & { callId: string }
export type GetAppBundleParams = GetAppDefinitionParams & { appBundleId: string }
export type GetAppDefinitionParams = GetOrganizationParams & { appDefinitionId: string }
export type GetAppInstallationsForOrgParams = GetOrganizationParams & {
  appDefinitionId: string
}
export type GetAppInstallationParams = GetSpaceEnvironmentParams & { appDefinitionId: string }
export type GetBulkActionParams = GetSpaceEnvironmentParams & { bulkActionId: string }
export type GetCommentParams = (GetEntryParams | GetCommentParentEntityParams) & {
  commentId: string
}
export type GetContentTypeParams = GetSpaceEnvironmentParams & { contentTypeId: string }
export type GetEditorInterfaceParams = GetSpaceEnvironmentParams & { contentTypeId: string }
export type GetEntryParams = GetSpaceEnvironmentParams & { entryId: string }
export type GetExtensionParams = GetSpaceEnvironmentParams & { extensionId: string }
export type GetEnvironmentTemplateParams = GetOrganizationParams & { environmentTemplateId: string }
export type GetFunctionParams = GetAppDefinitionParams & { functionId: string }
export type GetManyFunctionParams = AcceptsQueryParams & GetAppDefinitionParams
export type GetFunctionForEnvParams = AcceptsQueryParams &
  GetSpaceEnvironmentParams & {
    appInstallationId: string
  }
export type GetManyFunctionLogParams = CursorBasedParams &
  CreatedAtIntervalParams &
  GetFunctionForEnvParams & { functionId: string }
export type GetFunctionLogParams = GetManyFunctionLogParams & { logId: string }
export type GetOrganizationParams = { organizationId: string }
export type GetReleaseParams = ReleaseEnvironmentParams & { releaseId: string }
export type GetReleaseAssetParams = GetSpaceEnvironmentParams & {
  releaseId: string
  assetId: string
}
export type GetManyReleaseAssetParams = GetSpaceEnvironmentParams & { releaseId: string }
export type GetReleaseEntryParams = GetSpaceEnvironmentParams & {
  releaseId: string
  entryId: string
}
export type CreateReleaseAssetParams = GetSpaceEnvironmentParams & {
  releaseId: string
}
export type CreateWithIdReleaseAssetParams = GetSpaceEnvironmentParams & {
  releaseId: string
  assetId: string
}
export type CreateWithFilesReleaseAssetParams = GetSpaceEnvironmentParams & {
  releaseId: string
  uploadTimeout?: number
}
export type UpdateReleaseAssetParams = GetSpaceEnvironmentParams & {
  releaseId: string
  assetId: string
}
export type ProcessForLocaleReleaseAssetParams = GetSpaceEnvironmentParams & {
  asset: AssetProps<{ release: Link<'Release'> }>
  locale: string
  options?: AssetProcessingForLocale
}
export type ProcessForAllLocalesReleaseAssetParams = GetSpaceEnvironmentParams & {
  asset: AssetProps<{ release: Link<'Release'> }>
  options?: AssetProcessingForLocale
}
export type GetManyReleaseEntryParams = GetSpaceEnvironmentParams & { releaseId: string }
export type UpdateReleaseEntryParams = GetSpaceEnvironmentParams & {
  releaseId: string
  entryId: string
}
export type PatchReleaseEntryParams = GetSpaceEnvironmentParams & {
  releaseId: string
  entryId: string
  version: number
}
export type CreateReleaseEntryParams = GetSpaceEnvironmentParams & {
  releaseId: string
  contentTypeId: string
}
export type CreateWithIdReleaseEntryParams = GetSpaceEnvironmentParams & {
  releaseId: string
  entryId: string
  contentTypeId: string
}
export type GetSnapshotForContentTypeParams = GetSpaceEnvironmentParams & { contentTypeId: string }
export type GetSnapshotForEntryParams = GetSpaceEnvironmentParams & { entryId: string }
export type GetSpaceEnvAliasParams = GetSpaceParams & { environmentAliasId: string }
export type GetSpaceEnvironmentParams = { spaceId: string; environmentId: string }
export type GetSpaceEnvironmentUploadParams = GetSpaceEnvironmentParams & { uploadId: string }
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
export type GetConceptParams = GetOrganizationParams & { conceptId: string }
export type UpdateConceptParams = GetOrganizationParams & { conceptId: string; version: number }
export type DeleteConceptParams = GetOrganizationParams & { conceptId: string; version: number }
export type GetConceptDescendantsParams = GetOrganizationParams & { conceptId: string } & {
  query?: { depth?: number; pageUrl?: string }
}
export type GetManyConceptParams = GetOrganizationParams & {
  query?:
    | { pageUrl?: string }
    | ({ conceptScheme?: string; query?: string } & BasicCursorPaginationOptions &
        Omit<PaginationQueryOptions, 'skip'>)
}

export type GetConceptSchemeParams = GetOrganizationParams & { conceptSchemeId: string }
export type GetManyConceptSchemeParams = GetOrganizationParams & {
  query?:
    | { pageUrl?: string }
    | ({ query?: string } & BasicCursorPaginationOptions & Omit<PaginationQueryOptions, 'skip'>)
}
export type DeleteConceptSchemeParams = GetOrganizationParams & {
  conceptSchemeId: string
  version: number
}
export type UpdateConceptSchemeParams = GetOrganizationParams & {
  conceptSchemeId: string
  version: number
}

export type GetAppKeyParams = GetAppDefinitionParams & { fingerprint: string }
export type GetAppUploadParams = GetOrganizationParams & { appUploadId: string }
export type GetWorkflowDefinitionParams = GetSpaceEnvironmentParams & {
  workflowDefinitionId: string
}
export type GetWorkflowParams = GetSpaceEnvironmentParams & {
  workflowId: string
}
export type GetUIConfigParams = GetSpaceEnvironmentParams
export type GetUserUIConfigParams = GetUIConfigParams

export type GetResourceProviderParams = GetOrganizationParams & { appDefinitionId: string }

export type GetResourceTypeParams = GetResourceProviderParams & { resourceTypeId: string }

export type GetResourceParams = GetSpaceEnvironmentParams & { resourceTypeId: string }

export type QueryParams = { query?: QueryOptions }
export type SpaceQueryParams = { query?: SpaceQueryOptions }
export type PaginationQueryParams = { query?: PaginationQueryOptions }
export type CursorPaginationXORParams = {
  query?: (CursorPaginationPageNext | CursorPaginationPagePrev | CursorPaginationNone) & {
    limit?: number
  }
}
export type CursorBasedParams = CursorPaginationXORParams
export type CreatedAtIntervalParams = { query?: CreatedAtIntervalQueryOptions }
export type AcceptsQueryParams = { query?: AcceptsQueryOptions }

export type GetOAuthApplicationParams = { userId: string; oauthApplicationId: string }
export type GetUserParams = { userId: string }

export enum ScheduledActionReferenceFilters {
  contentTypeAnnotationNotIn = 'sys.contentType.metadata.annotations.ContentType[nin]',
}

export type ReleaseEnvironmentParams = GetSpaceEnvironmentParams & {
  releaseSchemaVersion?: 'Release.v1' | 'Release.v2'
}

export type SemanticRequestFilter = {
  entityType?: 'Entry'
  contentTypeIds?: string[]
}
