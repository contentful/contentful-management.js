import {
  CursorPaginatedCollectionProp,
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
   * @param payload the Concept
   * @returns the created Concept
   * @throws if the request fails
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
   * @example
   * ```javascript
   * await client.concept.update({
   *   organizationId: '<organization_id>',
   *   conceptId: '<concept_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetConceptParams>): Promise<unknown>

  /**
   * Get many Concepts
   * @param query by string or ConceptScheme ID
   * @returns list of many Concepts
   * @throws if the request fails
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
}
