import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { Except, JsonValue, SetOptional } from 'type-fest'
import {
  BasicMetaSysProps,
  CollectionProp,
  DefaultElements,
  MakeRequest,
  MetaLinkProps,
  SysLink,
} from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'

interface EqualityConstraint {
  equals: [Doc, string]
}
interface Doc {
  doc: 'sys.id' | 'sys.contentType.sys.id' | 'sys.environment.sys.id'
}

interface InConstraint {
  in: [Doc, [string, ...string[]]]
}

interface RegexpConstraint {
  regexp: [Doc, Pattern]
}

interface Pattern {
  pattern: string
}

interface NotConstraint {
  not: EqualityConstraint | InConstraint | RegexpConstraint
}

export type WebhookCalls = { total: number; healthy: number }

export type WebhookCallRequest = {
  url: string
  method: string
  headers: {
    [key: string]: string
  }
  body: string
}

export type WebhookCallResponse = WebhookCallRequest & { statusCode: number }

export type WebhookHealthSys = Except<
  BasicMetaSysProps,
  'version' | 'updatedAt' | 'updatedBy' | 'createdAt'
>

export type WebhookCallDetailsSys = Except<BasicMetaSysProps, 'version' | 'updatedAt' | 'updatedBy'>

export type WebhookHeader = { key: string; value: string; secret?: boolean }

export type WebhookFilter = EqualityConstraint | InConstraint | RegexpConstraint | NotConstraint

export type WebhookTransformation = {
  method?: null | 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
  contentType?:
    | null
    | 'application/vnd.contentful.management.v1+json'
    | 'application/vnd.contentful.management.v1+json; charset=utf-8'
    | 'application/json'
    | 'application/json; charset=utf-8'
    | 'application/x-www-form-urlencoded'
    | 'application/x-www-form-urlencoded; charset=utf-8'
  includeContentLength?: boolean | null
  body?: JsonValue
}

export type CreateWebhooksProps = SetOptional<Except<WebhookProps, 'sys'>, 'headers'>

export type UpdateWebhookProps = SetOptional<
  Except<WebhookProps, 'sys'>,
  'headers' | 'name' | 'topics' | 'url'
>

export type WebhookCallDetailsProps = {
  /**
   * System metadata
   */
  sys: WebhookCallDetailsSys

  /**
   * Request object
   */
  request: WebhookCallRequest

  /**
   * Request object
   */
  response: WebhookCallResponse

  /**
   * Status code of the request
   */
  statusCode: number
  /**
   * Errors
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any[]
  /**
   * Type of the webhook
   */
  eventType: string
  /**
   * Url of the request
   */
  url: string
  /**
   * Timestamp of the request
   */
  requestAt: string
  /**
   * Timestamp of the response
   */
  responseAt: string
}

export type WebhookCallOverviewProps = Except<WebhookCallDetailsProps, 'request' | 'response'>

export type WebhookHealthProps = {
  /**
   * System metadata
   */
  sys: WebhookHealthSys & { space: { sys: MetaLinkProps } }

  /**
   * Webhook call statistics
   */
  calls: WebhookCalls
}

export type WebhookProps = {
  /**
   * System metadata
   */
  sys: BasicMetaSysProps & { space: SysLink }

  /**
   * Webhook name
   */
  name: string

  /**
   * Webhook url
   */
  url: string

  /**
   * Topics the webhook wants to subscribe to
   */
  topics: string[]

  /**
   * Username for basic http auth
   */
  httpBasicUsername?: string

  /**
   * Password for basic http auth
   */
  httpBasicPassword?: string

  /**
   * Headers that should be appended to the webhook request
   */
  headers: Array<WebhookHeader>

  /**
   * Webhook filters
   */
  filters?: WebhookFilter[]

  /**
   * Transformation to apply
   */
  transformation?: WebhookTransformation

  /**
   * Whether the Webhook is active. If set to false, no calls will be made
   */
  active?: boolean
}

