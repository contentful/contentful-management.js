import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, MakeRequest, MetaSysProps, SysLink } from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'

export type UploadCredentialProps = {
  /**
   * System metadata
   */
  sys: MetaSysProps & { space: SysLink; environment?: SysLink }
}

export interface UploadCredential
  extends UploadCredentialProps,
    DefaultElements<UploadCredentialProps> {
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
  create(): Promise<UploadCredentialProps>
}

/**
 * @private
 */
function createUploadCredentialsApi(makeRequest: MakeRequest) {
  return {
    create: async function create() {
      const raw = this.toPlainObject() as UploadCredentialProps
      return makeRequest({
        entityType: 'UploadCredential',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
        },
      })
    },
  }
}

/**
 * @private
 * @param {function} makeRequest - function to make requests via an adapter
 * @param {object} data - Raw upload credential data
 * @return {UploadCredential} Wrapped upload credential data
 */
export function wrapUploadCredential(
  makeRequest: MakeRequest,
  data: UploadCredentialProps
): UploadCredential {
  const uploadCredential = toPlainObject(copy(data))
  const uploadCredentialWithMethods = enhanceWithMethods(
    uploadCredential,
    createUploadCredentialsApi(makeRequest)
  )
  return freezeSys(uploadCredentialWithMethods)
}
