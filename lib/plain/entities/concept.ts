import {
  CursorPaginatedCollectionProp,
  DeleteConceptParams,
  GetConceptDescendantsParams,
  GetConceptParams,
  GetManyConceptParams,
  GetOrganizationParams,
} from '../../common-types'
import { ConceptProps, CreateConceptProps } from '../../entities/concept'
import { OptionalDefaults } from '../wrappers/wrap'
import { Patch } from 'json-patch'

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
    params: OptionalDefaults<GetOrganizationParams>,
    payload: CreateConceptProps
  ): Promise<ConceptProps>

  /**
   * Update Concept
   * @param Concept patch
   * @returns the updated Concept
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/concept}
   * @example
   * ```javascript
   * const updatedConcept = await client.concept.update({
   *   organizationId: '<organization_id>',
   * }, conceptPatch);
   * ```
   */
  update(params: OptionalDefaults<GetConceptParams>, payload: Patch): Promise<ConceptProps>

  /**
   * Get Concept
   * @param Concept ID
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
  get(params: OptionalDefaults<GetConceptParams>): Promise<ConceptProps>

  /**
   * Delete Concept
   * @param Concept ID
   * @returns nothing
   * @throws if the request fails
   * @see {@link https://www.contentful.com/developers/docs/references/content-management-api/#/reference/taxonomy/concept}
   * @example
   * ```javascript
   * await client.concept.update({
   *   organizationId: '<organization_id>',
   *   conceptId: '<concept_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<DeleteConceptParams>): Promise<unknown>

  /**
   * Get many Concepts
   * @param query by string or ConceptScheme ID
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
    params: OptionalDefaults<GetManyConceptParams>
  ): Promise<CursorPaginatedCollectionProp<ConceptProps>>

  /**
   * Get number of total Concept
   * @param Concept ID
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
  getTotal(params: OptionalDefaults<GetOrganizationParams>): Promise<{ total: number }>

  /**
   * Get descendant Concepts
   * @param Concept ID
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
    params: OptionalDefaults<GetConceptDescendantsParams>
  ): Promise<CursorPaginatedCollectionProp<ConceptProps>>

  /**
   * Get ancestor Concepts
   * @param Concept ID
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
    params: OptionalDefaults<GetConceptDescendantsParams>
  ): Promise<CursorPaginatedCollectionProp<ConceptProps>>
}
