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

export interface ContentFieldValidation {
  linkContentType?: string[]
  in?: string[]
  linkMimetypeGroup?: string[]
  enabledNodeTypes?: string[]
  enabledMarks?: string[]
  unique?: boolean
  size?: NumRange
  range?: NumRange
  dateRange?: DateRange
  regexp?: RegExp
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
  validations?: ContentFieldValidation[]
}

export interface ContentFields extends Item {
  id: string
  name: string
  required: boolean
  localized: boolean
  disabled?: boolean
  omitted?: boolean
  items?: Item
  apiName?: string
}
