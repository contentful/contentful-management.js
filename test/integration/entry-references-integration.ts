import { expect } from 'chai'
import { before, describe, test } from 'mocha'
import { Environment } from '../../lib/entities/environment'
import { Space } from '../../lib/entities/space'
import { TestDefaults } from '../defaults'
import { getDefaultSpace, getPlainClient } from '../helpers'

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
    let entryWithReferences
    before(async () => {
      entryWithReferences = await testEnvironment.getEntryReferences(ENTRY_WITH_REFERENCES_ID, {
        maxDepth: 2,
      })
    })

    test('Get the correct entry with references', () => {
      expect(entryWithReferences.items[0].sys.id).to.eql(ENTRY_WITH_REFERENCES_ID)
      expect(entryWithReferences.includes).not.to.be.empty
      expect(entryWithReferences.includes.Entry.length).above(0)
    })

    test('Should return the correct cities', () => {
      const cities = entryWithReferences.includes.Entry.map((entry) => entry.fields.name['en-US'])
      expect(cities).to.have.members(['Berlin', 'London', 'San Francisco', 'Paris'])
    })

    test('Should not return any references', async () => {
      const noEntryReferences = await testEnvironment.getEntryReferences(WRONG_ENTRY_ID, {
        maxDepth: 2,
      })
      expect(noEntryReferences.items).to.be.empty
    })
  })

  describe('Plain Client', () => {
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
    }
    let plainClient
    let entry
    let entryWithReferences

    before(async () => {
      plainClient = getPlainClient(defaultParams)

      entry = await plainClient.entry.get({
        entryId: ENTRY_WITH_REFERENCES_ID,
      })

      entryWithReferences = await plainClient.entry.references({
        entryId: entry.sys.id,
        maxDepth: 5,
      })
    })

    test('Get the correct entry with references', () => {
      expect(entryWithReferences.items[0].sys.id).to.eql(ENTRY_WITH_REFERENCES_ID)
      expect(entryWithReferences.includes).not.to.be.empty
      expect(entryWithReferences.includes.Entry.length).above(0)
    })

    test('Should return the correct cities', () => {
      const cities = entryWithReferences.includes.Entry.map((entry) => entry.fields.name['en-US'])
      expect(cities).to.have.members(['Berlin', 'London', 'San Francisco', 'Paris'])
    })

    test('Should not return any references', async () => {
      const noEntryReferences = await await plainClient.entry.references({
        entryId: WRONG_ENTRY_ID,
        maxDepth: 2,
      })
      expect(noEntryReferences.items).to.be.empty
    })
  })
})
