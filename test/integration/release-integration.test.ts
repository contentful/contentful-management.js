import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import type { Environment, Space } from '../../lib/export-types.js'
import { waitForReleaseActionProcessing } from '../../lib/methods/release-action.js'
import { TestDefaults } from '../defaults.js'
import {
  createTestSpace,
  initPlainClient,
  defaultClient,
  timeoutToCalmRateLimiting,
} from '../helpers.js'
import { makeLink } from '../utils.js'

describe('Release Api', () => {
  let testSpace: Space
  let testEnvironment: Environment

  beforeAll(async () => {
    try {
      testSpace = await createTestSpace(defaultClient, 'Releases')
      testEnvironment = await testSpace.getEnvironment('master')
      const contentType = await testEnvironment.createContentTypeWithId('testContentType', {
        name: 'testContentType',
        fields: [
          {
            id: 'title',
            name: 'Title',
            localized: false,
            required: false,
            type: 'Symbol',
          },
        ],
      })
      await contentType.publish()
      await testEnvironment.createEntryWithId(
        'testContentType',
        TestDefaults.entry.testEntryReleasesId,
        {
          fields: {
            title: { 'en-US': 'Non-localized value' },
          },
        }
      )
    } catch (err) {
      console.error('Error running <before> setup: ', err)
    }
  })

  afterAll(async () => {
    if (testSpace) {
      await testSpace.delete()
    }
    await timeoutToCalmRateLimiting()
  })

  describe('Read', () => {
    it('Get Release', async () => {
      const createdRelease = await testEnvironment.createRelease({
        title: 'Release (test)',
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', TestDefaults.entry.testEntryReleasesId)],
        },
      })

      const release = await testEnvironment.getRelease(createdRelease.sys.id)
      expect(release.sys.id).toBe(createdRelease.sys.id)
      expect(release.title).toBe(createdRelease.title)

      // cleanup
      await testEnvironment.deleteRelease(release.sys.id)
    })

    it('Get Release with an incorrect ID', async () => {
      try {
        await testEnvironment.getRelease('fakeId')
      } catch (error) {
        const parsed = JSON.parse(error.message)
        expect(parsed.status).toBe(404)
        expect(parsed.message).toBe('The resource could not be found.')
        expect(parsed.details).toEqual({
          type: 'Release',
          environment: testEnvironment.sys.id,
          space: testEnvironment.sys.space.sys.id,
          id: 'fakeId',
        })
      }
    })

    it('Get Releases', async () => {
      const [release1, release2] = await Promise.all([
        testEnvironment.createRelease({
          title: 'First release',
          entities: {
            sys: { type: 'Array' },
            items: [makeLink('Entry', TestDefaults.entry.testEntryReleasesId)],
          },
        }),
        testEnvironment.createRelease({
          title: 'Second release',
          entities: {
            sys: { type: 'Array' },
            items: [makeLink('Entry', TestDefaults.entry.testEntryReleasesId)],
          },
        }),
      ])

      const queryLimit = 1
      const queryResult = await testEnvironment.getReleases({
        'entities.sys.id[in]': TestDefaults.entry.testEntryReleasesId,
        'entities.sys.linkType': 'Entry',
        limit: queryLimit,
      })

      expect(queryResult.items.length).toBe(queryLimit)
      expect(queryResult).toHaveProperty('pages')
      expect(typeof queryResult.pages?.next).toBe('string')

      // cleanup
      await Promise.all([
        testEnvironment.deleteRelease(release1.sys.id),
        testEnvironment.deleteRelease(release2.sys.id),
      ])
    })

    it('Get Releases with query filters', async () => {
      const [release1, release2] = await Promise.all([
        testEnvironment.createRelease({
          title: 'First release',
          entities: {
            sys: { type: 'Array' },
            items: [makeLink('Entry', TestDefaults.entry.testEntryReleasesId)],
          },
        }),
        testEnvironment.createRelease({
          title: 'Second release',
          entities: {
            sys: { type: 'Array' },
            items: [],
          },
        }),
      ])

      const queryResult = await testEnvironment.getReleases({
        'entities[exists]': true,
        'sys.status[in]': 'active',
        limit: 1,
        order: '-sys.createdAt',
      })

      expect(queryResult.items.length).toBe(1)
      expect(queryResult.items[0].title).toBe('First release')

      // cleanup
      await Promise.all([
        testEnvironment.deleteRelease(release1.sys.id),
        testEnvironment.deleteRelease(release2.sys.id),
      ])
    })
  })

  describe('Write', () => {
    it('create Release', async () => {
      const release = await testEnvironment.createRelease({
        title: 'Release (test)',
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', TestDefaults.entry.testEntryReleasesId)],
        },
      })

      expect(release.entities.items).toEqual([
        makeLink('Entry', TestDefaults.entry.testEntryReleasesId),
      ])
      expect(release.title).toBe('Release (test)')

      // cleanup
      await testEnvironment.deleteRelease(release.sys.id)
    })

    it('create empty Release', async () => {
      const release = await testEnvironment.createRelease({
        title: 'Release (test)',
        entities: {
          sys: { type: 'Array' },
          items: [],
        },
      })

      expect(release.entities.items).toEqual([])
      expect(release.title).toBe('Release (test)')

      // cleanup
      await testEnvironment.deleteRelease(release.sys.id)
    })

    it('create invalid Release', async () => {
      try {
        await testEnvironment.createRelease({
          title: 'Release (test)',
          entities: {
            sys: { type: 'Array' },
            items: [makeLink('Entry', 'non-existent-entry')],
          },
        })
      } catch (error) {
        const parsed = JSON.parse(error.message)
        expect(parsed.status).toBe(422)
        expect(parsed.message).toBe('Validation error')
        expect(parsed.details).toEqual({
          errors: [
            {
              error: {
                details: {
                  sys: {
                    id: 'non-existent-entry',
                    type: 'Entry',
                  },
                },
                message: 'The resource could not be found.',
                sys: {
                  id: 'NotFound',
                  type: 'Error',
                },
              },
            },
          ],
        })
      }
    })

    it('update Release', async () => {
      const release = await testEnvironment.createRelease({
        title: 'Release (test)',
        entities: {
          sys: { type: 'Array' },
          items: [],
        },
      })

      expect(release.entities.items).toEqual([])
      expect(release.title).toBe('Release (test)')

      await testEnvironment.updateRelease({
        releaseId: release.sys.id,
        payload: {
          title: release.title,
          entities: {
            sys: { type: 'Array' },
            items: [makeLink('Entry', TestDefaults.entry.testEntryReleasesId)],
          },
        },
        version: release.sys.version,
      })

      const updatedRelease = await testEnvironment.getRelease(release.sys.id)
      expect(updatedRelease.entities.items).toEqual([
        makeLink('Entry', TestDefaults.entry.testEntryReleasesId),
      ])

      // cleanup
      await testEnvironment.deleteRelease(updatedRelease.sys.id)
    })

    it('delete Release', async () => {
      const release = await testEnvironment.createRelease({
        title: 'Release (test)',
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', TestDefaults.entry.testEntryReleasesId)],
        },
      })

      await testEnvironment.deleteRelease(release.sys.id)

      try {
        await testEnvironment.getRelease(release.sys.id)
      } catch (error) {
        const parsed = JSON.parse(error.message)
        expect(parsed.status).toBe(404)
        expect(parsed.message).toBe('The resource could not be found.')
        expect(parsed.details).toEqual({
          type: 'Release',
          environment: testEnvironment.sys.id,
          space: testEnvironment.sys.space.sys.id,
          id: release.sys.id,
        })
      }
    })
  })

  describe('PlainClient', () => {
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
    }
    const plainClient = initPlainClient(defaultParams)

    it('release.publish', async () => {
      const entry = await plainClient.entry.get({
        entryId: TestDefaults.entry.testEntryReleasesId,
      })

      const createdRelease = await plainClient.release.create(defaultParams, {
        title: 'Test Release',
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', entry.sys.id)],
        },
      })

      const releaseAction = await plainClient.release.publish({
        releaseId: createdRelease.sys.id,
        version: createdRelease.sys.version,
      })

      const releaseActionCompleted = await waitForReleaseActionProcessing<'publish'>({
        ...defaultParams,
        plainClient,
        releaseId: createdRelease.sys.id,
        actionId: releaseAction.sys.id,
      })

      expect(releaseActionCompleted.sys.status).toBe('succeeded')

      // cleanup
      await plainClient.release.delete({
        releaseId: createdRelease.sys.id,
      })
    })

    it('release.validate', async () => {
      const createdRelease = await plainClient.release.create(defaultParams, {
        title: 'Test Release',
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', TestDefaults.entry.testEntryReleasesId)],
        },
      })

      const releaseAction = await plainClient.release.validate({
        releaseId: createdRelease.sys.id,
      })

      const releaseActionCompleted = await waitForReleaseActionProcessing<'validate'>({
        ...defaultParams,
        plainClient,
        releaseId: createdRelease.sys.id,
        actionId: releaseAction.sys.id,
      })

      expect(releaseActionCompleted.sys.status).toBe('succeeded')

      // cleanup
      await plainClient.release.delete({
        releaseId: createdRelease.sys.id,
      })
    })

    it('release.unpublish', async () => {
      const entry = await plainClient.entry.get({
        entryId: TestDefaults.entry.testEntryReleasesId,
      })

      const createdRelease = await plainClient.release.create(defaultParams, {
        title: 'Test Release',
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', entry.sys.id)],
        },
      })

      const releaseAction = await plainClient.release.unpublish({
        releaseId: createdRelease.sys.id,
        version: createdRelease.sys.version,
      })

      const releaseActionCompleted = await waitForReleaseActionProcessing<'unpublish'>({
        ...defaultParams,
        plainClient,
        releaseId: createdRelease.sys.id,
        actionId: releaseAction.sys.id,
      })

      expect(releaseActionCompleted.sys.status).toBe('succeeded')

      // cleanup
      await plainClient.release.delete({
        releaseId: createdRelease.sys.id,
      })
    })

    it('release.query', async () => {
      const release = await plainClient.release.create(defaultParams, {
        title: 'Test Release',
        entities: {
          sys: {
            type: 'Array',
          },
          items: [makeLink('Entry', TestDefaults.entry.testEntryReleasesId)],
        },
      })

      const releases = await plainClient.release.query({
        query: {
          'sys.id[in]': release.sys.id,
        },
      })
      expect(releases.items).toEqual([release])
      expect(releases.pages).toStrictEqual({})
    })

    it('release.archive', async () => {
      const release = await plainClient.release.create(defaultParams, {
        title: 'Test Release',
        entities: {
          sys: {
            type: 'Array',
          },
          items: [makeLink('Entry', TestDefaults.entry.testEntryReleasesId)],
        },
      })

      const releaseResult = await plainClient.release.archive({
        releaseId: release.sys.id,
        version: release.sys.version,
      })
      expect(releaseResult.sys.status).toBe('archived')
      expect(releaseResult.sys.archivedBy).toBeDefined()
    })

    it('release.unarchive', async () => {
      const release = await plainClient.release.create(defaultParams, {
        title: 'Test Release',
        entities: {
          sys: {
            type: 'Array',
          },
          items: [makeLink('Entry', TestDefaults.entry.testEntryReleasesId)],
        },
      })

      const releaseParams = { releaseId: release.sys.id, version: release.sys.version }

      const updatedRelease = await plainClient.release.archive(releaseParams)

      const releaseResult = await plainClient.release.unarchive({
        ...releaseParams,
        version: updatedRelease.sys.version,
      })
      expect(releaseResult.sys.status).toBe('active')
      expect(releaseResult.sys.archivedBy).toBeUndefined()
    })
  })
})
