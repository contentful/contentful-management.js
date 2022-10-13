import { createRequestConfig } from 'contentful-sdk-core'
import { BasicCursorPaginationOptions, MakeRequest } from './common-types'
import entities from './entities'
import { EnvironmentTemplateProps } from './entities/environment-template'
import {
  CreateEnvironmentTemplateInstallationProps,
  ValidateEnvironmentTemplateInstallationProps,
} from './entities/environment-template-installation'

export type ContentfulEnvironmentTemplateApi = ReturnType<typeof createEnvironmentTemplateApi>

export function createEnvironmentTemplateApi(makeRequest: MakeRequest, organizationId: string) {
  const { wrapEnvironmentTemplate, wrapEnvironmentTemplateCollection } =
    entities.environmentTemplate

  const { wrapEnvironmentTemplateInstallationCollection } = entities.environmentTemplateInstallation

  return {
    /**
     * Updates a environment template
     * @return Promise for new version of the template
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
     * @param version.versionName - Name of the environment template version
     * @param version.versionDescription - Description of the environment template version
     * @return Promise for an updated EnvironmentTemplate
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
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
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
     * @return Promise for a EnvironmentTemplate
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
     * @param [installationParams.spaceId] - Space ID to filter installations by space and environment
     * @param [installationParams.environmentId] - Environment ID to filter installations by space and environment
     * @return Promise for a collection of EnvironmentTemplateInstallations
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
      ...query
    }: {
      spaceId?: string
      environmentId?: string
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
        },
      }).then((data) => wrapEnvironmentTemplateInstallationCollection(makeRequest, data))
    },
    /**
     * Validates an environment template against a given space and environment
     * @param params.spaceId - Space ID where the template should be installed into
     * @param params.environmentId - Environment ID where the template should be installed into
     * @param [params.version] - Version of the template
     * @param [params.installation.takeover] - Already existing Content types to takeover in the target environment
     * @param [params.changeSet] - Change set which should be applied
     * @return Promise for a EnvironmentTemplateValidation
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
     * @param params.spaceId - Space ID where the template should be installed into
     * @param params.environmentId - Environment ID where the template should be installed into
     * @param params.installation.version- Template version which should be installed
     * @param [params.installation.takeover] - Already existing Content types tp takeover in the target environment
     * @param [params.changeSet] - Change set which should be applied
     * @return Promise for a EnvironmentTemplateInstallation
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
     * @param params.spaceId - Space ID where the template should be installed into
     * @param params.environmentId - Environment ID where the template should be installed into
     * @return Promise for the disconnection with no data
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
