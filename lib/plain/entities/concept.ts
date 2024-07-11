import {
  CursorPaginatedCollectionProp,
  DeleteConceptParams,
  GetConceptDescendantsParams,
  GetConceptParams,
  GetManyConceptParams,
  GetOrganizationParams,
  UpdateConceptParams,
} from '../../common-types'
import { ConceptProps, CreateConceptProps } from '../../entities/concept'
import { OpPatch } from 'json-patch'
import { SetOptional } from 'type-fest'

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
    payload: CreateConceptProps
  ): Promise<ConceptProps>

  /**
   * Update Concept
   * @returns the updated Concept
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/concept}
   * @example
   * ```javascript
   * const updatedConcept = await client.concept.update({
   *   organizationId: '<organization_id>',
   * }, patch);
   * ```
   */
  update(
    params: SetOptional<UpdateConceptParams, 'organizationId'>,
    payload: OpPatch[]
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
    params: SetOptional<GetManyConceptParams, 'organizationId'>
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
    params: SetOptional<GetConceptDescendantsParams, 'organizationId'>
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
    params: SetOptional<GetConceptDescendantsParams, 'organizationId'>
  ): Promise<CursorPaginatedCollectionProp<ConceptProps>>
}
