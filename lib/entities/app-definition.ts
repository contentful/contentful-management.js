import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import type { DefaultElements, BasicMetaSysProps, MakeRequest, Link } from '../common-types.js'
import enhanceWithMethods from '../enhance-with-methods.js'
import { wrapCollection } from '../common-utils.js'
import type { ContentfulAppDefinitionAPI } from '../create-app-definition-api.js'
import createAppDefinitionApi from '../create-app-definition-api.js'
import type { SetOptional, Except } from 'type-fest'
import type { FieldType } from './field-type.js'
import type { InstallationParameterType, ParameterDefinition } from './widget-parameters.js'
import type { AppInstallationProps } from './app-installation.js'
import type { EnvironmentProps } from './environment.js'

export interface NavigationItem {
  name: string
  path: string
}

type LocationType = 'app-config' | 'entry-sidebar' | 'entry-editor' | 'dialog' | 'page' | 'home'

export interface SimpleLocation {
  location: LocationType
}

export interface EntryFieldLocation {
  location: 'entry-field'
  fieldTypes: FieldType[]
}

export interface PageLocation {
  location: 'page'
  navigationItem?: NavigationItem
}

export type AppLocation = SimpleLocation | EntryFieldLocation | PageLocation

export type AppDefinitionProps = {
  /**
   * System metadata
   */
  sys: BasicMetaSysProps & {
    organization: Link<'Organization'>
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

export type CreateAppDefinitionProps = SetOptional<
  Except<AppDefinitionProps, 'sys' | 'bundle'>,
  'src' | 'locations'
>

export type AppDefinition = ContentfulAppDefinitionAPI &
  AppDefinitionProps &
  DefaultElements<AppDefinitionProps>

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
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Definition data
 * @return Wrapped App Definition data
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
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Definition collection data
 * @return Wrapped App Definition collection data
 */
export const wrapAppDefinitionCollection = wrapCollection(wrapAppDefinition)
