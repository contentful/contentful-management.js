import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, Link, MakeRequest, SemanticRequestFilter } from '../common-types'

export type DuplicateLabel = 'high' | 'medium' | 'low'

export type GetSemanticDuplicatesProps = {
  entityId: string
  filter?: SemanticRequestFilter
}

export type SemanticDuplicatesResult = {
  sys: {
    type: 'SemanticDuplicatesResult'
    entity: Link<'Entry'>
    space: Link<'Space'>
    environment: Link<'Environment'>
  }
  label: DuplicateLabel
}

export type SemanticDuplicatesProps = {
  sys: {
    type: 'Array'
    correlationId?: string
  }
  items: SemanticDuplicatesResult[]
}

export interface SemanticDuplicates
  extends SemanticDuplicatesProps,
    DefaultElements<SemanticDuplicatesProps> {}

export function wrapSemanticDuplicates(
  _makeRequest: MakeRequest,
  data: SemanticDuplicatesProps,
): SemanticDuplicates {
  const result = toPlainObject(copy(data))
  return freezeSys(result)
}
