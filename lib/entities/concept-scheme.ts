import { LocalizedEntity } from './utils'
import { TaxonomyConceptLink } from './concept'

export type ConceptScheme = {
  uri: string | null
  prefLabel: string
  altLabels: string[]
  hiddenLabels: string[]
  definition: string | null
  notations: string[]
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

export type ConceptSchemeProps<Locales extends keyof any = 'en-US'> = LocalizedEntity<
  ConceptScheme,
  'prefLabel' | 'altLabels' | 'hiddenLabels' | 'definition',
  Locales
>

export type CreateConceptSchemeProps = Omit<ConceptSchemeProps, 'sys'>
