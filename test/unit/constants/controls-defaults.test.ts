import { it, describe, test, expect } from 'vitest'
import getDefaultControlOfField, {
  DEFAULTS_WIDGET,
  FIELD_TYPES,
  toApiFieldType,
} from '../../../lib/constants/editor-interface-defaults/controls-defaults'

const baseField = { id: 'mockedId', name: 'mockedName', required: false, localized: false }

describe('controlsDefaults', () => {
  test('with an unsupported field type', () => {
    const field = { ...baseField, type: 'unsupportedtype' }
    expect(function () {
      getDefaultControlOfField(field)
    }).to.throw(Error)
  })

  describe('if validations exist but are different', () => {
    const validations = [{ size: { max: 500, min: 0 } }]

    it('for a type with a dropdown widget', () => {
      const field = { ...baseField, type: 'Symbol', validations }
      expect(getDefaultControlOfField(field).widgetId).equals('singleLine')
    })

    it('for a type with no dropdown widget', () => {
      const field = { ...baseField, type: 'Date', validations }
      expect(getDefaultControlOfField(field).widgetId).equals('datePicker')
    })
  })

  describe('if validations exist', () => {
    const validations = [{ in: ['123'] }]

    it('for a type with a dropdown widget', () => {
      const field = { ...baseField, type: 'Symbol', validations }
      expect(getDefaultControlOfField(field).widgetId).equals('dropdown')
    })

    it('for a type with no dropdown widget', () => {
      const field = { ...baseField, type: 'Date', validations }
      expect(getDefaultControlOfField(field).widgetId).equals('datePicker')
    })
  })

  it('if field is Text', () => {
    const field = { ...baseField, type: 'Text', id: 'textfield' }
    expect(getDefaultControlOfField(field).widgetId).equals('markdown')
  })

  it('if field is RichText', () => {
    const field = { ...baseField, type: 'RichText' }
    expect(getDefaultControlOfField(field).widgetId).equals('richTextEditor')
  })

  it('if field is Entry', () => {
    const field = { ...baseField, type: 'Link', linkType: 'Entry' }
    expect(getDefaultControlOfField(field).widgetId).equals('entryLinkEditor')
  })

  it('if field is Asset', () => {
    const field = { ...baseField, type: 'Link', linkType: 'Asset' }
    expect(getDefaultControlOfField(field).widgetId).equals('assetLinkEditor')
  })

  it('if field is a list of Assets', () => {
    const field = { ...baseField, type: 'Array', items: { type: 'Link', linkType: 'Asset' } }
    expect(getDefaultControlOfField(field).widgetId).equals('assetLinksEditor')
  })

  it('if field is a list of Entries', () => {
    const field = { ...baseField, type: 'Array', items: { type: 'Link', linkType: 'Entry' } }
    expect(getDefaultControlOfField(field).widgetId).equals('entryLinksEditor')
  })

  it('if field is a File', () => {
    const field = { ...baseField, type: 'File' }
    expect(getDefaultControlOfField(field).widgetId).equals('fileEditor')
  })

  it('has the correct namespace', () => {
    const field = { ...baseField, type: 'Symbol' }
    expect(getDefaultControlOfField(field).widgetNamespace).equals('builtin')
  })

  it('returns default widget ID for each known field type', () => {
    FIELD_TYPES.forEach((type) => {
      const defaultWidget = getDefaultControlOfField({ ...baseField, ...toApiFieldType(type) })
      expect(defaultWidget.widgetId).equals(DEFAULTS_WIDGET[type].widgetId)
    })
  })

  it('declares default widget IDs for all known field types', () => {})
})
