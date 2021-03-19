import { AxiosRequestConfig } from 'axios'
import { Stream } from 'stream'
import {
  CollectionProp,
  GetAppDefinitionParams,
  GetAppInstallationParams,
  GetContentTypeParams,
  GetEditorInterfaceParams,
  GetOrganizationMembershipProps,
  GetOrganizationParams,
  GetSnapshotForContentTypeParams,
  GetSnapshotForEntryParams,
  GetSpaceEnvAliasParams,
  GetSpaceEnvironmentParams,
  GetSpaceMembershipProps,
  GetSpaceParams,
  GetTagParams,
  GetTeamMembershipParams,
  GetTeamParams,
  GetTeamSpaceMembershipParams,
  GetExtensionParams,
  GetWebhookCallDetailsUrl,
  GetWebhookParams,
  KeyValueMap,
  PaginationQueryParams,
  QueryParams,
} from '../common-types'
import { ApiKeyProps, CreateApiKeyProps } from '../entities/api-key'
import { AppDefinitionProps, CreateAppDefinitionProps } from '../entities/app-definition'
import { AppInstallationProps, CreateAppInstallationProps } from '../entities/app-installation'
import {
  AssetFileProp,
  AssetProcessingForLocale,
  AssetProps,
  CreateAssetProps,
} from '../entities/asset'
import { ContentTypeProps } from '../entities/content-type'
import { EditorInterfaceProps } from '../entities/editor-interface'
import { CreateEntryProps, EntryProps } from '../entities/entry'
import { CreateEnvironmentProps, EnvironmentProps } from '../entities/environment'
import { CreateEnvironmentAliasProps, EnvironmentAliasProps } from '../entities/environment-alias'
import { CreateLocaleProps, LocaleProps } from '../entities/locale'
import { OrganizationProp } from '../entities/organization'
import {
  CreateOrganizationInvitationProps,
  OrganizationInvitationProps,
} from '../entities/organization-invitation'
import { OrganizationMembershipProps } from '../entities/organization-membership'
import {
  CreatePersonalAccessTokenProps,
  PersonalAccessTokenProp,
} from '../entities/personal-access-token'
import { PreviewApiKeyProps } from '../entities/preview-api-key'
import { CreateRoleProps, RoleProps } from '../entities/role'
import { ScheduledActionProps } from '../entities/scheduled-action'
import { SnapshotProps } from '../entities/snapshot'
import { SpaceProps } from '../entities/space'
import { SpaceMemberProps } from '../entities/space-member'
import { CreateSpaceMembershipProps, SpaceMembershipProps } from '../entities/space-membership'
import { CreateTagProps, TagProps } from '../entities/tag'
import { CreateTeamProps, TeamProps } from '../entities/team'
import { CreateTeamMembershipProps, TeamMembershipProps } from '../entities/team-membership'
import { TeamSpaceMembershipProps } from '../entities/team-space-membership'
import { CreateExtensionProps, ExtensionProps } from '../entities/extension'
import { UsageProps } from '../entities/usage'
import { UserProps } from '../entities/user'
import {
  CreateWebhooksProps,
  WebhookCallDetailsProps,
  WebhookCallOverviewProps,
  WebhookHealthProps,
  WebhookProps,
} from '../entities/webhook'
import { DefaultParams, MarkOptional } from './wrappers/wrap'
import { AssetKeyProps, CreateAssetKeyProps } from '../entities/asset-key'

