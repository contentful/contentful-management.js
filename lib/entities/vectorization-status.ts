/**
 * @module
 * @category Entities
 */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, Link, MakeRequest } from '../common-types'

/** Status of an embedding set for vectorization */
export enum EmbeddingSetStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  DISABLED = 'DISABLED',
  DELETING = 'DELETING',
}

/** Vectorization status for a single space */
export type SpaceVectorizationStatus = {
  sys: {
    space: Link<'Space'>
    status: EmbeddingSetStatus
    type: 'VectorizationStatus'
    createdAt: string
    updatedAt: string
    disabledAt?: string
  }
}

/** Properties of a vectorization status response */
export type VectorizationStatusProps = {
  sys: {
    type: 'Array'
    correlationId?: string
  }
  items: SpaceVectorizationStatus[]
}

/** Properties for updating vectorization status for one or more spaces */
export type UpdateVectorizationStatusProps = {
  spaceId: string
  enabled: boolean
}[]

/** A vectorization status entity */
export interface VectorizationStatus
  extends VectorizationStatusProps,
    DefaultElements<VectorizationStatusProps> {}

export function wrapVectorizationStatus(
  _makeRequest: MakeRequest,
  data: VectorizationStatusProps,
): VectorizationStatus {
  const vectorizationStatus = toPlainObject(copy(data))
  return freezeSys(vectorizationStatus)
}
