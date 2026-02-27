/**
 * @module
 * @category Entities
 */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, Link, MakeRequest, SemanticRequestFilter } from '../common-types'

export type GetSemanticReferenceSuggestionsProps = {
  entityId: string
  referenceFieldId: string
  filter?: SemanticRequestFilter
}

export type SemanticReferenceSuggestionsResult = {
  sys: {
    type: 'SemanticReferenceSuggestionsResult'
    entity: Link<'Entry'>
    space: Link<'Space'>
    environment: Link<'Environment'>
  }
}

export type SemanticReferenceSuggestionsProps = {
  sys: {
    type: 'Array'
    correlationId?: string
  }
  items: SemanticReferenceSuggestionsResult[]
}

export interface SemanticReferenceSuggestions
  extends SemanticReferenceSuggestionsProps,
    DefaultElements<SemanticReferenceSuggestionsProps> {}

export function wrapSemanticReferenceSuggestions(
  _makeRequest: MakeRequest,
  data: SemanticReferenceSuggestionsProps,
): SemanticReferenceSuggestions {
  const result = toPlainObject(copy(data))
  return freezeSys(result)
}
