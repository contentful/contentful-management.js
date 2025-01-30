import type {
  BulkActionPayload,
  BulkActionProps,
  BulkActionV2Payload,
} from '../entities/bulk-action'
import type { PlainClientAPI } from '../plain/common-types'
import type { AsyncActionProcessingOptions } from './action'
import { pollAsyncActionStatus } from './action'

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
  options?: AsyncActionProcessingOptions
): Promise<BulkActionProps<T>> {
  return pollAsyncActionStatus<BulkActionProps>(
    async () =>
      plainClient.bulkAction.get<T>({
        bulkActionId,
        spaceId,
        environmentId,
      }),
    options
  )
}

/** Waits for a BulkAction V2 status to be either succeeded or failed.
 * Used by the Plain client */
export async function waitForBulkActionV2Processing<T extends BulkActionV2Payload = any>(
  { plainClient, spaceId, environmentId, bulkActionId }: PlainOptions,
  options?: AsyncActionProcessingOptions
): Promise<BulkActionProps<T>> {
  return pollAsyncActionStatus<BulkActionProps>(
    async () =>
      plainClient.bulkAction.getV2({
        bulkActionId,
        spaceId,
        environmentId,
      }),
    options
  )
}
