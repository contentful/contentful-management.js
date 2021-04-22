import {
  BulkAction,
  BulkActionPayload,
  BulkActionProps,
  BulkActionStatus,
} from '../entities/bulk-action'
import { PlainClientAPI } from '../plain/common-types'
import { sleep } from './utils'

const DEFAULT_MAX_RETRIES = 30
const DEFAULT_INITIAL_DELAY_MS = 1000
const DEFAULT_RETRY_INTERVAL_MS = 2000

export class BulkActionProcessingError extends Error {
  public bulkAction?: BulkAction | BulkActionProps

  constructor(message: string, bulkAction?: BulkAction | BulkActionProps) {
    super(message)
    this.bulkAction = bulkAction
    this.name = this.constructor.name
  }
}

export class BulkActionFailedError extends BulkActionProcessingError {}

export type BulkActionProcessingOptions = {
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
   * Throws an error if the BulkAction does not complete with a successful (succeeded) status.
   * @default true
   */
  throwOnFailedExecution?: boolean
}

/**
 * @private
 * @description Waits for a BulkAction to be completed and to be in one of the final states (failed or succeeded)
 * @param {Function} fn - GET function that will be called every interval to fetch a bulkAction status
 * @throws {BulkActionFailedError} throws an error if `throwOnFailedExecution = true` with the bulkAction that failed.
 * @throws {BulkActionProcessingError} throws an error with a bulkAction when processing takes too long.
 */
export async function pollBulkActionStatus(
  getBulkActionFunction: () => Promise<BulkActionProps | BulkAction>,
  options?: BulkActionProcessingOptions
): Promise<BulkActionProps> {
  let retryCount = 0
  let done = false
  let action: BulkAction | BulkActionProps | undefined

  const maxRetries = options?.retryCount ?? DEFAULT_MAX_RETRIES
  const retryIntervalMs = options?.retryIntervalMs ?? DEFAULT_RETRY_INTERVAL_MS
  const initialDelayMs = options?.initialDelayMs ?? DEFAULT_INITIAL_DELAY_MS
  const throwOnFailedExecution = options?.throwOnFailedExecution ?? true

  // Initial delay for short-running BulkActions
  await sleep(initialDelayMs)

  while (retryCount < maxRetries && !done) {
    action = await getBulkActionFunction()

    // Terminal states
    if (
      action &&
      [BulkActionStatus.succeeded, BulkActionStatus.failed].includes(action.sys.status)
    ) {
      done = true

      if (action.sys.status === BulkActionStatus.failed && throwOnFailedExecution) {
        throw new BulkActionFailedError('BulkAction failed to execute.', action)
      }

      return action
    }

    await sleep(retryIntervalMs)
    retryCount += 1
  }

  throw new BulkActionProcessingError(
    "BulkAction didn't finish processing within the expected timeframe.",
    action
  )
}

type PlainOptions = {
  /** Used by the PlainClient to perform a poll for the BulkAction status */
  plainClient: PlainClientAPI
  spaceId: string
  environmentId: string
  bulkActionId: string
}

/** Waits for a BulkAction status to be either succeeded or failed.
 * Used by the Plain client */
export async function waitForBulkActionProcessing<T extends BulkActionPayload = any>(
  { plainClient, spaceId, environmentId, bulkActionId }: PlainOptions,
  options?: BulkActionProcessingOptions
): Promise<BulkActionProps<T>> {
  return pollBulkActionStatus(
    async () =>
      plainClient.bulkAction.get<T>({
        bulkActionId,
        spaceId,
        environmentId,
      }),
    options
  )
}
