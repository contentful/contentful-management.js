import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { Link, MakeRequest } from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'

export enum EmbeddingSetStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  DISABLED = 'DISABLED',
  DELETING = 'DELETING'
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

export interface VectorizationStatus extends VectorizationStatusProps {}

function createVectorizationStatusApi(makeRequest: MakeRequest) {}

export function wrapVectorizationStatus(makeRequest: MakeRequest, data: VectorizationStatusProps): VectorizationStatus {
  const vectorizationStatus = toPlainObject(copy(data))
  const vectorizationStatusWithMethods = enhanceWithMethods(vectorizationStatus, createVectorizationStatusApi(makeRequest))
  return freezeSys(vectorizationStatusWithMethods)
}