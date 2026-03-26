import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, MakeRequest } from '../common-types'

export type ContentSemanticsSettingsProps = {
  sys: {
    type: 'ContentSemanticsSettings'
  }
  supportedLocalePrefixes: string[]
}

export interface ContentSemanticsSettings
  extends ContentSemanticsSettingsProps,
    DefaultElements<ContentSemanticsSettingsProps> {}

/**
 * @internal
 * @param _makeRequest - function to make requests via an adapter
 * @param data - Raw Content Semantics Settings data
 * @returns Wrapped Content Semantics Settings data
 */
export function wrapContentSemanticsSettings(
  _makeRequest: MakeRequest,
  data: ContentSemanticsSettingsProps,
): ContentSemanticsSettings {
  const result = toPlainObject(copy(data))
  return freezeSys(result)
}