export type PlainClientAPI = {
  raw: {
    getDefaultParams(): DefaultParams | undefined
    get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
    post<T = unknown>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<T>
    put<T = unknown>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<T>
    delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
    http<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
  }
  editorInterface: {
    get(
      params: MarkOptional<GetEditorInterfaceParams, 'spaceId' | 'environmentId'>
    ): Promise<EditorInterfaceProps>
    getMany(
      params: MarkOptional<GetSpaceEnvironmentParams & QueryParams, 'spaceId' | 'environmentId'>
    ): Promise<CollectionProp<EditorInterfaceProps>>
    update(
      params: MarkOptional<GetEditorInterfaceParams, 'spaceId' | 'environmentId'>,
      rawData: EditorInterfaceProps,
      headers?: Record<string, unknown>
    ): Promise<EditorInterfaceProps>
  }
  space: {
    get(params: GetSpaceParams): Promise<SpaceProps>
    getMany(params: QueryParams): Promise<CollectionProp<SpaceProps>>
    create(
      params: { organizationId?: string },
      payload: Omit<SpaceProps, 'sys'>,
      headers?: Record<string, unknown>
    ): Promise<any>
    update(
      params: GetSpaceParams,
      payload: SpaceProps,
      headers?: Record<string, unknown>
    ): Promise<SpaceProps>
    delete(params: GetSpaceParams): Promise<any>
  }
  environment: {
    get(
      params: MarkOptional<GetSpaceEnvironmentParams, 'spaceId' | 'environmentId'>
    ): Promise<EnvironmentProps>
    getMany(
      params: MarkOptional<GetSpaceParams & PaginationQueryParams, 'spaceId'>
    ): Promise<CollectionProp<EnvironmentProps>>
    create(
      params: MarkOptional<GetSpaceParams, 'spaceId'>,
      rawData: Partial<Pick<EnvironmentProps, 'name'>>,
      headers?: Record<string, unknown>
    ): Promise<EnvironmentProps>
    createWithId(
      params: GetSpaceEnvironmentParams & { sourceEnvironmentId?: string },
      rawData: CreateEnvironmentProps,
      headers?: Record<string, unknown>
    ): Promise<EnvironmentProps>
    update(
      params: GetSpaceEnvironmentParams,
      rawData: EnvironmentProps,
      headers?: Record<string, unknown>
    ): Promise<EnvironmentProps>
    delete(params: GetSpaceEnvironmentParams): Promise<any>
  }
  environmentAlias: {
    get(params: GetSpaceEnvAliasParams): Promise<EnvironmentAliasProps>
    getMany(
      params: GetSpaceParams & PaginationQueryParams
    ): Promise<CollectionProp<EnvironmentAliasProps>>
    createWithId(
      params: GetSpaceEnvAliasParams,
      rawData: CreateEnvironmentAliasProps,
      headers?: Record<string, unknown>
    ): Promise<EnvironmentAliasProps>
    update(
      params: GetSpaceEnvAliasParams,
      rawData: EnvironmentAliasProps,
      headers?: Record<string, unknown>
    ): Promise<EnvironmentAliasProps>
    delete(params: GetSpaceEnvAliasParams): Promise<any>
  }
  contentType: {
    get(params: GetContentTypeParams & QueryParams): Promise<ContentTypeProps>
    getMany(
      params: GetSpaceEnvironmentParams & QueryParams
    ): Promise<CollectionProp<ContentTypeProps>>
    update(
      params: GetContentTypeParams,
      rawData: ContentTypeProps,
      headers?: Record<string, unknown>
    ): Promise<ContentTypeProps>
    delete(params: GetContentTypeParams): Promise<any>
    publish(params: GetContentTypeParams, rawData: ContentTypeProps): Promise<ContentTypeProps>
    unpublish(params: GetContentTypeParams): Promise<ContentTypeProps>
    omitAndDeleteField(
      params: GetContentTypeParams,
      contentType: ContentTypeProps,
      fieldId: string
    ): Promise<ContentTypeProps>
  }
  user: {
    getManyForSpace(params: GetSpaceParams & QueryParams): Promise<CollectionProp<UserProps>>
    getForSpace(params: GetSpaceParams & { userId: string }): Promise<UserProps>
    getCurrent<T = UserProps>(params?: QueryParams): Promise<T>
    getForOrganization(params: GetOrganizationParams & { userId: string }): Promise<UserProps>
    getManyForOrganization(
      params: GetOrganizationParams & QueryParams
    ): Promise<CollectionProp<UserProps>>
  }
  entry: {
    getMany<T extends KeyValueMap = KeyValueMap>(
      params: GetSpaceEnvironmentParams & QueryParams
    ): Promise<CollectionProp<EntryProps<T>>>
    get<T extends KeyValueMap = KeyValueMap>(
      params: GetSpaceEnvironmentParams & { entryId: string }
    ): Promise<EntryProps<T>>
    update<T extends KeyValueMap = KeyValueMap>(
      params: GetSpaceEnvironmentParams & { entryId: string },
      rawData: EntryProps<T>,
      headers?: Record<string, unknown>
    ): Promise<EntryProps<T>>
    delete(params: GetSpaceEnvironmentParams & { entryId: string }): Promise<any>
    publish<T extends KeyValueMap = KeyValueMap>(
      params: GetSpaceEnvironmentParams & { entryId: string },
      rawData: EntryProps<T>
    ): Promise<EntryProps<T>>
    unpublish<T extends KeyValueMap = KeyValueMap>(
      params: GetSpaceEnvironmentParams & { entryId: string }
    ): Promise<EntryProps<T>>
    archive<T extends KeyValueMap = KeyValueMap>(
      params: GetSpaceEnvironmentParams & { entryId: string }
    ): Promise<EntryProps<T>>
    unarchive<T extends KeyValueMap = KeyValueMap>(
      params: GetSpaceEnvironmentParams & { entryId: string }
    ): Promise<EntryProps<T>>
    create<T extends KeyValueMap = KeyValueMap>(
      params: GetSpaceEnvironmentParams & { contentTypeId: string },
      rawData: CreateEntryProps<T>
    ): Promise<EntryProps<T>>
    createWithId<T extends KeyValueMap = KeyValueMap>(
      params: GetSpaceEnvironmentParams & { entryId: string; contentTypeId: string },
      rawData: CreateEntryProps<T>
    ): Promise<EntryProps<T>>
  }
  asset: {
    getMany(params: GetSpaceEnvironmentParams & QueryParams): Promise<CollectionProp<AssetProps>>
    get(params: GetSpaceEnvironmentParams & { assetId: string } & QueryParams): Promise<AssetProps>
    update(
      params: GetSpaceEnvironmentParams & { assetId: string },
      rawData: AssetProps,
      headers?: Record<string, unknown>
    ): Promise<AssetProps>
    delete(params: GetSpaceEnvironmentParams & { assetId: string }): Promise<any>
    publish(
      params: GetSpaceEnvironmentParams & { assetId: string },
      rawData: AssetProps
    ): Promise<AssetProps>
    unpublish(params: GetSpaceEnvironmentParams & { assetId: string }): Promise<AssetProps>
    archive(params: GetSpaceEnvironmentParams & { assetId: string }): Promise<AssetProps>
    unarchive(params: GetSpaceEnvironmentParams & { assetId: string }): Promise<AssetProps>
    create(params: GetSpaceEnvironmentParams, rawData: CreateAssetProps): Promise<AssetProps>
    createWithId(
      params: GetSpaceEnvironmentParams & { assetId: string },
      rawData: CreateAssetProps
    ): Promise<AssetProps>
    createFromFiles(
      params: GetSpaceEnvironmentParams,
      data: Omit<AssetFileProp, 'sys'>
    ): Promise<AssetProps>
    processForAllLocales(
      params: GetSpaceEnvironmentParams,
      asset: AssetProps,
      processingOptions: AssetProcessingForLocale
    ): Promise<AssetProps>
    processForLocale(
      params: GetSpaceEnvironmentParams,
      asset: AssetProps,
      locale: string,
      processingOptions: AssetProcessingForLocale
    ): Promise<AssetProps>
  }
  assetKey: {
    create(params: GetSpaceEnvironmentParams, data: CreateAssetKeyProps): Promise<AssetKeyProps>
  }
  upload: {
    get(params: GetSpaceParams & { uploadId: string }): Promise<any>
    create(params: GetSpaceParams, data: { file: string | ArrayBuffer | Stream }): Promise<any>
    delete(params: GetSpaceParams & { uploadId: string }): Promise<any>
  }
  locale: {
    get(params: GetSpaceEnvironmentParams & { localeId: string }): Promise<LocaleProps>
    getMany(params: GetSpaceEnvironmentParams & QueryParams): Promise<CollectionProp<LocaleProps>>
    delete(params: GetSpaceEnvironmentParams & { localeId: string }): Promise<any>
    update(
      params: GetSpaceEnvironmentParams & { localeId: string },
      rawData: LocaleProps,
      headers?: Record<string, unknown>
    ): Promise<LocaleProps>
    create(
      params: GetSpaceEnvironmentParams,
      data: CreateLocaleProps,
      headers?: Record<string, unknown>
    ): Promise<LocaleProps>
  }
  personalAccessToken: {
    get(params: { tokenId: string }): Promise<PersonalAccessTokenProp>
    getMany(params: QueryParams): Promise<CollectionProp<PersonalAccessTokenProp>>
    create(
      rawData: CreatePersonalAccessTokenProps,
      headers?: Record<string, unknown>
    ): Promise<PersonalAccessTokenProp>
    revoke(params: { tokenId: string }): Promise<PersonalAccessTokenProp>
  }
  usage: {
    getManyForSpace(
      params: { organizationId: string } & QueryParams
    ): Promise<CollectionProp<UsageProps>>
    getManyForOrganization(
      params: { organizationId: string } & QueryParams
    ): Promise<CollectionProp<UsageProps>>
  }
  role: {
    get(params: GetSpaceParams & { roleId: string }): Promise<RoleProps>
    getMany(params: GetSpaceParams & QueryParams): Promise<CollectionProp<RoleProps>>
    create(
      params: GetSpaceParams,
      data: CreateRoleProps,
      headers?: Record<string, unknown>
    ): Promise<RoleProps>
    createWithId(
      params: GetSpaceParams & { roleId: string },
      data: CreateRoleProps,
      headers?: Record<string, unknown>
    ): Promise<RoleProps>
    update(
      params: GetSpaceParams & { roleId: string },
      rawData: RoleProps,
      headers?: Record<string, unknown>
    ): Promise<RoleProps>
    delete(params: GetSpaceParams & { roleId: string }): Promise<any>
  }
  scheduledActions: {
    getMany(params: GetSpaceParams & QueryParams): Promise<CollectionProp<ScheduledActionProps>>
    create(
      params: GetSpaceParams,
      data: Omit<ScheduledActionProps, 'sys'>
    ): Promise<ScheduledActionProps>
    delete(params: GetSpaceParams & { scheduledActionId: string }): Promise<any>
  }
  previewApiKey: {
    get(params: GetSpaceParams & { previewApiKeyId: string }): Promise<PreviewApiKeyProps>
    getMany(params: GetSpaceParams & QueryParams): Promise<CollectionProp<PreviewApiKeyProps>>
  }
  apiKey: {
    get(params: GetSpaceParams & { apiKeyId: string }): Promise<ApiKeyProps>
    getMany(params: GetSpaceParams & QueryParams): Promise<CollectionProp<ApiKeyProps>>
    create(
      params: GetSpaceParams,
      data: CreateApiKeyProps,
      headers?: Record<string, unknown>
    ): Promise<ApiKeyProps>
    createWithId(
      params: GetSpaceParams & { apiKeyId: string },
      data: CreateApiKeyProps,
      headers?: Record<string, unknown>
    ): Promise<ApiKeyProps>
    update(
      params: GetSpaceParams & { apiKeyId: string },
      rawData: ApiKeyProps,
      headers?: Record<string, unknown>
    ): Promise<ApiKeyProps>
    delete(params: GetSpaceParams & { apiKeyId: string }): Promise<any>
  }
  appDefinition: {
    get(
      params: GetOrganizationParams & { appDefinitionId: string } & QueryParams
    ): Promise<AppDefinitionProps>
    getMany(
      params: GetOrganizationParams & QueryParams
    ): Promise<CollectionProp<AppDefinitionProps>>
    create(
      params: GetOrganizationParams,
      rawData: CreateAppDefinitionProps
    ): Promise<AppDefinitionProps>
    update(
      params: GetAppDefinitionParams,
      rawData: AppDefinitionProps,
      headers?: Record<string, unknown>
    ): Promise<AppDefinitionProps>
    delete(params: GetAppDefinitionParams): Promise<any>
  }
  appInstallation: {
    get(params: GetAppInstallationParams): Promise<AppInstallationProps>
    getMany(
      params: GetSpaceEnvironmentParams & PaginationQueryParams
    ): Promise<CollectionProp<AppInstallationProps>>
    upsert(
      params: GetAppInstallationParams,
      rawData: CreateAppInstallationProps,
      headers?: Record<string, unknown>
    ): Promise<AppInstallationProps>
    delete(params: GetAppInstallationParams): Promise<any>
  }
  extension: {
    get(params: GetExtensionParams & QueryParams): Promise<ExtensionProps>
    getMany(
      params: GetSpaceEnvironmentParams & QueryParams
    ): Promise<CollectionProp<ExtensionProps>>
    create(
      params: GetSpaceEnvironmentParams,
      rawData: CreateExtensionProps,
      headers?: Record<string, unknown>
    ): Promise<ExtensionProps>
    createWithId(
      params: GetExtensionParams,
      rawData: CreateExtensionProps,
      headers?: Record<string, unknown>
    ): Promise<ExtensionProps>
    update(
      params: GetExtensionParams,
      rawData: ExtensionProps,
      headers?: Record<string, unknown>
    ): Promise<ExtensionProps>
    delete(params: GetExtensionParams): Promise<any>
  }
  webhook: {
    get(params: GetWebhookParams): Promise<WebhookProps>
    getMany(params: GetSpaceParams & QueryParams): Promise<CollectionProp<WebhookProps>>
    getHealthStatus(params: GetWebhookParams): Promise<WebhookHealthProps>
    getCallDetails(params: GetWebhookCallDetailsUrl): Promise<WebhookCallDetailsProps>
    getManyCallDetails(
      params: GetWebhookParams & QueryParams
    ): Promise<CollectionProp<WebhookCallOverviewProps>>
    create(
      params: GetSpaceParams,
      rawData: CreateWebhooksProps,
      headers?: Record<string, unknown>
    ): Promise<WebhookProps>
    update(params: GetWebhookParams, rawData: CreateWebhooksProps): Promise<WebhookProps>
    delete(params: GetWebhookParams): Promise<any>
  }
  snapshot: {
    getManyForEntry<T extends KeyValueMap = KeyValueMap>(
      params: GetSnapshotForEntryParams & QueryParams
    ): Promise<CollectionProp<SnapshotProps<EntryProps<T>>>>
    getForEntry<T extends KeyValueMap = KeyValueMap>(
      params: GetSnapshotForEntryParams & { snapshotId: string }
    ): Promise<SnapshotProps<EntryProps<T>>>
    getManyForContentType(
      params: GetSnapshotForContentTypeParams & QueryParams
    ): Promise<CollectionProp<SnapshotProps<ContentTypeProps>>>
    getForContentType(
      params: GetSnapshotForContentTypeParams & { snapshotId: string }
    ): Promise<SnapshotProps<ContentTypeProps>>
  }
  tag: {
    get(params: GetTagParams, rawData: CreateTagProps): Promise<TagProps>
    getMany(params: GetSpaceEnvironmentParams & QueryParams): Promise<CollectionProp<TagProps>>
    createWithId(params: GetTagParams, rawData: CreateTagProps): Promise<TagProps>
    update(
      params: GetTagParams,
      rawData: TagProps,
      headers?: Record<string, unknown>
    ): Promise<TagProps>
    delete(params: GetTagParams, version: number): Promise<any>
  }
  organization: {
    getAll(): Promise<CollectionProp<OrganizationProp>>
    get(params: GetOrganizationParams): Promise<OrganizationProp>
  }
  organizationInvitation: {
    get(
      params: { organizationId: string; invitationId: string },
      headers?: Record<string, unknown>
    ): Promise<OrganizationInvitationProps>
    create(
      params: { organizationId: string },
      data: CreateOrganizationInvitationProps,
      headers?: Record<string, unknown>
    ): Promise<OrganizationInvitationProps>
  }
  organizationMembership: {
    get(params: GetOrganizationMembershipProps): Promise<OrganizationMembershipProps>
    getMany(
      params: GetOrganizationParams & QueryParams
    ): Promise<CollectionProp<OrganizationMembershipProps>>
    update(
      params: GetOrganizationMembershipProps,
      rawData: OrganizationMembershipProps,
      headers?: Record<string, unknown>
    ): Promise<OrganizationMembershipProps>
    delete(params: GetOrganizationMembershipProps): Promise<any>
  }
  spaceMember: {
    get(params: GetSpaceParams & { spaceMemberId: string }): Promise<SpaceMemberProps>
    getMany(params: GetSpaceParams & QueryParams): Promise<CollectionProp<SpaceMemberProps>>
  }
  spaceMembership: {
    get(params: GetSpaceMembershipProps): Promise<SpaceMembershipProps>
    getMany(params: GetSpaceParams & QueryParams): Promise<CollectionProp<SpaceMembershipProps>>
    getForOrganization(
      params: GetOrganizationParams & { spaceMembershipId: string }
    ): Promise<SpaceMembershipProps>
    getManyForOrganization(
      params: GetOrganizationParams & QueryParams
    ): Promise<CollectionProp<SpaceMembershipProps>>
    create(
      params: GetSpaceParams,
      data: CreateSpaceMembershipProps,
      headers?: Record<string, unknown>
    ): Promise<SpaceMembershipProps>
    createWithId(
      params: GetSpaceMembershipProps,
      data: CreateSpaceMembershipProps,
      headers?: Record<string, unknown>
    ): Promise<SpaceMembershipProps>
    update(
      params: GetSpaceMembershipProps,
      rawData: SpaceMembershipProps,
      headers?: Record<string, unknown>
    ): Promise<SpaceMembershipProps>
    delete(params: GetSpaceMembershipProps): Promise<any>
  }
  team: {
    get(params: GetTeamParams): Promise<TeamProps>
    getMany(params: GetOrganizationParams & QueryParams): Promise<CollectionProp<TeamProps>>
    create(
      params: GetOrganizationParams,
      rawData: CreateTeamProps,
      headers?: Record<string, unknown>
    ): Promise<any>
    update(
      params: GetTeamParams,
      rawData: TeamProps,
      headers?: Record<string, unknown>
    ): Promise<TeamProps>
    delete(params: GetTeamParams): Promise<any>
  }
  teamMembership: {
    get(params: GetTeamMembershipParams): Promise<TeamMembershipProps>
    getManyForOrganization(
      params: GetOrganizationParams & QueryParams
    ): Promise<CollectionProp<TeamMembershipProps>>
    getManyForTeam(
      params: GetTeamParams & QueryParams
    ): Promise<CollectionProp<TeamMembershipProps>>
    create(
      params: GetTeamParams,
      rawData: CreateTeamMembershipProps,
      headers?: Record<string, unknown>
    ): Promise<TeamMembershipProps>
    update(
      params: GetTeamMembershipParams,
      rawData: TeamMembershipProps,
      headers?: Record<string, unknown>
    ): Promise<TeamMembershipProps>
    delete(params: GetTeamMembershipParams): Promise<any>
  }
  teamSpaceMembership: {
    get(params: GetTeamSpaceMembershipParams): Promise<TeamSpaceMembershipProps>
    getMany(params: GetSpaceParams & QueryParams): Promise<CollectionProp<TeamSpaceMembershipProps>>
    getForOrganization(
      params: GetOrganizationParams & { teamSpaceMembershipId: string }
    ): Promise<TeamSpaceMembershipProps>
    getManyForOrganization(
      params: GetOrganizationParams & QueryParams & { teamId?: string }
    ): Promise<CollectionProp<TeamSpaceMembershipProps>>
    create(
      params: GetSpaceParams & { teamId: string },
      rawData: TeamSpaceMembershipProps,
      headers?: Record<string, unknown>
    ): Promise<TeamSpaceMembershipProps>
    update(
      params: GetTeamSpaceMembershipParams,
      rawData: TeamSpaceMembershipProps,
      headers?: Record<string, unknown>
    ): Promise<TeamSpaceMembershipProps>
    delete(params: GetTeamSpaceMembershipParams): Promise<any>
  }
}
