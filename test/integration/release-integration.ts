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

  describe.only('Write', () => {
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

    //   test('Publish BulkAction with wrong payload', async () => {
    //     const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryId)

    //     // The publish action relies on the Link object having a `version` property
    //     try {
    //       await testEnvironment.createPublishBulkAction({
    //         entities: {
    //           sys: { type: 'Array' },
    //           items: [makeLink('Entry', entry.sys.id) as any],
    //         },
    //       })
    //     } catch (error) {
    //       const parsed = JSON.parse(error.message)
    //       expect(parsed.status).to.eql(422)
    //       expect(parsed.message).to.eql('Validation error')
    //       expect(parsed.details).to.eql({
    //         errors: [
    //           {
    //             details: '"entities.items[0].sys.version" is required',
    //             name: 'any.required',
    //             path: ['entities', 'items', 0, 'sys', 'version'],
    //           },
    //         ],
    //       })
    //     }
    //   })

    //   test('Unpublish BulkAction', async () => {
    //     const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryId)

    //     const createdBulkAction = await testEnvironment.createUnpublishBulkAction({
    //       entities: {
    //         sys: { type: 'Array' },
    //         items: [makeLink('Entry', entry.sys.id)],
    //       },
    //     })

    //     const bulkAction = await createdBulkAction.waitProcessing({ initialDelayMs: 500 })
    //     expect(bulkAction.sys.status).to.eql(BulkActionStatus.succeeded)
    //     expect(bulkAction.action).to.eql('unpublish')
    //   })

    //   test('Validate BulkAction', async () => {
    //     const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryId)

    //     const createdBulkAction = await testEnvironment.createValidateBulkAction({
    //       entities: {
    //         sys: { type: 'Array' },
    //         items: [makeLink('Entry', entry.sys.id)],
    //       },
    //     })

    //     const bulkAction = await createdBulkAction.waitProcessing({ initialDelayMs: 500 })
    //     expect(bulkAction.sys.status).to.eql(BulkActionStatus.succeeded)
    //     expect(bulkAction.action).to.eql('validate')
    //   })
  })

  // PlainAPI doesn't offer the wait for processing
  // describe('PlainClient', () => {
  //   const defaultParams = {
  //     environmentId: TestDefaults.environmentId,
  //     spaceId: TestDefaults.spaceId,
  //   }

  //   test('bulkAction.publish', async () => {
  //     const plainClient = getPlainClient(defaultParams)
  //     const entry = await plainClient.entry.get({ entryId: TestDefaults.entry.testEntryId })

  //     const bulkActionInProgress = await plainClient.bulkAction.publish(defaultParams, {
  //       entities: {
  //         sys: { type: 'Array' },
  //         items: [makeVersionedLink('Entry', entry.sys.id, entry.sys.version)],
  //       },
  //     })

  //     const bulkActionCompleted = await waitForBulkActionProcessing<BulkActionPublishPayload>({
  //       ...defaultParams,
  //       plainClient,
  //       bulkActionId: bulkActionInProgress.sys.id,
  //     })

  //     expect(bulkActionCompleted.sys.status).to.eql(BulkActionStatus.succeeded)
  //     expect(bulkActionCompleted.action).to.eql('publish')
  //   })

  //   test('bulkAction.unpublish', async () => {
  //     const plainClient = getPlainClient(defaultParams)
  //     const entry = await plainClient.entry.get({ entryId: TestDefaults.entry.testEntryId })

  //     const bulkActionInProgress = await plainClient.bulkAction.unpublish(defaultParams, {
  //       entities: {
  //         sys: { type: 'Array' },
  //         items: [makeLink('Entry', entry.sys.id)],
  //       },
  //     })

  //     const bulkActionCompleted = await waitForBulkActionProcessing<BulkActionUnpublishPayload>({
  //       ...defaultParams,
  //       plainClient,
  //       bulkActionId: bulkActionInProgress.sys.id,
  //     })

  //     expect(bulkActionCompleted.sys.status).to.eql(BulkActionStatus.succeeded)
  //     expect(bulkActionCompleted.action).to.eql('unpublish')
  //   })

  //   test('bulkAction.validate', async () => {
  //     const plainClient = getPlainClient(defaultParams)
  //     const entry = await plainClient.entry.get({ entryId: TestDefaults.entry.testEntryId })

  //     const bulkActionInProgress = await plainClient.bulkAction.validate(defaultParams, {
  //       entities: {
  //         sys: { type: 'Array' },
  //         items: [makeLink('Entry', entry.sys.id)],
  //       },
  //     })

  //     const bulkActionCompleted = await waitForBulkActionProcessing<BulkActionValidatePayload>({
  //       ...defaultParams,
  //       plainClient,
  //       bulkActionId: bulkActionInProgress.sys.id,
  //     })

  //     expect(bulkActionCompleted.sys.status).to.eql(BulkActionStatus.succeeded)
  //     expect(bulkActionCompleted.action).to.eql('validate')
  //   })
  // })

  // describe('Processing errors', () => {
  //   test('when the BulkAction does not get processed in the expected retry count', async () => {
  //     const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryId)

  //     const createdBulkAction = await testEnvironment.createPublishBulkAction({
  //       entities: {
  //         sys: { type: 'Array' },
  //         items: [makeVersionedLink('Entry', entry.sys.id, entry.sys.version)],
  //       },
  //     })

  //     // returns the same bulkAction with status = created
  //     sinon.stub(createdBulkAction, 'get').returns(createdBulkAction)

  //     try {
  //       createdBulkAction.waitProcessing({
  //         initialDelayMs: 0,
  //         retryCount: 10,
  //         retryIntervalMs: 100,
  //       })
  //     } catch (error: any) {
  //       expect(error.message).to.eql(
  //         "BulkAction didn't finish processing within the expected timeframe."
  //       )
  //       expect(error.bulkAction).to.eql(createdBulkAction)
  //     }
  //   })

  //   test('when the BulkAction returns a `failed` status', async () => {
  //     const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryId)

  //     const createdBulkAction = await testEnvironment.createValidateBulkAction({
  //       entities: {
  //         sys: { type: 'Array' },
  //         items: [makeLink('Entry', entry.sys.id)],
  //       },
  //     })

  //     // returns the same bulkAction with status = failed
  //     sinon
  //       .stub(createdBulkAction, 'get')
  //       .returns(merge(createdBulkAction, { sys: { status: 'failed' } }))

  //     try {
  //       createdBulkAction.waitProcessing({
  //         initialDelayMs: 0,
  //         retryCount: 1,
  //         retryIntervalMs: 0,
  //         throwOnFailedExecution: true,
  //       })
  //     } catch (error: any) {
  //       expect(error.message).to.eql('BulkAction failed to execute.')
  //       expect(error.bulkAction.sys.status).to.eql('failed')
  //     }
  //   })
  // })
})
