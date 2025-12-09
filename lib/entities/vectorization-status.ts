import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, Link, MakeRequest } from '../common-types'

export enum EmbeddingSetStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  DISABLED = 'DISABLED',
  DELETING = 'DELETING',
}

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

export type VectorizationStatusProps = {
  sys: {
    type: 'Array'
    correlationId?: string
  }
  items: SpaceVectorizationStatus[]
}

export type UpdateVectorizationStatusProps = {
  spaceId: string
  enabled: boolean
}[]

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
