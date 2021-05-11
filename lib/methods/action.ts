/* eslint-disable @typescript-eslint/no-explicit-any */
import { sleep } from './utils'

const DEFAULT_MAX_RETRIES = 30
const DEFAULT_INITIAL_DELAY_MS = 1000
const DEFAULT_RETRY_INTERVAL_MS = 2000

/** Action is an interface that has a sys.status to be checked against */
interface Action extends Record<string, any> {
  sys: {
    status: string
  }
}

export class ActionProcessingError extends Error {
  public action?: Action

  constructor(message: string, action?: Action) {
    super(message)
    this.action = action
    this.name = this.constructor.name
  }
}

export class ActionFailedError extends ActionProcessingError {}

export type ActionProcessingOptions = {
  /** The amount of times to retry.
   * @default 30
   * */
  retryCount?: number
  /** The interval between retries, in milliseconds (ms).
   * @default 2000 (2s)
   * */
  retryIntervalMs?: number
  /**
   * Initial delay in milliseconds when performing the first check.
   * This is used to prevent short running bulkActions of waiting too long for a result.
   * @default 1000 (1s)
   * */
  initialDelayMs?: number
  /**
   * Throws an error if the Action does not complete with a successful (succeeded) status.
   * @default true
   */
  throwOnFailedExecution?: boolean
}

/**
 * @private
 * @description Waits for an Action to be completed and to be in one of the final states (failed or succeeded)
 * @param {Function} fn - GET function that will be called every interval to fetch an Action status
 * @throws {ActionFailedError} throws an error if `throwOnFailedExecution = true` with the Action that failed.
 * @throws {ActionProcessingError} throws an error with a Action when processing takes too long.
 */
export async function pollAsyncActionStatus<T extends Action = any>(
  actionFunction: () => Promise<T>,
  options?: ActionProcessingOptions
): Promise<T> {
  let retryCount = 0
  let done = false
  let action: T | undefined

  const maxRetries = options?.retryCount ?? DEFAULT_MAX_RETRIES
  const retryIntervalMs = options?.retryIntervalMs ?? DEFAULT_RETRY_INTERVAL_MS
  const initialDelayMs = options?.initialDelayMs ?? DEFAULT_INITIAL_DELAY_MS
  const throwOnFailedExecution = options?.throwOnFailedExecution ?? true

  // Initial delay for short-running Actions
  await sleep(initialDelayMs)

  while (retryCount < maxRetries && !done) {
    action = await actionFunction()

    // Terminal states
    if (action && ['succeeded', 'failed'].includes(action.sys.status)) {
      done = true

      if (action.sys.status === 'failed' && throwOnFailedExecution) {
        throw new ActionFailedError('Action failed to execute.', action)
      }

      return action
    }

    await sleep(retryIntervalMs)
    retryCount += 1
  }

  throw new ActionProcessingError(
    "Action didn't finish processing within the expected timeframe.",
    action
  )
}
