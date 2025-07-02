import { describe, it, beforeAll, afterAll, expect, beforeEach } from 'vitest'
import type {
  EntryProps,
  GetReleaseEntryParams,
  GetReleaseParams,
  PlainClientAPI,
  ReleaseProps,
} from '../../lib/export-types'
import { TestDefaults } from '../defaults'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { makeLink } from '../utils'

describe('Entry Api with Release ID', () => {
  let entry: EntryProps
  let release: ReleaseProps
  let createEntryClient: PlainClientAPI

  beforeAll(async () => {
    // create a v2 release w/ entry to reuse in tests
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
      releaseSchemaVersion: 'Release.v2' as const,
    }
    createEntryClient = initPlainClient(defaultParams)

    entry = await createEntryClient.entry.create(
      { ...defaultParams, contentTypeId: TestDefaults.contentType.withCrossSpaceReferenceId },
      {
        fields: {
          title: {
            'en-US': 'Test Entry for Release',
          },
        },
      }
    )

    release = await createEntryClient.release.create(defaultParams, {
      title: 'Test Release',
      entities: {
        sys: { type: 'Array' },
        items: [
          {
            entity: makeLink('Entry', entry.sys.id),
            action: 'publish',
          },
        ],
      },
    })
  })

  afterAll(async () => {
    // cleanup test release
    await createEntryClient.release.delete({
      releaseId: release.sys.id,
    })
    await createEntryClient.entry.delete({
      entryId: entry.sys.id,
    })
    await timeoutToCalmRateLimiting()
  })

  describe('releaseId is provided in params, but not in default params', () => {
    it('entry.get works', async () => {
      const fetchedEntry = await createEntryClient.entry.get({
        entryId: entry.sys.id,
        releaseId: release.sys.id,
      })
      expect(fetchedEntry.sys.id).toEqual(entry.sys.id)
      expect(fetchedEntry.sys.release.sys.id).toEqual(release.sys.id)
    })
  })

  describe('releaseId is provided in default params, but not in params', () => {
    beforeEach(() => {
      createEntryClient = initPlainClient({
        environmentId: TestDefaults.environmentId,
        spaceId: TestDefaults.spaceId,
        releaseId: release.sys.id,
      })
    })

    it('entry.get works', async () => {
      const fetchedEntry = await createEntryClient.entry.get({
        entryId: entry.sys.id,
      })
      expect(fetchedEntry.sys.id).toEqual(entry.sys.id)
      expect(fetchedEntry.sys.release.sys.id).toEqual(release.sys.id)
    })
  })
})
