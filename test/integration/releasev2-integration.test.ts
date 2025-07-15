import { describe, it, beforeAll, afterAll, expect, beforeEach } from 'vitest'
import type { EntryProps, PlainClientAPI, ReleaseProps } from '../../lib/export-types'
import { TestDefaults } from '../defaults'
import { initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { makeLink } from '../utils'

describe('Release Api v2', () => {
  let entry: EntryProps
  let secondEntry: EntryProps
  let release: ReleaseProps
  let createReleaseClient: PlainClientAPI

  beforeAll(async () => {
    // create a v2 release to reuse in tests
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
      releaseSchemaVersion: 'Release.v2' as const,
    }
    createReleaseClient = initPlainClient(defaultParams)

    entry = await createReleaseClient.entry.create(
      { ...defaultParams, contentTypeId: TestDefaults.contentType.withCrossSpaceReferenceId },
      {
        fields: {
          title: {
            'en-US': 'Test Entry for Release',
          },
        },
      }
    )

    secondEntry = await createReleaseClient.entry.create(
      { ...defaultParams, contentTypeId: TestDefaults.contentType.withCrossSpaceReferenceId },
      {
        fields: {
          title: {
            'en-US': 'Second Test Entry for Release',
          },
        },
      }
    )

    release = await createReleaseClient.release.create(defaultParams, {
      title: 'Test Release',
      entities: {
        sys: { type: 'Array' },
        items: [
          {
            entity: makeLink('Entry', entry.sys.id),
            action: 'publish',
          },
          {
            entity: makeLink('Entry', secondEntry.sys.id),
            action: 'publish',
          },
        ],
      },
    })
  })

  afterAll(async () => {
    // cleanup test release
    await createReleaseClient.release.delete({
      releaseId: release.sys.id,
    })
    await createReleaseClient.entry.delete({
      entryId: entry.sys.id,
    })
    await createReleaseClient.entry.delete({
      entryId: secondEntry.sys.id,
    })
    await timeoutToCalmRateLimiting()
  })

  describe('releaseSchemaVersion is provided as a default in client', () => {
    it('release.create works', async () => {
      const newRelease = await createReleaseClient.release.create(
        {
          environmentId: TestDefaults.environmentId,
          spaceId: TestDefaults.spaceId,
        },
        {
          title: 'New Test Release',
          entities: {
            sys: {
              type: 'Array',
            },
            items: [],
          },
        }
      )
      expect(newRelease.sys.schemaVersion).toEqual('Release.v2')
      // cleanup
      await createReleaseClient.release.delete({
        releaseId: newRelease.sys.id,
      })
    })

    it('release.query works', async () => {
      const releases = await createReleaseClient.release.query({})
      const fetchedRelease = releases.items.find((item) => item.sys.id === release.sys.id)
      expect(fetchedRelease?.sys.id).toEqual(release?.sys.id)
      expect(releases.pages).toStrictEqual({})
    })

    it('release.update works', async () => {
      const updatedRelease = await createReleaseClient.release.update(
        {
          environmentId: TestDefaults.environmentId,
          spaceId: TestDefaults.spaceId,
          releaseId: release.sys.id,
          version: release.sys.version,
        },
        {
          title: 'Updated Test Release',
          entities: {
            sys: {
              type: 'Array',
            },
            items: [
              {
                entity: makeLink('Entry', entry.sys.id),
                action: 'publish',
              },
              {
                entity: makeLink('Entry', secondEntry.sys.id),
                action: 'publish',
              },
            ],
          },
          startDate: '2025-08-28T10:00:000Z',
        }
      )
      expect(updatedRelease.sys.schemaVersion).toEqual('Release.v2')
    })
  })

  describe('releaseSchemaVersion is not provided as a default', () => {
    let clientWithoutSchemaDefault: PlainClientAPI
    beforeEach(() => {
      const defaultParams = {
        environmentId: TestDefaults.environmentId,
        spaceId: TestDefaults.spaceId,
      }
      clientWithoutSchemaDefault = initPlainClient(defaultParams)
    })

    it('release.create works', async () => {
      const newRelease = await clientWithoutSchemaDefault.release.create(
        {},
        {
          title: 'New Test Release',
          sys: {
            schemaVersion: 'Release.v2',
            type: 'Release',
          },
          entities: {
            sys: {
              type: 'Array',
            },
            items: [],
          },
        }
      )
      expect(newRelease.sys.schemaVersion).toEqual('Release.v2')
      // cleanup
      await clientWithoutSchemaDefault.release.delete({
        releaseId: newRelease.sys.id,
      })
    })

    it('release.update works', async () => {
      const updatedRelease = await clientWithoutSchemaDefault.release.update(
        {
          version: release.sys.version + 1,
          releaseId: release.sys.id,
        },
        {
          title: 'Updated Test Release',
          sys: {
            schemaVersion: 'Release.v2',
            type: 'Release',
          },
          entities: {
            sys: {
              type: 'Array',
            },
            items: [
              {
                entity: makeLink('Entry', entry.sys.id),
                action: 'publish',
              },
              {
                entity: makeLink('Entry', secondEntry.sys.id),
                action: 'publish',
              },
            ],
          },
          startDate: '2025-08-28T10:00:000Z',
        }
      )
      expect(updatedRelease.sys.schemaVersion).toEqual('Release.v2')
    })

    it('release.query works', async () => {
      const releases = await clientWithoutSchemaDefault.release.query({
        query: {
          'sys.schemaVersion': 'Release.v2',
        },
      })
      const fetchedRelease = releases.items.find((item) => item.sys.id === release.sys.id)
      expect(fetchedRelease?.sys.schemaVersion).toEqual('Release.v2')
    })
  })

  describe('release.entry.* methods', () => {
    describe('when releaseId is provided as a default in client', () => {
      let clientWithReleaseIdDefault: PlainClientAPI
      beforeEach(() => {
        const defaultParams = {
          environmentId: TestDefaults.environmentId,
          spaceId: TestDefaults.spaceId,
          releaseId: release.sys.id,
        }
        clientWithReleaseIdDefault = initPlainClient(defaultParams)
      })

      it('release.entry.get works', async () => {
        const entryInSpace = await clientWithReleaseIdDefault.release.entry.get({
          entryId: entry.sys.id,
          environmentId: TestDefaults.environmentId,
          spaceId: TestDefaults.spaceId,
        })
        expect(entryInSpace.sys.id).toEqual(entry.sys.id)
        expect(entryInSpace.sys.release.sys.id).toEqual(release.sys.id)
      })

      it('release.entry.getMany works', async () => {
        const response = await clientWithReleaseIdDefault.release.entry.getMany({
          environmentId: TestDefaults.environmentId,
          spaceId: TestDefaults.spaceId,
        })

        const entries = response.items as EntryProps[]
        const foundFirstEntry = entries.find((e) => e.sys.id === entry.sys.id)
        const foundSecondEntry = entries.find((e) => e.sys.id === secondEntry.sys.id)

        expect(entries.length).toEqual(2)
        expect(foundFirstEntry?.sys.id).toEqual(entry.sys.id)
        expect(foundSecondEntry?.sys.id).toEqual(secondEntry.sys.id)
      })

      it('release.entry.update works', async () => {
        const entryInSpace = await clientWithReleaseIdDefault.release.entry.get({
          entryId: entry.sys.id,
          environmentId: TestDefaults.environmentId,
          spaceId: TestDefaults.spaceId,
        })
        const updatedEntry = await clientWithReleaseIdDefault.release.entry.update(
          {
            entryId: entryInSpace.sys.id,
            environmentId: TestDefaults.environmentId,
            spaceId: TestDefaults.spaceId,
          },
          {
            sys: entryInSpace.sys,
            fields: {
              title: {
                'en-US': 'Updated Test Entry for Release',
              },
            },
          }
        )
        expect(updatedEntry.fields.title['en-US']).toEqual('Updated Test Entry for Release')
      })

      it('release.entry.patch works', async () => {
        const entryInSpace = await clientWithReleaseIdDefault.release.entry.get({
          entryId: entry.sys.id,
          environmentId: TestDefaults.environmentId,
          spaceId: TestDefaults.spaceId,
        })

        const updatedEntry = await clientWithReleaseIdDefault.release.entry.patch(
          {
            entryId: entryInSpace.sys.id,
            environmentId: TestDefaults.environmentId,
            spaceId: TestDefaults.spaceId,
            version: entryInSpace.sys.version,
          },
          [
            {
              op: 'replace',
              path: '/fields/title/en-US',
              value: 'Patched Test Entry for Release',
            },
          ]
        )
        expect(updatedEntry.fields.title['en-US']).toEqual('Patched Test Entry for Release')
      })
    })

    describe('when releaseId is NOT provided as a default in client', () => {
      let clientWithoutReleaseIdDefault: PlainClientAPI
      beforeEach(() => {
        const defaultParams = {
          environmentId: TestDefaults.environmentId,
          spaceId: TestDefaults.spaceId,
        }
        clientWithoutReleaseIdDefault = initPlainClient(defaultParams)
      })

      it('release.entry.get works', async () => {
        const entryInSpace = await clientWithoutReleaseIdDefault.release.entry.get({
          releaseId: release.sys.id,
          entryId: entry.sys.id,
          environmentId: TestDefaults.environmentId,
          spaceId: TestDefaults.spaceId,
        })
        expect(entryInSpace.sys.id).toEqual(entry.sys.id)
        expect(entryInSpace.sys.release.sys.id).toEqual(release.sys.id)
      })

      it('release.entry.getMany works', async () => {
        const response = await clientWithoutReleaseIdDefault.release.entry.getMany({
          releaseId: release.sys.id,
          environmentId: TestDefaults.environmentId,
          spaceId: TestDefaults.spaceId,
        })

        const entries = response.items as EntryProps[]
        const foundFirstEntry = entries.find((e) => e.sys.id === entry.sys.id)
        const foundSecondEntry = entries.find((e) => e.sys.id === secondEntry.sys.id)

        expect(entries.length).toEqual(2)
        expect(foundFirstEntry?.sys.id).toEqual(entry.sys.id)
        expect(foundSecondEntry?.sys.id).toEqual(secondEntry.sys.id)
      })

      it('release.entry.update works', async () => {
        const entryInSpace = await clientWithoutReleaseIdDefault.release.entry.get({
          entryId: entry.sys.id,
          environmentId: TestDefaults.environmentId,
          spaceId: TestDefaults.spaceId,
          releaseId: release.sys.id,
        })
        const updatedEntry = await clientWithoutReleaseIdDefault.release.entry.update(
          {
            entryId: entryInSpace.sys.id,
            environmentId: TestDefaults.environmentId,
            spaceId: TestDefaults.spaceId,
            releaseId: release.sys.id,
          },
          {
            sys: entryInSpace.sys,
            fields: {
              title: {
                'en-US': 'Updated Test Entry for Release',
              },
            },
          }
        )
        expect(updatedEntry.fields.title['en-US']).toEqual('Updated Test Entry for Release')
      })

      it('release.entry.patch works', async () => {
        const entryInSpace = await clientWithoutReleaseIdDefault.release.entry.get({
          entryId: entry.sys.id,
          environmentId: TestDefaults.environmentId,
          spaceId: TestDefaults.spaceId,
          releaseId: release.sys.id,
        })

        const updatedEntry = await clientWithoutReleaseIdDefault.release.entry.patch(
          {
            entryId: entryInSpace.sys.id,
            environmentId: TestDefaults.environmentId,
            spaceId: TestDefaults.spaceId,
            releaseId: release.sys.id,
            version: entryInSpace.sys.version,
          },
          [
            {
              op: 'replace',
              path: '/fields/title/en-US',
              value: 'Patched Test Entry for Release',
            },
          ]
        )
        expect(updatedEntry.fields.title['en-US']).toEqual('Patched Test Entry for Release')
      })
    })
  })
})
