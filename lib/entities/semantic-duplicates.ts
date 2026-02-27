/**
 * @module
 * @category Entities
 */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, Link, MakeRequest, SemanticRequestFilter } from '../common-types'

/** Confidence level of a semantic duplicate match */
export type DuplicateLabel = 'high' | 'medium' | 'low'

/** Parameters for requesting semantic duplicates of an entry */
export type GetSemanticDuplicatesProps = {
  entityId: string
  filter?: SemanticRequestFilter
}

/** A single semantic duplicate result with confidence label */
export type SemanticDuplicatesResult = {
  sys: {
    type: 'SemanticDuplicatesResult'
    entity: Link<'Entry'>
    space: Link<'Space'>
    environment: Link<'Environment'>
  }
  label: DuplicateLabel
}

/** Properties of a semantic duplicates response containing matched entries */
export type SemanticDuplicatesProps = {
  sys: {
    type: 'Array'
    correlationId?: string
  }
  items: SemanticDuplicatesResult[]
}

/** A semantic duplicates result entity */
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
