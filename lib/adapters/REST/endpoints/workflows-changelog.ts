import type { AxiosInstance, RawAxiosRequestHeaders } from 'axios'
import type { CollectionProp, GetSpaceEnvironmentParams } from '../../../common-types.js'
import type {
  WorkflowsChangelogQueryOptions,
  WorkflowsChangelogEntryProps,
} from '../../../entities/workflows-changelog-entry.js'
import type { RestEndpoint } from '../types.js'
import * as raw from './raw.js'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/workflows_changelog`

export const getMany: RestEndpoint<'WorkflowsChangelog', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query: WorkflowsChangelogQueryOptions },
  headers?: RawAxiosRequestHeaders
) =>
  raw.get<CollectionProp<WorkflowsChangelogEntryProps>>(http, getBaseUrl(params), {
    headers,
    params: params.query,
  })
