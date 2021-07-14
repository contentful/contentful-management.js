/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai'
import { before, describe, test } from 'mocha'
import { Asset } from '../../lib/entities/asset'
import { Environment } from '../../lib/entities/environment'
import { Space } from '../../lib/entities/space'
import { TestDefaults } from '../defaults'
import { getDefaultSpace, getPlainClient } from '../helpers'
import { makeLink } from '../utils'

const ONE_DAY_MS = 3600 * 1000 * 24

const cleanup = async (testSpace: Space, environmentId: string) => {
  const scheduledActions = await testSpace.getScheduledActions({
    'environment.sys.id': environmentId,
    'sys.status': 'scheduled',
  })

  await Promise.all(scheduledActions.items.map((action) => action.delete()))
}

describe('Scheduled actions api', async function () {
  let testSpace: Space
  let asset: Asset
  let environment: Environment
  const datetime = new Date(Date.now() + ONE_DAY_MS).toISOString()

  before(async () => {
    testSpace = await getDefaultSpace()
    environment = await testSpace.getEnvironment('master')
    asset = await environment.createAsset({
      fields: {
        title: {
          'en-US': 'Test Asset',
        },
        file: {},
      },
    })
    await cleanup(testSpace, environment.sys.id)
  })

  afterEach(async () => {
    await cleanup(testSpace, environment.sys.id)
  })

  describe('Read', () => {
    test('Get Scheduled action', async () => {
      const createdAction = await testSpace.createScheduledAction({
        entity: makeLink('Entry', TestDefaults.entry.testEntryId),
        environment: makeLink('Environment', environment.sys.id),
        action: 'publish',
        scheduledFor: {
          datetime,
        },
      })

      const fetchedActions = await testSpace.getScheduledActions({
        'environment.sys.id': environment.sys.id,
        'sys.status': 'scheduled',
        'sys.id[in]': createdAction.sys.id,
      })

      expect(fetchedActions.items.length).to.eql(1)
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
          environment: makeLink('Environment', environment.sys.id),
          scheduledFor: {
            datetime,
          },
        }),
        testSpace.createScheduledAction({
          entity: makeLink('Asset', asset.sys.id),
          action: 'unpublish',
          environment: {
            sys: {
              type: 'Link',
              linkType: 'Environment',
              id: environment.sys.id,
            },
          },
          scheduledFor: {
            datetime,
          },
        }),
      ])

      const queryLimit = 1
      const queryResult = await testSpace.getScheduledActions({
        'environment.sys.id': TestDefaults.environmentId,
        'sys.status': 'scheduled',
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
      const scheduledAction = await testSpace.createScheduledAction({
        entity: makeLink('Entry', TestDefaults.entry.testEntryId),
        environment: makeLink('Environment', environment.sys.id),
        action: 'publish',
        scheduledFor: {
          datetime,
        },
      })

      expect(scheduledAction.entity).to.deep.equal(
        makeLink('Entry', TestDefaults.entry.testEntryId)
      )
      expect(scheduledAction.action).to.eql('publish')
      expect(scheduledAction.scheduledFor).to.deep.equal({
        datetime,
      })

      // cleanup
      await scheduledAction.delete()
    })

    test('create scheduled action for an asset', async () => {
      const scheduledAction = await testSpace.createScheduledAction({
        entity: makeLink('Asset', asset.sys.id),
        environment: makeLink('Environment', environment.sys.id),
        action: 'unpublish',
        scheduledFor: {
          datetime,
        },
      })

      expect(scheduledAction.entity).to.deep.equal(makeLink('Asset', asset.sys.id))
      expect(scheduledAction.action).to.eql('unpublish')
      expect(scheduledAction.scheduledFor).to.deep.equal({
        datetime,
      })

      // cleanup
      await scheduledAction.delete()
    })

    test('create invalid scheduled action', async () => {
      try {
        await testSpace.createScheduledAction({
          entity: makeLink('Asset', 'invalid-id'),
          environment: makeLink('Environment', environment.sys.id),
          action: 'unpublish',
          scheduledFor: {
            datetime,
          },
        })
      } catch (error) {
        const parsed = JSON.parse(error.message)
        expect(parsed.status).to.eql(400)
        expect(parsed.statusText).to.eql('Bad Request')
        expect(parsed.message).to.eql('The resource could not be found.')
      }
    })
  })

  describe('Update', () => {
    test('update scheduled actions', async () => {
      const updatedSchedule = new Date(new Date(datetime).getTime() + ONE_DAY_MS).toISOString()

      const scheduledAction = await testSpace.createScheduledAction({
        entity: makeLink('Asset', asset.sys.id),
        environment: makeLink('Environment', environment.sys.id),
        action: 'unpublish',
        scheduledFor: {
          datetime,
        },
      })

      expect(scheduledAction.entity).to.eql(makeLink('Asset', asset.sys.id))
      expect(scheduledAction.scheduledFor).to.deep.equal({
        datetime,
      })

      const { sys, ...payload } = scheduledAction

      await testSpace.updateScheduledAction({
        scheduledActionId: sys.id,
        version: sys.version,
        payload: {
          ...payload,
          scheduledFor: {
            datetime: updatedSchedule,
            timezone: 'Europe/Kiev',
          },
        },
      })

      const actions = await testSpace.getScheduledActions({
        'environment.sys.id': payload.environment.sys.id,
        'sys.status': 'scheduled',
        'sys.id[in]': scheduledAction.sys.id,
      })
      const updatedAction = actions.items[0]

      expect(updatedAction.entity).to.deep.equal(makeLink('Asset', asset.sys.id))
      expect(updatedAction.action).to.eql('unpublish')
      expect(updatedAction.scheduledFor).to.deep.equal({
        datetime: updatedSchedule,
        timezone: 'Europe/Kiev',
      })

      // cleanup
      await updatedAction.delete()
    })

    test('update scheduled actions with instance method', async () => {
      const updatedSchedule = new Date(new Date(datetime).getTime() + ONE_DAY_MS).toISOString()

      const scheduledAction = await testSpace.createScheduledAction({
        entity: makeLink('Asset', asset.sys.id),
        environment: makeLink('Environment', environment.sys.id),
        action: 'unpublish',
        scheduledFor: {
          datetime,
        },
      })

      expect(scheduledAction.entity).to.eql(makeLink('Asset', asset.sys.id))
      expect(scheduledAction.scheduledFor).to.deep.equal({
        datetime,
      })

      scheduledAction.scheduledFor.timezone = 'Europe/Kiev'
      scheduledAction.scheduledFor.datetime = updatedSchedule

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { sys, ...payload } = await scheduledAction.update()

      const actions = await testSpace.getScheduledActions({
        'environment.sys.id': payload.environment.sys.id,
        'sys.status': 'scheduled',
        'sys.id[in]': scheduledAction.sys.id,
      })
      const updatedAction = actions.items[0]

      expect(updatedAction.entity).to.deep.equal(makeLink('Asset', asset.sys.id))
      expect(updatedAction.action).to.eql('unpublish')
      expect(updatedAction.scheduledFor).to.deep.equal({
        datetime: updatedSchedule,
        timezone: 'Europe/Kiev',
      })

      // cleanup
      await updatedAction.delete()
    })

    test('fails to update unsupported property of scheduled actions', async () => {
      const updatedSchedule = new Date(new Date(datetime).getTime() + ONE_DAY_MS).toISOString()

      const scheduledAction = await testSpace.createScheduledAction({
        entity: makeLink('Asset', asset.sys.id),
        environment: makeLink('Environment', environment.sys.id),
        action: 'unpublish',
        scheduledFor: {
          datetime,
        },
      })

      expect(scheduledAction.entity).to.eql(makeLink('Asset', asset.sys.id))
      expect(scheduledAction.scheduledFor).to.deep.equal({
        datetime,
      })

      const { sys } = scheduledAction

      try {
        await testSpace.updateScheduledAction({
          scheduledActionId: sys.id,
          version: sys.version,
          payload: {
            entity: makeLink('Entry', TestDefaults.entry.testEntryId),
            environment: makeLink('Environment', environment.sys.id),
            action: 'publish',
            scheduledFor: {
              datetime: updatedSchedule,
            },
          },
        })
      } catch (error) {
        const parsedError = JSON.parse(error.message)
        expect(parsedError.status).to.eql(400)
        expect(parsedError.statusText).to.eql('Bad Request'),
          expect(parsedError.message).to.eql(
            'Can only update scheduleFor.datetime and scheduleFor.timezone properties'
          )
      }

      // cleanup
      await scheduledAction.delete()
    })

    test('delete scheduled action', async () => {
      const scheduledAction = await testSpace.createScheduledAction({
        entity: makeLink('Asset', asset.sys.id),
        environment: makeLink('Environment', environment.sys.id),
        action: 'unpublish',
        scheduledFor: {
          datetime,
        },
      })

      await scheduledAction.delete()

      const response = await testSpace.getScheduledActions({
        'environment.sys.id': scheduledAction.environment.sys.id,
        'sys.status': 'scheduled',
      })
      expect(response.items.length).to.equal(0)
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
          environment: makeLink('Environment', environment.sys.id),
          scheduledFor: {
            datetime,
          },
        }
      )

      const scheduledActions = await plainClient.scheduledActions.getMany({
        query: {
          'environment.sys.id': environment.sys.id,
          'sys.status': 'scheduled',
        },
      })
      expect(scheduledActions.items.length).to.equal(1)
      expect(scheduledActions.items[0].sys.id).to.equal(action.sys.id)

      const { sys, ...payload } = action
      const updatedAction = await plainClient.scheduledActions.update(
        { scheduledActionId: sys.id, version: sys.version },
        {
          ...payload,
          scheduledFor: {
            ...payload.scheduledFor,
            timezone: 'Europe/Berlin',
          },
        }
      )

      expect(updatedAction.scheduledFor.timezone).to.equal('Europe/Berlin')

      // cleanup
      await plainClient.scheduledActions.delete({
        scheduledActionId: action.sys.id,
        environmentId: action.environment.sys.id,
      })
    })
  })
})
