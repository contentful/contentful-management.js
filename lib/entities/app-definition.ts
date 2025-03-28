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
 * @returns Wrapped App Definition data
 */
export function wrapAppDefinition(
  makeRequest: MakeRequest,
  data: AppDefinitionProps
): AppDefinition {
  const appDefinition = toPlainObject(copy(data))
  const appDefinitionWithMethods = enhanceWithMethods(
    appDefinition,
    createAppDefinitionApi(makeRequest)
  )
  return freezeSys(appDefinitionWithMethods)
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Definition collection data
 * @returns Wrapped App Definition collection data
 */
export const wrapAppDefinitionCollection = wrapCollection(wrapAppDefinition)
