import copy from 'fast-copy'
import { toPlainObject } from 'contentful-sdk-core'
import type { Except } from 'type-fest'
import type { BasicMetaSysProps, DefaultElements, Link, MakeRequest } from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'

type AppEventSubscriptionSys = Except<BasicMetaSysProps<'User'>, 'version' | 'id'> & {
  appDefinition: Link<'AppDefinition'>
  organization: Link<'Organization'>
}

export type AppEventSubscriptionProps = {
  /**
   * System metadata
   */
  sys: AppEventSubscriptionSys
  /** Subscription url that will receive events */
  targetUrl?: string
  /** List of topics to subscribe to */
  topics: string[]
  /** Optional filter, transformation, or handler function */
  functions?: {
    filter?: Link<'Function'>
    transformation?: Link<'Function'>
    handler?: Link<'Function'>
  }
}

export type CreateAppEventSubscriptionProps = Except<AppEventSubscriptionProps, 'sys'>

export interface AppEventSubscription
  extends AppEventSubscriptionProps,
    DefaultElements<AppEventSubscriptionProps> {
  /**
   * Deletes this object on the server.
   * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   * client.getOrganization('<organization_id>')
   * .then((organization) => organization.getAppEventSubscription(<app-definition-id>))
   * .then((eventSubscription) => eventSubscription.delete())
   * .then(() => console.log('eventSubscription deleted'))
   * .catch(console.error)
   * ```
   */
  delete(): Promise<void>
}

function createEventSubscriptionApi(makeRequest: MakeRequest) {
  const getParams = (data: AppEventSubscriptionProps) => ({
    organizationId: data.sys.organization.sys.id,
    appDefinitionId: data.sys.appDefinition.sys.id,
  })

  return {
    delete: function del() {
      const self = this as AppEventSubscriptionProps
      return makeRequest({
        entityType: 'AppEventSubscription',
        action: 'delete',
        params: getParams(self),
      })
    },
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw AppEventSubscription data
 * @return Wrapped AppEventSubscription data
 */
export function wrapAppEventSubscription(
  makeRequest: MakeRequest,
  data: AppEventSubscriptionProps
): AppEventSubscription {
  const eventSubscription = toPlainObject(copy(data))
  return enhanceWithMethods(eventSubscription, createEventSubscriptionApi(makeRequest))
}
