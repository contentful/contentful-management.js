import { Link } from '../common-types'
import { LocalizedEntity } from './utils'

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

export type CreateConceptProps = Partial<Omit<ConceptProps, 'sys'>> &
  Pick<ConceptProps, 'prefLabel'>
