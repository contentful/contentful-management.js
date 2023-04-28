import copy from 'fast-copy'
import { toPlainObject } from 'contentful-sdk-core'
import { Except } from 'type-fest'
import {
  BasicMetaSysProps,
  DefaultElements,
  GetAppActionCallDetailsParams,
  GetAppActionCallParams,
  MakeRequest,
  SysLink,
} from '../common-types'
import { WebhookCallDetailsProps } from './webhook'
import enhanceWithMethods from '../enhance-with-methods'

type AppActionCallSys = Except<BasicMetaSysProps, 'version'> & {
  appDefinition: SysLink
  space: SysLink
  environment: SysLink
  action: SysLink
}

export type AppActionCallProps = {
  /**
   * System metadata
   */
  sys: AppActionCallSys
}

export type CreateAppActionCallProps = {
  /** The body for the call */
  parameters: { [key: string]: any }
}

type AppActionCallApi = {
  createWithResponse(): Promise<AppActionCallResponse>
  getCallDetails(): Promise<AppActionCallResponse>
}

export type AppActionCallResponse = WebhookCallDetailsProps

export interface AppActionCallResponseData
  extends AppActionCallResponse,
    DefaultElements<AppActionCallResponse>,
    AppActionCallApi {}

export interface AppActionCall extends AppActionCallProps, DefaultElements<AppActionCallProps> {}

/**
 * @private
 */
export default function createAppActionCallApi(makeRequest: MakeRequest): AppActionCallApi {
  return {
    createWithResponse: function () {
      const payload: CreateAppActionCallProps = {
        parameters: {
          recipient: 'Alice <alice@my-company.com>',
          message_body: 'Hello from Bob!',
        },
      }

      return makeRequest({
        entityType: 'AppActionCall',
        action: 'createWithResponse',
        params: {
          spaceId: 'space-id',
          environmentId: 'environment-id',
          appDefinitionId: 'app-definiton-id',
          appActionId: 'app-action-id',
        },
        payload: payload,
      }).then((data) => wrapAppActionCallResponse(makeRequest, data))
    },

    getCallDetails: function getCallDetails() {
      const getParams = (raw: GetAppActionCallDetailsParams): GetAppActionCallDetailsParams => ({
        spaceId: raw.spaceId,
        environmentId: raw.environmentId,
        callId: raw.callId,
        appActionId: raw.appActionId,
      })

      const raw = this.toPlainObject() as GetAppActionCallDetailsParams

      return makeRequest({
        entityType: 'AppActionCall',
        action: 'getCallDetails',
        params: getParams(raw),
      }).then((data) => wrapAppActionCallResponse(makeRequest, data))
    },
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw AppActionCall data
 * @return Wrapped AppActionCall data
 */
export function wrapAppActionCall(
  _makeRequest: MakeRequest,
  data: AppActionCallProps
): AppActionCall {
  const signedRequest = toPlainObject(copy(data))
  return signedRequest
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw AppActionCall data
 * @return Wrapped AppActionCall data
 */
export function wrapAppActionCallResponse(
  makeRequest: MakeRequest,
  data: AppActionCallResponse
): AppActionCallResponseData {
  const appActionCallResponse = toPlainObject(copy(data))
  const appActionCallResponseWithMethods = enhanceWithMethods(
    appActionCallResponse,
    createAppActionCallApi(makeRequest)
  )
  return appActionCallResponseWithMethods
}

export interface FetchAppActionResponse {
  retryInterval?: number
  retries?: number
  checkCount?: number
}
