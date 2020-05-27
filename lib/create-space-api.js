/**
 * Contentful Space API. Contains methods to access any operations at a space
 * level, such as creating and reading entities contained in a space.
 * @namespace ContentfulSpaceAPI
 */

import { createRequestConfig } from 'contentful-sdk-core'
import errorHandler from './error-handler'
import entities from './entities'
import * as endpoints from './plain'

function raiseDeprecationWarning(method) {
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
export default function createSpaceApi({ spaceId, http, httpUpload }) {
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
    return endpoints.space.delete(http, { spaceId })
  }

  function updateSpace() {
    return endpoints.space
      .update(http, { spaceId }, this.toPlainObject())
      .then((data) => wrapSpace(http, data))
  }

  function getEnvironment(environmentId) {
    return endpoints.environment
      .get(http, {
        spaceId,
        environmentId,
      })
      .then((data) => wrapEnvironment(data))
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

  function createEnvironmentWithId(id, data = {}, sourceEnvironmentId) {
    return http
      .put('environments/' + id, data, {
        headers: sourceEnvironmentId
          ? { 'X-Contentful-Source-Environment': sourceEnvironmentId }
          : {},
      })
      .then((response) => wrapEnvironment(http, response.data), errorHandler)
  }

  function getContentType(id) {
    raiseDeprecationWarning('getContentType')
    return http
      .get('content_types/' + id)
      .then((response) => wrapContentType(http, response.data), errorHandler)
  }

  function getEditorInterfaceForContentType(contentTypeId) {
    raiseDeprecationWarning('getEditorInterfaceForContentType')
    return http
      .get('content_types/' + contentTypeId + '/editor_interface')
      .then((response) => wrapEditorInterface(http, response.data), errorHandler)
  }

  function getContentTypes(query = {}) {
    raiseDeprecationWarning('getContentTypes')
    return http
      .get('content_types', createRequestConfig({ query: query }))
      .then((response) => wrapContentTypeCollection(http, response.data), errorHandler)
  }

  function createContentType(data) {
    raiseDeprecationWarning('createContentType')
    return http
      .post('content_types', data)
      .then((response) => wrapContentType(http, response.data), errorHandler)
  }

  function createContentTypeWithId(id, data) {
    raiseDeprecationWarning('createContentTypeWithId')
    return http
      .put('content_types/' + id, data)
      .then((response) => wrapContentType(http, response.data), errorHandler)
  }

  function getEntry(id, query = {}) {
    raiseDeprecationWarning('getEntry')
    normalizeSelect(query)
    return http
      .get('entries/' + id, createRequestConfig({ query: query }))
      .then((response) => wrapEntry(http, response.data), errorHandler)
  }

  function getEntries(query = {}) {
    raiseDeprecationWarning('getEntries')
    normalizeSelect(query)
    return http
      .get('entries', createRequestConfig({ query: query }))
      .then((response) => wrapEntryCollection(http, response.data), errorHandler)
  }

  function createEntry(contentTypeId, data) {
    raiseDeprecationWarning('createEntry')
    return http
      .post('entries', data, {
        headers: {
          'X-Contentful-Content-Type': contentTypeId,
        },
      })
      .then((response) => wrapEntry(http, response.data), errorHandler)
  }

  function createEntryWithId(contentTypeId, id, data) {
    raiseDeprecationWarning('createEntryWithId')
    return http
      .put('entries/' + id, data, {
        headers: {
          'X-Contentful-Content-Type': contentTypeId,
        },
      })
      .then((response) => wrapEntry(http, response.data), errorHandler)
  }

  function getAsset(id, query = {}) {
    raiseDeprecationWarning('getAsset')
    normalizeSelect(query)
    return http
      .get('assets/' + id, createRequestConfig({ query: query }))
      .then((response) => wrapAsset(http, response.data), errorHandler)
  }

  function getAssets(query = {}) {
    raiseDeprecationWarning('getAssets')
    normalizeSelect(query)
    return http
      .get('assets', createRequestConfig({ query: query }))
      .then((response) => wrapAssetCollection(http, response.data), errorHandler)
  }

  function createAsset(data) {
    return http
      .post('assets', data)
      .then((response) => wrapAsset(http, response.data), errorHandler)
  }

  function createAssetWithId(id, data) {
    raiseDeprecationWarning('createAssetWithId')
    return http
      .put('assets/' + id, data)
      .then((response) => wrapAsset(http, response.data), errorHandler)
  }

  function createAssetFromFiles(data) {
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

  function createUpload(data) {
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

  function getUpload(id) {
    raiseDeprecationWarning('getUpload')
    return httpUpload
      .get('uploads/' + id)
      .then((response) => wrapUpload(http, response.data))
      .catch(errorHandler)
  }

  function getLocale(id) {
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

  function createLocale(data) {
    raiseDeprecationWarning('createLocale')
    return http
      .post('locales', data)
      .then((response) => wrapLocale(http, response.data), errorHandler)
  }

  function getWebhook(id) {
    return http
      .get('webhook_definitions/' + id)
      .then((response) => wrapWebhook(http, response.data), errorHandler)
  }

  function getWebhooks() {
    return http
      .get('webhook_definitions')
      .then((response) => wrapWebhookCollection(http, response.data), errorHandler)
  }

  function createWebhook(data) {
    return http
      .post('webhook_definitions', data)
      .then((response) => wrapWebhook(http, response.data), errorHandler)
  }

  function createWebhookWithId(id, data) {
    return http
      .put('webhook_definitions/' + id, data)
      .then((response) => wrapWebhook(http, response.data), errorHandler)
  }

  function getSpaceUser(id) {
    return http.get('users/' + id).then((response) => wrapUser(http, response.data), errorHandler)
  }

  function getSpaceUsers(query = {}) {
    return http
      .get('users/', createRequestConfig({ query: query }))
      .then((response) => wrapUserCollection(http, response.data), errorHandler)
  }

  function getSpaceMember(id) {
    return http
      .get('space_members/' + id)
      .then((response) => wrapSpaceMember(http, response.data), errorHandler)
  }

  function getSpaceMembers(query = {}) {
    return http
      .get('space_members', createRequestConfig({ query: query }))
      .then((response) => wrapSpaceMemberCollection(http, response.data), errorHandler)
  }

  function getSpaceMembership(id) {
    spaceMembershipDeprecationWarning()
    return http
      .get('space_memberships/' + id)
      .then((response) => wrapSpaceMembership(http, response.data), errorHandler)
  }

  function getSpaceMemberships(query = {}) {
    spaceMembershipDeprecationWarning()
    return http
      .get('space_memberships', createRequestConfig({ query: query }))
      .then((response) => wrapSpaceMembershipCollection(http, response.data), errorHandler)
  }

  function createTeamSpaceMembership(teamId, data = {}) {
    return http
      .post('team_space_memberships', data, {
        headers: {
          'x-contentful-team': teamId,
        },
      })
      .then((response) => wrapTeamSpaceMembership(http, response.data), errorHandler)
  }

  function getTeamSpaceMembership(teamSpaceMembershipId) {
    return http
      .get('team_space_memberships/' + teamSpaceMembershipId)
      .then((response) => wrapTeamSpaceMembership(http, response.data), errorHandler)
  }

  function getTeamSpaceMemberships(query = {}) {
    return http
      .get('team_space_memberships', { query })
      .then((response) => wrapTeamSpaceMembershipCollection(http, response.data), errorHandler)
  }

  function createSpaceMembership(data) {
    spaceMembershipDeprecationWarning()
    return http
      .post('space_memberships', data)
      .then((response) => wrapSpaceMembership(http, response.data), errorHandler)
  }

  function createSpaceMembershipWithId(id, data) {
    spaceMembershipDeprecationWarning()
    return http
      .put('space_memberships/' + id, data)
      .then((response) => wrapSpaceMembership(http, response.data), errorHandler)
  }

  function getRole(id) {
    return http.get('roles/' + id).then((response) => wrapRole(http, response.data), errorHandler)
  }

  function getRoles() {
    return http
      .get('roles')
      .then((response) => wrapRoleCollection(http, response.data), errorHandler)
  }

  function createRole(data) {
    return http.post('roles', data).then((response) => wrapRole(http, response.data), errorHandler)
  }

  function createRoleWithId(id, data) {
    return http
      .put('roles/' + id, data)
      .then((response) => wrapRole(http, response.data), errorHandler)
  }

  function getApiKey(id) {
    return http
      .get('api_keys/' + id)
      .then((response) => wrapApiKey(http, response.data), errorHandler)
  }

  function getApiKeys() {
    return http
      .get('api_keys')
      .then((response) => wrapApiKeyCollection(http, response.data), errorHandler)
  }

  function getPreviewApiKey(id) {
    return http
      .get('preview_api_keys/' + id)
      .then((response) => wrapPreviewApiKey(http, response.data), errorHandler)
  }

  function getPreviewApiKeys() {
    return http
      .get('preview_api_keys')
      .then((response) => wrapPreviewApiKeyCollection(http, response.data), errorHandler)
  }

  function createApiKey(data) {
    return http
      .post('api_keys', data)
      .then((response) => wrapApiKey(http, response.data), errorHandler)
  }

  function createApiKeyWithId(id, data) {
    return http
      .put('api_keys/' + id, data)
      .then((response) => wrapApiKey(http, response.data), errorHandler)
  }

  function getUiExtension(id) {
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

  function createUiExtension(data) {
    raiseDeprecationWarning('createUiExtension')
    return http
      .post('extensions', data)
      .then((response) => wrapUiExtension(http, response.data), errorHandler)
  }

  function createUiExtensionWithId(id, data) {
    raiseDeprecationWarning('createUiExtensionWithId')
    return http
      .put('extensions/' + id, data)
      .then((response) => wrapUiExtension(http, response.data), errorHandler)
  }

  function getEntrySnapshots(entryId, query = {}) {
    raiseDeprecationWarning('getEntrySnapshots')
    return http
      .get(`entries/${entryId}/snapshots`, createRequestConfig({ query: query }))
      .then((response) => wrapSnapshotCollection(http, response.data), errorHandler)
  }

  function getContentTypeSnapshots(contentTypeId, query = {}) {
    raiseDeprecationWarning('getContentTypeSnapshots')
    return http
      .get(`content_types/${contentTypeId}/snapshots`, createRequestConfig({ query: query }))
      .then((response) => wrapSnapshotCollection(http, response.data), errorHandler)
  }

  function getEnvironmentAlias(id) {
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
  function normalizeSelect(query) {
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
