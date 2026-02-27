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
    getDefaultParams(): PlainClientDefaultParams | undefined
    get<T = unknown>(url: string, config?: RawAxiosRequestConfig): Promise<T>
    post<T = unknown>(url: string, payload?: any, config?: RawAxiosRequestConfig): Promise<T>
    patch<T = unknown>(url: string, payload?: any, config?: RawAxiosRequestConfig): Promise<T>
    put<T = unknown>(url: string, payload?: any, config?: RawAxiosRequestConfig): Promise<T>
    delete<T = unknown>(url: string, config?: RawAxiosRequestConfig): Promise<T>
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
    get(
      params: GetEnvironmentTemplateParams & {
        version?: number
        query?: { select?: string }
      },
      headers?: RawAxiosRequestHeaders,
    ): Promise<EnvironmentTemplateProps>
    getMany(
      params: GetOrganizationParams & {
        query?: BasicCursorPaginationOptions & { select?: string; forTemplatedSpaces?: boolean }
      },
      headers?: RawAxiosRequestHeaders,
    ): Promise<CursorPaginatedCollectionProp<EnvironmentTemplateProps>>
    create(
      params: GetOrganizationParams,
      rawData: CreateEnvironmentTemplateProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<EnvironmentTemplateProps>
    versionUpdate(
      params: GetEnvironmentTemplateParams & { version: number },
      rawData: { versionName?: string; versionDescription?: string },
      headers?: RawAxiosRequestHeaders,
    ): Promise<EnvironmentTemplateProps>
    update(
      params: GetEnvironmentTemplateParams,
      rawData: EnvironmentTemplateProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<EnvironmentTemplateProps>
    delete(params: GetEnvironmentTemplateParams, headers?: RawAxiosRequestHeaders): Promise<void>
    versions(
      params: GetEnvironmentTemplateParams & {
        query?: BasicCursorPaginationOptions & { select?: string; installable?: boolean }
      },
      headers?: RawAxiosRequestHeaders,
    ): Promise<CursorPaginatedCollectionProp<EnvironmentTemplateProps>>
    validate(
      params: EnvironmentTemplateParams & {
        version?: number
      },
      rawData: ValidateEnvironmentTemplateInstallationProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<EnvironmentTemplateValidationProps>
    install(
      params: EnvironmentTemplateParams,
      rawData: CreateEnvironmentTemplateInstallationProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<EnvironmentTemplateInstallationProps>
    disconnect(params: EnvironmentTemplateParams, headers?: RawAxiosRequestHeaders): Promise<void>
  }
  environmentTemplateInstallation: {
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
    getForEnvironment(
      params: BasicCursorPaginationOptions &
        EnvironmentTemplateParams & {
          installationId?: string
        },
      headers?: RawAxiosRequestHeaders,
    ): Promise<CursorPaginatedCollectionProp<EnvironmentTemplateInstallationProps>>
  }
  bulkAction: {
    get<T extends BulkActionPayload = any>(params: GetBulkActionParams): Promise<BulkActionProps<T>>
    publish(
      params: GetSpaceEnvironmentParams,
      payload: BulkActionPublishPayload,
    ): Promise<BulkActionProps<BulkActionPublishPayload>>
    unpublish(
      params: GetSpaceEnvironmentParams,
      payload: BulkActionUnpublishPayload,
    ): Promise<BulkActionProps<BulkActionUnpublishPayload>>
    validate(
      params: GetSpaceEnvironmentParams,
      payload: BulkActionValidatePayload,
    ): Promise<BulkActionProps<BulkActionValidatePayload>>
    getV2(params: GetBulkActionParams): Promise<BulkActionProps<BulkActionV2Payload>>
    publishV2(
      params: GetSpaceEnvironmentParams,
      payload: PublishBulkActionV2Payload<'add'>,
    ): Promise<BulkActionProps<PublishBulkActionV2Payload<'add'>>>
    unpublishV2(
      params: GetSpaceEnvironmentParams,
      payload: PublishBulkActionV2Payload<'remove'> | UnpublishBulkActionV2Payload,
    ): Promise<BulkActionProps<PublishBulkActionV2Payload<'remove'> | UnpublishBulkActionV2Payload>>
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
    get(params: OptionalDefaults<GetContentTypeParams & QueryParams>): Promise<ContentTypeProps>
    getMany(
      params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>,
    ): Promise<CollectionProp<ContentTypeProps>>
    getManyWithCursor(
      params: OptionalDefaults<GetSpaceEnvironmentParams & CursorBasedParams>,
    ): Promise<CursorPaginatedCollectionProp<ContentTypeProps>>
    update(
      params: OptionalDefaults<GetContentTypeParams>,
      rawData: ContentTypeProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<ContentTypeProps>
    delete(params: OptionalDefaults<GetContentTypeParams>): Promise<any>
    publish(
      params: OptionalDefaults<GetContentTypeParams>,
      rawData: ContentTypeProps,
    ): Promise<ContentTypeProps>
    unpublish(params: OptionalDefaults<GetContentTypeParams>): Promise<ContentTypeProps>
    create(
      params: OptionalDefaults<GetSpaceEnvironmentParams>,
      rawData: CreateContentTypeProps,
    ): Promise<ContentTypeProps>
    createWithId(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { contentTypeId: string }>,
      rawData: CreateContentTypeProps,
    ): Promise<ContentTypeProps>
    omitAndDeleteField(
      params: OptionalDefaults<GetContentTypeParams>,
      contentType: ContentTypeProps,
      fieldId: string,
    ): Promise<ContentTypeProps>
  }
  user: UserPlainClientAPI
  entry: {
    getPublished<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>,
      rawData?: unknown,
      headers?: RawAxiosRequestHeaders,
    ): Promise<CollectionProp<EntryProps<T>>>
    getPublishedWithCursor<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSpaceEnvironmentParams & CursorBasedParams>,
      rawData?: unknown,
      headers?: RawAxiosRequestHeaders,
    ): Promise<CursorPaginatedCollectionProp<EntryProps<T>>>
    getMany<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams & { releaseId?: string }>,
      rawData?: unknown,
      headers?: RawAxiosRequestHeaders,
    ): Promise<CollectionProp<EntryProps<T>>>
    getManyWithCursor<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<
        GetSpaceEnvironmentParams & CursorBasedParams & { releaseId?: string }
      >,
      rawData?: unknown,
      headers?: RawAxiosRequestHeaders,
    ): Promise<CursorPaginatedCollectionProp<EntryProps<T>>>
    get<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string; releaseId?: string }>,
      rawData?: unknown,
      headers?: RawAxiosRequestHeaders,
    ): Promise<EntryProps<T>>
    update<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string; releaseId?: string }>,
      rawData: EntryProps<T>,
      headers?: RawAxiosRequestHeaders,
    ): Promise<EntryProps<T>>
    patch<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<
        GetSpaceEnvironmentParams & { entryId: string; version: number; releaseId?: string }
      >,
      rawData: OpPatch[],
      headers?: RawAxiosRequestHeaders,
    ): Promise<EntryProps<T>>
    delete(params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string }>): Promise<any>
    publish<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string; locales?: string[] }>,
      rawData: EntryProps<T>,
    ): Promise<EntryProps<T>>
    unpublish<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string; locales?: string[] }>,
      rawData?: EntryProps<T>,
    ): Promise<EntryProps<T>>
    archive<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string }>,
    ): Promise<EntryProps<T>>
    unarchive<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { entryId: string }>,
    ): Promise<EntryProps<T>>
    create<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<
        GetSpaceEnvironmentParams & { contentTypeId: string; releaseId?: string }
      >,
      rawData: CreateEntryProps<T>,
    ): Promise<EntryProps<T>>
    createWithId<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<
        GetSpaceEnvironmentParams & { entryId: string; contentTypeId: string; releaseId?: string }
      >,
      rawData: CreateEntryProps<T>,
    ): Promise<EntryProps<T>>
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
    getPublished(
      params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>,
      rawData?: unknown,
      headers?: RawAxiosRequestHeaders,
    ): Promise<CollectionProp<AssetProps>>
    getPublishedWithCursor(
      params: OptionalDefaults<GetSpaceEnvironmentParams & CursorBasedParams>,
      rawData?: unknown,
      headers?: RawAxiosRequestHeaders,
    ): Promise<CursorPaginatedCollectionProp<AssetProps>>
    getMany(
      params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams & { releaseId?: string }>,
      rawData?: unknown,
      headers?: RawAxiosRequestHeaders,
    ): Promise<CollectionProp<AssetProps>>
    getManyWithCursor(
      params: OptionalDefaults<
        GetSpaceEnvironmentParams & CursorBasedParams & { releaseId?: string }
      >,
      rawData?: unknown,
      headers?: RawAxiosRequestHeaders,
    ): Promise<CursorPaginatedCollectionProp<AssetProps>>
    get(
      params: OptionalDefaults<
        GetSpaceEnvironmentParams & { assetId: string; releaseId?: string } & QueryParams
      >,
      rawData?: unknown,
      headers?: RawAxiosRequestHeaders,
    ): Promise<AssetProps>
    update(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string; releaseId?: string }>,
      rawData: AssetProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<AssetProps>
    delete(params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string }>): Promise<any>
    publish(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string; locales?: string[] }>,
      rawData: AssetProps,
    ): Promise<AssetProps>
    unpublish(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string; locales?: string[] }>,
      rawData?: AssetProps,
    ): Promise<AssetProps>
    archive(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string }>,
    ): Promise<AssetProps>
    unarchive(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string }>,
    ): Promise<AssetProps>
    create(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { releaseId?: string }>,
      rawData: CreateAssetProps,
    ): Promise<AssetProps>
    createWithId(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { assetId: string; releaseId?: string }>,
      rawData: CreateAssetProps,
    ): Promise<AssetProps>
    createFromFiles(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { releaseId?: string }>,
      data: Omit<AssetFileProp, 'sys'>,
    ): Promise<AssetProps>
    processForAllLocales(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { releaseId?: string }>,
      asset: AssetProps,
      processingOptions?: AssetProcessingForLocale,
    ): Promise<AssetProps>
    processForLocale(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { releaseId?: string }>,
      asset: AssetProps,
      locale: string,
      processingOptions?: AssetProcessingForLocale,
    ): Promise<AssetProps>
  }
  appUpload: AppUploadPlainClientAPI
  assetKey: {
    create(
      params: OptionalDefaults<GetSpaceEnvironmentParams>,
      data: CreateAssetKeyProps,
    ): Promise<AssetKeyProps>
  }
  upload: UploadPlainClientAPI
  uploadCredential: UploadCredentialAPI
  locale: LocalePlainClientAPI
  personalAccessToken: {
    get(params: OptionalDefaults<{ tokenId: string }>): Promise<PersonalAccessTokenProps>
    getMany(
      params: OptionalDefaults<QueryParams>,
    ): Promise<CollectionProp<PersonalAccessTokenProps>>
    create(
      rawData: CreatePersonalAccessTokenProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<PersonalAccessTokenProps>
    revoke(params: OptionalDefaults<{ tokenId: string }>): Promise<PersonalAccessTokenProps>
  }
  accessToken: {
    get(params: OptionalDefaults<{ tokenId: string }>): Promise<AccessTokenProps>
    getMany(params: OptionalDefaults<QueryParams>): Promise<CollectionProp<AccessTokenProps>>
    createPersonalAccessToken(
      rawData: CreatePATProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<AccessTokenProps>
    revoke(params: OptionalDefaults<{ tokenId: string }>): Promise<AccessTokenProps>
    getManyForOrganization(
      params: OptionalDefaults<GetOrganizationParams & QueryParams>,
    ): Promise<CollectionProp<AccessTokenProps>>
  }
  usage: UsagePlainClientAPI
  release: {
    asset: {
      get(
        params: OptionalDefaults<GetReleaseAssetParams & QueryParams>,
        rawData?: unknown,
        headers?: RawAxiosRequestHeaders,
      ): Promise<AssetProps<{ release: Link<'Release'> }>>
      getMany(
        params: OptionalDefaults<GetManyReleaseAssetParams & QueryParams>,
        rawData?: unknown,
        headers?: RawAxiosRequestHeaders,
      ): Promise<CollectionProp<AssetProps<{ release: Link<'Release'> }>>>
      update(
        params: OptionalDefaults<UpdateReleaseAssetParams & QueryParams>,
        rawData: AssetProps,
        headers?: RawAxiosRequestHeaders,
      ): Promise<AssetProps<{ release: Link<'Release'> }>>
      create(
        params: OptionalDefaults<CreateReleaseAssetParams & QueryParams>,
        rawData: CreateAssetProps,
        headers?: RawAxiosRequestHeaders,
      ): Promise<AssetProps<{ release: Link<'Release'> }>>
      createWithId(
        params: OptionalDefaults<CreateWithIdReleaseAssetParams & QueryParams>,
        rawData: CreateAssetProps,
        headers?: RawAxiosRequestHeaders,
      ): Promise<AssetProps<{ release: Link<'Release'> }>>
      createFromFiles(
        params: OptionalDefaults<CreateWithFilesReleaseAssetParams & QueryParams>,
        data: Omit<AssetFileProp, 'sys'>,
        headers?: RawAxiosRequestHeaders,
      ): Promise<AssetProps<{ release: Link<'Release'> }>>
      processForLocale(
        params: OptionalDefaults<GetSpaceEnvironmentParams>,
        asset: AssetProps<{ release: Link<'Release'> }>,
        locale: string,
        processingOptions?: AssetProcessingForLocale,
      ): Promise<AssetProps<{ release: Link<'Release'> }>>
      processForAllLocales(
        params: OptionalDefaults<GetSpaceEnvironmentParams>,
        asset: AssetProps<{ release: Link<'Release'> }>,
        processingOptions?: AssetProcessingForLocale,
      ): Promise<AssetProps<{ release: Link<'Release'> }>>
    }
    entry: {
      get<T extends KeyValueMap = KeyValueMap>(
        params: OptionalDefaults<GetReleaseEntryParams & QueryParams>,
        rawData?: unknown,
        headers?: RawAxiosRequestHeaders,
      ): Promise<EntryProps<T, { release: Link<'Release'> }>>
      getMany<T extends KeyValueMap = KeyValueMap>(
        params: OptionalDefaults<GetManyReleaseEntryParams & QueryParams>,
        rawData?: unknown,
        headers?: RawAxiosRequestHeaders,
      ): Promise<CollectionProp<EntryProps<T, { release: Link<'Release'> }>>>
      update<T extends KeyValueMap = KeyValueMap>(
        params: OptionalDefaults<UpdateReleaseEntryParams & QueryParams>,
        rawData: EntryProps<T>,
        headers?: RawAxiosRequestHeaders,
      ): Promise<EntryProps<T, { release: Link<'Release'> }>>
      patch<T extends KeyValueMap = KeyValueMap>(
        params: OptionalDefaults<PatchReleaseEntryParams & QueryParams>,
        rawData: OpPatch[],
        headers?: RawAxiosRequestHeaders,
      ): Promise<EntryProps<T, { release: Link<'Release'> }>>
      create<T extends KeyValueMap = KeyValueMap>(
        params: OptionalDefaults<CreateReleaseEntryParams & QueryParams>,
        rawData: CreateEntryProps<T>,
        headers?: RawAxiosRequestHeaders,
      ): Promise<EntryProps<T, { release: Link<'Release'> }>>
      createWithId<T extends KeyValueMap = KeyValueMap>(
        params: OptionalDefaults<CreateWithIdReleaseEntryParams & QueryParams>,
        rawData: CreateEntryProps<T>,
        headers?: RawAxiosRequestHeaders,
      ): Promise<EntryProps<T, { release: Link<'Release'> }>>
    }
    archive(params: OptionalDefaults<GetReleaseParams & { version: number }>): Promise<ReleaseProps>
    get(params: OptionalDefaults<GetReleaseParams>): Promise<ReleaseProps>
    query(
      params: OptionalDefaults<ReleaseEnvironmentParams> & { query?: ReleaseQueryOptions },
    ): Promise<CursorPaginatedCollectionProp<ReleaseProps>>
    create(
      params: OptionalDefaults<ReleaseEnvironmentParams>,
      data: ReleasePayload | ReleasePayloadV2,
    ): Promise<ReleaseProps>
    update(
      params: OptionalDefaults<GetReleaseParams & { version: number }>,
      data: ReleasePayload | ReleasePayloadV2,
    ): Promise<ReleaseProps>
    delete(params: OptionalDefaults<GetReleaseParams>): Promise<void>
    publish(
      params: OptionalDefaults<GetReleaseParams & { version: number }>,
    ): Promise<ReleaseActionProps<'publish'>>
    unarchive(
      params: OptionalDefaults<GetReleaseParams & { version: number }>,
    ): Promise<ReleaseProps>
    unpublish(
      params: OptionalDefaults<GetReleaseParams & { version: number }>,
    ): Promise<ReleaseActionProps<'unpublish'>>
    validate(
      params: OptionalDefaults<GetReleaseParams>,
      data?: ReleaseValidatePayload,
    ): Promise<ReleaseActionProps<'validate'>>
  }
  releaseAction: {
    get(
      params: OptionalDefaults<GetReleaseParams> & { actionId: string },
    ): Promise<ReleaseActionProps>
    getMany(
      params: OptionalDefaults<GetSpaceEnvironmentParams> & { query?: ReleaseActionQueryOptions },
    ): Promise<CollectionProp<ReleaseActionProps>>
    queryForRelease(
      params: OptionalDefaults<GetReleaseParams> & { query?: ReleaseActionQueryOptions },
    ): Promise<CollectionProp<ReleaseActionProps>>
  }
  resource: ResourcePlainAPI
  resourceProvider: ResourceProviderPlainClientAPI
  resourceType: ResourceTypePlainClientAPI
  role: RolePlainClientAPI
  scheduledActions: {
    get(
      params: OptionalDefaults<GetSpaceParams> & {
        scheduledActionId: string
        environmentId: string
      },
    ): Promise<ScheduledActionProps>
    getMany(
      params: OptionalDefaults<GetSpaceParams & QueryParams>,
    ): Promise<CursorPaginatedCollectionProp<ScheduledActionProps>>
    create(
      params: OptionalDefaults<GetSpaceParams>,
      data: CreateUpdateScheduledActionProps,
    ): Promise<ScheduledActionProps>
    delete(
      params: OptionalDefaults<GetSpaceEnvironmentParams & { scheduledActionId: string }>,
    ): Promise<ScheduledActionProps>
    update(
      params: OptionalDefaults<GetSpaceParams & { scheduledActionId: string; version: number }>,
      data: CreateUpdateScheduledActionProps,
    ): Promise<ScheduledActionProps>
  }
  previewApiKey: {
    get(
      params: OptionalDefaults<GetSpaceParams & { previewApiKeyId: string }>,
    ): Promise<PreviewApiKeyProps>
    getMany(
      params: OptionalDefaults<GetSpaceParams & QueryParams>,
    ): Promise<CollectionProp<PreviewApiKeyProps>>
  }
  apiKey: {
    get(params: OptionalDefaults<GetSpaceParams & { apiKeyId: string }>): Promise<ApiKeyProps>
    getMany(
      params: OptionalDefaults<GetSpaceParams & QueryParams>,
    ): Promise<CollectionProp<ApiKeyProps>>
    create(
      params: OptionalDefaults<GetSpaceParams>,
      data: CreateApiKeyProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<ApiKeyProps>
    createWithId(
      params: OptionalDefaults<GetSpaceParams & { apiKeyId: string }>,
      data: CreateApiKeyProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<ApiKeyProps>
    update(
      params: OptionalDefaults<GetSpaceParams & { apiKeyId: string }>,
      rawData: ApiKeyProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<ApiKeyProps>
    delete(params: OptionalDefaults<GetSpaceParams & { apiKeyId: string }>): Promise<any>
  }
  appDefinition: AppDefinitionPlainClientAPI
  appInstallation: AppInstallationPlainClientAPI
  extension: ExtensionPlainClientAPI
  webhook: WebhookPlainClientAPI
  snapshot: {
    getManyForEntry<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSnapshotForEntryParams & QueryParams>,
    ): Promise<CollectionProp<SnapshotProps<Omit<EntryProps<T>, 'metadata'>>>>
    getForEntry<T extends KeyValueMap = KeyValueMap>(
      params: OptionalDefaults<GetSnapshotForEntryParams & { snapshotId: string }>,
    ): Promise<SnapshotProps<Omit<EntryProps<T>, 'metadata'>>>
    getManyForContentType(
      params: OptionalDefaults<GetSnapshotForContentTypeParams & QueryParams>,
    ): Promise<CollectionProp<SnapshotProps<ContentTypeProps>>>
    getForContentType(
      params: OptionalDefaults<GetSnapshotForContentTypeParams & { snapshotId: string }>,
    ): Promise<SnapshotProps<ContentTypeProps>>
  }
  tag: TagPlainClientAPI
  organization: OrganizationPlainClientAPI
  organizationInvitation: {
    get(
      params: OptionalDefaults<{ organizationId: string; invitationId: string }>,
      headers?: RawAxiosRequestHeaders,
    ): Promise<OrganizationInvitationProps>
    create(
      params: OptionalDefaults<{ organizationId: string }>,
      data: CreateOrganizationInvitationProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<OrganizationInvitationProps>
  }
  organizationMembership: {
    get(
      params: OptionalDefaults<GetOrganizationMembershipParams>,
    ): Promise<OrganizationMembershipProps>
    getMany(
      params: OptionalDefaults<GetOrganizationParams & QueryParams>,
    ): Promise<CollectionProp<OrganizationMembershipProps>>
    update(
      params: OptionalDefaults<GetOrganizationMembershipParams>,
      rawData: OrganizationMembershipProps,
      headers?: RawAxiosRequestHeaders,
    ): Promise<OrganizationMembershipProps>
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
