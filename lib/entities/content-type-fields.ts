import { KeyValueMap } from '../common-types'
import { INLINES, BLOCKS } from '@contentful/rich-text-types'

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

interface NodesValidation {
  [BLOCKS.EMBEDDED_ENTRY]?: Pick<
    ContentTypeFieldValidation,
    'size' | 'linkContentType' | 'message'
  >[]
  [INLINES.EMBEDDED_ENTRY]?: Pick<
    ContentTypeFieldValidation,
    'size' | 'linkContentType' | 'message'
  >[]
  [INLINES.ENTRY_HYPERLINK]?: Pick<
    ContentTypeFieldValidation,
    'size' | 'linkContentType' | 'message'
  >[]
  [BLOCKS.EMBEDDED_ASSET]?: Pick<ContentTypeFieldValidation, 'size' | 'message'>[]
  [INLINES.ASSET_HYPERLINK]?: Pick<ContentTypeFieldValidation, 'size' | 'message'>[]
  [BLOCKS.EMBEDDED_RESOURCE]?: {
    validations: Pick<ContentTypeFieldValidation, 'size' | 'message'>[]
    allowedResources: ContentTypeAllowedResources[]
  }
  [INLINES.EMBEDDED_RESOURCE]?: {
    validations: Pick<ContentTypeFieldValidation, 'size' | 'message'>[]
    allowedResources: ContentTypeAllowedResources[]
  }
  [INLINES.RESOURCE_HYPERLINK]?: {
    validations: Pick<ContentTypeFieldValidation, 'size' | 'message'>[]
    allowedResources: ContentTypeAllowedResources[]
  }
}

export interface ContentTypeFieldValidation {
  linkContentType?: string[]
  in?: (string | number)[]
  linkMimetypeGroup?: string[]
  enabledNodeTypes?: (`${BLOCKS}` | `${INLINES}`)[]
  enabledMarks?: string[]
  unique?: boolean
  size?: NumRange
  range?: NumRange
  dateRange?: DateRange
  regexp?: RegExp
  message?: string | null
  prohibitRegexp?: RegExp
  assetImageDimensions?: {
    width?: NumRange
    height?: NumRange
  }
  assetFileSize?: NumRange
  nodes?: NodesValidation
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
