import { ReleaseActionProps, ReleaseActionTypes } from '../entities/release-action'
import { PlainClientAPI } from '../plain/common-types'
import { AsyncActionProcessingOptions, pollAsyncActionStatus } from './action'

type PlainOptions = {
  /** Used by the PlainClient to perform a poll for the BulkAction status */
  plainClient: PlainClientAPI
  spaceId: string
  environmentId: string
  releaseId: string
  actionId: string
}

/** Waits for a ReleaseAction status to be either succeeded or failed.
 * Used by the Plain client */
export async function waitForReleaseActionProcessing<T extends ReleaseActionTypes = any>(
  { plainClient, spaceId, environmentId, releaseId, actionId }: PlainOptions,
  options?: AsyncActionProcessingOptions
): Promise<ReleaseActionProps<T>> {
  return pollAsyncActionStatus<ReleaseActionProps>(
    async () =>
      plainClient.releaseAction.get({
        releaseId,
        spaceId,
        environmentId,
        actionId,
      }),
    options
  )
}
