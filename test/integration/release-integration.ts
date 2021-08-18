/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai'
import { before, describe, test } from 'mocha'
import { Environment } from '../../lib/entities/environment'
import { Space } from '../../lib/entities/space'
import { waitForReleaseActionProcessing } from '../../lib/methods/release-action'
import { TestDefaults } from '../defaults'
import { getDefaultSpace, initPlainClient } from '../helpers'
import { makeLink } from '../utils'

describe('Release Api', async function () {
  let testSpace: Space
  let testEnvironment: Environment

  before(async () => {
    testSpace = await getDefaultSpace()
    testEnvironment = await testSpace.getEnvironment('master')
  })

  describe('Read', () => {
    test('Get Release', async () => {
      const createdRelease = await testEnvironment.createRelease({
        title: 'Release (test)',
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', TestDefaults.entry.testEntryReleasesId)],
        },
      })

      const release = await testEnvironment.getRelease(createdRelease.sys.id)
      expect(release.sys.id).to.eql(createdRelease.sys.id)
      expect(release.title).to.eql(createdRelease.title)

      // cleanup
      await testEnvironment.deleteRelease(release.sys.id)
    })

    test('Get Release with an incorrect ID', async () => {
      try {
        await testEnvironment.getRelease('fakeId')
      } catch (error) {
        const parsed = JSON.parse(error.message)
        expect(parsed.status).to.eql(404)
        expect(parsed.message).to.eql('The resource could not be found.')
        expect(parsed.details).to.eql({
          type: 'Release',
          environment: testEnvironment.sys.id,
          space: testEnvironment.sys.space.sys.id,
          id: 'fakeId',
        })
      }
    })

    test('Get Releases', async () => {
      // Creates 2 releases, 1 empty and 1 containing a test entry
      const [release1, release2] = await Promise.all([
        testEnvironment.createRelease({
          title: 'First release',
          entities: {
            sys: { type: 'Array' },
            items: [],
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
        'entities.sys.id': TestDefaults.entry.testEntryReleasesId,
        limit: queryLimit,
      })

      // Returns the filtered results based on the limit
      expect(queryResult.items.length).to.eql(queryLimit)
      expect(queryResult).to.have.property('pages')

      // cleanup
      await Promise.all([
        testEnvironment.deleteRelease(release1.sys.id),
        testEnvironment.deleteRelease(release2.sys.id),
      ])
    })
  })

  describe('Write', () => {
    test('create Release', async () => {
      const release = await testEnvironment.createRelease({
        title: 'Release (test)',
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', TestDefaults.entry.testEntryReleasesId)],
        },
      })

      expect(release.entities.items).to.eql([
        makeLink('Entry', TestDefaults.entry.testEntryReleasesId),
      ])
      expect(release.title).to.eql('Release (test)')

      // cleanup
      await testEnvironment.deleteRelease(release.sys.id)
    })

    test('create empty Release', async () => {
      const release = await testEnvironment.createRelease({
        title: 'Release (test)',
        entities: {
          sys: { type: 'Array' },
          items: [],
        },
      })

      expect(release.entities.items).to.eql([])
      expect(release.title).to.eql('Release (test)')

      // cleanup
      await testEnvironment.deleteRelease(release.sys.id)
    })

    test('create invalid Release', async () => {
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
        expect(parsed.status).to.eql(422)
        expect(parsed.message).to.eql('Validation error')
        expect(parsed.details).to.eql({
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

    test('update Release', async () => {
      const release = await testEnvironment.createRelease({
        title: 'Release (test)',
        entities: {
          sys: { type: 'Array' },
          items: [],
        },
      })

      expect(release.entities.items).to.eql([])
      expect(release.title).to.eql('Release (test)')

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
      expect(updatedRelease.entities.items).to.eql([
        makeLink('Entry', TestDefaults.entry.testEntryReleasesId),
      ])

      // cleanup
      await testEnvironment.deleteRelease(updatedRelease.sys.id)
    })

    test('delete Release', async () => {
      const release = await testEnvironment.createRelease({
        title: 'Release (test)',
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', TestDefaults.entry.testEntryReleasesId)],
        },
      })

      // Deletes a Release and all its Release Actions
      await testEnvironment.deleteRelease(release.sys.id)

      try {
        await testEnvironment.getRelease(release.sys.id)
      } catch (error) {
        const parsed = JSON.parse(error.message)
        expect(parsed.status).to.eql(404)
        expect(parsed.message).to.eql('The resource could not be found.')
        expect(parsed.details).to.eql({
          type: 'Release',
          environment: testEnvironment.sys.id,
          space: testEnvironment.sys.space.sys.id,
          id: release.sys.id,
        })
      }
    })

    test('publish Release', async () => {
      // keeps original version
      const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryReferenceId)

      const release = await testEnvironment.createRelease({
        title: 'Release (test)',
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', TestDefaults.entry.testEntryReferenceId)],
        },
      })

      const publishAction = await release.publish()
      const updatedEntry = await testEnvironment.getEntry(TestDefaults.entry.testEntryReferenceId)

      expect(publishAction.sys.status).to.eql('succeeded')

      // Publishing a Release publishes all the entities within, so an entry will have its version increased
      expect(updatedEntry.sys.version).to.eql(entry.sys.version + 1)

      // cleanup
      await testEnvironment.deleteRelease(release.sys.id)
    })

    test('unpublish Release', async () => {
      const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryReferenceId)

      const release = await testEnvironment.createRelease({
        title: 'Release (test)',
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', TestDefaults.entry.testEntryReferenceId)],
        },
      })

      const unpublishAction = await release.unpublish()
      const updatedEntry = await testEnvironment.getEntry(TestDefaults.entry.testEntryReferenceId)

      expect(unpublishAction.sys.status).to.eql('succeeded')

      // Unpublishing changes
      expect(updatedEntry.sys.version).to.eql(entry.sys.version + 1)

      // cleanup
      await testEnvironment.deleteRelease(release.sys.id)
    })

    test('validate Release', async () => {
      const release = await testEnvironment.createRelease({
        title: 'Release (test)',
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', TestDefaults.entry.testEntryReferenceId)],
        },
      })

      const validateAction = await release.validate({ payload: { action: 'publish' } })
      expect(validateAction.sys.status).to.eql('succeeded')

      // cleanup
      await testEnvironment.deleteRelease(release.sys.id)
    })
  })

  describe('PlainClient', () => {
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
    }

    test('release.publish', async () => {
      const plainClient = initPlainClient(defaultParams)
      const entry = await plainClient.entry.get({
        entryId: TestDefaults.entry.testEntryReferenceId,
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

      expect(releaseActionCompleted.sys.status).to.eql('succeeded')

      // cleanup
      await plainClient.release.delete({
        releaseId: createdRelease.sys.id,
      })
    })

    test('release.validate', async () => {
      const plainClient = initPlainClient(defaultParams)

      const createdRelease = await plainClient.release.create(defaultParams, {
        title: 'Test Release',
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', TestDefaults.entry.testEntryReferenceId)],
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

      expect(releaseActionCompleted.sys.status).to.eql('succeeded')

      // cleanup
      await plainClient.release.delete({
        releaseId: createdRelease.sys.id,
      })
    })

    test('release.unpublish', async () => {
      const plainClient = initPlainClient(defaultParams)
      const entry = await plainClient.entry.get({
        entryId: TestDefaults.entry.testEntryReferenceId,
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

      expect(releaseActionCompleted.sys.status).to.eql('succeeded')

      // cleanup
      await plainClient.release.delete({
        releaseId: createdRelease.sys.id,
      })
    })
  })
})
