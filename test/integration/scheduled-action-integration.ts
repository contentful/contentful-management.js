/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai'
import { before, describe, test } from 'mocha'
import { Space } from '../../lib/entities/space'
import { TestDefaults } from '../defaults'
import { getDefaultSpace, getPlainClient } from '../helpers'
import { makeLink } from '../utils'

describe('Scheduled actions api', async function () {
  let testSpace: Space

  before(async () => {
    testSpace = await getDefaultSpace()
  })

  describe('Read', () => {
    test('Get Scheduled action', async () => {
      const createdAction = await testSpace.createScheduledAction({
        entity: makeLink('Entry', TestDefaults.entry.testEntryId),
        action: 'publish',
        scheduledFor: {
          datetime: new Date().toISOString(),
        },
      })

      const fetchedActions = await testSpace.getScheduledActions({
        'environment.sys.id': createdAction.environment.sys.id,
        'sys.id[in]': createdAction.sys.id,
      })

      expect(fetchedActions.total).to.eql(1)
      const fetchedAction = fetchedActions.items[0]
      expect(fetchedAction.sys.id).to.eql(createdAction.sys.id)
      expect(fetchedAction.action).to.eql(createdAction.action)
      expect(fetchedAction.entity).to.eql(createdAction.entity)

      // cleanup
      await fetchedAction.delete()
    })

    test('Get Scheduled Actions', async () => {
      // Creates 2 scheduled actions
      const [action1, action2] = await Promise.all([
        testSpace.createScheduledAction({
          entity: makeLink('Entry', TestDefaults.entry.testEntryId),
          action: 'publish',
          scheduledFor: {
            datetime: new Date().toISOString(),
          },
        }),
        testSpace.createScheduledAction({
          entity: makeLink('Asset', TestDefaults.asset.testAssetId),
          action: 'unpublish',
          scheduledFor: {
            datetime: new Date().toISOString(),
          },
        }),
      ])

      const queryLimit = 1
      const queryResult = await testSpace.getScheduledActions({
        'environment.sys.id': TestDefaults.environmentId,
        limit: queryLimit,
      })

      // Returns the filtered results based on the limit
      expect(queryResult.items.length).to.eql(queryLimit)
      expect(queryResult).to.have.property('pages')

      // cleanup
      await Promise.all([action1.delete(), action2.delete()])
    })
  })

  describe('Write', () => {
    test('create Scheduled Action', async () => {
      const datetime = new Date().toISOString()

      const scheduledAction = await testSpace.createScheduledAction({
        entity: makeLink('Entry', TestDefaults.entry.testEntryId),
        action: 'publish',
        scheduledFor: {
          datetime,
        },
      })

      expect(scheduledAction.entity).to.equal(makeLink('Entry', TestDefaults.entry.testEntryId))
      expect(scheduledAction.action).to.eql('publish')
      expect(scheduledAction.scheduledFor).to.eql({
        datetime,
      })

      // cleanup
      await scheduledAction.delete()
    })

    test('create scheduled action for an asset', async () => {
      const datetime = new Date().toISOString()

      const scheduledAction = await testSpace.createScheduledAction({
        entity: makeLink('Asset', TestDefaults.asset.testAssetId),
        action: 'unpublish',
        scheduledFor: {
          datetime,
        },
      })

      expect(scheduledAction.entity).to.eql(makeLink('Asset', TestDefaults.asset.testAssetId))
      expect(scheduledAction.action).to.eql('unpublish')
      expect(scheduledAction.scheduledFor).to.equal({
        datetime,
      })

      // cleanup
      await scheduledAction.delete()
    })

    test('create invalid scheduled action', async () => {
      try {
        const datetime = new Date().toISOString()

        await testSpace.createScheduledAction({
          entity: makeLink('Asset', 'invalid-id'),
          action: 'unpublish',
          scheduledFor: {
            datetime,
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
                    id: 'non-existent-asset',
                    type: 'Asset',
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

    test('update scheduled actions', async () => {
      const datetime = new Date().toISOString()
      const updatedSchedule = new Date(Date.now() + 10000).toISOString()

      const scheduledAction = await testSpace.createScheduledAction({
        entity: makeLink('Asset', TestDefaults.asset.testAssetId),
        action: 'unpublish',
        scheduledFor: {
          datetime,
        },
      })

      expect(scheduledAction.entity).to.eql(makeLink('Asset', TestDefaults.asset.testAssetId))
      expect(scheduledAction.scheduledFor).to.eql({
        datetime,
      })

      const { sys, ...payload } = scheduledAction

      await testSpace.updateScheduledAction({
        scheduledActionId: sys.id,
        version: sys.version,
        payload: {
          entity: makeLink('Entry', TestDefaults.entry.testEntryId),
          action: 'publish',
          scheduledFor: {
            datetime: updatedSchedule,
          },
        },
      })

      const actions = await testSpace.getScheduledActions({
        'environment.sys.id': payload.environment.sys.id,
      })
      const updatedAction = actions.items[0]

      expect(updatedAction.entity).to.eql([makeLink('Entry', TestDefaults.entry.testEntryId)])
      expect(updatedAction.action).to.eql('publish')
      expect(updatedAction.scheduledFor).to.eql({
        datetime: updatedSchedule,
      })

      // cleanup
      await updatedAction.delete()
    })

    test('delete scheduled action', async () => {
      const datetime = new Date().toISOString()

      const scheduledAction = await testSpace.createScheduledAction({
        entity: makeLink('Asset', TestDefaults.asset.testAssetId),
        action: 'unpublish',
        scheduledFor: {
          datetime,
        },
      })

      // Deletes a Release and all its Release Actions
      await scheduledAction.delete()

      const response = await testSpace.getScheduledActions({
        'environment.sys.id': scheduledAction.environment.sys.id,
      })
      expect(response.total).to.equal(0)
    })
  })

  describe('PlainClient', () => {
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
    }

    test('lifecycle', async () => {
      const plainClient = getPlainClient(defaultParams)
      const entry = await plainClient.entry.get({
        entryId: TestDefaults.entry.testEntryReferenceId,
      })

      const action = await plainClient.scheduledActions.create(
        {},
        {
          entity: makeLink('Entry', entry.sys.id),
          action: 'publish',
          scheduledFor: {
            datetime: new Date().toISOString(),
          },
        }
      )

      const scheduledActions = await plainClient.scheduledActions.getMany({})
      expect(scheduledActions.items.length).to.equal(1)
      expect(scheduledActions.items[0].sys.id).to.equal(action.sys.id)

      const { sys, ...payload } = action
      const updatedAction = await plainClient.scheduledActions.update(
        { scheduledActionId: sys.id, version: sys.version },
        {
          ...payload,
          action: 'unpublish',
        }
      )

      expect(updatedAction.action).to.equal('unpublish')

      // cleanup
      await plainClient.scheduledActions.delete({
        scheduledActionId: action.sys.id,
        environmentId: action.environment.sys.id,
      })
    })
  })
})
