import copy from 'fast-copy'
import { toPlainObject } from 'contentful-sdk-core'
import { Except } from 'type-fest'
import { BasicMetaSysProps, DefaultElements, MakeRequest, SysLink } from '../common-types'

type AppSigningSecretSys = Except<BasicMetaSysProps, 'version' | 'id'> & {
  appDefinition: SysLink
  organization: SysLink
}

export type AppSigningSecretProps = {
  /** A 64 character matching the regular expression /^[0-9a-zA-Z+/=_-]+$/  */
  value: string
}

export type CreateAppSigningSecretProps = {
  /**
   * System metadata
   */
  sys: AppSigningSecretSys
  /** The last four characters of the signing secret */
  redactedValue: string
}

export interface AppSigningSecret
  extends AppSigningSecretProps,
    DefaultElements<AppSigningSecretProps> {}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw AppSigningSecret data
 * @return Wrapped AppSigningSecret data
 */
export function wrapAppSigningSecret(
  _makeRequest: MakeRequest,
  data: AppSigningSecretProps
): AppSigningSecret {
  const signedRequest = toPlainObject(copy(data))
  return signedRequest
}
