import { ContentTypeFieldValidation } from '../../entities/content-type-fields'

const DROPDOWN_TYPES = ['Text', 'Symbol', 'Integer', 'Number', 'Boolean'];

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
} as const;

export const FIELD_TYPES = Object.keys(INTERNAL_TO_API);

// All field types that can be used as Entry Editor controls can be used
// for UI Extensions too. We don't support the `File` field type yet
// because it's impossible to customize controls in the Asset Editor.
export const EXTENSION_FIELD_TYPES = FIELD_TYPES.filter((type) => type !== 'File');

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
export function toInternalFieldType(api: any) {
  const keys = Object.keys(INTERNAL_TO_API) as Array<keyof typeof INTERNAL_TO_API>
  return keys.find((key ) => {
    const internalApi = INTERNAL_TO_API[key]
    const stripped = {
      type: api.type,
      linkType: api.linkType,
      items: api.items
    }
    if (stripped.items) {
      stripped.items = {type: stripped.items.type, linkType: stripped.items.linkType }
    }

    if (internalApi.type === 'Link') {
      return internalApi.linkType === stripped.linkType
    }

    if (internalApi.type === 'Array') {
      if (internalApi.items.type === 'Link') {
        return internalApi.items.linkType === stripped.items.linkType
      }
      return internalApi.items.type === stripped.items.type
    }

    return internalApi.type === stripped.type
  });
}


export const DEFAULTS = {
  Text: 'markdown',
  Symbol: 'singleLine',
  Integer: 'numberEditor',
  Number: 'numberEditor',
  Boolean: 'boolean',
  Date: 'datePicker',
  Location: 'locationEditor',
  Object: 'objectEditor',
  RichText: 'richTextEditor',
  Entry: 'entryLinkEditor',
  Asset: 'assetLinkEditor',
  Symbols: 'tagEditor',
  Entries: 'entryLinksEditor',
  Assets: 'assetLinksEditor',
  File: 'fileEditor',
};

/*
 * Gets the default widget ID for a field:
 * - If a field allows predefined values then `dropdown` widget is used
 *   in the presence of the `in` validation.
 * - If a Text field is a title then the `singleLine` widget is used.
 * - Otherwise a simple type-to-editor mapping is used.
 */
export default function getDefaultControlOfField(field: any, displayFieldId:any) {
  const fieldType = toInternalFieldType(field);

  if (!fieldType) return

  const hasInValidation = (field.validations || []).find((v: ContentTypeFieldValidation) => 'in' in v);

  if (hasInValidation && DROPDOWN_TYPES.includes(fieldType)) {
    return 'dropdown';
  }

  const isTextField = fieldType === 'Text';
  const isDisplayField = field.id === displayFieldId;

  if (isTextField && isDisplayField) {
    return 'singleLine';
  }

  return DEFAULTS[fieldType];
}