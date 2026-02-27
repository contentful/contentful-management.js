/**
 * @module
 * @category Entities
 */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, Link, MakeRequest, SemanticRequestFilter } from '../common-types'

/** Parameters for requesting semantic reference suggestions for an entry field */
export type GetSemanticReferenceSuggestionsProps = {
  entityId: string
  referenceFieldId: string
  filter?: SemanticRequestFilter
}

/** A single semantic reference suggestion result */
export type SemanticReferenceSuggestionsResult = {
  sys: {
    type: 'SemanticReferenceSuggestionsResult'
    entity: Link<'Entry'>
    space: Link<'Space'>
    environment: Link<'Environment'>
  }
}

/** Properties of a semantic reference suggestions response */
export type SemanticReferenceSuggestionsProps = {
  sys: {
    type: 'Array'
    correlationId?: string
  }
  items: SemanticReferenceSuggestionsResult[]
}

/** A semantic reference suggestions result entity */
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
