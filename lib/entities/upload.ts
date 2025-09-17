import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods.js'
import type { DefaultElements, Link, MakeRequest, MetaSysProps } from '../common-types.js'

export type UploadProps = {
  /**
   * System metadata
   */
  sys: MetaSysProps & {
    space: Link<'Space'>
    environment?: Link<'Environment'>
  }
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

/**
 * @private
 */
function createUploadApi(makeRequest: MakeRequest) {
  return {
    delete: async function del() {
      const raw = this.toPlainObject() as UploadProps
      await makeRequest({
        entityType: 'Upload',
        action: 'delete',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          uploadId: raw.sys.id,
        },
      })
    },
  }
}

/**
 * @private
 * @param {function} makeRequest - function to make requests via an adapter
 * @param {object} data - Raw upload data
 * @return {Upload} Wrapped upload data
 */
export function wrapUpload(makeRequest: MakeRequest, data: UploadProps) {
  const upload = toPlainObject(copy(data))
  const uploadWithMethods = enhanceWithMethods(upload, createUploadApi(makeRequest))
  return freezeSys(uploadWithMethods)
}
