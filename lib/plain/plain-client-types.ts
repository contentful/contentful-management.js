/**
 * @module
 * @category Plain Client
 */

import type { RawAxiosRequestConfig, RawAxiosRequestHeaders } from 'axios'
import type {
  OpPatch,
  BasicCursorPaginationOptions,
  CollectionProp,
  CreateReleaseAssetParams,
  CreateReleaseEntryParams,
  CreateWithFilesReleaseAssetParams,
  CreateWithIdReleaseAssetParams,
  CreateWithIdReleaseEntryParams,
  CursorBasedParams,
  CursorPaginatedCollectionProp,
  EnvironmentTemplateParams,
  GetBulkActionParams,
  GetContentTypeParams,
  GetEnvironmentTemplateParams,
  GetManyReleaseAssetParams,
  GetManyReleaseEntryParams,
  GetOrganizationMembershipParams,
  GetOrganizationParams,
  GetReleaseAssetParams,
  GetReleaseEntryParams,
  GetReleaseParams,
  GetSnapshotForContentTypeParams,
  GetSnapshotForEntryParams,
  GetSpaceEnvironmentParams,
  GetSpaceParams,
  KeyValueMap,
  Link,
  PatchReleaseEntryParams,
  QueryParams,
  ReleaseEnvironmentParams,
  UpdateReleaseAssetParams,
  UpdateReleaseEntryParams,
} from '../common-types'
import type {
  AccessTokenProps,
  CreatePersonalAccessTokenProps as CreatePATProps,
} from '../entities/access-token'
import type { ApiKeyProps, CreateApiKeyProps } from '../entities/api-key'
import type {
  AssetFileProp,
  AssetProcessingForLocale,
  AssetProps,
  CreateAssetProps,
} from '../entities/asset'
import type { AssetKeyProps, CreateAssetKeyProps } from '../entities/asset-key'
import type {
  BulkActionPayload,
  BulkActionProps,
  BulkActionPublishPayload,
  BulkActionUnpublishPayload,
  BulkActionV2Payload,
  BulkActionValidatePayload,
  PublishBulkActionV2Payload,
  UnpublishBulkActionV2Payload,
  ValidateBulkActionV2Payload,
} from '../entities/bulk-action'
import type { ContentTypeProps, CreateContentTypeProps } from '../entities/content-type'
import type { CreateEntryProps, EntryProps, EntryReferenceProps } from '../entities/entry'
import type {
  CreateEnvironmentTemplateProps,
  EnvironmentTemplateProps,
} from '../entities/environment-template'
import type {
  CreateEnvironmentTemplateInstallationProps,
  EnvironmentTemplateInstallationProps,
  EnvironmentTemplateValidationProps,
  ValidateEnvironmentTemplateInstallationProps,
} from '../entities/environment-template-installation'
import type {
  CreateOrganizationInvitationProps,
  OrganizationInvitationProps,
} from '../entities/organization-invitation'
import type { OrganizationMembershipProps } from '../entities/organization-membership'
import type {
  CreatePersonalAccessTokenProps,
  PersonalAccessTokenProps,
} from '../entities/personal-access-token'
import type { PreviewApiKeyProps } from '../entities/preview-api-key'
import type {
  ReleasePayload,
  ReleasePayloadV2,
  ReleaseProps,
  ReleaseQueryOptions,
  ReleaseValidatePayload,
} from '../entities/release'
import type { ReleaseActionProps, ReleaseActionQueryOptions } from '../entities/release-action'
import type {
  CreateUpdateScheduledActionProps,
  ScheduledActionProps,
} from '../entities/scheduled-action'
import type { SnapshotProps } from '../entities/snapshot'
import type { AppAccessTokenPlainClientAPI } from './entities/app-access-token'
import type { AppActionPlainClientAPI } from './entities/app-action'
import type { AppActionCallPlainClientAPI } from './entities/app-action-call'
import type { AppBundlePlainClientAPI } from './entities/app-bundle'
import type { AppDefinitionPlainClientAPI } from './entities/app-definition'
import type { AppDetailsPlainClientAPI } from './entities/app-details'
import type { AppEventSubscriptionPlainClientAPI } from './entities/app-event-subscription'
import type { AppInstallationPlainClientAPI } from './entities/app-installation'
import type { AppKeyPlainClientAPI } from './entities/app-key'
import type { AppSignedRequestPlainClientAPI } from './entities/app-signed-request'
import type { AppSigningSecretPlainClientAPI } from './entities/app-signing-secret'
import type { AppUploadPlainClientAPI } from './entities/app-upload'
import type { CommentPlainClientAPI } from './entities/comment'
import type { ConceptPlainClientAPI } from './entities/concept'
import type { ConceptSchemePlainClientAPI } from './entities/concept-scheme'
import type { EditorInterfacePlainClientAPI } from './entities/editor-interface'
import type { EnvironmentPlainClientAPI } from './entities/environment'
import type { EnvironmentAliasPlainClientAPI } from './entities/environment-alias'
import type { ExtensionPlainClientAPI } from './entities/extension'
import type { FunctionPlainClientAPI } from './entities/function'
import type { LocalePlainClientAPI } from './entities/locale'
import type { OrganizationPlainClientAPI } from './entities/organization'
import type { ResourcePlainAPI } from './entities/resource'
import type { ResourceProviderPlainClientAPI } from './entities/resource-provider'
import type { ResourceTypePlainClientAPI } from './entities/resource-type'
import type { RolePlainClientAPI } from './entities/role'
import type { SpacePlainClientAPI } from './entities/space'
import type { SpaceMemberPlainClientAPI } from './entities/space-member'
import type { SpaceMembershipPlainClientAPI } from './entities/space-membership'
import type { TagPlainClientAPI } from './entities/tag'
import type { TaskPlainClientAPI } from './entities/task'
import type { TeamPlainClientAPI } from './entities/team'
import type { TeamMembershipPlainClientAPI } from './entities/team-membership'
import type { TeamSpaceMembershipPlainClientAPI } from './entities/team-space-membership'
import type { UIConfigPlainClientAPI } from './entities/ui-config'
import type { UploadPlainClientAPI } from './entities/upload'
import type { UploadCredentialAPI } from './entities/upload-credential'
import type { UsagePlainClientAPI } from './entities/usage'
import type { UserPlainClientAPI } from './entities/user'
import type { UserUIConfigPlainClientAPI } from './entities/user-ui-config'
import type { WebhookPlainClientAPI } from './entities/webhook'
import type { WorkflowPlainClientAPI } from './entities/workflow'
import type { WorkflowDefinitionPlainClientAPI } from './entities/workflow-definition'
import type { WorkflowsChangelogPlainClientAPI } from './entities/workflows-changelog'
import type { PlainClientDefaultParams, OptionalDefaults } from './wrappers/wrap'
import type { OAuthApplicationPlainClientAPI } from './entities/oauth-application'
import type { FunctionLogPlainClientAPI } from './entities/function-log'
import type { AiActionPlainClientAPI } from './entities/ai-action'
import type { AiActionInvocationPlainClientAPI } from './entities/ai-action-invocation'
import type { AgentPlainClientAPI } from './entities/agent'
import type { AgentRunPlainClientAPI } from './entities/agent-run'
import type { VectorizationStatusPlainClientAPI } from './entities/vectorization-status'
import type { SemanticDuplicatesPlainClientAPI } from './entities/semantic-duplicates'
import type { SemanticRecommendationsPlainClientAPI } from './entities/semantic-recommendations'
import type { SemanticReferenceSuggestionsPlainClientAPI } from './entities/semantic-reference-suggestions'
import type { SemanticSearchPlainClientAPI } from './entities/semantic-search'
import type { ComponentTypePlainClientAPI } from './entities/component-type'

