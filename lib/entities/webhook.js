/**
 * Webhook instances
 * @namespace Webhook
 */
import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import errorHandler from '../error-handler'
import {
  createUpdateEntity,
  createDeleteEntity
} from '../instance-actions'

/**
 * @memberof Webhook
 * @typedef Webhook
 * @prop {Meta.Sys} sys - System metadata
 * @prop {string} name
 * @prop {string} url - Url which the webhook will call
 * @prop {string} httpBasicUsername - Username for basic HTTP authentication
 * @prop {string} httpBasicPassword - Password for basic HTTP authentication
 * @prop {object} headers - Key value pairs of additional headers to be sent with every webhook call.
 * @prop {array} topics - Topics which this webhook should be subscribed to. See https://www.contentful.com/developers/docs/references/content-management-api/#/reference/webhooks/create-a-webhook for more details
 * @prop {function(): Object} toPlainObject() - Returns this Webhook as a plain JS object
 */

function createWebhookApi (http) {
  return {

    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof Webhook
     * @func update
     * @return {Promise<Webhook>} Object returned from the server with updated changes.
     * @example
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
     */
    update: createUpdateEntity({
      http: http,
      entityPath: 'webhook_definitions',
      wrapperMethod: wrapWebhook
    }),

    /**
     * Deletes this object on the server.
     * @memberof Webhook
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
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
     */
    delete: createDeleteEntity({
      http: http,
      entityPath: 'webhook_definitions'
    }),

    /**
     * List of the most recent webhook calls. See https://www.contentful.com/developers/docs/references/content-management-api/#/reference/webhook-calls/webhook-call-overviews for more details.
     * @memberof Webhook
     * @func getCalls
     * @return {Promise<object>} Promise for list of calls
     * @example
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
     */
    getCalls: function () {
      return http.get('webhooks/' + this.sys.id + '/calls')
      .then((response) => response.data, errorHandler)
    },

    /**
     * Webhook call with specific id. See https://www.contentful.com/developers/docs/references/content-management-api/#/reference/webhook-calls/webhook-call-overviews for more details
     * @memberof Webhook
     * @func getCalls
     * @return {Promise<object>} Promise for call details
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getWebhook('<webhook_id>'))
     * .then((webhook) => webhook.getCall(<call-id>))
     * .then((webhookCall) => console.log(webhookCall))
     * .catch(console.error)
     */
    getCall: function (id) {
      return http.get('webhooks/' + this.sys.id + '/calls/' + id)
      .then((response) => response.data, errorHandler)
    },

    /**
     * Overview of the health of webhook calls. See https://www.contentful.com/developers/docs/references/content-management-api/#/reference/webhook-calls/webhook-call-overviews for more details.
     * @memberof Webhook
     * @func getHealth
     * @return {Promise<object>} Promise for health info
     * @example
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
     */
    getHealth: function () {
      return http.get('webhooks/' + this.sys.id + '/health')
      .then((response) => response.data, errorHandler)
    }
  }
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw webhook data
 * @return {Webhook} Wrapped webhook data
 */
export function wrapWebhook (http, data) {
  const webhook = toPlainObject(cloneDeep(data))
  enhanceWithMethods(webhook, createWebhookApi(http))
  return freezeSys(webhook)
}

/**
 * @memberof Webhook
 * @typedef WebhookCollection
 * @prop {number} total
 * @prop {number} skip
 * @prop {number} limit
 * @prop {Array<Webhook.Webhook>} items
 * @prop {function(): Object} toPlainObject() - Returns this Webhook collection as a plain JS object
 */

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw webhook collection data
 * @return {WebhookCollection} Wrapped webhook collection data
 */
export function wrapWebhookCollection (http, data) {
  const webhooks = toPlainObject(cloneDeep(data))
  webhooks.items = webhooks.items.map((entity) => wrapWebhook(http, entity))
  return freezeSys(webhooks)
}
