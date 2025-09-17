import type { Link } from '../common-types.js'
import type { TaxonomyConceptLink } from './concept.js'
import type { LocalizedEntity } from './utils.js'

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
    createdBy: Link<'User'>
    updatedBy: Link<'User'>
  }
}

export type ConceptSchemeProps<Locales extends string = string> = LocalizedEntity<
  ConceptScheme,
  'prefLabel' | 'definition',
  Locales
>

export type CreateConceptSchemeProps = Partial<Omit<ConceptSchemeProps, 'sys'>> &
  Pick<ConceptSchemeProps, 'prefLabel'>
