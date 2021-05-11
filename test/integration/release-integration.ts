/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai'
import { before, describe, test } from 'mocha'
import { Environment } from '../../lib/entities/environment'
import { Space } from '../../lib/entities/space'
import { TestDefaults } from '../defaults'
import { getDefaultSpace } from '../helpers'
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
          items: [makeLink('Entry', TestDefaults.entry.testEntryReferenceId)],
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
          items: [makeLink('Entry', TestDefaults.entry.testEntryReferenceId)],
        },
      })

      expect(release.entities.items).to.eql([
        makeLink('Entry', TestDefaults.entry.testEntryReferenceId),
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
            items: [makeLink('Entry', TestDefaults.entry.testEntryReferenceId)],
          },
        },
        version: release.sys.version,
      })

      const updatedRelease = await testEnvironment.getRelease(release.sys.id)
      expect(updatedRelease.entities.items).to.eql([
        makeLink('Entry', TestDefaults.entry.testEntryReferenceId),
      ])

      // cleanup
      await testEnvironment.deleteRelease(updatedRelease.sys.id)
    })

    test('delete Release', async () => {
      const release = await testEnvironment.createRelease({
        title: 'Release (test)',
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', TestDefaults.entry.testEntryReferenceId)],
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
  })
})
