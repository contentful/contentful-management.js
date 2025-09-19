import type { RawAxiosRequestHeaders } from 'axios'
import type { GetSpaceEnvironmentParams, CollectionProp } from '../../common-types'
import type { OptionalDefaults } from '../wrappers/wrap'
import type {
  WorkflowsChangelogEntryProps,
  WorkflowsChangelogQueryOptions,
} from '../../entities/workflows-changelog-entry'

export type WorkflowsChangelogPlainClientAPI = {
  /**
   * Query records in the Workflows Changelog with certain filters
   * @param params entity IDs to identify the Space/Environment, query options to identify the entry for which the Workflow was executed, and optional filtering and pagination parameters
   * @returns an object containing the array of Workflow Changelogs
   * @throws if the request fails, or the Space/Environment is not found
   * @example
   * ```javascript
   * const records = await client.workflowsChangelog.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   query: {
   *     'entity.sys.linkType': 'entry',
   *     'entity.sys.id': '<entry_id>',
   *   }
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { query: WorkflowsChangelogQueryOptions }>,
    headers?: RawAxiosRequestHeaders,
  ): Promise<CollectionProp<WorkflowsChangelogEntryProps>>
}
