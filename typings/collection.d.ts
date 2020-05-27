// eslint:disable

import { DefaultElements } from './defaultElements'

export interface CollectionProp<TObj extends Record<string, any>> {
  total: number
  skip: number
  limit: number
  items: TObj[]
}

export interface Collection<TObj extends Record<string, any>>
  extends CollectionProp<TObj>,
    DefaultElements<CollectionProp<TObj>> {
  sys: {
    type: 'Array'
  }
}
