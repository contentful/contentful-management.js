import { describe, it, beforeEach, afterEach, expect } from 'vitest'
import type { ConceptProps, CreateConceptProps } from '../../lib/entities/concept'
import type { ConceptSchemeProps, CreateConceptSchemeProps } from '../../lib/export-types'
import { getTestOrganizationId, initPlainClient } from '../helpers'

let conceptsToDelete: ConceptProps[] = []
let conceptSchemesToDelete: ConceptSchemeProps[] = []

describe('Taxonomy Integration', () => {
  const client = initPlainClient({
    organizationId: getTestOrganizationId(),
  })

  beforeEach(() => {
    conceptsToDelete = []
    conceptSchemesToDelete = []
  })

  afterEach(async () => {
    for (const concept of conceptsToDelete) {
      const conceptToBeDeleted = await client.concept.get({
        conceptId: concept.sys.id,
      })
      await client.concept.delete({
        conceptId: conceptToBeDeleted.sys.id,
        version: conceptToBeDeleted.sys.version,
      })
    }

    for (const conceptScheme of conceptSchemesToDelete) {
      const conceptSchemeToBeDeleted = await client.conceptScheme.get({
        conceptSchemeId: conceptScheme.sys.id,
      })
      await client.conceptScheme.delete({
        conceptSchemeId: conceptSchemeToBeDeleted.sys.id,
        version: conceptSchemeToBeDeleted.sys.version,
      })
    }
  })

  it('deletes a concept', async () => {
    const concept: CreateConceptProps = {
      prefLabel: {
        'en-US': 'Test Concept',
      },
    }
    const result = await client.concept.create({}, concept)

    isConceptProps(result)
    expect(result.prefLabel['en-US']).toBe('Test Concept')
    expect(result.uri).toBeNull()

    await client.concept.delete({
      conceptId: result.sys.id,
      version: result.sys.version,
    })

    await expect(
      client.concept.get({
        conceptId: result.sys.id,
      })
    ).rejects.toThrow('The resource could not be found')
  })

  it('creates a concept with minimum input', async () => {
    const concept: CreateConceptProps = {
      prefLabel: {
        'en-US': 'Test Concept',
      },
    }
    const result = await client.concept.create({}, concept)

    conceptsToDelete.push(result)

    isConceptProps(result)
    expect(result.prefLabel['en-US']).toBe('Test Concept')
    expect(result.uri).toBeNull()
  })

  it('creates a concept with all fields', async () => {
    const concept: CreateConceptProps = {
      uri: 'https://example.com/concept',
      example: { 'en-US': 'Example' },
      prefLabel: { 'en-US': 'Test Concept' },
      altLabels: { 'en-US': ['Hello', 'World'] },
      editorialNote: { 'en-US': 'Editorial Note' },
      definition: { 'en-US': 'Definition' },
      hiddenLabels: { 'en-US': ['Hidden Label'] },
      note: { 'en-US': 'Note' },
      historyNote: { 'en-US': 'History Note' },
      notations: ['notation1', 'notation2'],
      scopeNote: { 'en-US': 'Scope Note' },
    }
    const result = await client.concept.create({}, concept)

    conceptsToDelete.push(result)

    isConceptProps(result)
    expect(result.uri).toBe('https://example.com/concept')
    expect(result.prefLabel['en-US']).toBe('Test Concept')
    expect(result.example['en-US']).toBe('Example')
    expect(result.altLabels['en-US']).toEqual(['Hello', 'World'])
    expect(result.definition['en-US']).toBe('Definition')
    expect(result.hiddenLabels['en-US']).toEqual(['Hidden Label'])
    expect(result.note['en-US']).toBe('Note')
    expect(result.historyNote['en-US']).toBe('History Note')
    expect(result.notations).toEqual(['notation1', 'notation2'])
    expect(result.scopeNote['en-US']).toEqual('Scope Note')
  })

  it('creates and updates a concept', async () => {
    const concept: CreateConceptProps = {
      prefLabel: {
        'en-US': 'Test Concept',
      },
    }
    const result = await client.concept.create({}, concept)
    isConceptProps(result)
    expect(result.prefLabel['en-US']).toBe('Test Concept')
    expect(result.uri).toBeNull()
    conceptsToDelete.push(result)

    const updatedConcept = await client.concept.update(
      {
        version: result.sys.version,
        conceptId: result.sys.id,
      },
      [
        {
          path: '/uri',
          op: 'replace',
          value: 'https://example.com/concept',
        },
      ]
    )

    isConceptProps(updatedConcept)
    expect(updatedConcept.uri).toBe('https://example.com/concept')
  })

  it('gets the total number of concepts', async () => {
    await Promise.all(
      Array(3)
        .fill(null)
        .map(async (i) => {
          const concept: CreateConceptProps = {
            prefLabel: {
              'en-US': `Test Concept ${i}`,
            },
          }

          const result = await client.concept.create({}, concept)
          conceptsToDelete.push(result)
        })
    )

    const { total } = await client.concept.getTotal({})

    expect(total).toBe(3)
  })

  it('gets a list of all concepts', async () => {
    await Promise.all(
      Array(3)
        .fill(null)
        .map(async (i) => {
          const concept: CreateConceptProps = {
            prefLabel: {
              'en-US': `Test Concept ${i}`,
            },
          }

          const result = await client.concept.create({}, concept)
          conceptsToDelete.push(result)
        })
    )

    const { items } = await client.concept.getMany({})
    expect(items.length).toBe(3)
  })

  it('creates a concept with a broader concept', async () => {
    const first = await client.concept.create(
      {},
      {
        prefLabel: {
          'en-US': 'Test Concept',
        },
      }
    )

    const second = await client.concept.create(
      {},
      {
        prefLabel: {
          'en-US': 'Test Concept',
        },
        broader: [
          {
            sys: {
              id: first.sys.id,
              type: 'Link',
              linkType: 'TaxonomyConcept',
            },
          },
        ],
      }
    )

    conceptsToDelete.push(second, first)

    expect(second.broader[0].sys).toEqual({
      id: first.sys.id,
      type: 'Link',
      linkType: 'TaxonomyConcept',
    })
  })

  it('gets ancestors and descendants of a concept', async () => {
    const first = await client.concept.create(
      {},
      {
        prefLabel: {
          'en-US': 'Test Concept 1',
        },
      }
    )

    const second = await client.concept.create(
      {},
      {
        prefLabel: {
          'en-US': 'Test Concept 2',
        },
        broader: [
          {
            sys: {
              id: first.sys.id,
              type: 'Link',
              linkType: 'TaxonomyConcept',
            },
          },
        ],
      }
    )

    conceptsToDelete.push(second, first)
    const { items: descendants } = await client.concept.getDescendants({ conceptId: first.sys.id })
    expect(descendants.length).toBe(1)
    expect(descendants[0].sys.id).toBe(second.sys.id)
    expect(descendants[0].prefLabel['en-US']).toBe('Test Concept 2')

    const { items: ancestors } = await client.concept.getAncestors({ conceptId: second.sys.id })
    expect(ancestors.length).toBe(1)
    expect(ancestors[0].sys.id).toBe(first.sys.id)
    expect(ancestors[0].prefLabel['en-US']).toBe('Test Concept 1')
  })

  it('deletes a concept scheme', async () => {
    const conceptScheme: CreateConceptSchemeProps = {
      prefLabel: {
        'en-US': 'Test ConceptScheme',
      },
    }

    const result = await client.conceptScheme.create({}, conceptScheme)

    isConceptSchemeProps(result)
    expect(result.prefLabel['en-US']).toBe('Test ConceptScheme')
    expect(result.uri).toBeNull()

    await client.conceptScheme.delete({
      conceptSchemeId: result.sys.id,
      version: result.sys.version,
    })

    await expect(
      client.conceptScheme.get({
        conceptSchemeId: result.sys.id,
      })
    ).rejects.toThrow('The resource could not be found')
  })

  it('creates a concept scheme with minimum input', async () => {
    const conceptScheme: CreateConceptSchemeProps = {
      prefLabel: {
        'en-US': 'Test ConceptScheme',
      },
    }
    const result = await client.conceptScheme.create({}, conceptScheme)

    conceptSchemesToDelete.push(result)

    isConceptSchemeProps(result)
    expect(result.prefLabel['en-US']).toBe('Test ConceptScheme')
    expect(result.uri).toBeNull()
  })

  it('creates a concept scheme with all fields', async () => {
    const conceptScheme: CreateConceptSchemeProps = {
      uri: 'https://example.com/conceptScheme',
      prefLabel: { 'en-US': 'Test ConceptScheme' },
      definition: { 'en-US': 'Definition' },
    }
    const result = await client.conceptScheme.create({}, conceptScheme)

    conceptSchemesToDelete.push(result)

    isConceptSchemeProps(result)
    expect(result.uri).toBe('https://example.com/conceptScheme')
    expect(result.prefLabel['en-US']).toBe('Test ConceptScheme')
    expect(result.definition['en-US']).toBe('Definition')
  })

  it('creates and updates a concept scheme', async () => {
    const conceptScheme: CreateConceptSchemeProps = {
      prefLabel: {
        'en-US': 'Test ConceptScheme',
      },
    }
    const result = await client.conceptScheme.create({}, conceptScheme)
    isConceptSchemeProps(result)
    expect(result.prefLabel['en-US']).toBe('Test ConceptScheme')
    expect(result.uri).toBeNull()
    conceptSchemesToDelete.push(result)

    const updatedConceptScheme = await client.conceptScheme.update(
      {
        version: result.sys.version,
        conceptSchemeId: result.sys.id,
      },
      [
        {
          path: '/uri',
          op: 'replace',
          value: 'https://example.com/updatedConceptScheme',
        },
      ]
    )

    isConceptSchemeProps(updatedConceptScheme)
    expect(updatedConceptScheme.uri).toBe('https://example.com/updatedConceptScheme')
  })

  it('gets the total number of concept schemes', async () => {
    await Promise.all(
      Array(3)
        .fill(null)
        .map(async (i) => {
          const conceptScheme: CreateConceptSchemeProps = {
            prefLabel: {
              'en-US': `Test ConceptScheme ${i}`,
            },
          }

          const result = await client.conceptScheme.create({}, conceptScheme)
          conceptSchemesToDelete.push(result)
        })
    )

    const { total } = await client.conceptScheme.getTotal({})

    expect(total).toBe(3)
  })

  it('gets a list of all concept schemes', async () => {
    await Promise.all(
      Array(3)
        .fill(null)
        .map(async (i) => {
          const conceptScheme: CreateConceptSchemeProps = {
            prefLabel: {
              'en-US': `Test ConceptScheme ${i}`,
            },
          }

          const result = await client.conceptScheme.create({}, conceptScheme)
          conceptSchemesToDelete.push(result)
        })
    )

    const { items } = await client.conceptScheme.getMany({})
    expect(items.length).toBe(3)
  })
})

function isConceptProps(concept: any) {
  expect(concept.sys?.type).toBe('TaxonomyConcept')
  expect(Object.keys(concept).sort()).toEqual(
    [
      'altLabels',
      'broader',
      'changeNote',
      'definition',
      'editorialNote',
      'example',
      'hiddenLabels',
      'historyNote',
      'notations',
      'note',
      'prefLabel',
      'related',
      'scopeNote',
      'sys',
      'uri',
    ].sort()
  )
}

function isConceptSchemeProps(conceptScheme: any) {
  expect(conceptScheme.sys?.type).toBe('TaxonomyConceptScheme')
  expect(Object.keys(conceptScheme).sort()).toEqual(
    ['definition', 'prefLabel', 'topConcepts', 'concepts', 'totalConcepts', 'sys', 'uri'].sort()
  )
}