export interface WebHooks extends WebhookProps, DefaultElements<WebhookProps> {
  /**
   * Sends an update to the server with any changes made to the object's properties
   * @return Object returned from the server with updated changes.
   * ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getWebhook('<webhook_id>'))
   * .then((webhook) => {
   *  webhook.name = 'new webhook name'
   *  return webhook.update()
   * })
   * .then((webhook) => console.log(`webhook ${webhook.sys.id} updated.`))
   * .catch(console.error)
   * ```
   */
  update(): Promise<WebHooks>

  /**
   * Deletes this object on the server.
   * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
   * ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getWebhook('<webhook_id>'))
   * .then((webhook) => webhook.delete())
   * .then((webhook) => console.log(`webhook ${webhook.sys.id} updated.`))
   * .catch(console.error)
   * ```
   */
  delete(): Promise<void>

  /**
   * List of the most recent webhook calls. See https://www.contentful.com/developers/docs/references/content-management-api/#/reference/webhook-calls/webhook-call-overviews for more details.
   * @return Promise for list of calls
   * ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getWebhook('<webhook_id>'))
   * .then((webhook) => webhook.getCalls())
   * .then((response) => console.log(response.items)) // webhook calls
   * .catch(console.error)
   * ```
   */
  getCalls(): Promise<CollectionProp<WebhookCallOverviewProps>>

  /**
   * Webhook call with specific id. See https://www.contentful.com/developers/docs/references/content-management-api/#/reference/webhook-calls/webhook-call-overviews for more details
   * @return Promise for call details
   * ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getWebhook('<webhook_id>'))
   * .then((webhook) => webhook.getCall('<call-id>'))
   * .then((webhookCall) => console.log(webhookCall))
   * .catch(console.error)
   * ```
   */
  getCall(id: string): Promise<WebhookCallDetailsProps>

  /**
   * Overview of the health of webhook calls. See https://www.contentful.com/developers/docs/references/content-management-api/#/reference/webhook-calls/webhook-call-overviews for more details.
   * @return Promise for health info
   * ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getWebhook('<webhook_id>'))
   * .then((webhook) => webhook.getHealth())
   * .then((webhookHealth) => console.log(webhookHealth))
   * .catch(console.error)
   * ```
   */
  getHealth(): Promise<WebhookHealthProps>
}

/**
 * @private
 */
function createWebhookApi(makeRequest: MakeRequest) {
  const getParams = (data: WebhookProps) => ({
    spaceId: data.sys.space.sys.id,
    webhookDefinitionId: data.sys.id,
  })

  return {
    update: function update() {
      const data = this.toPlainObject() as WebhookProps
      return makeRequest({
        entityType: 'Webhook',
        action: 'update',
        params: getParams(data),
        payload: data,
      }).then((data) => wrapWebhook(makeRequest, data))
    },
    delete: function del() {
      const data = this.toPlainObject() as WebhookProps
      return makeRequest({
        entityType: 'Webhook',
        action: 'delete',
        params: getParams(data),
      })
    },
    getCalls: function getCalls() {
      const data = this.toPlainObject() as WebhookProps
      return makeRequest({
        entityType: 'Webhook',
        action: 'getManyCallDetails',
        params: getParams(data),
      })
    },
    getCall: function getCall(id: string) {
      const data = this.toPlainObject() as WebhookProps
      return makeRequest({
        entityType: 'Webhook',
        action: 'getCallDetails',
        params: { ...getParams(data), callId: id },
      })
    },
    getHealth: function getHealth() {
      const data = this.toPlainObject() as WebhookProps
      return makeRequest({
        entityType: 'Webhook',
        action: 'getHealthStatus',
        params: getParams(data),
      })
    },
  }
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw webhook data
 * @return Wrapped webhook data
 */
export function wrapWebhook(makeRequest: MakeRequest, data: WebhookProps): WebHooks {
  const webhook = toPlainObject(copy(data))
  const webhookWithMethods = enhanceWithMethods(webhook, createWebhookApi(makeRequest))
  return freezeSys(webhookWithMethods)
}

/**
 * @private
 */
export const wrapWebhookCollection = wrapCollection(wrapWebhook)
