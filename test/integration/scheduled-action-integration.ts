/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai'
import { before, after, describe, test, beforeEach, afterEach } from 'mocha'
import { Asset } from '../../lib/entities/asset'
import { Entry } from '../../lib/entities/entry'
import { Environment } from '../../lib/entities/environment'
import { Space } from '../../lib/entities/space'
import {
  ContentType,
  ContentTypeMetadata,
  ScheduledActionReferenceFilters,
} from '../../lib/export-types'
import { TestDefaults } from '../defaults'
import { getDefaultSpace, initPlainClient } from '../helpers'
import { makeLink } from '../utils'

const ONE_DAY_MS = 3600 * 1000 * 24

const cleanup = async (testSpace: Space, environmentId: string) => {
  const scheduledActions = await testSpace.getScheduledActions({
    'environment.sys.id': environmentId,
    'sys.status': 'scheduled',
  })

  await Promise.all(scheduledActions.items.map((action) => action.delete()))
}

describe('Scheduled Actions API', async function () {
  let testSpace: Space
  let asset: Asset
  let environment: Environment
  let contentType: ContentType
  let entry: Entry
  const datetime = new Date(Date.now() + ONE_DAY_MS).toISOString()

  const aggregateRootPayload = {
    withReferences: {
      [ScheduledActionReferenceFilters.contentTypeAnnotationNotIn]: ['Contentful:AggregateRoot'],
    },
  }

  before(async () => {
    testSpace = (await getDefaultSpace()) as unknown as Space
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

  after(async () => {
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

      const fetchedAction = await testSpace.getScheduledAction({
        environmentId: environment.sys.id,
        scheduledActionId: createdAction.sys.id,
      })

      expect(fetchedAction.sys.id).to.eql(createdAction.sys.id)
      expect(fetchedAction.action).to.eql(createdAction.action)
      expect(fetchedAction.entity).to.eql(createdAction.entity)
    })

    test.skip('Query Scheduled Actions', async function () {
      this.timeout(180000)
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

      try {
        const queryLimit = 1
        const queryResult = await testSpace.getScheduledActions({
          'environment.sys.id': TestDefaults.environmentId,
          'sys.status': 'scheduled',
          'sys.id[in]': `${action1.sys.id}, ${action2.sys.id}`,
          limit: queryLimit,
          timeout: 180000,
        })
        // Returns the filtered results based on the limit
        expect(queryResult.items.length).to.eql(queryLimit)
        expect(queryResult).to.have.property('pages')
      } catch (error) {
        // FIXME: We see a lot of 503 server errors in Splunk for this request
        console.error(
          `Querying scheduled actions at '${error?.config?.url}' failed '${error?.attempts}' times before giving up.`
        )
        console.error(error.message)
        throw error
      }
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
    })

    describe('for AggregateRoot annotated entry', () => {
      beforeEach(async () => {
        const aggregateRootAnnotation: ContentTypeMetadata = {
          annotations: {
            ContentType: [makeLink('Annotation', 'Contentful:AggregateRoot')],
          },
        }
        const environment = await testSpace.getEnvironment('master')
        contentType = await environment.createContentType({
          name: 'Page',
          fields: [
            {
              id: 'title',
              name: 'title',
              type: 'Symbol',
              localized: false,
              required: false,
            },
          ],
          metadata: aggregateRootAnnotation,
        })
        await contentType.publish()
      })

      afterEach(async () => {
        await entry.delete()
        await contentType.unpublish()
        await contentType.delete()
      })

      test('create scheduled action for an aggregate root entry', async () => {
        entry = await environment.createEntry(contentType.sys.id, {
          fields: { title: { 'en-US': 'this is the title' } },
        })

        const scheduledAction = await testSpace.createScheduledAction({
          entity: makeLink('Entry', entry.sys.id),
          environment: makeLink('Environment', environment.sys.id),
          action: 'publish',
          scheduledFor: {
            datetime,
          },
          payload: aggregateRootPayload,
        })

        expect(scheduledAction.entity).to.deep.equal(makeLink('Entry', entry.sys.id))
        expect(scheduledAction.action).to.eql('publish')
        expect(scheduledAction.scheduledFor).to.deep.equal({
          datetime,
        })
        expect(scheduledAction.payload).to.deep.equal(aggregateRootPayload)
      })
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

      const updatedAction = await testSpace.getScheduledAction({
        environmentId: payload.environment.sys.id,
        scheduledActionId: scheduledAction.sys.id,
      })

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

      const updatedAction = await testSpace.getScheduledAction({
        environmentId: payload.environment.sys.id,
        scheduledActionId: scheduledAction.sys.id,
      })

      expect(updatedAction.entity).to.deep.equal(makeLink('Asset', asset.sys.id))
      expect(updatedAction.action).to.eql('unpublish')
      expect(updatedAction.scheduledFor).to.deep.equal({
        datetime: updatedSchedule,
        timezone: 'Europe/Kiev',
      })
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

      // Calling delete will cancel the scheduled action (not actually delete it)
      await testSpace.deleteScheduledAction({
        environmentId: environment.sys.id,
        scheduledActionId: scheduledAction.sys.id,
      })

      const deletedScheduledAction = await testSpace.getScheduledAction({
        environmentId: scheduledAction.environment.sys.id,
        scheduledActionId: scheduledAction.sys.id,
      })

      expect(deletedScheduledAction.sys.status).to.eql('canceled')
    })
  })

  describe('PlainClient', () => {
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
    }

    test('lifecycle of a scheduled action (create, read, update, delete)', async () => {
      const plainClient = initPlainClient(defaultParams)
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

      const scheduledAction = await plainClient.scheduledActions.get({
        environmentId: environment.sys.id,
        scheduledActionId: action.sys.id,
      })

      expect(scheduledAction.sys.id).to.equal(action.sys.id)

      const { sys, ...payload } = action
      const updatedAction = await plainClient.scheduledActions.update(
        { scheduledActionId: sys.id, version: sys.version },
        {
          ...payload,
          scheduledFor: {
            ...payload.scheduledFor,
            timezone: 'Europe/Berlin', // adds timezone
          },
        }
      )

      expect(updatedAction.scheduledFor.timezone).to.equal('Europe/Berlin')
    })

    describe('for AggregateRoot annotated entry', () => {
      beforeEach(async () => {
        const aggregateRootAnnotation: ContentTypeMetadata = {
          annotations: {
            ContentType: [makeLink('Annotation', 'Contentful:AggregateRoot')],
          },
        }
        const environment = await testSpace.getEnvironment('master')
        contentType = await environment.createContentType({
          name: 'Page',
          fields: [
            {
              id: 'title',
              name: 'title',
              type: 'Symbol',
              localized: false,
              required: false,
            },
          ],
          metadata: aggregateRootAnnotation,
        })
        await contentType.publish()
      })

      afterEach(async () => {
        await entry.delete()
        await contentType.unpublish()
        await contentType.delete()
      })

      test('create and read with payload', async () => {
        const plainClient = initPlainClient(defaultParams)

        entry = await environment.createEntry(contentType.sys.id, {
          fields: { title: { 'en-US': 'this is the title' } },
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
            payload: aggregateRootPayload,
          }
        )

        const scheduledAction = await plainClient.scheduledActions.get({
          environmentId: environment.sys.id,
          scheduledActionId: action.sys.id,
        })

        expect(scheduledAction.sys.id).to.equal(action.sys.id)
        expect(scheduledAction.payload).to.deep.equal(aggregateRootPayload)
      })
    })
  })
})
