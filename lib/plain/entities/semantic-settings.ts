/**
 * @module semantic-settings
 * @category Plain Client
 */
import type { ContentSemanticsSettingsProps } from '../../entities/semantic-settings'
import type { OptionalDefaults } from '../wrappers/wrap'
import type { GetOrganizationParams } from '../../common-types'

export type SemanticSettingsPlainClientAPI = {
  /**
   * Fetches the semantic settings for an organization.
   * @param params Parameters for getting the organization.
   * @returns A promise that resolves to the semantic settings.
   */
  get(params: OptionalDefaults<GetOrganizationParams>): Promise<ContentSemanticsSettingsProps>
}
