import type { AxiosInstance } from 'contentful-sdk-core'
import type { GetOrganizationParams } from '../../../common-types'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import type { ContentSemanticsSettingsProps } from '../../../entities/semantic-settings'

export const get: RestEndpoint<'SemanticSettings', 'get'> = (
  http: AxiosInstance,
  params: GetOrganizationParams,
) => {
  return raw.get<ContentSemanticsSettingsProps>(
    http,
    `/organizations/${params.organizationId}/semantic/settings`,
  )
}
