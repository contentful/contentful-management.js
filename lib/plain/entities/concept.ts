import type {
  OpPatch,
  CursorPaginatedCollectionProp,
  DeleteConceptParams,
  GetConceptDescendantsParams,
  GetConceptParams,
  GetManyConceptParams,
  GetOrganizationParams,
  UpdateConceptParams,
} from '../../common-types'
import type { ConceptProps, CreateConceptProps } from '../../entities/concept'
import type { SetOptional } from 'type-fest'

export type ConceptPlainClientAPI = {
  /**
   * Create Concept
   * @returns ConceptProps
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/create-a-concept}
   * @example
   * ```javascript
   * const concept = await client.concept.create({
   *   organizationId: '<organization_id>',
   * }, conceptProps);
   * ```
   */
  create(
    params: SetOptional<GetOrganizationParams, 'organizationId'>,
    payload: CreateConceptProps,
  ): Promise<ConceptProps>

  /**
   * Create Concept With Id
   * @returns ConceptProps
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/create-a-concept-with-user-defined-id}
   * @example
   * ```javascript
   * const concept = await client.concept.createWithId({
   *   organizationId: '<organization_id>',
   *   conceptId: '<concept_id>',
   * }, conceptProps);
   * ```
   */
  createWithId(
    params: SetOptional<GetConceptParams, 'organizationId'>,
    payload: CreateConceptProps,
  ): Promise<ConceptProps>

  /**
   * Update Concept
   * @returns the updated Concept
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/concept}
   * @deprecated The behavior of this method as a PATCH is being deprecated, and will be replaced with a PUT in the next major version. Use the `patch` method instead.
   * @example
   * ```javascript
   * const updatedConcept = await client.concept.update({
   *   organizationId: '<organization_id>',
   *   conceptId: '<concept_id>',
   *   version: 1,
   * }, patch);
   * ```
   */
  update(
    params: SetOptional<UpdateConceptParams, 'organizationId'>,
    payload: OpPatch[],
  ): Promise<ConceptProps>

  /**
   * Update Concept with PUT
   * @returns the updated Concept
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/concept}
   * @deprecated In the next major version, this method will be replaced with the standard `update` method which will be updated to use PUT instead of PATCH.
   * @example
   * ```javascript
   * const updatedConcept = await client.concept.updatePut({
   *   organizationId: '<organization_id>',
   *   conceptId: '<concept_id>',
   *   version: 1,
   * }, patch);
   * ```
   */
  updatePut(
    params: SetOptional<UpdateConceptParams, 'organizationId'>,
    payload: CreateConceptProps,
  ): Promise<ConceptProps>

  /**
   * Update Concept
   * @returns the updated Concept
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/concept}
   * @example
   * ```javascript
   * const updatedConcept = await client.concept.patch({
   *   organizationId: '<organization_id>',
   *   conceptId: '<concept_id>',
   *   version: 1,
   * }, patch);
   * ```
   */
  patch(
    params: SetOptional<UpdateConceptParams, 'organizationId'>,
    payload: OpPatch[],
  ): Promise<ConceptProps>

  /**
   * Get Concept
   * @returns the Concept
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/concept}
   * @example
   * ```javascript
   * const concept = await client.concept.get({
   *   organizationId: '<organization_id>',
   *   conceptId: '<concept_id>',
   * });
   * ```
   */
  get(params: SetOptional<GetConceptParams, 'organizationId'>): Promise<ConceptProps>

  /**
   * Delete Concept
   * @returns nothing
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/concept}
   * @example
   * ```javascript
   * await client.concept.delete({
   *   conceptId: '<concept_id>',
   *   version: 1,
   * });
   * ```
   */
  delete(params: SetOptional<DeleteConceptParams, 'organizationId'>): Promise<void>

  /**
   * Get many Concepts
   * @returns list of many Concepts
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/concept-collection}
   * @example
   * ```javascript
   * const concepts = await client.concept.getMany({
   *   organizationId: '<organization_id>',
   * });
   * ```
   */
  getMany(
    params: SetOptional<GetManyConceptParams, 'organizationId'>,
  ): Promise<CursorPaginatedCollectionProp<ConceptProps>>

  /**
   * Get number of total Concept
   * @returns number of total Concept
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/total-concepts}
   * @example
   * ```javascript
   * const {total} = await client.concept.getTotal({
   *   organizationId: '<organization_id>',
   * });
   * ```
   */
  getTotal(params: SetOptional<GetOrganizationParams, 'organizationId'>): Promise<{ total: number }>

  /**
   * Get descendant Concepts
   * @returns list of Concepts
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/descendants}
   * @example
   * ```javascript
   * const concepts = await client.concept.getDescendants({
   *   organizationId: '<organization_id>',
   *   conceptId: '<concept_id>',
   * });
   * ```
   */
  getDescendants(
    params: SetOptional<GetConceptDescendantsParams, 'organizationId'>,
  ): Promise<CursorPaginatedCollectionProp<ConceptProps>>

  /**
   * Get ancestor Concepts
   * @returns list of ancestor Concepts
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/ancestors}
   * @example
   * ```javascript
   * const concepts = await client.concept.getAncestors({
   *   organizationId: '<organization_id>',
   *   conceptId: '<concept_id>',
   * });
   * ```
   */
  getAncestors(
    params: SetOptional<GetConceptDescendantsParams, 'organizationId'>,
  ): Promise<CursorPaginatedCollectionProp<ConceptProps>>
}
