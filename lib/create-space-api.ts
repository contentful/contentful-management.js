/**
 * Contentful Space API. Contains methods to access any operations at a space
 * level, such as creating and reading entities contained in a space.
 */

import { AxiosInstance } from 'axios'
import { Stream } from 'stream'
import cloneDeep from 'lodash/cloneDeep'
import { createRequestConfig } from 'contentful-sdk-core'
import errorHandler from './error-handler'
import entities from './entities'
import { EnvironmentProps } from './entities/environment'
import { ContentTypeProps } from './entities/content-type'
import { EntryProp } from './entities/entry'
import { AssetProps, AssetFileProp } from './entities/asset'
import { TeamSpaceMembershipProps } from './entities/team-space-membership'
import { SpaceMembershipProps } from './entities/space-membership'
import { RoleProps } from './entities/role'
import { LocaleProps } from './entities/locale'
import { WebhookProps } from './entities/webhook'
import { QueryOptions } from './common-types'
import { UIExtensionProps } from './entities/ui-extension'
import { CreateApiKeyProps } from './entities/api-key'

function raiseDeprecationWarning(method: string) {
  console.warn(
    [
      `Deprecated: Space.${method}() will be removed in future major versions.`,
      null,
      `Please migrate your code to use Environment.${method}():`,
      `https://contentful.github.io/contentful-management.js/contentful-management/latest/ContentfulEnvironmentAPI.html#.${method}`,
      null,
    ].join('\n')
  )
}

function spaceMembershipDeprecationWarning() {
  console.warn(
    'The user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user)'
  )
}

/**
 * Creates API object with methods to access the Space API
 * @private
 * @param {object} params - API initialization params
 * @prop {object} http - HTTP client instance
 * @prop {object} entities - Object with wrapper methods for each kind of entity
 * @return {ContentfulSpaceAPI}
 */
