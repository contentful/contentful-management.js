import { createRequestConfig } from 'contentful-sdk-core'
import type { BasicCursorPaginationOptions, MakeRequest } from './common-types'
import type { EnvironmentTemplateProps } from './entities/environment-template'
import type {
  CreateEnvironmentTemplateInstallationProps,
  ValidateEnvironmentTemplateInstallationProps,
} from './entities/environment-template-installation'

/**
 * Methods available on an {@link EnvironmentTemplate} object for managing template versions and installations.
 *
 * @deprecated Use the plain client (`createClient()`) instead.
 */
export type ContentfulEnvironmentTemplateAPI = ReturnType<typeof createEnvironmentTemplateApi>

import {
  wrapEnvironmentTemplate,
  wrapEnvironmentTemplateCollection,
} from './entities/environment-template'
import { wrapEnvironmentTemplateInstallationCollection } from './entities/environment-template-installation'

/**
 * @deprecated Use the plain client (`createClient()`) instead.
 */
export function createEnvironmentTemplateApi(makeRequest: MakeRequest, organizationId: string) {
  return {
    /**
     * Updates a environment template
     * @returns Promise for new version of the template
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getEnvironmentTemplate('<organization_id>', '<environment_template_id>')
     * .then((environmentTemplate) => {
     *   environmentTemplate.name = 'New name'
     *   return environmentTemplate.update()
     * })
     * .then((environmentTemplate) =>
     *   console.log(`Environment template ${environmentTemplate.sys.id} renamed.`)
     * ).catch(console.error)
     * ```
     */
    update: function updateEnvironmentTemplate() {
      const raw = this.toPlainObject() as EnvironmentTemplateProps
      return makeRequest({
        entityType: 'EnvironmentTemplate',
        action: 'update',
        params: { organizationId, environmentTemplateId: raw.sys.id },
        payload: raw,
      }).then((data) => wrapEnvironmentTemplate(makeRequest, data, organizationId))
    },
    /**
     * Updates environment template version data
     * @returns Promise for an updated EnvironmentTemplate
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getEnvironmentTemplate('<organization_id>', '<environment_template_id>')
     * .then((environmentTemplate) => {
     *   return environmentTemplate.updateVersion({
     *     versionName: 'New Name',
     *     versionDescription: 'New Description',
     *   })
     * })
     * .then((environmentTemplate) =>
     *   console.log(`Environment template version ${environmentTemplate.sys.id} renamed.`)
     * ).catch(console.error)
     * ```
     */
    updateVersion: function updateEnvironmentTemplateVersion({
      versionName,
      versionDescription,
    }: {
      versionName: string
      versionDescription: string
    }) {
      const raw = this.toPlainObject() as EnvironmentTemplateProps
      return makeRequest({
        entityType: 'EnvironmentTemplate',
        action: 'versionUpdate',
        params: { organizationId, environmentTemplateId: raw.sys.id, version: raw.sys.version },
        payload: { versionName, versionDescription },
      }).then((data) => wrapEnvironmentTemplate(makeRequest, data, organizationId))
    },
    /**
     * Deletes the environment template
     * @returns Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getEnvironmentTemplate('<organization_id>', '<environment_template_id>')
     *   .then((environmentTemplate) => environmentTemplate.delete())
     *   .then(() => console.log('Environment template deleted.'))
     *   .catch(console.error)
     * ```
     */
    delete: function deleteEnvironmentTemplate() {
      const raw = this.toPlainObject() as EnvironmentTemplateProps
      return makeRequest({
        entityType: 'EnvironmentTemplate',
        action: 'delete',
        params: { organizationId, environmentTemplateId: raw.sys.id },
      })
    },
    /**
     * Gets a collection of all versions for the environment template
     * @returns Promise for a EnvironmentTemplate
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getEnvironmentTemplate('<organization_id>', '<environment_template_id>')
     * .then((environmentTemplate) => environmentTemplate.getVersions())
     * .then((environmentTemplateVersions) => console.log(environmentTemplateVersions.items))
     * .catch(console.error)
     * ```
     */
    getVersions: function getEnvironmentTemplateVersions() {
      const raw = this.toPlainObject() as EnvironmentTemplateProps
      return makeRequest({
        entityType: 'EnvironmentTemplate',
        action: 'versions',
        params: {
          organizationId,
          environmentTemplateId: raw.sys.id,
        },
      }).then((data) => wrapEnvironmentTemplateCollection(makeRequest, data, organizationId))
    },
    /**
     * Gets a collection of all installations for the environment template
     * @returns Promise for a collection of EnvironmentTemplateInstallations
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getEnvironmentTemplate('<organization_id>', '<environment_template_id>')
     * .then((environmentTemplate) => environmentTemplate.getInstallations())
     * .then((environmentTemplateInstallations) =>
     *   console.log(environmentTemplateInstallations.items)
     * )
     * .catch(console.error)
     * ```
     */
    getInstallations: function getEnvironmentTemplateInstallations({
      spaceId,
      environmentId,
      latestOnly,
      ...query
    }: {
      spaceId?: string
      environmentId?: string
      latestOnly?: boolean
    } & BasicCursorPaginationOptions = {}) {
      const raw = this.toPlainObject() as EnvironmentTemplateProps
      return makeRequest({
        entityType: 'EnvironmentTemplateInstallation',
        action: 'getMany',
        params: {
          organizationId,
          environmentTemplateId: raw.sys.id,
          query: { ...createRequestConfig({ query }).params },
          spaceId,
          environmentId,
          latestOnly,
        },
      }).then((data) => wrapEnvironmentTemplateInstallationCollection(makeRequest, data))
    },
    /**
     * Validates an environment template against a given space and environment
     * @returns Promise for a EnvironmentTemplateValidation
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getEnvironmentTemplate('<organization_id>', '<environment_template_id>')
     * .then((environmentTemplate) => environmentTemplate.validate({
     *   spaceId: '<space_id>',
     *   environmentId: '<environment_id>',
     *   version: <version>,
     * }))
     * .then((validationResult) => console.log(validationResult))
     * .catch(console.error)
     * ```
     */
    validate: function validateEnvironmentTemplate({
      spaceId,
      environmentId,
      version,
      takeover,
      changeSet,
    }: {
      spaceId: string
      environmentId: string
      version?: number
    } & ValidateEnvironmentTemplateInstallationProps) {
      const raw: EnvironmentTemplateProps = this.toPlainObject()
      return makeRequest({
        entityType: 'EnvironmentTemplate',
        action: 'validate',
        params: {
          spaceId,
          version,
          environmentId,
          environmentTemplateId: raw.sys.id,
        },
        payload: {
          ...(takeover && { takeover }),
          ...(changeSet && { changeSet }),
        },
      })
    },
    /**
     * Installs a template against a given space and environment
     * @returns Promise for a EnvironmentTemplateInstallation
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getEnvironmentTemplate('<organization_id>', '<environment_template_id>')
     * .then((environmentTemplate) => environmentTemplate.validate({
     *   spaceId: '<space_id>',
     *   environmentId: '<environment_id>',
     *   installation: {
     *     version: <version>,
     *   }
     * }))
     * .then((installation) => console.log(installation))
     * .catch(console.error)
     * ```
     */
    install: function installEnvironmentTemplate({
      spaceId,
      environmentId,
      installation,
    }: {
      spaceId: string
      environmentId: string
      installation: CreateEnvironmentTemplateInstallationProps
    }) {
      const raw: EnvironmentTemplateProps = this.toPlainObject()
      return makeRequest({
        entityType: 'EnvironmentTemplate',
        action: 'install',
        params: {
          spaceId,
          environmentId,
          environmentTemplateId: raw.sys.id,
        },
        payload: installation,
      })
    },
    /**
     * Disconnects the template from a given environment
     * @returns Promise for the disconnection with no data
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getEnvironmentTemplate('<organization_id>', '<environment_template_id>')
     * .then(environmentTemplate) => environmentTemplate.disconnected())
     * .then(() => console.log('Template disconnected'))
     * .catch(console.error)
     * ```
     */
    disconnect: function disconnectEnvironmentTemplate({
      spaceId,
      environmentId,
    }: {
      spaceId: string
      environmentId: string
    }) {
      const raw: EnvironmentTemplateProps = this.toPlainObject()
      return makeRequest({
        entityType: 'EnvironmentTemplate',
        action: 'disconnect',
        params: {
          spaceId,
          environmentId,
          environmentTemplateId: raw.sys.id,
        },
      })
    },
  }
}
