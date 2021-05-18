import { ContentFields, ContentTypeFieldValidation } from '../../entities/content-type-fields'

const DROPDOWN_TYPES = ['Text', 'Symbol', 'Integer', 'Number', 'Boolean']

const INTERNAL_TO_API = {
  Symbol: { type: 'Symbol' },
  Text: { type: 'Text' },
  RichText: { type: 'RichText' },
  Integer: { type: 'Integer' },
  Number: { type: 'Number' },
  Boolean: { type: 'Boolean' },
  Date: { type: 'Date' },
  Location: { type: 'Location' },
  Object: { type: 'Object' },
  File: { type: 'File' },

  Entry: { type: 'Link', linkType: 'Entry' },
  Asset: { type: 'Link', linkType: 'Asset' },

  Symbols: { type: 'Array', items: { type: 'Symbol' } },
  Entries: { type: 'Array', items: { type: 'Link', linkType: 'Entry' } },
  Assets: { type: 'Array', items: { type: 'Link', linkType: 'Asset' } },
} as const

export const FIELD_TYPES = Object.keys(INTERNAL_TO_API) as Array<keyof typeof INTERNAL_TO_API>

/**
 * Returns an internal string identifier for an API field object.
 *
 * We use this string as a simplified reference to field types.
 * Possible values are:
 *
 * - Symbol
 * - Symbols
 * - Text
 * - RichText
 * - Integer
 * - Number
 * - Boolean
 * - Date
 * - Location
 * - Object
 * - Entry
 * - Entries
 * - Asset
 * - Assets
 * - File
 */
export function toInternalFieldType(api: Partial<ContentFields>) {
  return FIELD_TYPES.find((key) => {
    const internalApi = INTERNAL_TO_API[key]
    const stripped = {
      type: api.type,
      linkType: api.linkType,
      items: api.items,
    }
    if (stripped.items) {
      stripped.items = { type: stripped.items.type, linkType: stripped.items.linkType }
    }

    if (internalApi.type === 'Link') {
      return internalApi.linkType === stripped.linkType
    }

    if (internalApi.type === 'Array' && internalApi.items && stripped.items) {
      if (internalApi.items.type === 'Link') {
        return internalApi.items.linkType === stripped.items.linkType
      }
      return internalApi.items.type === stripped.items.type
    }

    return internalApi.type === stripped.type
  })
}

export const DEFAULTS_WIDGET = {
  Text: { widgetId: 'markdown' },
  Symbol: { widgetId: 'singleLine' },
  Integer: { widgetId: 'numberEditor' },
  Number: { widgetId: 'numberEditor' },
  Boolean: { widgetId: 'boolean' },
  Date: { widgetId: 'datePicker' },
  Location: { widgetId: 'locationEditor' },
  Object: { widgetId: 'objectEditor' },
  RichText: { widgetId: 'richTextEditor' },
  Entry: { widgetId: 'entryLinkEditor' },
  Asset: { widgetId: 'assetLinkEditor' },
  Symbols: { widgetId: 'tagEditor' },
  Entries: { widgetId: 'entryLinksEditor' },
  Assets: { widgetId: 'assetLinksEditor' },
  File: { widgetId: 'fileEditor' },
}

export const DEFAULTS_SETTINGS = {
  Boolean: {
    falseLabel: 'No',
    helpText: null,
    trueLabel: 'Yes',
  },
  Date: {
    helpText: null,
    ampm: '24',
    format: 'timeZ',
  },
  Entry: {
    helpText: null,
    showCreateEntityAction: true,
    showLinkEntityAction: true,
  },
  Asset: {
    helpText: null,
    showCreateEntityAction: true,
    showLinkEntityAction: true,
  },

  Entries: {
    helpText: null,
    bulkEditing: false,
    showCreateEntityAction: true,
    showLinkEntityAction: true,
  },
  Assets: {
    helpText: null,
    showCreateEntityAction: true,
    showLinkEntityAction: true,
  },
} as const

interface DefaultWidget {
  widgetId: string
  settings?: {
    helpText: null | string
  }
  fieldId: string
  widgetNamespace: 'builtin'
}

function getDefaultWidget(field: keyof typeof DEFAULTS_WIDGET, fieldId: string) {
  const defaultWidget: DefaultWidget = {
    ...(DEFAULTS_WIDGET[field] as Pick<DefaultWidget, 'widgetId'>),
    settings: {
      helpText: null,
    },
    widgetNamespace: 'builtin',
    fieldId,
  }
  if (field in DEFAULTS_SETTINGS) {
    defaultWidget.settings = {
      ...defaultWidget.settings,
      // @ts-expect-error missmatch but has been checked
      ...DEFAULTS_SETTINGS[field],
    }
  }
  return defaultWidget
}

// Given our internal identifier returns a minimal API field object.
export function toApiFieldType(internal: keyof typeof INTERNAL_TO_API) {
  return INTERNAL_TO_API[internal]
}

/*
 * Gets the default widget ID for a field:
 * - If a field allows predefined values then `dropdown` widget is used
 *   in the presence of the `in` validation.
 * - If a Text field is a title then the `singleLine` widget is used.
 * - Otherwise a simple type-to-editor mapping is used.
 */
export default function getDefaultControlOfField(field: ContentFields, displayFieldId: string) {
  let fieldType = toInternalFieldType(field)

  if (!fieldType) return

  const hasInValidation = (field.validations || []).find(
    (v: ContentTypeFieldValidation) => 'in' in v
  )

  if (hasInValidation && DROPDOWN_TYPES.includes(fieldType)) {
    return {
      widgetId: 'dropdown',
      fieldId: field.id,
      widgetNameSpace: 'builtin',
    }
  }

  const isTextField = fieldType === 'Text'
  const isDisplayField = field.id === displayFieldId

  if (isTextField && isDisplayField) {
    fieldType = 'Symbol'
  }

  return getDefaultWidget(fieldType, field.id)
}
