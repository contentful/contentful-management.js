import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, MakeRequest } from '../common-types'
import { wrapCollection } from '../common-utils'

/**
 * Raw data representation of an AI Action Invocation.
 */
export type AiActionInvocationProps = {
  sys: {
    errorCode?: string
    status: 'SCHEDULED' | 'IN_PROGRESS' | 'FAILED' | 'COMPLETED' | 'CANCELLED'
    aiAction: { sys: { id: string; linkType: 'AiAction'; type: 'Link' } }
    environment: { sys: { id: string; linkType: 'Environment'; type: 'Link' } }
    space: { sys: { id: string; linkType: 'Space'; type: 'Link' } }
    type: 'AiActionInvocation'
    id: string
    version?: number
  }
  /**
   * The result of the AI Action invocation. Its structure may vary,
   * for simplicity we use `any` or you could refine it further as needed.
   */
  result: {
    content: string | any
    type: string
    metadata: any
  }
}

export type AiActionInvocationType = {
  outputFormat?: 'RichText' | 'Markdown' | 'PlainText'
  variables?: Array<
    | {
        value?: string
        id?: string
      }
    | {
        value?: {
          entityPath?: string
          entityType?: 'Entry' | 'Asset' | 'ResourceLink'
          entityId?: string
        }
        id?: string
      }
    | {
        value?: {
          entityPaths?: Array<string>
          entityType?: 'Entry'
          entityId?: string
        }
        id?: string
      }
  >
}

/**
 * The AI Action Invocation entity.
 * This entity is read-only and primarily used to inspect the result of an AI action invocation.
 */
export interface AiActionInvocation
  extends AiActionInvocationProps,
    DefaultElements<AiActionInvocationProps> {
  // Optionally, add any helper methods specific to AI Action Invocations here.
}

/**
 * Wraps raw AI Action Invocation data with SDK helper methods.
 *
 * @param makeRequest - Function to make API requests.
 * @param data - Raw AI Action Invocation data.
 * @returns The AI Action Invocation entity.
 */
export function wrapAiActionInvocation(
  makeRequest: MakeRequest,
  data: AiActionInvocationProps
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
