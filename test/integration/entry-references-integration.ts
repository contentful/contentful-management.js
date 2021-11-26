import { expect } from 'chai'
import { before, describe, test } from 'mocha'
import { Environment } from '../../lib/entities/environment'
import { Space } from '../../lib/entities/space'
import { TestDefaults } from '../defaults'
import { getDefaultSpace, initPlainClient } from '../helpers'

const ENTRY_WITH_REFERENCES_ID = TestDefaults.entry.testEntryReferenceId
const WRONG_ENTRY_ID = `123123XD`

describe('Entry References', async function () {
  let testSpace: Space
  let testEnvironment: Environment

  before(async () => {
    testSpace = await getDefaultSpace()
    testEnvironment = await testSpace.getEnvironment('master')
  })

  describe('Environment Scoped', () => {
    let entryWithReferencesViaMaxDepth
    let entryWithReferencesViaInclude

    before(async () => {
      entryWithReferencesViaMaxDepth = await testEnvironment.getEntryReferences(
        ENTRY_WITH_REFERENCES_ID,
        {
          maxDepth: 2,
        }
      )

      entryWithReferencesViaInclude = await testEnvironment.getEntryReferences(
        ENTRY_WITH_REFERENCES_ID,
        {
          include: 2,
        }
      )
    })

    test('response after using maxDepth parameter equals response after using include', () => {
      expect(entryWithReferencesViaMaxDepth).to.eql(entryWithReferencesViaInclude)
    })

    test('Get the correct entry with references', () => {
      expect(entryWithReferencesViaMaxDepth.items[0].sys.id).to.eql(ENTRY_WITH_REFERENCES_ID)
      expect(entryWithReferencesViaMaxDepth.includes).not.to.be.empty
      expect(entryWithReferencesViaMaxDepth.includes.Entry.length).above(0)
    })

    test('Should return the correct cities', () => {
      const citiesMaxDepth = entryWithReferencesViaMaxDepth.includes.Entry.map(
        (entry) => entry.fields.name['en-US']
      )
      expect(citiesMaxDepth).to.have.members(['Berlin', 'London', 'San Francisco', 'Paris'])
    })

    test('Should not return any references', async () => {
      const noEntryReferences = await testEnvironment.getEntryReferences(WRONG_ENTRY_ID, {
        maxDepth: 2,
      })
      expect(noEntryReferences.items).to.be.empty

      const noEntryReferencesInclude = await testEnvironment.getEntryReferences(WRONG_ENTRY_ID, {
        include: 2,
      })
      expect(noEntryReferences).to.eql(noEntryReferencesInclude)
    })
  })

  describe('Plain Client', () => {
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
    }
    let plainClient
    let entry
    let entryWithReferencesViaMaxDepth
    let entryWithReferencesViaInclude

    before(async () => {
      plainClient = initPlainClient(defaultParams)

      entry = await plainClient.entry.get({
        entryId: ENTRY_WITH_REFERENCES_ID,
      })

      entryWithReferencesViaMaxDepth = await plainClient.entry.references({
        entryId: entry.sys.id,
        maxDepth: 5,
      })

      entryWithReferencesViaInclude = await plainClient.entry.references({
        entryId: entry.sys.id,
        include: 5,
      })
    })

    test('response after using maxDepth parameter equals response after using include', () => {
      expect(entryWithReferencesViaMaxDepth).to.eql(entryWithReferencesViaInclude)
    })

    test('Get the correct entry with references', () => {
      expect(entryWithReferencesViaMaxDepth.items[0].sys.id).to.eql(ENTRY_WITH_REFERENCES_ID)
      expect(entryWithReferencesViaMaxDepth.includes).not.to.be.empty
      expect(entryWithReferencesViaMaxDepth.includes.Entry.length).above(0)
    })

    test('Should return the correct cities', () => {
      const cities = entryWithReferencesViaMaxDepth.includes.Entry.map(
        (entry) => entry.fields.name['en-US']
      )
      expect(cities).to.have.members(['Berlin', 'London', 'San Francisco', 'Paris'])
    })

    test('Should not return any references', async () => {
      const noEntryReferences = await plainClient.entry.references({
        entryId: WRONG_ENTRY_ID,
        maxDepth: 2,
      })
      const noEntryReferencesInclude = await plainClient.entry.references({
        entryId: WRONG_ENTRY_ID,
        include: 2,
      })
      expect(noEntryReferences.items).to.be.empty
      expect(noEntryReferences).to.eql(noEntryReferencesInclude)
    })
  })
})
