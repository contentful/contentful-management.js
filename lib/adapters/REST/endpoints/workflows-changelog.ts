import { AxiosInstance, RawAxiosRequestHeaders } from 'axios'
import { CollectionProp, GetSpaceEnvironmentParams } from '../../../common-types'
import {
  WorkflowsChangelogQueryOptions,
  WorkflowsChangelogEntryProps,
} from '../../../entities/workflows-changelog-entry'
import { RestEndpoint } from '../types'
import * as raw from './raw'

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
