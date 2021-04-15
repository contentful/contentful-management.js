import { expect } from 'chai'
import delay from 'delay'
import { before, after, describe, test } from 'mocha'
import { Link, VersionedLink } from '../../lib/common-types'
import { BulkActionStatus } from '../../lib/entities/bulk-action'
import { Environment } from '../../lib/entities/environment'
import { Space } from '../../lib/entities/space'
import { TestDefaults } from '../defaults'
import { getDefaultSpace } from '../helpers'
import { makeLink, makeVersionedLink } from '../utils'

const bulkActionPayload = (items: Link<any>[] | VersionedLink<any>[]) => ({
  entities: {
    sys: { type: 'Array' },
    items,
  },
})

describe('BulkAction Api', async function () {
  let testSpace: Space
  let testEnvironment: Environment
  let writeSpace

  before(async () => {
    testSpace = await getDefaultSpace()
    testEnvironment = await testSpace.getEnvironment('master')
  })

  after(async () => {
    if (writeSpace) {
      return writeSpace.delete()
    }
  })

  describe('Read', () => {
    test('Get BulkAction', async () => {
      const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryId)

      const createdBulkAction = await testEnvironment.createPublishBulkAction(
        bulkActionPayload([makeVersionedLink('Entry', entry.sys.id, entry.sys.version)])
      )

      const bulkActionInProgress = await testEnvironment.getBulkAction(createdBulkAction.sys.id)
      expect(bulkActionInProgress.sys.id).to.eql(createdBulkAction.sys.id)
    })

    test('Get BulkAction on wrong id', async () => {
      try {
        await testEnvironment.getBulkAction('fakeId')
      } catch (error) {
        const parsed = JSON.parse(error.message)
        expect(parsed.status).to.eql(404)
        expect(parsed.message).to.eql('The resource could not be found.')
        expect(parsed.details).to.eql({
          type: 'BulkAction',
          id: 'fakeId',
        })
      }
    })
  })

  describe('Write', () => {
    test('Publish BulkAction', async () => {
      const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryId)

      const createdBulkAction = await testEnvironment.createPublishBulkAction(
        bulkActionPayload([makeVersionedLink('Entry', entry.sys.id, entry.sys.version)])
      )

      // Wait for BulkAction completion
      await delay(1000)

      const bulkActionInProgress = await testEnvironment.getBulkAction(createdBulkAction.sys.id)
      expect(bulkActionInProgress.sys.status).to.eql(BulkActionStatus.succeeded)
      expect(bulkActionInProgress.action).to.eql('publish')
    })

    test('Publish BulkAction with wrong payload', async () => {
      const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryId)

      // The publish action relies on the Link object having a `version` property
      try {
        await testEnvironment.createPublishBulkAction(
          bulkActionPayload([makeLink('Entry', entry.sys.id)])
        )
      } catch (error) {
        const parsed = JSON.parse(error.message)
        expect(parsed.status).to.eql(422)
        expect(parsed.message).to.eql('Validation error')
        expect(parsed.details).to.eql({
          errors: [
            {
              details: '"entities.items[0].sys.version" is required',
              name: 'any.required',
              path: ['entities', 'items', 0, 'sys', 'version'],
            },
          ],
        })
      }
    })

    test('Unpublish BulkAction', async () => {
      const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryId)

      const createdBulkAction = await testEnvironment.createUnpublishBulkAction(
        bulkActionPayload([makeLink('Entry', entry.sys.id)])
      )

      // Wait for BulkAction completion
      await delay(1000)

      const bulkActionInProgress = await testEnvironment.getBulkAction(createdBulkAction.sys.id)
      expect(bulkActionInProgress.sys.status).to.eql(BulkActionStatus.succeeded)
      expect(bulkActionInProgress.action).to.eql('unpublish')
    })

    test('Validate BulkAction', async () => {
      const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryId)

      const createdBulkAction = await testEnvironment.createValidateBulkAction(
        bulkActionPayload([makeLink('Entry', entry.sys.id)])
      )

      // Wait for BulkAction completion
      await delay(1000)

      const bulkActionInProgress = await testEnvironment.getBulkAction(createdBulkAction.sys.id)
      expect(bulkActionInProgress.sys.status).to.eql(BulkActionStatus.succeeded)
      expect(bulkActionInProgress.action).to.eql('validate')
    })
  })
})
