/**
 * @module
 * @category Entities
 */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, Link, MakeRequest, SemanticRequestFilter } from '../common-types'

/** Parameters for requesting semantic recommendations for an entry */
export type GetSemanticRecommendationsProps = {
  entityId: string
  filter?: SemanticRequestFilter
}

/** A single semantic recommendation result */
export type SemanticRecommendationsResult = {
  sys: {
    type: 'SemanticRecommendationsResult'
    entity: Link<'Entry'>
    space: Link<'Space'>
    environment: Link<'Environment'>
  }
}

/** Properties of a semantic recommendations response containing matched entries */
export type SemanticRecommendationsProps = {
  sys: {
    type: 'Array'
    correlationId?: string
  }
  items: SemanticRecommendationsResult[]
}

/** A semantic recommendations result entity */
export interface SemanticRecommendations
  extends SemanticRecommendationsProps,
    DefaultElements<SemanticRecommendationsProps> {}

export function wrapSemanticRecommendations(
  _makeRequest: MakeRequest,
  data: SemanticRecommendationsProps,
): SemanticRecommendations {
  const result = toPlainObject(copy(data))
  return freezeSys(result)
}
