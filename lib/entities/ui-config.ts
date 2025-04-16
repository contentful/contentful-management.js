import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { BasicMetaSysProps, DefaultElements, Link, MakeRequest } from '../common-types'
import createUIConfigApi from '../create-ui-config-api'
import enhanceWithMethods from '../enhance-with-methods'

export type UIConfigProps = {
  /**
   * System metadata
   */
  sys: UIConfigSysProps

  assetListViews: ViewFolder[]
  entryListViews: ViewFolder[]
  homeViews: HomeView[]
  previewMode?: { previewMode: 'livePreview' | 'legacyPreview' }
  publish?: { publishMode: 'entryPublishing' | 'localePublishing' }
}

export interface UIConfigSysProps extends BasicMetaSysProps<'User' | 'AppDefinition'> {
  space: Link<'Space'>
  environment: Link<'Environment'>
}

interface HomeView {
  widgetId: string
  widgetNamespace: string
}

interface ViewFolder {
  id: string
  title: string
  views: View[]
}

interface View {
  id: string
  title: string
  order?: {
    fieldId: string
    direction: 'ascending' | 'descending'
  }
  displayedFieldIds?: string[]
  contentTypeId?: string | null
  contentTypeIds?: string[]
  searchText?: string
  searchFilters?: [string, string, string][]
  roles?: string[]
}

export interface UIConfig extends UIConfigProps, DefaultElements<UIConfigProps> {}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw data
 * @return Wrapped UIConfig
 */
export function wrapUIConfig(makeRequest: MakeRequest, data: UIConfigProps) {
  const user = toPlainObject(copy(data))
  const userWithMethods = enhanceWithMethods(user, createUIConfigApi(makeRequest))
  return freezeSys(userWithMethods)
}
