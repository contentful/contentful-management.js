import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, Link, MakeRequest, SemanticRequestFilter } from '../common-types'

export type GetSemanticRecommendationsProps = {
  entityId: string
  filter?: SemanticRequestFilter
}

export type SemanticRecommendationsResult = {
  sys: {
    type: 'SemanticRecommendationsResult'
    entity: Link<'Entry'>
    space: Link<'Space'>
    environment: Link<'Environment'>
  }
}

export type SemanticRecommendationsProps = {
  sys: {
    type: 'Array'
    correlationId?: string
  }
  items: SemanticRecommendationsResult[]
}

export interface SemanticRecommendations
  extends SemanticRecommendationsProps,
    DefaultElements<SemanticRecommendationsProps> {}

export function wrapSemanticSearch(
  _makeRequest: MakeRequest,
  data: SemanticRecommendationsProps,
): SemanticRecommendations {
  const result = toPlainObject(copy(data))
  return freezeSys(result)
}
