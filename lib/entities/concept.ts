import { SetOptional } from 'type-fest'
import { Link } from '../common-types'

type TaxonomyConceptLink = Link<'TaxonomyConcept'>

type LocalizedEntity<Entity, LocalizedFields extends keyof Entity, Locales extends keyof any> = {
  [K in keyof Entity]: K extends LocalizedFields ? { [Locale in Locales]: Entity[K] } : Entity[K]
}

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
  }
}

export type CreateConceptProps = Omit<ConceptProps, 'sys'>

export type ConceptProps<Locales extends keyof any = 'en-US'> = LocalizedEntity<
  SetOptional<Omit<Concept, 'sys' | 'conceptSchemes'>, 'broader' | 'related'>,
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
