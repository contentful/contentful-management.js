/**
 * Contentful Management API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Management API.
 * @packageDocumentation
 */

export type { PlainClientDefaultParams } from './plain/plain-client'

export type { ClientAPI } from './create-contentful-api'
export type { PlainClientAPI } from './plain/plain-client-types'
export type { RestAdapterParams } from './adapters/REST/rest-adapter'
export type * from './export-types'

export { asIterator } from './plain/as-iterator'
export { fetchAll } from './plain/pagination-helper'
export { isDraft, isPublished, isUpdated } from './plain/checks'
export { makeRequest } from './adapters/REST/make-request'
export { RestAdapter } from './adapters/REST/rest-adapter'
export * as editorInterfaceDefaults from './constants/editor-interface-defaults/index'

export * from './create-client'
