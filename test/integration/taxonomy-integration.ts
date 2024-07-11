import { getTestOrganizationId, initPlainClient } from '../helpers'
import { afterEach, beforeEach, describe, test } from 'mocha'
import { expect } from 'chai'
import { ConceptProps, CreateConceptProps } from '../../lib/entities/concept'
import { ConceptSchemeProps, CreateConceptSchemeProps } from '../../lib/export-types'

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

  test('delete a concept', async () => {
    const concept: CreateConceptProps = {
      prefLabel: {
        'en-US': 'Test Concept',
      },
    }
    const result = await client.concept.create({}, concept)

    isConceptProps(result)
    expect(result.prefLabel['en-US']).to.equal('Test Concept')
    expect(result.uri).to.null

    await client.concept.delete({
      conceptId: result.sys.id,
      version: result.sys.version,
    })

    await expect(
      client.concept.get({
        conceptId: result.sys.id,
      })
    ).to.be.rejectedWith('The resource could not be found')
  })

  test('create a concept with minimum input', async () => {
    const concept: CreateConceptProps = {
      prefLabel: {
        'en-US': 'Test Concept',
      },
    }
    const result = await client.concept.create({}, concept)

    conceptsToDelete.push(result)

    isConceptProps(result)
    expect(result.prefLabel['en-US']).to.equal('Test Concept')
    expect(result.uri).to.null
  })

  test('create a concept with all fields', async () => {
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
    expect(result.uri).to.equal('https://example.com/concept')
    expect(result.prefLabel['en-US']).to.equal('Test Concept')
    expect(result.example['en-US']).to.equal('Example')
    expect(result.altLabels['en-US']).to.eql(['Hello', 'World'])
    expect(result.definition['en-US']).to.equal('Definition')
    expect(result.hiddenLabels['en-US']).to.eql(['Hidden Label'])
    expect(result.note['en-US']).to.equal('Note')
    expect(result.historyNote['en-US']).to.equal('History Note')
    expect(result.notations).to.eql(['notation1', 'notation2'])
    expect(result.scopeNote['en-US']).to.eql('Scope Note')
  })

  test('create and update a concept', async () => {
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
      [
        {
          path: '/uri',
          op: 'replace',
          value: 'https://example.com/concept',
        },
      ]
    )

    isConceptProps(updatedConcept)
    expect(updatedConcept.uri).to.eql('https://example.com/concept')
  })

  test('concept getTotal', async () => {
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

    const { total: total } = await client.concept.getTotal({})

    expect(total).to.eq(3)
  })

  test('get list of all concepts', async () => {
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
    expect(items.length).to.eq(3)
  })

  test('create concept with broader concept', async () => {
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

    expect(second.broader[0].sys).to.eql({
      id: first.sys.id,
      type: 'Link',
      linkType: 'TaxonomyConcept',
    })
  })

  test('ancestors & Descendants', async () => {
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
    expect(descendants.length).to.eq(1)
    expect(descendants[0].sys.id).to.eq(second.sys.id)
    expect(descendants[0].prefLabel['en-US']).to.equal('Test Concept 2')

    const { items: ancestors } = await client.concept.getAncestors({ conceptId: second.sys.id })
    expect(ancestors.length).to.eq(1)
    expect(ancestors[0].sys.id).to.eq(first.sys.id)
    expect(ancestors[0].prefLabel['en-US']).to.equal('Test Concept 1')
  })

  test('delete a conceptScheme', async () => {
    const ConceptScheme: CreateConceptSchemeProps = {
      prefLabel: {
        'en-US': 'Test ConceptScheme',
      },
    }

    const result = await client.conceptScheme.create({}, ConceptScheme)

    isConceptSchemeProps(result)
    expect(result.prefLabel['en-US']).to.equal('Test ConceptScheme')
    expect(result.uri).to.null

    await client.conceptScheme.delete({
      conceptSchemeId: result.sys.id,
      version: result.sys.version,
    })

    await expect(
      client.conceptScheme.get({
        conceptSchemeId: result.sys.id,
      })
    ).to.be.rejectedWith('The resource could not be found')
  })

  test('create a conceptScheme with minimum input', async () => {
    const conceptScheme: CreateConceptSchemeProps = {
      prefLabel: {
        'en-US': 'Test ConceptScheme',
      },
    }
    const result = await client.conceptScheme.create({}, conceptScheme)

    conceptSchemesToDelete.push(result)

    isConceptSchemeProps(result)
    expect(result.prefLabel['en-US']).to.equal('Test ConceptScheme')
    expect(result.uri).to.null
  })

  test('create a conceptScheme with all fields', async () => {
    const conceptScheme: CreateConceptSchemeProps = {
      uri: 'https://example.com/conceptScheme',
      prefLabel: { 'en-US': 'Test ConceptScheme' },
      definition: { 'en-US': 'Definition' },
    }
    const result = await client.conceptScheme.create({}, conceptScheme)

    conceptSchemesToDelete.push(result)

    isConceptSchemeProps(result)
    expect(result.uri).to.equal('https://example.com/conceptScheme')
    expect(result.prefLabel['en-US']).to.equal('Test ConceptScheme')
    expect(result.definition['en-US']).to.equal('Definition')
  })

  test('create and update a conceptScheme', async () => {
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
      [
        {
          path: '/uri',
          op: 'replace',
          value: 'https://example.com/updatedConceptScheme',
        },
      ]
    )

    isConceptSchemeProps(updatedConceptScheme)
    expect(updatedConceptScheme.uri).to.eql('https://example.com/updatedConceptScheme')
  })

  test('conceptScheme getTotal', async () => {
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

    const { total: total } = await client.conceptScheme.getTotal({})

    expect(total).to.eq(3)
  })

  test('get list of all conceptsSchemes', async () => {
    await Promise.all(
      Array(3)
        .fill(null)
        .map(async (i) => {
          const conceptScheme: CreateConceptSchemeProps = {
            prefLabel: {
              'en-US': `Test Concept ${i}`,
            },
          }

          const result = await client.conceptScheme.create({}, conceptScheme)
          conceptSchemesToDelete.push(result)
        })
    )

    const { items } = await client.conceptScheme.getMany({})
    expect(items.length).to.eq(3)
  })
})

function isConceptProps(concept: any) {
  expect(concept.sys?.type).to.eql('TaxonomyConcept')
  expect(Object.keys(concept).sort()).to.eql(
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
  expect(conceptScheme.sys?.type).to.eql('TaxonomyConceptScheme')
  expect(Object.keys(conceptScheme).sort()).to.eql(
    ['definition', 'prefLabel', 'topConcepts', 'concepts', 'totalConcepts', 'sys', 'uri'].sort()
  )
}
