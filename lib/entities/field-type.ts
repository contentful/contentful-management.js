export type FieldType =
  | { type: 'Symbol' }
  | { type: 'Text' }
  | { type: 'RichText' }
  | { type: 'Integer' }
  | { type: 'Number' }
  | { type: 'Date' }
  | { type: 'Boolean' }
  | { type: 'Object' }
  | { type: 'Location' }
  | { type: 'Link'; linkType: 'Asset' }
  | { type: 'Link'; linkType: 'Entry' }
  | { type: 'ResourceLink'; linkType: 'Contentful:entry' }
  | { type: 'Array'; items: { type: 'Symbol' } }
  | { type: 'Array'; items: { type: 'Link'; linkType: 'Entry' } }
  | { type: 'Array'; items: { type: 'Resourcelink'; linkType: 'Contentful:Entry' } }
  | { type: 'Array'; items: { type: 'Link'; linkType: 'Asset' } }
