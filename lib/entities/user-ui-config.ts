import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { DefaultElements, MakeRequest, UserUIConfigSysProps } from '../common-types'
import createUserUIConfigApi from '../create-user-ui-config'
import enhanceWithMethods from '../enhance-with-methods'

export type UserUIConfigProps = {
  /**
   * System metadata
   */
  sys: UserUIConfigSysProps

  assetListViews: ViewFolder[]
  entryListViews: ViewFolder[]
}

interface ViewFolder {
  id: string
  title: string
  folderId?: string
  isFolder?: boolean
  views: View[]
}

interface View {
  id: string
  title: string
  order?: {
    fieldId: string
    direction: 'ascending' | 'descending'
  }
  folderId?: string
  displayedFieldIds?: string[]
  contentTypeId: string | null
  searchText?: string
  searchFilters?: [string, string, string][]
  roles: string[]
}

export interface UserUIConfig extends UserUIConfigProps, DefaultElements<UserUIConfigProps> {}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw data
 * @return Wrapped UserUIConfig
 */
export function wrapUserUIConfig(makeRequest: MakeRequest, data: UserUIConfigProps) {
  const user = toPlainObject(copy(data))
  const userWithMethods = enhanceWithMethods(user, createUserUIConfigApi(makeRequest))
  return freezeSys(userWithMethods)
}
