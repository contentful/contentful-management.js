import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { BasicMetaSysProps, DefaultElements, MakeRequest, SysLink } from '../common-types'
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

export interface UserUIConfigSysProps extends BasicMetaSysProps {
  space: SysLink
  environment: SysLink
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
  contentTypeId: string | null
  searchText?: string
  searchFilters?: [string, string, string][]
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
