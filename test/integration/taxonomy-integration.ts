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
      // Ensure we have the latest version of the concept
      const conceptToBeDeleted = await client.concept.get({
        conceptId: concept.sys.id,
      })
      await client.concept.delete({
        conceptId: conceptToBeDeleted.sys.id,
        version: conceptToBeDeleted.sys.version,
      })
    }

    for (const conceptScheme of conceptSchemesToDelete) {
      // Ensure we have the latest version of the concept
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
