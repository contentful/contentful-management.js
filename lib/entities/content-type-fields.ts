import { KeyValueMap } from '../common-types'

interface NumRange {
  min?: number
  max?: number
}

interface DateRange {
  min?: string
  max?: string
}

interface RegExp {
  pattern: string
  flags: string
}

export interface ContentTypeFieldValidation {
  linkContentType?: string[]
  in?: (string | number)[]
  linkMimetypeGroup?: string[]
  enabledNodeTypes?: string[]
  enabledMarks?: string[]
  unique?: boolean
  size?: NumRange
  range?: NumRange
  dateRange?: DateRange
  regexp?: RegExp
  message?: string
  prohibitRegexp?: RegExp
  assetImageDimensions?: {
    width?: NumRange
    height?: NumRange
  }
  assetFileSize?: NumRange
}

interface Item {
  type: string
  linkType?: string
  validations?: ContentTypeFieldValidation[]
}

interface ContentTypeAllowedResources {
  type: string
  source: string
  contentTypes: string[]
}

export interface ContentFields<T = KeyValueMap> extends Item {
  id: string
  name: string
  required: boolean
  localized: boolean
  disabled?: boolean
  omitted?: boolean
  deleted?: boolean
  items?: Item
  apiName?: string
  defaultValue?: T
  allowedResources?: ContentTypeAllowedResources[]
}
