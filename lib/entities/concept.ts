/**
 * @module
 * @category Entities
 */
import type { Link } from '../common-types'
import type { LocalizedEntity } from './utils'

/** A link reference to a taxonomy concept. */
export type TaxonomyConceptLink = Link<'TaxonomyConcept'>

type Concept = {
  uri: string | null
  prefLabel: string
  altLabels: string[]
  hiddenLabels: string[]
  definition: string | null
  editorialNote: string | null
  historyNote: string | null
  example: string | null
  note: string | null
  scopeNote: string | null
  notations: string[]
  broader: TaxonomyConceptLink[]
  related: TaxonomyConceptLink[]
  sys: {
    type: 'TaxonomyConcept'
    createdAt: string
    updatedAt: string
    id: string
    version: number
    createdBy: Link<'User'>
    updatedBy: Link<'User'>
  }
}

/** Properties of a Contentful taxonomy concept. */
export type ConceptProps<Locales extends string = string> = LocalizedEntity<
  Omit<Concept, 'conceptSchemes'>,
  | 'prefLabel'
  | 'altLabels'
  | 'hiddenLabels'
  | 'definition'
  | 'historyNote'
  | 'editorialNote'
  | 'example'
  | 'note'
  | 'scopeNote',
  Locales
>

/** Properties required to create a new taxonomy concept. */
export type CreateConceptProps = Partial<Omit<ConceptProps, 'sys'>> &
  Pick<ConceptProps, 'prefLabel'>
