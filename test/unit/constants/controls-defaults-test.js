import { expect } from 'chai'
import { it, describe, test } from 'mocha'
import getDefaultControlOfField, {
  DEFAULTS_WIDGET,
  FIELD_TYPES,
  toApiFieldType,
} from '../../../lib/constants/editor-interface-defaults/controls-defaults'

describe('controlsDefaults', () => {
  test('with an unsupported field type', () => {
    const field = { type: 'unsupportedtype' }
    expect(getDefaultControlOfField(field, 'displayfieldid')).equals(undefined)
  })

  describe('if validations exist but are different', () => {
    const validations = [{ size: { max: 500, min: 0 } }]

    it('for a type with a dropdown widget', () => {
      const field = { type: 'Symbol', validations }
      expect(getDefaultControlOfField(field, 'displayfieldid').widgetId).equals('singleLine')
    })

    it('for a type with no dropdown widget', () => {
      const field = { type: 'Date', validations }
      expect(getDefaultControlOfField(field, 'displayfieldid').widgetId).equals('datePicker')
    })
  })

  describe('if validations exist', () => {
    const validations = [{ in: ['123'] }]

    it('for a type with a dropdown widget', () => {
      const field = { type: 'Symbol', validations }
      expect(getDefaultControlOfField(field, 'displayfieldid').widgetId).equals('dropdown')
    })

    it('for a type with no dropdown widget', () => {
      const field = { type: 'Date', validations }
      expect(getDefaultControlOfField(field, 'displayfieldid').widgetId).equals('datePicker')
    })
  })

  describe('if field is Text', () => {
    const field = { type: 'Text', id: 'textfield' }

    it('and is display field', () => {
      expect(getDefaultControlOfField(field, 'textfield').widgetId).equals('singleLine')
    })

    it('is not a display field', () => {
      expect(getDefaultControlOfField(field, 'displayfieldid').widgetId).equals('markdown')
    })
  })

  it('if field is RichText', () => {
    const field = { type: 'RichText' }
    expect(getDefaultControlOfField(field, 'displayfieldid').widgetId).equals('richTextEditor')
  })

  it('if field is Entry', () => {
    const field = { type: 'Link', linkType: 'Entry' }
    expect(getDefaultControlOfField(field, 'displayfieldid').widgetId).equals('entryLinkEditor')
  })

  it('if field is Asset', () => {
    const field = { type: 'Link', linkType: 'Asset' }
    expect(getDefaultControlOfField(field, 'displayfieldid').widgetId).equals('assetLinkEditor')
  })

  it('if field is a list of Assets', () => {
    const field = { type: 'Array', items: { type: 'Link', linkType: 'Asset' } }
    expect(getDefaultControlOfField(field, 'displayfieldid').widgetId).equals('assetLinksEditor')
  })

  it('if field is a list of Entries', () => {
    const field = { type: 'Array', items: { type: 'Link', linkType: 'Entry' } }
    expect(getDefaultControlOfField(field, 'displayfieldid').widgetId).equals('entryLinksEditor')
  })

  it('if field is a File', () => {
    const field = { type: 'File' }
    expect(getDefaultControlOfField(field, 'displayfieldid').widgetId).equals('fileEditor')
  })

  it('has the correct namespace', () => {
    const field = { type: 'Symbol' }
    expect(getDefaultControlOfField(field, 'displayfieldid').widgetNamespace).equals('builtin')
  })

  it('returns default widget ID for each known field type', () => {
    FIELD_TYPES.forEach((type) => {
      const defaultWidget = getDefaultControlOfField(toApiFieldType(type), 'displayfieldid')
      expect(defaultWidget.widgetId).equals(DEFAULTS_WIDGET[type].widgetId)
    })
  })

  it('declares default widget IDs for all known field types', () => {})
})
