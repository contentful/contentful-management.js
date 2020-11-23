import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { AxiosInstance } from 'axios'
import { DefaultElements, MetaSysProps, SysLink } from '../common-types'
import * as endpoints from '../plain/endpoints'

export type UploadProps = {
  /**
   * System metadata
   */
  sys: MetaSysProps & { space: SysLink; environment: SysLink }
}

export interface Upload extends UploadProps, DefaultElements<UploadProps> {
  /**
   * Deletes this object on the server.
   * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment_id>'))
   * .then((environment) => environment.getUpload('<upload_id>'))
   * .then((upload) => upload.delete())
   * .then((upload) => console.log(`upload ${upload.sys.id} updated.`))
   * .catch(console.error)
   */
  delete(): Promise<void>
}

function createUploadApi(http: AxiosInstance) {
  return {
    delete: function del() {
      const raw = this.toPlainObject() as UploadProps
      return endpoints.upload.del(http, {
        spaceId: raw.sys.space.sys.id,
        environmentId: raw.sys.environment.sys.id,
        uploadId: raw.sys.id,
      })
    },
  }
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw upload data
 * @return {Upload} Wrapped upload data
 */
export function wrapUpload(http: AxiosInstance, data: UploadProps) {
  const upload = toPlainObject(cloneDeep(data))
  const uploadWithMethods = enhanceWithMethods(upload, createUploadApi(http))
  return freezeSys(uploadWithMethods)
}
