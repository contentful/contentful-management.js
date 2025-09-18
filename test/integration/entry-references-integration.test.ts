import { expect, describe, it, beforeAll, afterAll } from 'vitest'
import type { PlainClientAPI } from '../../lib/contentful-management'
import type { Environment } from '../../lib/entities/environment'
import type { Space } from '../../lib/entities/space'
import { TestDefaults } from '../defaults'
import { getDefaultSpace, initPlainClient, timeoutToCalmRateLimiting } from '../helpers'

const WRONG_ENTRY_ID = '123123XD'

describe('Entry References', () => {
  let testSpace: Space
  let testEnvironment: Environment

  beforeAll(async () => {
    testSpace = await getDefaultSpace()
    testEnvironment = await testSpace.getEnvironment('master')
  })

  afterAll(timeoutToCalmRateLimiting)

  describe('Environment Scoped', () => {
    let entryWithReferences: any

    beforeAll(async () => {
      entryWithReferences = await testEnvironment.getEntryReferences(
        TestDefaults.entry.testEntryReferenceId,
        {
          include: 2,
        },
      )
    })

    it('Get the correct entry with references', () => {
      expect(entryWithReferences.items[0].sys.id).toBe(TestDefaults.entry.testEntryReferenceId)
      expect(entryWithReferences.includes).not.toBeUndefined()
      expect(entryWithReferences.includes.Entry.length).toBeGreaterThan(0)
    })

    it('Should return the correct cities', () => {
      const cities = entryWithReferences.includes.Entry.map(
        (entry: any) => entry.fields.name['en-US'],
      )
      expect(cities).toEqual(expect.arrayContaining(['Berlin', 'London', 'San Francisco', 'Paris']))
    })

    it('Should not return any references', async () => {
      const noEntryReferences = await testEnvironment.getEntryReferences(WRONG_ENTRY_ID, {
        include: 2,
      })
      expect(noEntryReferences.items).toHaveLength(0)
    })
  })

  describe('Plain Client', () => {
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
    }
    let plainClient: PlainClientAPI
    let entry: any
    let entryWithReferences: any

    beforeAll(async () => {
      plainClient = initPlainClient(defaultParams)

      entry = await plainClient.entry.get({
        entryId: TestDefaults.entry.testEntryReferenceId,
      })

      entryWithReferences = await plainClient.entry.references({
        entryId: entry.sys.id,
        include: 5,
      })
    })

    it('Get the correct entry with references', () => {
      expect(entryWithReferences.items[0].sys.id).toBe(TestDefaults.entry.testEntryReferenceId)
      expect(entryWithReferences.includes).not.toBeUndefined()
      expect(entryWithReferences.includes.Entry.length).toBeGreaterThan(0)
    })

    it('Should return the correct cities', () => {
      const cities = entryWithReferences.includes.Entry.map(
        (entry: any) => entry.fields.name['en-US'],
      )
      expect(cities).toEqual(expect.arrayContaining(['Berlin', 'London', 'San Francisco', 'Paris']))
    })

    it('Should not return any references', async () => {
      const noEntryReferences = await plainClient.entry.references({
        entryId: WRONG_ENTRY_ID,
        include: 2,
      })
      expect(noEntryReferences.items).toHaveLength(0)
    })
  })
})
