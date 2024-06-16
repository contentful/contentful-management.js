import {
  CursorPaginatedCollectionProp,
  GetConceptParams,
  GetOrganizationParams,
} from '../../common-types'
import { ConceptProps, CreateConceptProps } from '../../entities/concept'
import { OptionalDefaults } from '../wrappers/wrap'
import { Patch } from 'json-patch'

export type ConceptPlainClientAPI = {
  create(
    params: OptionalDefaults<GetOrganizationParams>,
    payload: CreateConceptProps
  ): Promise<ConceptProps>

  update(
    params: OptionalDefaults<GetOrganizationParams> & GetConceptParams,
    payload: Patch
  ): Promise<ConceptProps>

  get(params: OptionalDefaults<GetOrganizationParams> & GetConceptParams): Promise<ConceptProps>

  delete(params: OptionalDefaults<GetOrganizationParams> & GetConceptParams): Promise<unknown>

  getMany(
    params: OptionalDefaults<GetOrganizationParams>
  ): Promise<CursorPaginatedCollectionProp<ConceptProps>>

  getTotal(params: OptionalDefaults<GetOrganizationParams>): Promise<{ total: number }>

  getDescendants(
    params: OptionalDefaults<GetOrganizationParams>
  ): Promise<CursorPaginatedCollectionProp<ConceptProps>>
}
