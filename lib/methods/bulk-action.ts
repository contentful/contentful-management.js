import delay from 'delay'
import {
  BulkAction,
  BulkActionPayload,
  BulkActionProps,
  BulkActionStatus,
} from '../entities/bulk-action'
import { PlainClientAPI } from '../plain/common-types'

const DEFAULT_MAX_RETRIES = 30
const DEFAULT_INITIAL_DELAY_MS = 1000
const DEFAULT_RETRY_INTERVAL_MS = 2000

export class BulkActionProcessingError extends Error {
  public bulkAction?: BulkAction | BulkActionProps

  constructor(message: string, bulkAction?: BulkAction | BulkActionProps) {
    super(message)
    this.bulkAction = bulkAction
    this.name = 'BulkActionProcessingError'
  }
}

export type BulkActionProcessingOptions = {
  /** The amount of times to retry. Defaults to 30 */
  retryCount?: number
  /** The interval between retries, in milliseconds (ms). Defaults to 2000 (2s) */
  retryIntervalMs?: number
  /**
   * Initial delay in milliseconds when performing the first check.
   * This is used to prevent short running bulkActions of waiting too long for a result.
   * Defaults to 1000ms (1s)
   * */
  initialDelayMs?: number
}

/**
 * @private
 * @description Waits for a BulkAction to be completed and to be in one of the final states (failed or succeeded)
 * @param {Function} fn - GET function that will be called every interval to fetch a bulkAction status
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

  // Initial delay for short-running BulkActions
  await delay(initialDelayMs)

  while (retryCount < maxRetries && !done) {
    action = await getBulkActionFunction()

    // Terminal states
    if (
      action &&
      [BulkActionStatus.succeeded, BulkActionStatus.failed].includes(action.sys.status)
    ) {
      done = true
      return action
    }

    await delay(retryIntervalMs)
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
