import { describe, it, beforeEach, afterEach, expect, afterAll } from 'vitest'
import type { ConceptProps, CreateConceptProps } from '../../lib/entities/concept.js'
import type { ConceptSchemeProps, CreateConceptSchemeProps } from '../../lib/export-types.js'
import { getTestOrganizationId, initPlainClient, timeoutToCalmRateLimiting } from '../helpers.js'

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

  afterAll(timeoutToCalmRateLimiting)

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
      }),
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

  it('create a concept with id', async () => {
    const concept: CreateConceptProps = {
      prefLabel: {
        'en-US': 'Test Concept',
      },
    }
    const result = await client.concept.createWithId({ conceptId: 'test-concept-id' }, concept)

    conceptsToDelete.push(result)

    isConceptProps(result)
    expect(result.prefLabel['en-US']).to.equal('Test Concept')
    expect(result.uri).to.null
    expect(result.sys.id).to.equal('test-concept-id')
  })

  it('create a concept with all fields', async () => {
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

  it('create and update a concept - patch', async () => {
    const concept: CreateConceptProps = {
      prefLabel: {
        'en-US': 'Test Concept',
      },
    }
    const result = await client.concept.create({}, concept)
    isConceptProps(result)
    expect(result.prefLabel['en-US']).to.equal('Test Concept')
    expect(result.uri).to.null
    conceptsToDelete.push(result)

    const updatedConcept = await client.concept.patch(
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
      ],
    )

    isConceptProps(updatedConcept)
    expect(updatedConcept.uri).to.eql('https://example.com/concept')
  })

  it('create and update a concept - put', async () => {
    const concept: CreateConceptProps = {
      prefLabel: {
        'en-US': 'Test Concept',
      },
    }
    const result = await client.concept.create({}, concept)
    isConceptProps(result)
    expect(result.prefLabel['en-US']).to.equal('Test Concept')
    expect(result.uri).to.null
    conceptsToDelete.push(result)

    const updatedConcept = await client.concept.update(
      {
        version: result.sys.version,
        conceptId: result.sys.id,
      },
      {
        ...concept,
        uri: 'https://example.com/concept',
      },
    )

    isConceptProps(updatedConcept)
    expect(updatedConcept.uri).to.eql('https://example.com/concept')
  })

  it('concept getTotal', async () => {
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
        }),
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
        }),
    )

    const { items } = await client.concept.getMany({})
    expect(items.length).toBe(3)
  })

  it('gets a list of all paginated concepts', async () => {
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
        }),
    )

    const { items, pages } = await client.concept.getMany({
      query: {
        limit: 2,
      },
    })
    expect(items.length).toBe(2)

    const { items: nextItems } = await client.concept.getMany({
      query: {
        limit: 2,
        pageUrl: pages?.next,
      },
    })
    expect(nextItems.length).toBe(1)
  })

  it('creates a concept with a broader concept', async () => {
    const first = await client.concept.create(
      {},
      {
        prefLabel: {
          'en-US': 'Test Concept',
        },
      },
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
      },
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
      },
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
      },
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
      }),
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

  it('create a conceptScheme with id', async () => {
    const conceptScheme: CreateConceptSchemeProps = {
      prefLabel: {
        'en-US': 'Test ConceptScheme',
      },
    }
    const result = await client.conceptScheme.createWithId(
      { conceptSchemeId: 'test-concept-scheme-id' },
      conceptScheme,
    )

    conceptSchemesToDelete.push(result)

    isConceptSchemeProps(result)
    expect(result.prefLabel['en-US']).to.equal('Test ConceptScheme')
    expect(result.uri).to.null
    expect(result.sys.id).to.equal('test-concept-scheme-id')
  })

  it('create a conceptScheme with all fields', async () => {
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

  it('create and update a conceptScheme - patch', async () => {
    const conceptScheme: CreateConceptSchemeProps = {
      prefLabel: {
        'en-US': 'Test ConceptScheme',
      },
    }
    const result = await client.conceptScheme.create({}, conceptScheme)
    isConceptSchemeProps(result)
    expect(result.prefLabel['en-US']).to.equal('Test ConceptScheme')
    expect(result.uri).to.null
    conceptSchemesToDelete.push(result)

    const updatedConceptScheme = await client.conceptScheme.patch(
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
      ],
    )

    isConceptSchemeProps(updatedConceptScheme)
    expect(updatedConceptScheme.uri).to.eql('https://example.com/updatedConceptScheme')
  })

  it('create and update a conceptScheme - put', async () => {
    const conceptScheme: CreateConceptSchemeProps = {
      prefLabel: {
        'en-US': 'Test ConceptScheme',
      },
    }
    const result = await client.conceptScheme.create({}, conceptScheme)
    isConceptSchemeProps(result)
    expect(result.prefLabel['en-US']).to.equal('Test ConceptScheme')
    expect(result.uri).to.null
    conceptSchemesToDelete.push(result)

    const updatedConceptScheme = await client.conceptScheme.update(
      {
        version: result.sys.version,
        conceptSchemeId: result.sys.id,
      },
      {
        ...conceptScheme,
        uri: 'https://example.com/updatedConceptScheme',
      },
    )

    isConceptSchemeProps(updatedConceptScheme)
    expect(updatedConceptScheme.uri).to.eql('https://example.com/updatedConceptScheme')
  })

  it('conceptScheme getTotal', async () => {
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
        }),
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
        }),
    )

    const { items } = await client.conceptScheme.getMany({})
    expect(items.length).toBe(3)
  })

  it('gets a list of all paginated concept schemes', async () => {
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
        }),
    )

    const { items, pages } = await client.conceptScheme.getMany({
      query: {
        limit: 2,
      },
    })
    expect(items.length).toBe(2)

    const { items: nextItems } = await client.conceptScheme.getMany({
      query: {
        limit: 2,
        pageUrl: pages?.next,
      },
    })
    expect(nextItems.length).toBe(1)
  })
})

function isConceptProps(concept: any) {
  expect(concept.sys?.type).toBe('TaxonomyConcept')
  expect(Object.keys(concept).sort()).toEqual(
    [
      'altLabels',
      'broader',
      'changeNote',
      'conceptSchemes',
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
    ].sort(),
  )
}

function isConceptSchemeProps(conceptScheme: any) {
  expect(conceptScheme.sys?.type).toBe('TaxonomyConceptScheme')
  expect(Object.keys(conceptScheme).sort()).toEqual(
    ['definition', 'prefLabel', 'topConcepts', 'concepts', 'totalConcepts', 'sys', 'uri'].sort(),
  )
}