export default function createSpaceApi({
  http,
  httpUpload,
}: {
  http: AxiosInstance
  httpUpload: AxiosInstance
}) {
  const { wrapSpace } = entities.space
  const { wrapEnvironment, wrapEnvironmentCollection } = entities.environment
  const { wrapContentType, wrapContentTypeCollection } = entities.contentType
  const { wrapEntry, wrapEntryCollection } = entities.entry
  const { wrapAsset, wrapAssetCollection } = entities.asset
  const { wrapLocale, wrapLocaleCollection } = entities.locale
  const { wrapWebhook, wrapWebhookCollection } = entities.webhook
  const { wrapRole, wrapRoleCollection } = entities.role
  const { wrapUser, wrapUserCollection } = entities.user
  const { wrapSpaceMember, wrapSpaceMemberCollection } = entities.spaceMember
  const { wrapSpaceMembership, wrapSpaceMembershipCollection } = entities.spaceMembership
  const {
    wrapTeamSpaceMembership,
    wrapTeamSpaceMembershipCollection,
  } = entities.teamSpaceMembership
  const { wrapApiKey, wrapApiKeyCollection } = entities.apiKey
  const { wrapPreviewApiKey, wrapPreviewApiKeyCollection } = entities.previewApiKey
  const { wrapSnapshotCollection } = entities.snapshot
  const { wrapEditorInterface } = entities.editorInterface
  const { wrapUpload } = entities.upload
  const { wrapUiExtension, wrapUiExtensionCollection } = entities.uiExtension
  const { wrapEnvironmentAlias, wrapEnvironmentAliasCollection } = entities.environmentAlias

  function deleteSpace() {
    return http.delete('').then(() => {
      // do nothing
    }, errorHandler)
  }

  function updateSpace() {
    const raw = this.toPlainObject()
    const data = cloneDeep(raw)
    delete data.sys
    return http
      .put('', data, {
        headers: {
          'X-Contentful-Version': raw.sys.version,
        },
      })
      .then((response) => wrapSpace(http, response.data), errorHandler)
  }

  function getEnvironment(id: string) {
    return http
      .get('environments/' + id)
      .then((response) => wrapEnvironment(http, response.data), errorHandler)
  }

  function getEnvironments() {
    return http
      .get('environments')
      .then((response) => wrapEnvironmentCollection(http, response.data), errorHandler)
  }

  function createEnvironment(data = {}) {
    return http
      .post('environments', data)
      .then((response) => wrapEnvironment(http, response.data), errorHandler)
  }

  function createEnvironmentWithId(
    id: string,
    data: Omit<EnvironmentProps, 'sys'>,
    sourceEnvironmentId?: string
  ) {
    return http
      .put('environments/' + id, data, {
        headers: sourceEnvironmentId
          ? { 'X-Contentful-Source-Environment': sourceEnvironmentId }
          : {},
      })
      .then((response) => wrapEnvironment(http, response.data), errorHandler)
  }

  function getContentType(id: string) {
    raiseDeprecationWarning('getContentType')
    return http
      .get('content_types/' + id)
      .then((response) => wrapContentType(http, response.data), errorHandler)
  }

  function getEditorInterfaceForContentType(contentTypeId: string) {
    raiseDeprecationWarning('getEditorInterfaceForContentType')
    return http
      .get('content_types/' + contentTypeId + '/editor_interface')
      .then((response) => wrapEditorInterface(http, response.data), errorHandler)
  }

  function getContentTypes(query: QueryOptions = {}) {
    raiseDeprecationWarning('getContentTypes')
    return http
      .get('content_types', createRequestConfig({ query: query }))
      .then((response) => wrapContentTypeCollection(http, response.data), errorHandler)
  }

  function createContentType(data: Omit<ContentTypeProps, 'sys'>) {
    raiseDeprecationWarning('createContentType')
    return http
      .post('content_types', data)
      .then((response) => wrapContentType(http, response.data), errorHandler)
  }

  function createContentTypeWithId(id: string, data: Omit<ContentTypeProps, 'sys'>) {
    raiseDeprecationWarning('createContentTypeWithId')
    return http
      .put('content_types/' + id, data)
      .then((response) => wrapContentType(http, response.data), errorHandler)
  }

  function getEntry(id: string, query: QueryOptions = {}) {
    raiseDeprecationWarning('getEntry')
    normalizeSelect(query)
    return http
      .get('entries/' + id, createRequestConfig({ query: query }))
      .then((response) => wrapEntry(http, response.data), errorHandler)
  }

  function getEntries(query: QueryOptions = {}) {
    raiseDeprecationWarning('getEntries')
    normalizeSelect(query)
    return http
      .get('entries', createRequestConfig({ query: query }))
      .then((response) => wrapEntryCollection(http, response.data), errorHandler)
  }

  function createEntry(contentTypeId: string, data: Omit<EntryProp, 'sys'>) {
    raiseDeprecationWarning('createEntry')
    return http
      .post('entries', data, {
        headers: {
          'X-Contentful-Content-Type': contentTypeId,
        },
      })
      .then((response) => wrapEntry(http, response.data), errorHandler)
  }

  function createEntryWithId(contentTypeId: string, id: string, data: Omit<EntryProp, 'sys'>) {
    raiseDeprecationWarning('createEntryWithId')
    return http
      .put('entries/' + id, data, {
        headers: {
          'X-Contentful-Content-Type': contentTypeId,
        },
      })
      .then((response) => wrapEntry(http, response.data), errorHandler)
  }

  function getAsset(id: string, query: QueryOptions = {}) {
    raiseDeprecationWarning('getAsset')
    normalizeSelect(query)
    return http
      .get('assets/' + id, createRequestConfig({ query: query }))
      .then((response) => wrapAsset(http, response.data), errorHandler)
  }

  function getAssets(query: QueryOptions = {}) {
    raiseDeprecationWarning('getAssets')
    normalizeSelect(query)
    return http
      .get('assets', createRequestConfig({ query: query }))
      .then((response) => wrapAssetCollection(http, response.data), errorHandler)
  }

  function createAsset(data: Omit<AssetProps, 'sys'>) {
    return http
      .post('assets', data)
      .then((response) => wrapAsset(http, response.data), errorHandler)
  }

  function createAssetWithId(id: string, data: Omit<AssetProps, 'sys'>) {
    raiseDeprecationWarning('createAssetWithId')
    return http
      .put('assets/' + id, data)
      .then((response) => wrapAsset(http, response.data), errorHandler)
  }

  function createAssetFromFiles(data: Omit<AssetFileProp, 'sys'>) {
    raiseDeprecationWarning('createAssetFromFiles')
    const { file } = data.fields
    return Promise.all(
      Object.keys(file).map((locale) => {
        const { contentType, fileName } = file[locale]
        return createUpload(file[locale]).then((upload) => {
          return {
            [locale]: {
              contentType,
              fileName,
              uploadFrom: {
                sys: {
                  type: 'Link',
                  linkType: 'Upload',
                  id: upload.sys.id,
                },
              },
            },
          }
        })
      })
    )
      .then((uploads) => {
        // @ts-expect-error
        data.fields.file = uploads.reduce((fieldsData, upload) => {
          return {
            ...fieldsData,
            ...upload,
          }
        }, {})
        return createAsset(data)
      })
      .catch(errorHandler)
  }

  function createUpload(data: { file: string | ArrayBuffer | Stream }) {
    raiseDeprecationWarning('createUpload')
    const { file } = data
    if (!file) {
      return Promise.reject(new Error('Unable to locate a file to upload.'))
    }
    return httpUpload
      .post('uploads', file, {
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      })
      .then((uploadResponse) => {
        return wrapUpload(httpUpload, uploadResponse.data)
      })
      .catch(errorHandler)
  }

  function getUpload(id: string) {
    raiseDeprecationWarning('getUpload')
    return httpUpload
      .get('uploads/' + id)
      .then((response) => wrapUpload(http, response.data))
      .catch(errorHandler)
  }

  function getLocale(id: string) {
    raiseDeprecationWarning('getLocale')
    return http
      .get('locales/' + id)
      .then((response) => wrapLocale(http, response.data), errorHandler)
  }

  function getLocales() {
    raiseDeprecationWarning('getLocales')
    return http
      .get('locales')
      .then((response) => wrapLocaleCollection(http, response.data), errorHandler)
  }

  function createLocale(data: Omit<LocaleProps, 'sys'>) {
    raiseDeprecationWarning('createLocale')
    return http
      .post('locales', data)
      .then((response) => wrapLocale(http, response.data), errorHandler)
  }

  function getWebhook(id: string) {
    return http
      .get('webhook_definitions/' + id)
      .then((response) => wrapWebhook(http, response.data), errorHandler)
  }

  function getWebhooks() {
    return http
      .get('webhook_definitions')
      .then((response) => wrapWebhookCollection(http, response.data), errorHandler)
  }

  function createWebhook(data: Omit<WebhookProps, 'sys'>) {
    return http
      .post('webhook_definitions', data)
      .then((response) => wrapWebhook(http, response.data), errorHandler)
  }

  function createWebhookWithId(id: string, data: Omit<WebhookProps, 'sys'>) {
    return http
      .put('webhook_definitions/' + id, data)
      .then((response) => wrapWebhook(http, response.data), errorHandler)
  }

  function getSpaceUser(id: string) {
    return http.get('users/' + id).then((response) => wrapUser(http, response.data), errorHandler)
  }

  function getSpaceUsers(query: QueryOptions = {}) {
    return http
      .get('users/', createRequestConfig({ query: query }))
      .then((response) => wrapUserCollection(http, response.data), errorHandler)
  }

  function getSpaceMember(id: string) {
    return http
      .get('space_members/' + id)
      .then((response) => wrapSpaceMember(http, response.data), errorHandler)
  }

  function getSpaceMembers(query: QueryOptions = {}) {
    return http
      .get('space_members', createRequestConfig({ query: query }))
      .then((response) => wrapSpaceMemberCollection(http, response.data), errorHandler)
  }

  function getSpaceMembership(id: string) {
    spaceMembershipDeprecationWarning()
    return http
      .get('space_memberships/' + id)
      .then((response) => wrapSpaceMembership(http, response.data), errorHandler)
  }

  function getSpaceMemberships(query: QueryOptions = {}) {
    spaceMembershipDeprecationWarning()
    return http
      .get('space_memberships', createRequestConfig({ query: query }))
      .then((response) => wrapSpaceMembershipCollection(http, response.data), errorHandler)
  }

  function createTeamSpaceMembership(teamId: string, data: Omit<TeamSpaceMembershipProps, 'sys'>) {
    return http
      .post('team_space_memberships', data, {
        headers: {
          'x-contentful-team': teamId,
        },
      })
      .then((response) => wrapTeamSpaceMembership(http, response.data), errorHandler)
  }

  function getTeamSpaceMembership(teamSpaceMembershipId: string) {
    return http
      .get('team_space_memberships/' + teamSpaceMembershipId)
      .then((response) => wrapTeamSpaceMembership(http, response.data), errorHandler)
  }

  function getTeamSpaceMemberships(query: QueryOptions = {}) {
    return http
      .get('team_space_memberships', createRequestConfig({ query: query }))
      .then((response) => wrapTeamSpaceMembershipCollection(http, response.data), errorHandler)
  }

  function createSpaceMembership(data: Omit<SpaceMembershipProps, 'sys'>) {
    spaceMembershipDeprecationWarning()
    return http
      .post('space_memberships', data)
      .then((response) => wrapSpaceMembership(http, response.data), errorHandler)
  }

  function createSpaceMembershipWithId(id: string, data: Omit<SpaceMembershipProps, 'sys'>) {
    spaceMembershipDeprecationWarning()
    return http
      .put('space_memberships/' + id, data)
      .then((response) => wrapSpaceMembership(http, response.data), errorHandler)
  }

  function getRole(id: string) {
    return http.get('roles/' + id).then((response) => wrapRole(http, response.data), errorHandler)
  }

  function getRoles() {
    return http
      .get('roles')
      .then((response) => wrapRoleCollection(http, response.data), errorHandler)
  }

  function createRole(data: Omit<RoleProps, 'sys'>) {
    return http.post('roles', data).then((response) => wrapRole(http, response.data), errorHandler)
  }

  function createRoleWithId(id: string, data: Omit<RoleProps, 'sys'>) {
    return http
      .put('roles/' + id, data)
      .then((response) => wrapRole(http, response.data), errorHandler)
  }

  function getApiKey(id: string) {
    return http
      .get('api_keys/' + id)
      .then((response) => wrapApiKey(http, response.data), errorHandler)
  }

  function getApiKeys() {
    return http
      .get('api_keys')
      .then((response) => wrapApiKeyCollection(http, response.data), errorHandler)
  }

  function getPreviewApiKey(id: string) {
    return http
      .get('preview_api_keys/' + id)
      .then((response) => wrapPreviewApiKey(http, response.data), errorHandler)
  }

  function getPreviewApiKeys() {
    return http
      .get('preview_api_keys')
      .then((response) => wrapPreviewApiKeyCollection(http, response.data), errorHandler)
  }

  function createApiKey(data: CreateApiKeyProps) {
    return http
      .post('api_keys', data)
      .then((response) => wrapApiKey(http, response.data), errorHandler)
  }

  function createApiKeyWithId(id: string, data: CreateApiKeyProps) {
    return http
      .put('api_keys/' + id, data)
      .then((response) => wrapApiKey(http, response.data), errorHandler)
  }

  function getUiExtension(id: string) {
    raiseDeprecationWarning('getUiExtension')
    return http
      .get('extensions/' + id)
      .then((response) => wrapUiExtension(http, response.data), errorHandler)
  }

  function getUiExtensions() {
    raiseDeprecationWarning('getUiExtensions')
    return http
      .get('extensions')
      .then((response) => wrapUiExtensionCollection(http, response.data), errorHandler)
  }

  function createUiExtension(data: Omit<UIExtensionProps, 'sys'>) {
    raiseDeprecationWarning('createUiExtension')
    return http
      .post('extensions', data)
      .then((response) => wrapUiExtension(http, response.data), errorHandler)
  }

  function createUiExtensionWithId(id: string, data: Omit<UIExtensionProps, 'sys'>) {
    raiseDeprecationWarning('createUiExtensionWithId')
    return http
      .put('extensions/' + id, data)
      .then((response) => wrapUiExtension(http, response.data), errorHandler)
  }

  function getEntrySnapshots(entryId: string, query: QueryOptions = {}) {
    raiseDeprecationWarning('getEntrySnapshots')
    return http
      .get(`entries/${entryId}/snapshots`, createRequestConfig({ query: query }))
      .then((response) => wrapSnapshotCollection(http, response.data), errorHandler)
  }

  function getContentTypeSnapshots(contentTypeId: string, query: QueryOptions = {}) {
    raiseDeprecationWarning('getContentTypeSnapshots')
    return http
      .get(`content_types/${contentTypeId}/snapshots`, createRequestConfig({ query: query }))
      .then((response) => wrapSnapshotCollection(http, response.data), errorHandler)
  }

  function getEnvironmentAlias(id: string) {
    return http
      .get('environment_aliases/' + id)
      .then((response) => wrapEnvironmentAlias(http, response.data), errorHandler)
  }

  function getEnvironmentAliases() {
    return http
      .get('environment_aliases')
      .then((response) => wrapEnvironmentAliasCollection(http, response.data), errorHandler)
  }

  /*
   * @private
   * sdk relies heavily on sys metadata
   * so we cannot omit the sys property on sdk level
   *
   */
  function normalizeSelect(query: QueryOptions) {
    if (query.select && !/sys/i.test(query.select)) {
      query.select += ',sys'
    }
  }

  return {
    delete: deleteSpace,
    update: updateSpace,
    getEnvironment,
    getEnvironments,
    createEnvironment,
    createEnvironmentWithId,
    getContentType,
    getContentTypes,
    createContentType,
    createContentTypeWithId,
    getEditorInterfaceForContentType,
    getEntry,
    getEntries,
    createEntry,
    createEntryWithId,
    getAsset,
    getAssets,
    createAsset,
    createAssetWithId,
    createAssetFromFiles,
    getUpload,
    createUpload,
    getLocale,
    getLocales,
    createLocale,
    getWebhook,
    getWebhooks,
    createWebhook,
    createWebhookWithId,
    getRole,
    getRoles,
    createRole,
    createRoleWithId,
    getSpaceUser,
    getSpaceUsers,
    getSpaceMember,
    getSpaceMembers,
    getSpaceMembership,
    getSpaceMemberships,
    createSpaceMembership,
    createSpaceMembershipWithId,
    getTeamSpaceMembership,
    getTeamSpaceMemberships,
    createTeamSpaceMembership,
    getApiKey,
    getApiKeys,
    getPreviewApiKeys,
    getPreviewApiKey,
    createApiKey,
    createApiKeyWithId,
    getUiExtension,
    getUiExtensions,
    createUiExtension,
    createUiExtensionWithId,
    getEntrySnapshots,
    getContentTypeSnapshots,
    getEnvironmentAlias,
    getEnvironmentAliases,
  }
}
