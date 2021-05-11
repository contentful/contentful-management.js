import { expect } from 'chai'
import { it, describe, test } from 'mocha'
import getDefaultControlOfField, {
  DEFAULTS,
  FIELD_TYPES, toApiFieldType
} from '../../../lib/constants/editor-interface-defaults/controls-defaults'

describe('controlsDefaults', () => {
  test('with an unsupported field type', () => {
    const field = { type: 'unsupportedtype' };
    expect(getDefaultControlOfField(field, 'displayfieldid')).toBeUndefined();
  });

  describe('if validations exist but are different', () => {
    const validations = [{ size: { max: 500, min: 0 } }];

    it('for a type with a dropdown widget', () => {
      const field = { type: 'Symbol', validations };
      expect(getDefaultControlOfField(field, 'displayfieldid')).toBe('singleLine');
    });

    it('for a type with no dropdown widget', () => {
      const field = { type: 'Date', validations };
      expect(getDefaultControlOfField(field, 'displayfieldid')).toBe('datePicker');
    });
  });

  describe('if validations exist', () => {
    const validations = [{ in: ['123'] }];

    it('for a type with a dropdown widget', () => {
      const field = { type: 'Symbol', validations };
      expect(getDefaultControlOfField(field, 'displayfieldid')).toBe('dropdown');
    });

    it('for a type with no dropdown widget', () => {
      const field = { type: 'Date', validations };
      expect(getDefaultControlOfField(field, 'displayfieldid')).toBe('datePicker');
    });
  });

  describe('if field is Text', () => {
    const field = { type: 'Text', id: 'textfield' };

    it('and is display field', () => {
      expect(getDefaultControlOfField(field, 'textfield')).toBe('singleLine');
    });

    it('is not a display field', () => {
      expect(getDefaultControlOfField(field, 'displayfieldid')).toBe('markdown');
    });
  });

  it('if field is RichText', () => {
    const field = { type: 'RichText' };
    expect(getDefaultControlOfField(field, 'displayfieldid')).toBe('richTextEditor');
  });

  it('if field is Entry', () => {
    const field = { type: 'Link', linkType: 'Entry' };
    expect(getDefaultControlOfField(field, 'displayfieldid')).toBe('entryLinkEditor');
  });

  it('if field is Asset', () => {
    const field = { type: 'Link', linkType: 'Asset' };
    expect(getDefaultControlOfField(field, 'displayfieldid')).toBe('assetLinkEditor');
  })

  it('if field is a list of Assets', () => {
    const field = { type: 'Array', items: { type: 'Link', linkType: 'Asset' } };
    expect(getDefaultControlOfField(field, 'displayfieldid')).toBe('assetLinksEditor');
  });

  it('if field is a list of Entries', () => {
    const field = { type: 'Array', items: { type: 'Link', linkType: 'Entry' } };
    expect(getDefaultControlOfField(field, 'displayfieldid')).toBe('entryLinksEditor');
  });

  it('if field is a File', () => {
    const field = { type: 'File' };
    expect(getDefaultControlOfField(field, 'displayfieldid')).toBe('fileEditor');
  });

  it('returns default widget ID for each known field type', () => {
    FIELD_TYPES.forEach((type) => {
      const id = getDefaultControlOfField(toApiFieldType(type), 'displayfieldid');
      expect(id).toBe(DEFAULTS[type]);
    });
  });

  it('declares default widget IDs for all known field types', () => {
    expect(Object.keys(DEFAULTS).sort()).toEqual(FIELD_TYPES.sort());
  });
});
