/**
 * @module
 * @category Entities
 */
import copy from 'fast-copy'
import { toPlainObject } from 'contentful-sdk-core'
import type { Except, JsonValue } from 'type-fest'
import type {
  BasicMetaSysProps,
  AppActionCallRetryOptions,
  DefaultElements,
  MakeRequest,
  SysLink,
  CreateWithResponseParams,
  CreateWithResultParams,
  GetAppActionCallDetailsParams,
  GetAppActionCallParamsWithId,
} from '../common-types'
import type { WebhookCallDetailsProps } from './webhook'
import enhanceWithMethods from '../enhance-with-methods'

type AppActionCallSys = Except<BasicMetaSysProps, 'version'> & {
  appDefinition: SysLink
  space: SysLink
  environment: SysLink
  action: SysLink
  appActionCallResponse?: SysLink
} & (AppActionCallSucceeded | AppActionCallProcessing | AppActionCallFailed)

type RetryOptions = AppActionCallRetryOptions

/** Possible statuses of an app action call. */
export type AppActionCallStatus = 'processing' | 'succeeded' | 'failed'

/** Error details returned when an app action call fails. */
export interface AppActionCallErrorProps {
  sys: { type: 'Error'; id: string }
  message: string
  details?: Record<string, unknown>
  statusCode?: number
}

/** Represents a successfully completed app action call. */
export type AppActionCallSucceeded = {
  status: 'succeeded'
  result: JsonValue
}

/** Represents an app action call that is still being processed. */
export type AppActionCallProcessing = {
  status: 'processing'
}

/** Represents a failed app action call with error details. */
export type AppActionCallFailed = {
  status: 'failed'
  error: AppActionCallErrorProps
}

/** Properties of a Contentful app action call. */
export type AppActionCallProps = {
  /**
   * System metadata
   */
  sys: AppActionCallSys
}

/** Properties required to create a new app action call. */
export type CreateAppActionCallProps = {
  /** The body for the call */
  parameters: { [key: string]: unknown }
}

type AppActionCallApi = {
  createWithResponse(
    params: CreateWithResponseParams,
    payload: CreateAppActionCallProps,
  ): Promise<AppActionCallResponse>
  getCallDetails(params: GetAppActionCallDetailsParams): Promise<AppActionCallResponse>
  get(params: GetAppActionCallParamsWithId): Promise<AppActionCallProps>
  createWithResult(
    params: CreateWithResultParams,
    payload: CreateAppActionCallProps,
  ): Promise<AppActionCallProps>
}

/** Response details of a completed app action call. */
export type AppActionCallResponse = WebhookCallDetailsProps
/** Raw response properties of an app action call before processing. */
export interface AppActionCallRawResponseProps {
  sys: {
    id: string
    type: 'AppActionCallResponse'
    space: SysLink
    environment: SysLink
    appInstallation: SysLink
    appAction: SysLink
    createdAt: string
    createdBy: SysLink
  }
  response: {
    headers?: { contentType?: string }
    statusCode?: number
    body: string
  }
}

/** An app action call response with methods for retrieving call details. */
export interface AppActionCallResponseData
  extends AppActionCallResponse,
    DefaultElements<AppActionCallResponse>,
    AppActionCallApi {}

/** A Contentful app action call entity. */
export type AppActionCall = AppActionCallProps & DefaultElements<AppActionCallProps>

/**
 * @internal
 */
export default function createAppActionCallApi(
  makeRequest: MakeRequest,
  retryOptions?: RetryOptions,
): AppActionCallApi {
  return {
    createWithResponse: function (
      params: CreateWithResponseParams,
      payload: CreateAppActionCallProps,
    ) {
      return makeRequest({
        entityType: 'AppActionCall',
        action: 'createWithResponse',
        params: { ...params, ...retryOptions },
        payload: payload,
      }).then((data) => wrapAppActionCallResponse(makeRequest, data))
    },

    getCallDetails: function getCallDetails(params: GetAppActionCallDetailsParams) {
      return makeRequest({
        entityType: 'AppActionCall',
        action: 'getCallDetails',
        params,
      }).then((data) => wrapAppActionCallResponse(makeRequest, data))
    },

    get: function get(params: GetAppActionCallParamsWithId) {
      return makeRequest({
        entityType: 'AppActionCall',
        action: 'get',
        params,
      }).then((data) => wrapAppActionCall(makeRequest, data))
    },

    createWithResult: function (params: CreateWithResultParams, payload: CreateAppActionCallProps) {
      return makeRequest({
        entityType: 'AppActionCall',
        action: 'createWithResult',
        params: { ...params, ...retryOptions },
        payload: payload,
      }).then((data) => wrapAppActionCall(makeRequest, data))
    },
  }
}

/**
 * @internal
 * @param http - HTTP client instance
 * @param data - Raw AppActionCall data
 * @returns Wrapped AppActionCall data
 */
export function wrapAppActionCall(
  makeRequest: MakeRequest,
  data: AppActionCallProps,
): AppActionCall {
  const signedRequest = toPlainObject(copy(data))
  const signedRequestWithMethods = enhanceWithMethods(
    signedRequest,
    createAppActionCallApi(makeRequest),
  )
  return signedRequestWithMethods
}

/**
 * @internal
 * @param http - HTTP client instance
 * @param data - Raw AppActionCall data
 * @returns Wrapped AppActionCall data
 */
export function wrapAppActionCallResponse(
  makeRequest: MakeRequest,
  data: AppActionCallResponse,
  retryOptions?: RetryOptions,
): AppActionCallResponseData {
  const appActionCallResponse = toPlainObject(copy(data))
  const appActionCallResponseWithMethods = enhanceWithMethods(
    appActionCallResponse,
    createAppActionCallApi(makeRequest, retryOptions),
  )
  return appActionCallResponseWithMethods
}
