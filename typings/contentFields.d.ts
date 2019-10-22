export interface Validation {
  linkContentType: string[],
}

export interface Item {
  type: string,
  linkType: string,
  validations: Validation[],
}

export interface ContentFields extends Item {
  id: string,
  name: string,
  required: boolean,
  localized: boolean,
  disabled: boolean,
  omitted: boolean,
  items: Item
}
