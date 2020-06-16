import { AxiosInstance } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import errorHandler from '../error-handler'
import { createUpdateEntity, createDeleteEntity } from '../instance-actions'
import { wrapCollection } from '../common-utils'
import { DefaultElements, BasicMetaSysProps, MetaLinkProps } from '../common-types'

const entityPath = 'webhook_definitions'

export type WebhookProps = {
  /**
   * System metadata
   */
  sys: BasicMetaSysProps & { space: { sys: MetaLinkProps } }

  /**
   * Webhook name
   */
  name: string

  /**
   * Webhook url
   */
  url: string

  /**
   * Username for basic http auth
   */
  httpBasicUsername: string

  /**
   * Password for basic http auth
   */
  httpBasicPassword: string

  /**
   * Headers that should be appended to the webhook request
   */
  headers: {
    [key: string]: string
  }

  /**
   * Topics the webhook wants to subscribe to
   */
  topics: string[]

  /**
   * Transformation to apply
   */
  transformation?: {
    method?: string
    contentType?: string
    includeContentLength?: boolean
    body?: object
  }
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
  getCalls(): Promise<Record<string, unknown>>

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
  getCall(id: string): Promise<Record<string, unknown>>

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
  getHealth(): Promise<Record<string, unknown>>
}

function createWebhookApi(http: AxiosInstance) {
  return {
    update: createUpdateEntity({
      http,
      entityPath,
      wrapperMethod: wrapWebhook,
    }),

    delete: createDeleteEntity({
      http,
      entityPath,
    }),

    getCalls: function (): Promise<Record<string, unknown>> {
      return http
        .get('webhooks/' + this.sys.id + '/calls')
        .then((response) => response.data, errorHandler)
    },

    getCall: function (id: string): Promise<Record<string, unknown>> {
      return http
        .get('webhooks/' + this.sys.id + '/calls/' + id)
        .then((response) => response.data, errorHandler)
    },

    getHealth: function (): Promise<Record<string, unknown>> {
      return http
        .get('webhooks/' + this.sys.id + '/health')
        .then((response) => response.data, errorHandler)
    },
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw webhook data
 * @return Wrapped webhook data
 */
export function wrapWebhook(http: AxiosInstance, data: WebhookProps): WebHooks {
  const webhook = toPlainObject(cloneDeep(data))
  const webhookWithMethods = enhanceWithMethods(webhook, createWebhookApi(http))
  return freezeSys(webhookWithMethods)
}

/**
 * @private
 */
export const wrapWebhookCollection = wrapCollection(wrapWebhook)
