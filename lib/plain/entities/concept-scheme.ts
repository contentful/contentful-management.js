import type {
  CursorPaginatedCollectionProp,
  DeleteConceptSchemeParams,
  GetConceptSchemeParams,
  GetManyConceptSchemeParams,
  GetOrganizationParams,
  UpdateConceptSchemeParams,
} from '../../common-types.js'
import type { ConceptSchemeProps, CreateConceptSchemeProps } from '../../entities/concept-scheme.js'
import type { OpPatch } from 'json-patch'
import type { SetOptional } from 'type-fest'

export type ConceptSchemePlainClientAPI = {
  /**
   * Create Concept Scheme
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
    params: SetOptional<GetOrganizationParams, 'organizationId'>,
    payload: CreateConceptSchemeProps,
  ): Promise<ConceptSchemeProps>

  /**
   * Create Concept Scheme With Id
   * @returns the created Concept Scheme
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/create-a-concept-scheme-with-user-defined-id}
   * @example
   * ```javascript
   * const concept = await client.conceptScheme.createWithId({
   *   organizationId: '<organization_id>',
   *   conceptSchemeId: '<concept_scheme_id>',
   * }, conceptSchemeProps);
   * ```
   */
  createWithId(
    params: SetOptional<GetConceptSchemeParams, 'organizationId'>,
    payload: CreateConceptSchemeProps,
  ): Promise<ConceptSchemeProps>

  /**
   * Update Concept Scheme with PUT
   * @returns the updated Concept Scheme
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/concept-scheme}
   * @example
   * ```javascript
   * const updatedConcept = await client.conceptScheme.update({
   *   organizationId: '<organization_id>',
   *   conceptSchemeId: '<concept_scheme_id>',
   *   version: 1,
   * }, conceptSchemeProps);
   * ```
   */
  update(
    params: SetOptional<UpdateConceptSchemeParams, 'organizationId'>,
    payload: CreateConceptSchemeProps,
  ): Promise<ConceptSchemeProps>

  /**
   * Update Concept Scheme with PATCH
   * @returns the updated Concept Scheme
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/concept-scheme}
   * @example
   * ```javascript
   * const updatedConcept = await client.conceptScheme.patch({
   *   organizationId: '<organization_id>',
   *   conceptSchemeId: '<concept_scheme_id>',
   *   version: 1,
   * }, conceptSchemePatch);
   * ```
   */
  patch(
    params: SetOptional<UpdateConceptSchemeParams, 'organizationId'>,
    payload: OpPatch[],
  ): Promise<ConceptSchemeProps>

  /**
   * Get Concept Scheme
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
  get(params: SetOptional<GetConceptSchemeParams, 'organizationId'>): Promise<ConceptSchemeProps>

  /**
   * Get many Concept Schemes
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
    params: SetOptional<GetManyConceptSchemeParams, 'organizationId'>,
  ): Promise<CursorPaginatedCollectionProp<ConceptSchemeProps>>

  /**
   * Get number of total Concept Scheme
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
  getTotal(params: SetOptional<GetOrganizationParams, 'organizationId'>): Promise<{ total: number }>

  /**
   * Delete Concept Scheme
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
  delete(params: SetOptional<DeleteConceptSchemeParams, 'organizationId'>): Promise<void>
}
