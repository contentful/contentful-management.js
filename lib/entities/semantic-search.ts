import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, Link, MakeRequest, SemanticRequestFilter } from '../common-types'

export type GetSemanticSearchProps = {
  query: string
  filter?: SemanticRequestFilter
}

export type SemanticSearchResult = {
  sys: {
    type: 'SemanticSearchResult'
    entity: Link<'Entry'>
    space: Link<'Space'>
    environment: Link<'Environment'>
  }
}

export type SemanticSearchProps = {
  sys: {
    type: 'Array'
    correlationId?: string
  }
  items: SemanticSearchResult[]
}

export interface SemanticSearch extends SemanticSearchProps, DefaultElements<SemanticSearchProps> {}

export function wrapSemanticSearch(
  _makeRequest: MakeRequest,
  data: SemanticSearchProps,
): SemanticSearch {
  const result = toPlainObject(copy(data))
  return freezeSys(result)
}
