import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import type { BasicMetaSysProps, DefaultElements, MakeRequest } from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'
import copy from 'fast-copy'
import { wrapCursorPaginatedCollection } from '../common-utils'

type OAuthApplicationSysProps = BasicMetaSysProps & {
  lastUsedAt: string | null
}

export enum ScopeValues {
  Read = 'content_management_read',
  Manage = 'content_management_manage',
}

export type OAuthApplicationProps = {
  name: string
  description: string
  clientId: string
  clientSecret: string
  redirectUri: string
  scopes: ScopeValues[]
  confidential: boolean
  sys: OAuthApplicationSysProps
}

export type CreateOAuthApplicationProps = {
  name: string
  description: string
  redirectUri: string
  scopes: ScopeValues[]
  confidential: boolean
}

export type UpdateOAuthApplicationProps = {
  name?: string
  description?: string
  redirectUri?: string
  scopes?: ScopeValues[]
  confidential?: boolean
}

export interface OAuthApplication
  extends OAuthApplicationProps,
    DefaultElements<OAuthApplicationProps> {
  /**
   * Deletes an OAuth application
   * @returns Promise for the deleted OAuth application
   */
  delete(): Promise<void>
  /**
   * Updates an OAuth application
   * @returns Promise for the updated OAuth application
   */
  update(): Promise<OAuthApplicationProps>
}

/**
 * @private
 */
function createOAuthApplicationApi(makeRequest: MakeRequest, userId: string) {
  const getParams = (data: OAuthApplicationProps) => ({
    userId,
    oauthApplicationId: data.sys.id,
  })

  return {
    /**
     * Updates an OAuth application
     * @returns Promise for the updated OAuth application
     */
    async update(): Promise<OAuthApplicationProps> {
      const raw = this.toPlainObject() as OAuthApplicationProps
      return makeRequest({
        entityType: 'OAuthApplication',
        action: 'update',
        params: getParams(raw),
        payload: raw,
      })
    },

    /**
     * Deletes an OAuth application
     * @returns Promise for the deleted OAuth application
     */
    async delete(): Promise<void> {
      const raw = this.toPlainObject() as OAuthApplicationProps
      return makeRequest({
        entityType: 'OAuthApplication',
        action: 'delete',
        params: getParams(raw),
      })
    },
  }
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw OAuth application data
 * @returns Wrapped OAuth application data
 */
export function wrapOAuthApplication(
  makeRequest: MakeRequest,
  data: OAuthApplicationProps,
  userId: string,
): OAuthApplication {
  const oauthApplication = toPlainObject(copy(data))
  const oauthApplicationWithMethods = enhanceWithMethods(
    oauthApplication,
    createOAuthApplicationApi(makeRequest, userId),
  )
  return freezeSys(oauthApplicationWithMethods)
}

/**
 * @private
 */
export const wrapOAuthApplicationCollection = wrapCursorPaginatedCollection(wrapOAuthApplication)
