import { BulkActionPayload, BulkActionProps } from '../entities/bulk-action'
import { PlainClientAPI } from '../plain/common-types'
import { AsyncActionProcessingOptions, pollAsyncActionStatus } from './action'

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
