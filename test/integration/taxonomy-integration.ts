import { getTestOrganizationId, initPlainClient } from '../helpers'
import { afterEach, beforeEach, describe, test } from 'mocha'
import { expect } from 'chai'
import { ConceptProps, CreateConceptProps } from '../../lib/entities/concept'

describe('Taxonomy Integration', () => {
  const client = initPlainClient({
    organizationId: getTestOrganizationId(),
  })
  let conceptsToDelete: ConceptProps[] = []

  beforeEach(() => {
    conceptsToDelete = []
  })

  afterEach(async () => {
    for (const concept of conceptsToDelete) {
      // Ensure we have the latest version of the concept
      const conceptToBeDeleted = await client.concept.get({
        conceptId: concept.sys.id,
      })
      await client.concept.delete({
        conceptId: conceptToBeDeleted.sys.id,
        version: conceptToBeDeleted.sys.version,
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

  test('create a concept with all string fields', async () => {
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
})

// We might add more expects here to ensure the concept has the right shape
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
