import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, MakeRequest, SysLink } from '../common-types'
import { wrapCollection } from '../common-utils'
import type { Document as RichTextDocument } from '@contentful/rich-text-types'

export type InvocationStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'FAILED' | 'COMPLETED' | 'CANCELLED'

export type InvocationResultType = 'text'

export const AiActionOutputFormat = {
  RichText: 'RichText',
  Markdown: 'Markdown',
  PlainText: 'PlainText',
} as const

export type AiActionOutputFormatType =
  (typeof AiActionOutputFormat)[keyof typeof AiActionOutputFormat]

export type AiActionInvocationMetadata = {
  invocationResult?: {
    modelProvider?: string
    modelId?: string
    wordCount?: number
    outputFormat?: AiActionOutputFormatType
  }
  statusChangedDates?: {
    status: InvocationStatus
    date: string
  }[]
}

export interface InvocationResult {
  content: string | RichTextDocument
  type: InvocationResultType
  metadata: AiActionInvocationMetadata
}

export type AiActionInvocationProps = {
  sys: {
    id: string
    type: 'AiActionInvocation'
    space: SysLink
    environment: SysLink
    aiAction: SysLink
    status: InvocationStatus
    errorCode?: string
  }
  result?: InvocationResult
}

export type AiActionTextVariable = {
  id: string
  value: string
}

export type AiActionEntityLinkVariable = {
  id: string
  value: {
    sys: {
      type: 'Link'
      linkType: 'Entry' | 'Asset' | 'ResourceLink'
      id: string
      release?: SysLink
      /** JSON Pointers to entity fields, e.g. `"/fields/title/en-US"` */
      entityPaths?: Array<string>
    }
  }
}

/** @deprecated Use `AiActionEntityLinkVariable` with the sys-nested format instead. */
export type AiActionLegacyEntityPathVariable = {
  id: string
  value: {
    entityPath: string
    entityType: 'Entry' | 'Asset' | 'ResourceLink'
    entityId: string
  }
}

/** @deprecated Use `AiActionEntityLinkVariable` with the sys-nested format instead. */
export type AiActionLegacyEntityPathsVariable = {
  id: string
  value: {
    entityPaths: Array<string>
    entityType: 'Entry'
    entityId: string
  }
}

export type AiActionInvocationVariable =
  | AiActionTextVariable
  | AiActionEntityLinkVariable
  | AiActionLegacyEntityPathVariable
  | AiActionLegacyEntityPathsVariable

export type AiActionInvocationType = {
  outputFormat?: 'RichText' | 'Markdown' | 'PlainText'
  variables?: Array<AiActionInvocationVariable>
}

/**
 * The AI Action Invocation entity.
 * This entity is read-only and primarily used to inspect the result of an AI action invocation.
 */
export interface AiActionInvocation
  extends AiActionInvocationProps,
    DefaultElements<AiActionInvocationProps> {}

/**
 * Wraps raw AI Action Invocation data with SDK helper methods.
 *
 * @param makeRequest - Function to make API requests.
 * @param data - Raw AI Action Invocation data.
 * @returns The AI Action Invocation entity.
 */
export function wrapAiActionInvocation(
  makeRequest: MakeRequest,
  data: AiActionInvocationProps,
): AiActionInvocation {
  const invocation = toPlainObject(copy(data))
  return freezeSys(invocation)
}

/**
 * Wraps a collection of raw AI Action Invocation data.
 *
 * @param makeRequest - Function to make API requests.
 * @param data - Raw collection data.
 * @returns A collection of AI Action Invocation entities.
 */
export const wrapAiActionInvocationCollection = wrapCollection(wrapAiActionInvocation)
