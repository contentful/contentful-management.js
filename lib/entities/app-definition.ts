/**
 * @module
 * @category Entities
 */
import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import type {
  DefaultElements,
  BasicMetaSysProps,
  SysLink,
  MakeRequest,
  Link,
} from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import type { ContentfulAppDefinitionAPI } from '../create-app-definition-api'
import createAppDefinitionApi from '../create-app-definition-api'
import type { SetOptional, Except } from 'type-fest'
import type { FieldType } from './field-type'
import type { InstallationParameterType, ParameterDefinition } from './widget-parameters'
import type { AppInstallationProps } from './app-installation'
import type { EnvironmentProps } from './environment'

/** A navigation item displayed in the Contentful web app for a page-location app. */
export interface NavigationItem {
  name: string
  path: string
}

/**
 * These locations are currently restricted to internal Contentful apps only.
 * If you are interested in using these locations for your app,
 * please reach out to Contentful Support (https://www.contentful.com/support/).
 */
type InternalLocationType = 'agent'

type LocationType =
  | 'app-config'
  | 'entry-sidebar'
  | 'entry-editor'
  | 'dialog'
  | 'page'
  | 'home'
  | InternalLocationType

/** An app location that does not require additional configuration. */
export interface SimpleLocation {
  location: LocationType
}

/** An app location for entry fields, restricted to specific field types. */
export interface EntryFieldLocation {
  location: 'entry-field'
  fieldTypes: FieldType[]
}

/** An app location for a dedicated page with optional navigation item. */
export interface PageLocation {
  location: 'page'
  navigationItem?: NavigationItem
}

/** Union of all possible app location types where an app can be rendered. */
export type AppLocation = SimpleLocation | EntryFieldLocation | PageLocation

/** Properties of a Contentful app definition. */
export type AppDefinitionProps = {
  /**
   * System metadata
   */
  sys: BasicMetaSysProps & {
    organization: SysLink
    shared: boolean
  }
  /**
   * App name
   */
  name: string
  /**
   * URL where the root HTML document of the app can be found
   */
  src?: string
  /**
   * Link to an AppBundle
   */
  bundle?: Link<'AppBundle'>
  /**
   * Locations where the app can be installed
   */
  locations?: AppLocation[]
  /**
   * Instance parameter definitions
   */
  parameters?: {
    instance?: ParameterDefinition[]
    installation?: ParameterDefinition<InstallationParameterType>[]
  }
}

/** Properties required to create a new app definition. */
export type CreateAppDefinitionProps = SetOptional<
  Except<AppDefinitionProps, 'sys' | 'bundle'>,
  'src' | 'locations'
>

/** A Contentful app definition with methods for managing actions, bundles, keys, and installations. */
export type AppDefinition = ContentfulAppDefinitionAPI &
  AppDefinitionProps &
  DefaultElements<AppDefinitionProps>

/** Properties of app installations across an organization, including environment metadata. */
export type AppInstallationsForOrganizationProps = {
  sys: {
    type: 'Array'
  }
  items: AppInstallationProps[]
  includes: {
    Environment: EnvironmentProps[]
  }
}

/**
 * @internal
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Definition data
 * @returns Wrapped App Definition data
 */
export function wrapAppDefinition(
  makeRequest: MakeRequest,
  data: AppDefinitionProps,
): AppDefinition {
  const appDefinition = toPlainObject(copy(data))
  const appDefinitionWithMethods = enhanceWithMethods(
    appDefinition,
    createAppDefinitionApi(makeRequest),
  )
  return freezeSys(appDefinitionWithMethods)
}

/**
 * @internal
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Definition collection data
 * @returns Wrapped App Definition collection data
 */
export const wrapAppDefinitionCollection = wrapCollection(wrapAppDefinition)
