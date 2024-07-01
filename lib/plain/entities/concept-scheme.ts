import { OptionalDefaults } from '../wrappers/wrap'
import {
  CursorPaginatedCollectionProp,
  DeleteConceptSchemeParams,
  GetConceptSchemeParams,
  GetManyConceptSchemeParams,
  GetOrganizationParams,
  UpdateConceptSchemeParams,
} from '../../common-types'
import { ConceptSchemeProps, CreateConceptSchemeProps } from '../../entities/concept-scheme'
import { Patch } from 'json-patch'

export type ConceptSchemePlainClientAPI = {
  /**
   * Create Concept Scheme
   * @param payload the Concept Scheme
   * @returns the created Concept Scheme
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/create-a-concept-scheme}
   * @example
   * ```javascript
   * const concept = await client.conceptScheme.create({
   *   organizationId: '<organization_id>',
   * }, conceptSchemeProps);
   * ```
   */
  create(
    params: OptionalDefaults<GetOrganizationParams>,
    payload: CreateConceptSchemeProps
  ): Promise<ConceptSchemeProps>

  /**
   * Update Concept Scheme
   * @param params Concept Scheme ID and Concept Scheme version
   * @param payload Concept Scheme patch
   * @returns the updated Concept Scheme
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/concept-scheme}
   * @example
   * ```javascript
   * const updatedConcept = await client.conceptScheme.update({
   *   organizationId: '<organization_id>',
   * }, conceptSchemePatch);
   * ```
   */
  update(
    params: OptionalDefaults<UpdateConceptSchemeParams>,
    payload: Patch
  ): Promise<ConceptSchemeProps>

  /**
   * Get Concept Scheme
   * @param params Concept Scheme ID
   * @returns the Concept Scheme
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/concept-scheme}
   * @example
   * ```javascript
   * const concept = await client.conceptScheme.get({
   *   organizationId: '<organization_id>',
   *   conceptSchemeId: '<concept_scheme_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetConceptSchemeParams>): Promise<ConceptSchemeProps>

  /**
   * Get many Concept Schemes
   * @param query parameters
   * @returns list of many Concept Schemes
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/concept-scheme-collection}
   * @example
   * ```javascript
   * const concepts = await client.conceptScheme.getMany({
   *   organizationId: '<organization_id>',
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetManyConceptSchemeParams>
  ): Promise<CursorPaginatedCollectionProp<ConceptSchemeProps>>

  /**
   * Get number of total Concept Scheme
   * @param no parameters
   * @returns number of total Concept Scheme
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/total-concept-schemes}
   * @example
   * ```javascript
   * const {total} = await client.conceptScheme.getTotal({
   *   organizationId: '<organization_id>',
   * });
   * ```
   */
  getTotal(params: OptionalDefaults<GetOrganizationParams>): Promise<{ total: number }>

  /**
   * Delete Concept Scheme
   * @param Concept Scheme ID
   * @returns nothing
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/concept-scheme}
   * @example
   * ```javascript
   * await client.conceptScheme.update({
   *   organizationId: '<organization_id>',
   *   conceptSchemeId: '<concept_scheme_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<DeleteConceptSchemeParams>): Promise<unknown>
}
