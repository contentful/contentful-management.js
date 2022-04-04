import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import { DefaultElements, BasicMetaSysProps, SysLink, MakeRequest, Link } from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import createAppDefinitionApi, { ContentfulAppDefinitionAPI } from '../create-app-definition-api'
import { SetOptional, Except } from 'type-fest'
import { FieldType } from './field-type'
import { ParameterDefinition } from './widget-parameters'

export interface NavigationItem {
  name: string
  path: string
}

type LocationType =
  | 'app-config'
  | 'entry-sidebar'
  | 'entry-editor'
  | 'dialog'
  | 'page'
  | 'entry-list'

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
  }
}

export type CreateAppDefinitionProps = SetOptional<
  Except<AppDefinitionProps, 'sys' | 'bundle'>,
  'src' | 'locations'
>

export type AppDefinition = ContentfulAppDefinitionAPI &
  AppDefinitionProps &
  DefaultElements<AppDefinitionProps>

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Definition data
 * @return Wrapped App Definition data
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
 * @return Wrapped App Definition collection data
 */
export const wrapAppDefinitionCollection = wrapCollection(wrapAppDefinition)
