import copy from 'fast-copy'
import { toPlainObject } from 'contentful-sdk-core'
import type { Except } from 'type-fest'
import type {
  BasicMetaSysProps,
  CreateWithResponseParams,
  DefaultElements,
  Link,
  MakeRequest,
} from '../common-types.js'
import type { WebhookCallDetailsProps } from './webhook.js'
import enhanceWithMethods from '../enhance-with-methods.js'

type AppActionCallSys = Except<BasicMetaSysProps<'AppActionCall', 'User'>, 'version'> & {
  appDefinition: Link<'AppDefinition'>
  space: Link<'Space'>
  environment: Link<'Environment'>
  action: Link<'AppAction'>
}

type RetryOptions = Pick<CreateWithResponseParams, 'retries' | 'retryInterval'>

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
export default function createAppActionCallApi(
  makeRequest: MakeRequest,
  retryOptions?: RetryOptions
): AppActionCallApi {
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
          ...retryOptions,
        },
        payload: payload,
      }).then((data) => wrapAppActionCallResponse(makeRequest, data))
    },

    getCallDetails: function getCallDetails() {
      return makeRequest({
        entityType: 'AppActionCall',
        action: 'getCallDetails',
        params: {
          spaceId: 'space-id',
          environmentId: 'environment-id',
          callId: 'call-id',
          appActionId: 'app-action-id',
        },
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
  makeRequest: MakeRequest,
  data: AppActionCallProps
): AppActionCall {
  const signedRequest = toPlainObject(copy(data))
  const signedRequestWithMethods = enhanceWithMethods(
    signedRequest,
    createAppActionCallApi(makeRequest)
  )
  return signedRequestWithMethods
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw AppActionCall data
 * @return Wrapped AppActionCall data
 */
export function wrapAppActionCallResponse(
  makeRequest: MakeRequest,
  data: AppActionCallResponse,
  retryOptions?: RetryOptions
): AppActionCallResponseData {
  const appActionCallResponse = toPlainObject(copy(data))
  const appActionCallResponseWithMethods = enhanceWithMethods(
    appActionCallResponse,
    createAppActionCallApi(makeRequest, retryOptions)
  )
  return appActionCallResponseWithMethods
}
