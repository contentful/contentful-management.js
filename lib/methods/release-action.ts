import { ReleaseAction, ReleaseActionProps } from '../entities/release-action'
import { PlainClientAPI } from '../plain/common-types'
import { sleep } from './utils'

const DEFAULT_MAX_RETRIES = 30
const DEFAULT_INITIAL_DELAY_MS = 1000
const DEFAULT_RETRY_INTERVAL_MS = 2000

export class ReleaseActionProcessingError extends Error {
  public releaseAction?: ReleaseAction | ReleaseActionProps

  constructor(message: string, releaseAction?: ReleaseAction | ReleaseActionProps) {
    super(message)
    this.releaseAction = releaseAction
    this.name = this.constructor.name
  }
}

export class ReleaseActionFailedError extends ReleaseActionProcessingError {}

export type ReleaseActionProcessingOptions = {
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
   * Throws an error if the ReleaseAction does not complete with a successful (succeeded) status.
   * @default true
   */
  throwOnFailedExecution?: boolean
}

/**
 * @private
 * @description Waits for a ReleaseAction to be completed and to be in one of the final states (failed or succeeded)
 * @param {Function} fn - GET function that will be called every interval to fetch a bulkAction status
 * @throws {ReleaseActionFailedError} throws an error if `throwOnFailedExecution = true` with the bulkAction that failed.
 * @throws {ReleaseActionProcessingError} throws an error with a bulkAction when processing takes too long.
 */
export async function pollReleaseActionStatus(
  getReleaseActionFunction: () => Promise<ReleaseActionProps | ReleaseAction>,
  options?: ReleaseActionProcessingOptions
): Promise<ReleaseActionProps> {
  let retryCount = 0
  let done = false
  let action: ReleaseAction | ReleaseActionProps | undefined

  const maxRetries = options?.retryCount ?? DEFAULT_MAX_RETRIES
  const retryIntervalMs = options?.retryIntervalMs ?? DEFAULT_RETRY_INTERVAL_MS
  const initialDelayMs = options?.initialDelayMs ?? DEFAULT_INITIAL_DELAY_MS
  const throwOnFailedExecution = options?.throwOnFailedExecution ?? true

  // Initial delay for short-running ReleaseActions
  await sleep(initialDelayMs)

  while (retryCount < maxRetries && !done) {
    action = await getReleaseActionFunction()

    // Terminal states
    if (action && ['succeeded', 'failed'].includes(action.sys.status)) {
      done = true

      if (action.sys.status === 'failed' && throwOnFailedExecution) {
        throw new ReleaseActionFailedError('ReleaseAction failed to execute.', action)
      }

      return action
    }

    await sleep(retryIntervalMs)
    retryCount += 1
  }

  throw new ReleaseActionProcessingError(
    "ReleaseAction didn't finish processing within the expected timeframe.",
    action
  )
}

type PlainOptions = {
  /** Used by the PlainClient to perform a poll for the ReleaseAction status */
  plainClient: PlainClientAPI
  spaceId: string
  environmentId: string
  releaseId: string
  actionId: string
}

/** Waits for a ReleaseAction status to be either succeeded or failed.
 * Used by the Plain client */
export async function waitForReleaseActionProcessing(
  { plainClient, spaceId, environmentId, releaseId, actionId }: PlainOptions,
  options?: ReleaseActionProcessingOptions
): Promise<ReleaseActionProps> {
  return pollReleaseActionStatus(
    async () =>
      plainClient.releaseAction.get({
        spaceId,
        environmentId,
        releaseId,
        actionId,
      }),
    options
  )
}
