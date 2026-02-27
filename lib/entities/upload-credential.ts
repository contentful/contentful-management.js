/**
 * @module
 * @category Entities
 */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, MakeRequest, MetaSysProps, SysLink } from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'

/** Properties of an upload credential for authenticated file uploads */
export type UploadCredentialProps = {
  /**
   * System metadata
   */
  sys: MetaSysProps & { space: SysLink; environment?: SysLink }
}

/** An upload credential with a method to create new credentials */
export interface UploadCredential
  extends UploadCredentialProps,
    DefaultElements<UploadCredentialProps> {
  /**
   * creates the upload credentials.
   * @returns upload credentials for file uploads
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * try {
   *   const space = await client.getSpace('<space_id>')
   *   const environment = await space.getEnvironment('<environment_id>')
   *
   *   const upload = await client.uploadCredential.create({
   *     spaceId: space.sys.id,
   *     environmentId: environment.sys.id
   *   })
   * } catch (error) {
   *  console.error(error)
   * }
   *
   */
  create(): Promise<UploadCredentialProps>
}

/**
 * @internal
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
 * @internal
 * @param {function} makeRequest - function to make requests via an adapter
 * @param {object} data - Raw upload credential data
 * @returns {UploadCredential} Wrapped upload credential data
 */
export function wrapUploadCredential(
  makeRequest: MakeRequest,
  data: UploadCredentialProps,
): UploadCredential {
  const uploadCredential = toPlainObject(copy(data))
  const uploadCredentialWithMethods = enhanceWithMethods(
    uploadCredential,
    createUploadCredentialsApi(makeRequest),
  )
  return freezeSys(uploadCredentialWithMethods)
}
