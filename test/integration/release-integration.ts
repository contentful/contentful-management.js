/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai'
import { before, describe, test } from 'mocha'
import { Environment } from '../../lib/entities/environment'
import { Space } from '../../lib/entities/space'
import { TestDefaults } from '../defaults'
import { getDefaultSpace, getPlainClient } from '../helpers'
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
          items: [makeLink('Entry', TestDefaults.entry.testEntryId)],
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
  })

  describe('Write', () => {
    test('create Release', async () => {
      const release = await testEnvironment.createRelease({
        title: 'Release (test)',
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', TestDefaults.entry.testEntryId)],
        },
      })

      expect(release.entities.items).to.eql([makeLink('Entry', TestDefaults.entry.testEntryId)])
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
            items: [makeLink('Entry', TestDefaults.entry.testEntryId)],
          },
        },
        version: release.sys.version,
      })

      const updatedRelease = await testEnvironment.getRelease(release.sys.id)
      expect(updatedRelease.entities.items).to.eql([
        makeLink('Entry', TestDefaults.entry.testEntryId),
      ])

      // cleanup
      await testEnvironment.deleteRelease(updatedRelease.sys.id)
    })

    test('delete Release', async () => {
      const release = await testEnvironment.createRelease({
        title: 'Release (test)',
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', TestDefaults.entry.testEntryId)],
        },
      })

      // cleanup
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
      const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryId)

      const release = await testEnvironment.createRelease({
        title: 'Release (test)',
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', TestDefaults.entry.testEntryId)],
        },
      })

      const publishAction = await release.publish()
      const updatedEntry = await testEnvironment.getEntry(TestDefaults.entry.testEntryId)

      expect(publishAction.sys.status).to.eql('succeeded')

      // Publishing a Release publishes all the entities within, so an entry will have its version increased
      expect(updatedEntry.sys.version).to.eql(entry.sys.version + 1)

      // cleanup
      await testEnvironment.deleteRelease(release.sys.id)
    })

    test('unpublish Release', async () => {
      const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryId)

      const release = await testEnvironment.createRelease({
        title: 'Release (test)',
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', TestDefaults.entry.testEntryId)],
        },
      })

      const unpublishAction = await release.unpublish()
      const updatedEntry = await testEnvironment.getEntry(TestDefaults.entry.testEntryId)

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
          items: [makeLink('Entry', TestDefaults.entry.testEntryId)],
        },
      })

      const unpublishAction = await release.validate({ action: 'publish' })

      expect(unpublishAction.sys.status).to.eql('succeeded')

      // cleanup
      await testEnvironment.deleteRelease(release.sys.id)
    })
  })
})
