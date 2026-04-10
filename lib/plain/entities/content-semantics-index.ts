/**
 * @module content-semantics-index
 * @category Plain Client
 */
import type {
  ContentSemanticsIndexProps,
  ContentSemanticsIndexCollectionProps,
  CreateContentSemanticsIndexProps,
} from '../../entities/content-semantics-index'
import type { OptionalDefaults } from '../wrappers/wrap'
import type {
  GetContentSemanticsIndexParams,
  GetManyContentSemanticsIndexParams,
  GetManyContentSemanticsIndexForEnvironmentParams,
  GetOrganizationParams,
} from '../../common-types'

export type ContentSemanticsIndexPlainClientAPI = {
  /**
   * Fetches a single search index by ID.
   * @param params Parameters including organizationId and indexId.
   * @returns A promise that resolves to the ContentSemanticsIndex.
   */
  get(params: OptionalDefaults<GetContentSemanticsIndexParams>): Promise<ContentSemanticsIndexProps>

  /**
   * Fetches all search indices for an organization.
   * @param params Parameters including organizationId and optional status filter.
   * @returns A promise that resolves to a collection of ContentSemanticsIndex.
   */
  getMany(
    params: OptionalDefaults<GetManyContentSemanticsIndexParams>,
  ): Promise<ContentSemanticsIndexCollectionProps>

  /**
   * Fetches all search indices for a specific environment.
   * @param params Parameters including spaceId, environmentId, and optional status filter.
   * @returns A promise that resolves to a collection of ContentSemanticsIndex.
   */
  getManyForEnvironment(
    params: OptionalDefaults<GetManyContentSemanticsIndexForEnvironmentParams>,
  ): Promise<ContentSemanticsIndexCollectionProps>

  /**
   * Creates a new search index for an organization.
   * @param params Parameters including organizationId.
   * @param payload Payload containing spaceId and locale.
   * @returns A promise that resolves to the created ContentSemanticsIndex.
   */
  create(
    params: OptionalDefaults<GetOrganizationParams>,
    payload: CreateContentSemanticsIndexProps,
  ): Promise<ContentSemanticsIndexProps>

  /**
   * Deletes a search index by ID.
   * @param params Parameters including organizationId and indexId.
   * @returns A promise that resolves when the index is deleted.
   */
  delete(params: OptionalDefaults<GetContentSemanticsIndexParams>): Promise<void>
}
