import { getTestOrganizationId, initPlainClient } from '../helpers'
import { afterEach, beforeEach, describe, test } from 'mocha'
import { expect } from 'chai'

describe('Taxonomy Integration', () => {
  const client = initPlainClient()

  let conceptsToDelete = []

  beforeEach(() => {
    conceptsToDelete = []
  })

  afterEach(async () => {
    for (const concept of conceptsToDelete) {
      // just store the concept ids,and fetch them before deletion, to ensure we have the latest concetp version
      await client.concept.delete({
        conceptId: concept.sys.id,
        organizationId: getTestOrganizationId(),
        version: concept.sys.version,
      })
    }
  })

  test('create a concept with minimum input', async () => {
    const concept = {
      //TODO: they should not be required
      broader: [],
      related: [],
      prefLabel: {
        'en-US': 'Test Concept',
      },
    }
    const result = await client.concept.create(
      {
        organizationId: getTestOrganizationId(),
      },
      concept
    )

    conceptsToDelete.push(result)

    expect(result.prefLabel['en-US']).to.equal('Test Concept')
    expect(result.uri).to.null
    expect(Object.keys(result)).to.include.members([
      'prefLabel',
      'broader',
      'related',
      'uri',
      'example',
      'definition',
      'hiddenLabels',
      'historyNote',
      'notations',
      'note',
      'scopeNote',
      'sys',
    ])
  })
})