export type PlainClientAPI = {
  raw: {
    /** Returns the default parameters configured on this client instance. */
    getDefaultParams(): PlainClientDefaultParams | undefined
    /** Performs a raw GET request to the Contentful Management API. */
    get<T = unknown>(url: string, config?: RawAxiosRequestConfig): Promise<T>
    /** Performs a raw POST request to the Contentful Management API. */
    post<T = unknown>(url: string, payload?: any, config?: RawAxiosRequestConfig): Promise<T>
    /** Performs a raw PATCH request to the Contentful Management API. */
    patch<T = unknown>(url: string, payload?: any, config?: RawAxiosRequestConfig): Promise<T>
    /** Performs a raw PUT request to the Contentful Management API. */
    put<T = unknown>(url: string, payload?: any, config?: RawAxiosRequestConfig): Promise<T>
    /** Performs a raw DELETE request to the Contentful Management API. */
    delete<T = unknown>(url: string, config?: RawAxiosRequestConfig): Promise<T>
    /** Performs a raw HTTP request to the Contentful Management API. */
    http<T = unknown>(url: string, config?: RawAxiosRequestConfig): Promise<T>
  }
  aiAction: AiActionPlainClientAPI
  aiActionInvocation: AiActionInvocationPlainClientAPI
  agent: AgentPlainClientAPI
  agentRun: AgentRunPlainClientAPI
  appAction: AppActionPlainClientAPI
  appActionCall: AppActionCallPlainClientAPI
  appBundle: AppBundlePlainClientAPI
  appDetails: AppDetailsPlainClientAPI
  appEventSubscription: AppEventSubscriptionPlainClientAPI
  appKey: AppKeyPlainClientAPI
  appSignedRequest: AppSignedRequestPlainClientAPI
  appSigningSecret: AppSigningSecretPlainClientAPI
  appAccessToken: AppAccessTokenPlainClientAPI
  function: FunctionPlainClientAPI
  functionLog: FunctionLogPlainClientAPI
  editorInterface: EditorInterfacePlainClientAPI
  space: SpacePlainClientAPI
  environment: EnvironmentPlainClientAPI
  environmentAlias: EnvironmentAliasPlainClientAPI
  environmentTemplate: {
    /** Fetches a single environment template by ID. */
    get(
      params: GetEnvironmentTemplateParams & {
        version?: number
        query?: { select?: string }
      },
      headers?: RawAxiosRequestHeaders,
    ): Promise<EnvironmentTemplateProps>
    /** Fetches all environment templates for an organization. */
    getMany(
      params: GetOrganizationParams & {
        query?: BasicCursorPaginationOptions & { select?: string; forTemplatedSpaces?: boolean }
      },
      headers?: RawAxiosRequestHeaders,
    ): Promise<CursorPaginatedCollectionProp<EnvironmentTemplateProps>>
    /** Creates a new environment template in an organization. */
    create(
      params: GetOrganizationParams,
      rawData: CreateEnvironmentTemplateProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<EnvironmentTemplateProps>
    /** Updates the name or description of a specific environment template version. */
    versionUpdate(
      params: GetEnvironmentTemplateParams & { version: number },
      rawData: { versionName?: string; versionDescription?: string },
      headers?: RawAxiosRequestHeaders,
    ): Promise<EnvironmentTemplateProps>
    /** Updates an environment template. */
    update(
      params: GetEnvironmentTemplateParams,
      rawData: EnvironmentTemplateProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<EnvironmentTemplateProps>
    /** Deletes an environment template. */
    delete(params: GetEnvironmentTemplateParams, headers?: RawAxiosRequestHeaders): Promise<void>
    /** Lists all versions of an environment template. */
    versions(
      params: GetEnvironmentTemplateParams & {
        query?: BasicCursorPaginationOptions & { select?: string; installable?: boolean }
      },
      headers?: RawAxiosRequestHeaders,
    ): Promise<CursorPaginatedCollectionProp<EnvironmentTemplateProps>>
    /** Validates an environment template against a target environment. */
    validate(
      params: EnvironmentTemplateParams & {
        version?: number
      },
      rawData: ValidateEnvironmentTemplateInstallationProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<EnvironmentTemplateValidationProps>
    /** Installs an environment template into a target environment. */
    install(
      params: EnvironmentTemplateParams,
      rawData: CreateEnvironmentTemplateInstallationProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<EnvironmentTemplateInstallationProps>
    /** Disconnects an environment from an environment template. */
    disconnect(params: EnvironmentTemplateParams, headers?: RawAxiosRequestHeaders): Promise<void>
  }
  environmentTemplateInstallation: {
    /** Fetches all installations of an environment template. */
    getMany(
      params: BasicCursorPaginationOptions & {
        environmentId?: string
        environmentTemplateId: string
        organizationId: string
        spaceId?: string
        latestOnly?: boolean
      },
      headers?: RawAxiosRequestHeaders,
    ): Promise<CursorPaginatedCollectionProp<EnvironmentTemplateInstallationProps>>
    /** Fetches template installations for a specific environment. */
    getForEnvironment(
      params: BasicCursorPaginationOptions &
        EnvironmentTemplateParams & {
          installationId?: string
        },
      headers?: RawAxiosRequestHeaders,
    ): Promise<CursorPaginatedCollectionProp<EnvironmentTemplateInstallationProps>>
  }
  bulkAction: {
    /** Fetches a bulk action by ID. */
    get<T extends BulkActionPayload = any>(params: GetBulkActionParams): Promise<BulkActionProps<T>>
    /** Publishes multiple entities in a single bulk action. */
    publish(
      params: GetSpaceEnvironmentParams,
      payload: BulkActionPublishPayload,
    ): Promise<BulkActionProps<BulkActionPublishPayload>>
    /** Unpublishes multiple entities in a single bulk action. */
    unpublish(
      params: GetSpaceEnvironmentParams,
      payload: BulkActionUnpublishPayload,
    ): Promise<BulkActionProps<BulkActionUnpublishPayload>>
    /** Validates multiple entities in a single bulk action. */
    validate(
      params: GetSpaceEnvironmentParams,
      payload: BulkActionValidatePayload,
    ): Promise<BulkActionProps<BulkActionValidatePayload>>
    /** Fetches a V2 bulk action by ID. */
    getV2(params: GetBulkActionParams): Promise<BulkActionProps<BulkActionV2Payload>>
    /** Publishes multiple entities using the V2 bulk action API. */
    publishV2(
      params: GetSpaceEnvironmentParams,
      payload: PublishBulkActionV2Payload<'add'>,
    ): Promise<BulkActionProps<PublishBulkActionV2Payload<'add'>>>
    /** Unpublishes multiple entities using the V2 bulk action API. */
    unpublishV2(
      params: GetSpaceEnvironmentParams,
      payload: PublishBulkActionV2Payload<'remove'> | UnpublishBulkActionV2Payload,
    ): Promise<BulkActionProps<PublishBulkActionV2Payload<'remove'> | UnpublishBulkActionV2Payload>>
    /** Validates multiple entities using the V2 bulk action API. */
    validateV2(
      params: GetSpaceEnvironmentParams,
      payload: ValidateBulkActionV2Payload<'add'> | ValidateBulkActionV2Payload<'remove'>,
    ): Promise<
      BulkActionProps<ValidateBulkActionV2Payload<'add'> | ValidateBulkActionV2Payload<'remove'>>
    >
  }
  comment: CommentPlainClientAPI
  componentType: ComponentTypePlainClientAPI
  concept: ConceptPlainClientAPI
  conceptScheme: ConceptSchemePlainClientAPI
  contentType: {
    /** Fetches a single content type by ID. */
    get(params: OptionalDefaults<GetContentTypeParams & QueryParams>): Promise<ContentTypeProps>
    /** Fetches all content types in an environment. */
    getMany(
      params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>,
    ): Promise<CollectionProp<ContentTypeProps>>
    /** Fetches content types with cursor-based pagination. */
    getManyWithCursor(
      params: OptionalDefaults<GetSpaceEnvironmentParams & CursorBasedParams>,
    ): Promise<CursorPaginatedCollectionProp<ContentTypeProps>>
    /** Updates an existing content type. */
    update(
      params: OptionalDefaults<GetContentTypeParams>,
      rawData: ContentTypeProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<ContentTypeProps>
    /** Deletes a content type. */
    delete(params: OptionalDefaults<GetContentTypeParams>): Promise<any>
    /** Publishes a content type. */
    publish(
      params: OptionalDefaults<GetContentTypeParams>,
      rawData: ContentTypeProps,
    ): Promise<ContentTypeProps>
    /** Unpublishes a content type. */
    unpublish(params: OptionalDefaults<GetContentTypeParams>): Promise<ContentTypeProps>
    /** Creates a new content type with an auto-generated ID. */
    create(
      params: OptionalDefaults<GetSpaceEnvironmentParams>,
      rawData: CreateContentTypeProps,
    ): Promise<ContentTypeProps>
    /** Creates a new content type with a specified ID. */
    createWithId(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { contentTypeId: string }>,
      rawData: CreateContentTypeProps,
    ): Promise<ContentTypeProps>
    /** Omits a field from a content type and then deletes it. */
    omitAndDeleteField(
      params: OptionalDefaults<GetContentTypeParams>,
      contentType: ContentTypeProps,
      fieldId: string,
    ): Promise<ContentTypeProps>
  }
  user: UserPlainClientAPI
  entry: {
    /** Fetches all published entries in an environment. */
    getPublished<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>,
      rawData?: unknown,
      headers?: RawAxiosRequestHeaders,
    ): Promise<CollectionProp<EntryProps<T>>>
    /** Fetches published entries with cursor-based pagination. */
    getPublishedWithCursor<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSpaceEnvironmentParams & CursorBasedParams>,
      rawData?: unknown,
      headers?: RawAxiosRequestHeaders,
    ): Promise<CursorPaginatedCollectionProp<EntryProps<T>>>
    /** Fetches all entries in an environment. */
    getMany<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams & { releaseId?: string }>,
      rawData?: unknown,
      headers?: RawAxiosRequestHeaders,
    ): Promise<CollectionProp<EntryProps<T>>>
    /** Fetches entries with cursor-based pagination. */
    getManyWithCursor<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<
        GetSpaceEnvironmentParams & CursorBasedParams & { releaseId?: string }
      >,
      rawData?: unknown,
      headers?: RawAxiosRequestHeaders,
    ): Promise<CursorPaginatedCollectionProp<EntryProps<T>>>
    /** Fetches a single entry by ID. */
    get<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string; releaseId?: string }>,
      rawData?: unknown,
      headers?: RawAxiosRequestHeaders,
    ): Promise<EntryProps<T>>
    /** Updates an existing entry. */
    update<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string; releaseId?: string }>,
      rawData: EntryProps<T>,
      headers?: RawAxiosRequestHeaders,
    ): Promise<EntryProps<T>>
    /** Patches an entry using JSON patch operations. */
    patch<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<
        GetSpaceEnvironmentParams & { entryId: string; version: number; releaseId?: string }
      >,
      rawData: OpPatch[],
      headers?: RawAxiosRequestHeaders,
    ): Promise<EntryProps<T>>
    /** Deletes an entry. */
    delete(params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string }>): Promise<any>
    /** Publishes an entry. */
    publish<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string; locales?: string[] }>,
      rawData: EntryProps<T>,
    ): Promise<EntryProps<T>>
    /** Unpublishes an entry. */
    unpublish<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string; locales?: string[] }>,
      rawData?: EntryProps<T>,
    ): Promise<EntryProps<T>>
    /** Archives an entry. */
    archive<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string }>,
    ): Promise<EntryProps<T>>
    /** Unarchives an entry. */
    unarchive<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string }>,
    ): Promise<EntryProps<T>>
    /** Creates a new entry with an auto-generated ID. */
    create<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<
        GetSpaceEnvironmentParams & { contentTypeId: string; releaseId?: string }
      >,
      rawData: CreateEntryProps<T>,
    ): Promise<EntryProps<T>>
    /** Creates a new entry with a specified ID. */
    createWithId<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<
        GetSpaceEnvironmentParams & { entryId: string; contentTypeId: string; releaseId?: string }
      >,
      rawData: CreateEntryProps<T>,
    ): Promise<EntryProps<T>>
    /** Fetches references for an entry. */
    references(
      params: OptionalDefaults<
        GetSpaceEnvironmentParams & {
          entryId: string
          include?: number
        }
      >,
    ): Promise<EntryReferenceProps>
  }
  asset: {
    /** Fetches all published assets in an environment. */
    getPublished(
      params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>,
      rawData?: unknown,
      headers?: RawAxiosRequestHeaders,
    ): Promise<CollectionProp<AssetProps>>
    /** Fetches published assets with cursor-based pagination. */
    getPublishedWithCursor(
      params: OptionalDefaults<GetSpaceEnvironmentParams & CursorBasedParams>,
      rawData?: unknown,
      headers?: RawAxiosRequestHeaders,
    ): Promise<CursorPaginatedCollectionProp<AssetProps>>
    /** Fetches all assets in an environment. */
    getMany(
      params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams & { releaseId?: string }>,
      rawData?: unknown,
      headers?: RawAxiosRequestHeaders,
    ): Promise<CollectionProp<AssetProps>>
    /** Fetches assets with cursor-based pagination. */
    getManyWithCursor(
      params: OptionalDefaults<
        GetSpaceEnvironmentParams & CursorBasedParams & { releaseId?: string }
      >,
      rawData?: unknown,
      headers?: RawAxiosRequestHeaders,
    ): Promise<CursorPaginatedCollectionProp<AssetProps>>
    /** Fetches a single asset by ID. */
    get(
      params: OptionalDefaults<
        GetSpaceEnvironmentParams & { assetId: string; releaseId?: string } & QueryParams
      >,
      rawData?: unknown,
      headers?: RawAxiosRequestHeaders,
    ): Promise<AssetProps>
    /** Updates an existing asset. */
    update(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string; releaseId?: string }>,
      rawData: AssetProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<AssetProps>
    /** Deletes an asset. */
    delete(params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string }>): Promise<any>
    /** Publishes an asset. */
    publish(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string; locales?: string[] }>,
      rawData: AssetProps,
    ): Promise<AssetProps>
    /** Unpublishes an asset. */
    unpublish(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string; locales?: string[] }>,
      rawData?: AssetProps,
    ): Promise<AssetProps>
    /** Archives an asset. */
    archive(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string }>,
    ): Promise<AssetProps>
    /** Unarchives an asset. */
    unarchive(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string }>,
    ): Promise<AssetProps>
    /** Creates a new asset with an auto-generated ID. */
    create(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { releaseId?: string }>,
      rawData: CreateAssetProps,
    ): Promise<AssetProps>
    /** Creates a new asset with a specified ID. */
    createWithId(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string; releaseId?: string }>,
      rawData: CreateAssetProps,
    ): Promise<AssetProps>
    /** Creates a new asset by uploading files directly. */
    createFromFiles(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { releaseId?: string }>,
      data: Omit<AssetFileProp, 'sys'>,
    ): Promise<AssetProps>
    /** Processes an asset's files for all locales. */
    processForAllLocales(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { releaseId?: string }>,
      asset: AssetProps,
      processingOptions?: AssetProcessingForLocale,
    ): Promise<AssetProps>
    /** Processes an asset's file for a specific locale. */
    processForLocale(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { releaseId?: string }>,
      asset: AssetProps,
      locale: string,
      processingOptions?: AssetProcessingForLocale,
    ): Promise<AssetProps>
  }
  appUpload: AppUploadPlainClientAPI
  assetKey: {
    /** Creates a new asset key for signing URLs. */
    create(
      params: OptionalDefaults<GetSpaceEnvironmentParams>,
      data: CreateAssetKeyProps,
    ): Promise<AssetKeyProps>
  }
  upload: UploadPlainClientAPI
  uploadCredential: UploadCredentialAPI
  locale: LocalePlainClientAPI
  personalAccessToken: {
    /** Fetches a single personal access token by ID. */
    get(params: OptionalDefaults<{ tokenId: string }>): Promise<PersonalAccessTokenProps>
    /** Fetches all personal access tokens for the authenticated user. */
    getMany(
      params: OptionalDefaults<QueryParams>,
    ): Promise<CollectionProp<PersonalAccessTokenProps>>
    /** Creates a new personal access token. */
    create(
      rawData: CreatePersonalAccessTokenProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<PersonalAccessTokenProps>
    /** Revokes a personal access token. */
    revoke(params: OptionalDefaults<{ tokenId: string }>): Promise<PersonalAccessTokenProps>
  }
  accessToken: {
    /** Fetches a single access token by ID. */
    get(params: OptionalDefaults<{ tokenId: string }>): Promise<AccessTokenProps>
    /** Fetches all access tokens for the authenticated user. */
    getMany(params: OptionalDefaults<QueryParams>): Promise<CollectionProp<AccessTokenProps>>
    /** Creates a new personal access token. */
    createPersonalAccessToken(
      rawData: CreatePATProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<AccessTokenProps>
    /** Revokes an access token. */
    revoke(params: OptionalDefaults<{ tokenId: string }>): Promise<AccessTokenProps>
    /** Fetches all access tokens for an organization. */
    getManyForOrganization(
      params: OptionalDefaults<GetOrganizationParams & QueryParams>,
    ): Promise<CollectionProp<AccessTokenProps>>
  }
  usage: UsagePlainClientAPI
  release: {
    asset: {
      /** Fetches a single asset within a release. */
      get(
        params: OptionalDefaults<GetReleaseAssetParams & QueryParams>,
        rawData?: unknown,
        headers?: RawAxiosRequestHeaders,
      ): Promise<AssetProps<{ release: Link<'Release'> }>>
      /** Fetches all assets within a release. */
      getMany(
        params: OptionalDefaults<GetManyReleaseAssetParams & QueryParams>,
        rawData?: unknown,
        headers?: RawAxiosRequestHeaders,
      ): Promise<CollectionProp<AssetProps<{ release: Link<'Release'> }>>>
      /** Updates an asset within a release. */
      update(
        params: OptionalDefaults<UpdateReleaseAssetParams & QueryParams>,
        rawData: AssetProps,
        headers?: RawAxiosRequestHeaders,
      ): Promise<AssetProps<{ release: Link<'Release'> }>>
      /** Creates a new asset within a release with an auto-generated ID. */
      create(
        params: OptionalDefaults<CreateReleaseAssetParams & QueryParams>,
        rawData: CreateAssetProps,
        headers?: RawAxiosRequestHeaders,
      ): Promise<AssetProps<{ release: Link<'Release'> }>>
      /** Creates a new asset within a release with a specified ID. */
      createWithId(
        params: OptionalDefaults<CreateWithIdReleaseAssetParams & QueryParams>,
        rawData: CreateAssetProps,
        headers?: RawAxiosRequestHeaders,
      ): Promise<AssetProps<{ release: Link<'Release'> }>>
      /** Creates a new asset within a release by uploading files directly. */
      createFromFiles(
        params: OptionalDefaults<CreateWithFilesReleaseAssetParams & QueryParams>,
        data: Omit<AssetFileProp, 'sys'>,
        headers?: RawAxiosRequestHeaders,
      ): Promise<AssetProps<{ release: Link<'Release'> }>>
      /** Processes a release asset's file for a specific locale. */
      processForLocale(
        params: OptionalDefaults<GetSpaceEnvironmentParams>,
        asset: AssetProps<{ release: Link<'Release'> }>,
        locale: string,
        processingOptions?: AssetProcessingForLocale,
      ): Promise<AssetProps<{ release: Link<'Release'> }>>
      /** Processes a release asset's files for all locales. */
      processForAllLocales(
        params: OptionalDefaults<GetSpaceEnvironmentParams>,
        asset: AssetProps<{ release: Link<'Release'> }>,
        processingOptions?: AssetProcessingForLocale,
      ): Promise<AssetProps<{ release: Link<'Release'> }>>
    }
    entry: {
      /** Fetches a single entry within a release. */
      get<T extends KeyValueMap = KeyValueMap>(
        params: OptionalDefaults<GetReleaseEntryParams & QueryParams>,
        rawData?: unknown,
        headers?: RawAxiosRequestHeaders,
      ): Promise<EntryProps<T, { release: Link<'Release'> }>>
      /** Fetches all entries within a release. */
      getMany<T extends KeyValueMap = KeyValueMap>(
        params: OptionalDefaults<GetManyReleaseEntryParams & QueryParams>,
        rawData?: unknown,
        headers?: RawAxiosRequestHeaders,
      ): Promise<CollectionProp<EntryProps<T, { release: Link<'Release'> }>>>
      /** Updates an entry within a release. */
      update<T extends KeyValueMap = KeyValueMap>(
        params: OptionalDefaults<UpdateReleaseEntryParams & QueryParams>,
        rawData: EntryProps<T>,
        headers?: RawAxiosRequestHeaders,
      ): Promise<EntryProps<T, { release: Link<'Release'> }>>
      /** Patches an entry within a release using JSON patch operations. */
      patch<T extends KeyValueMap = KeyValueMap>(
        params: OptionalDefaults<PatchReleaseEntryParams & QueryParams>,
        rawData: OpPatch[],
        headers?: RawAxiosRequestHeaders,
      ): Promise<EntryProps<T, { release: Link<'Release'> }>>
      /** Creates a new entry within a release with an auto-generated ID. */
      create<T extends KeyValueMap = KeyValueMap>(
        params: OptionalDefaults<CreateReleaseEntryParams & QueryParams>,
        rawData: CreateEntryProps<T>,
        headers?: RawAxiosRequestHeaders,
      ): Promise<EntryProps<T, { release: Link<'Release'> }>>
      /** Creates a new entry within a release with a specified ID. */
      createWithId<T extends KeyValueMap = KeyValueMap>(
        params: OptionalDefaults<CreateWithIdReleaseEntryParams & QueryParams>,
        rawData: CreateEntryProps<T>,
        headers?: RawAxiosRequestHeaders,
      ): Promise<EntryProps<T, { release: Link<'Release'> }>>
    }
    /** Archives a release. */
    archive(params: OptionalDefaults<GetReleaseParams & { version: number }>): Promise<ReleaseProps>
    /** Fetches a single release by ID. */
    get(params: OptionalDefaults<GetReleaseParams>): Promise<ReleaseProps>
    /** Queries releases in an environment with optional filters. */
    query(
      params: OptionalDefaults<ReleaseEnvironmentParams> & { query?: ReleaseQueryOptions },
    ): Promise<CursorPaginatedCollectionProp<ReleaseProps>>
    /** Creates a new release. */
    create(
      params: OptionalDefaults<ReleaseEnvironmentParams>,
      data: ReleasePayload | ReleasePayloadV2,
    ): Promise<ReleaseProps>
    /** Updates an existing release. */
    update(
      params: OptionalDefaults<GetReleaseParams & { version: number }>,
      data: ReleasePayload | ReleasePayloadV2,
    ): Promise<ReleaseProps>
    /** Deletes a release. */
    delete(params: OptionalDefaults<GetReleaseParams>): Promise<void>
    /** Publishes all entities in a release. */
    publish(
      params: OptionalDefaults<GetReleaseParams & { version: number }>,
    ): Promise<ReleaseActionProps<'publish'>>
    /** Unarchives a release. */
    unarchive(
      params: OptionalDefaults<GetReleaseParams & { version: number }>,
    ): Promise<ReleaseProps>
    /** Unpublishes all entities in a release. */
    unpublish(
      params: OptionalDefaults<GetReleaseParams & { version: number }>,
    ): Promise<ReleaseActionProps<'unpublish'>>
    /** Validates all entities in a release. */
    validate(
      params: OptionalDefaults<GetReleaseParams>,
      data?: ReleaseValidatePayload,
    ): Promise<ReleaseActionProps<'validate'>>
  }
  releaseAction: {
    /** Fetches a single release action by ID. */
    get(
      params: OptionalDefaults<GetReleaseParams> & { actionId: string },
    ): Promise<ReleaseActionProps>
    /** Fetches all release actions in an environment. */
    getMany(
      params: OptionalDefaults<GetSpaceEnvironmentParams> & { query?: ReleaseActionQueryOptions },
    ): Promise<CollectionProp<ReleaseActionProps>>
    /** Queries release actions for a specific release. */
    queryForRelease(
      params: OptionalDefaults<GetReleaseParams> & { query?: ReleaseActionQueryOptions },
    ): Promise<CollectionProp<ReleaseActionProps>>
  }
  resource: ResourcePlainAPI
  resourceProvider: ResourceProviderPlainClientAPI
  resourceType: ResourceTypePlainClientAPI
  role: RolePlainClientAPI
  scheduledActions: {
    /** Fetches a single scheduled action by ID. */
    get(
      params: OptionalDefaults<GetSpaceParams> & {
        scheduledActionId: string
        environmentId: string
      },
    ): Promise<ScheduledActionProps>
    /** Fetches all scheduled actions in a space. */
    getMany(
      params: OptionalDefaults<GetSpaceParams & QueryParams>,
    ): Promise<CursorPaginatedCollectionProp<ScheduledActionProps>>
    /** Creates a new scheduled action. */
    create(
      params: OptionalDefaults<GetSpaceParams>,
      data: CreateUpdateScheduledActionProps,
    ): Promise<ScheduledActionProps>
    /** Deletes a scheduled action. */
    delete(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { scheduledActionId: string }>,
    ): Promise<ScheduledActionProps>
    /** Updates an existing scheduled action. */
    update(
      params: OptionalDefaults<GetSpaceParams & { scheduledActionId: string; version: number }>,
      data: CreateUpdateScheduledActionProps,
    ): Promise<ScheduledActionProps>
  }
  previewApiKey: {
    /** Fetches a single preview API key by ID. */
    get(
      params: OptionalDefaults<GetSpaceParams & { previewApiKeyId: string }>,
    ): Promise<PreviewApiKeyProps>
    /** Fetches all preview API keys in a space. */
    getMany(
      params: OptionalDefaults<GetSpaceParams & QueryParams>,
    ): Promise<CollectionProp<PreviewApiKeyProps>>
  }
  apiKey: {
    /** Fetches a single API key by ID. */
    get(params: OptionalDefaults<GetSpaceParams & { apiKeyId: string }>): Promise<ApiKeyProps>
    /** Fetches all API keys in a space. */
    getMany(
      params: OptionalDefaults<GetSpaceParams & QueryParams>,
    ): Promise<CollectionProp<ApiKeyProps>>
    /** Creates a new API key with an auto-generated ID. */
    create(
      params: OptionalDefaults<GetSpaceParams>,
      data: CreateApiKeyProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<ApiKeyProps>
    /** Creates a new API key with a specified ID. */
    createWithId(
      params: OptionalDefaults<GetSpaceParams & { apiKeyId: string }>,
      data: CreateApiKeyProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<ApiKeyProps>
    /** Updates an existing API key. */
    update(
      params: OptionalDefaults<GetSpaceParams & { apiKeyId: string }>,
      rawData: ApiKeyProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<ApiKeyProps>
    /** Deletes an API key. */
    delete(params: OptionalDefaults<GetSpaceParams & { apiKeyId: string }>): Promise<any>
  }
  appDefinition: AppDefinitionPlainClientAPI
  appInstallation: AppInstallationPlainClientAPI
  extension: ExtensionPlainClientAPI
  webhook: WebhookPlainClientAPI
  snapshot: {
    /** Fetches all snapshots for an entry. */
    getManyForEntry<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSnapshotForEntryParams & QueryParams>,
    ): Promise<CollectionProp<SnapshotProps<Omit<EntryProps<T>, 'metadata'>>>>
    /** Fetches a single snapshot for an entry. */
    getForEntry<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSnapshotForEntryParams & { snapshotId: string }>,
    ): Promise<SnapshotProps<Omit<EntryProps<T>, 'metadata'>>>
    /** Fetches all snapshots for a content type. */
    getManyForContentType(
      params: OptionalDefaults<GetSnapshotForContentTypeParams & QueryParams>,
    ): Promise<CollectionProp<SnapshotProps<ContentTypeProps>>>
    /** Fetches a single snapshot for a content type. */
    getForContentType(
      params: OptionalDefaults<GetSnapshotForContentTypeParams & { snapshotId: string }>,
    ): Promise<SnapshotProps<ContentTypeProps>>
  }
  tag: TagPlainClientAPI
  organization: OrganizationPlainClientAPI
  organizationInvitation: {
    /** Fetches a single organization invitation by ID. */
    get(
      params: OptionalDefaults<{ organizationId: string; invitationId: string }>,
      headers?: RawAxiosRequestHeaders,
    ): Promise<OrganizationInvitationProps>
    /** Creates a new organization invitation. */
    create(
      params: OptionalDefaults<{ organizationId: string }>,
      data: CreateOrganizationInvitationProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<OrganizationInvitationProps>
  }
  organizationMembership: {
    /** Fetches a single organization membership by ID. */
    get(
      params: OptionalDefaults<GetOrganizationMembershipParams>,
    ): Promise<OrganizationMembershipProps>
    /** Fetches all memberships in an organization. */
    getMany(
      params: OptionalDefaults<GetOrganizationParams & QueryParams>,
    ): Promise<CollectionProp<OrganizationMembershipProps>>
    /** Updates an organization membership. */
    update(
      params: OptionalDefaults<GetOrganizationMembershipParams>,
      rawData: OrganizationMembershipProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<OrganizationMembershipProps>
    /** Deletes an organization membership. */
    delete(params: OptionalDefaults<GetOrganizationMembershipParams>): Promise<any>
  }
  spaceMember: SpaceMemberPlainClientAPI
  spaceMembership: SpaceMembershipPlainClientAPI
  task: TaskPlainClientAPI
  team: TeamPlainClientAPI
  teamMembership: TeamMembershipPlainClientAPI
  teamSpaceMembership: TeamSpaceMembershipPlainClientAPI
  uiConfig: UIConfigPlainClientAPI
  userUIConfig: UserUIConfigPlainClientAPI
  workflowDefinition: WorkflowDefinitionPlainClientAPI
  workflow: WorkflowPlainClientAPI
  workflowsChangelog: WorkflowsChangelogPlainClientAPI
  oauthApplication: OAuthApplicationPlainClientAPI
  vectorizationStatus: VectorizationStatusPlainClientAPI
  semanticSearch: SemanticSearchPlainClientAPI
  semanticDuplicates: SemanticDuplicatesPlainClientAPI
  semanticRecommendations: SemanticRecommendationsPlainClientAPI
  semanticReferenceSuggestions: SemanticReferenceSuggestionsPlainClientAPI
}
