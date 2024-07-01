import { LocalizedEntity } from './utils'
import { TaxonomyConceptLink } from './concept'

export type ConceptScheme = {
  uri: string | null
  prefLabel: string
  definition: string | null
  topConcepts: TaxonomyConceptLink[]
  concepts: TaxonomyConceptLink[]
  totalConcepts: number
  sys: {
    type: 'TaxonomyConceptScheme'
    createdAt: string
    updatedAt: string
    id: string
    version: number
  }
}

export type ConceptSchemeProps<Locales extends string = string> = LocalizedEntity<
  ConceptScheme,
  'prefLabel' | 'definition',
  Locales
>

export type CreateConceptSchemeProps = Omit<ConceptSchemeProps, 'sys'>
