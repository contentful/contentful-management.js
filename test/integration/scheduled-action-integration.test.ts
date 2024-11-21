/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, beforeAll, afterAll, beforeEach, afterEach } from 'vitest'
import { expect } from 'vitest'
import type { Asset } from '../../lib/entities/asset'
import type { Entry } from '../../lib/entities/entry'
import type { Environment } from '../../lib/entities/environment'
import type { Space } from '../../lib/entities/space'
import type { ContentType, ContentTypeMetadata } from '../../lib/export-types'
import { ScheduledActionReferenceFilters } from '../../lib/export-types'
import { TestDefaults } from '../defaults'
import { getDefaultSpace, initPlainClient, timeoutToCalmRateLimiting } from '../helpers'
import { makeLink } from '../utils'

const ONE_DAY_MS = 3600 * 1000 * 24

const cleanup = async (testSpace: Space, environmentId: string) => {
  const scheduledActions = await testSpace.getScheduledActions({
    'environment.sys.id': environmentId,
    'sys.status': 'scheduled',
  })

  await Promise.all(scheduledActions.items.map((action) => action.delete()))
}

describe('Scheduled Actions API', () => {
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

  beforeAll(async () => {
    testSpace = (await getDefaultSpace()) as Space
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

  afterAll(async () => {
    await cleanup(testSpace, environment.sys.id)

    await timeoutToCalmRateLimiting()
  })

  describe('Read', () => {
    it('Get Scheduled action', async () => {
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

      expect(fetchedAction.sys.id).toBe(createdAction.sys.id)
      expect(fetchedAction.action).toBe(createdAction.action)
      expect(fetchedAction.entity).toEqual(createdAction.entity)
    })

    it.skip('Query Scheduled Actions', async () => {
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
        })

        expect(queryResult.items.length).toBe(queryLimit)
        expect(queryResult).toHaveProperty('pages')
      } catch (error) {
        console.error(`Querying scheduled actions failed after multiple attempts.`)
        console.error(error.message)
        throw error
      }
    })
  })

  describe('Write', () => {
    it('create Scheduled Action', async () => {
      const scheduledAction = await testSpace.createScheduledAction({
        entity: makeLink('Entry', TestDefaults.entry.testEntryId),
        environment: makeLink('Environment', environment.sys.id),
        action: 'publish',
        scheduledFor: {
          datetime,
        },
      })

      expect(scheduledAction.entity).toEqual(makeLink('Entry', TestDefaults.entry.testEntryId))
      expect(scheduledAction.action).toBe('publish')
      expect(scheduledAction.scheduledFor).toEqual({
        datetime,
      })
    })

    it('create scheduled action for an asset', async () => {
      const scheduledAction = await testSpace.createScheduledAction({
        entity: makeLink('Asset', asset.sys.id),
        environment: makeLink('Environment', environment.sys.id),
        action: 'unpublish',
        scheduledFor: {
          datetime,
        },
      })

      expect(scheduledAction.entity).toEqual(makeLink('Asset', asset.sys.id))
      expect(scheduledAction.action).toBe('unpublish')
      expect(scheduledAction.scheduledFor).toEqual({
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

      it('create scheduled action for an aggregate root entry', async () => {
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

        expect(scheduledAction.entity).toEqual(makeLink('Entry', entry.sys.id))
        expect(scheduledAction.action).toBe('publish')
        expect(scheduledAction.scheduledFor).toEqual({
          datetime,
        })
        expect(scheduledAction.payload).toEqual(aggregateRootPayload)
      })
    })

    it('create invalid scheduled action', async () => {
      try {
        await testSpace.createScheduledAction({
          entity: makeLink('Asset', 'invalid-id'),
          environment: makeLink('Environment', environment.sys.id),
          action: 'unpublish',
          scheduledFor: {
            datetime,
          },
        })
      } catch (error: any) {
        const parsed = JSON.parse(error.message)
        expect(parsed.status).toBe(400)
        expect(parsed.statusText).toBe('Bad Request')
        expect(parsed.message).toBe('The resource could not be found.')
      }
    })
  })

  describe('Update', () => {
    it('update scheduled actions', async () => {
      const updatedSchedule = new Date(new Date(datetime).getTime() + ONE_DAY_MS).toISOString()

      const scheduledAction = await testSpace.createScheduledAction({
        entity: makeLink('Asset', asset.sys.id),
        environment: makeLink('Environment', environment.sys.id),
        action: 'unpublish',
        scheduledFor: {
          datetime,
        },
      })

      expect(scheduledAction.entity).toEqual(makeLink('Asset', asset.sys.id))
      expect(scheduledAction.scheduledFor).toEqual({
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

      if (!payload.environment) {
        throw new Error('payload.environment can not be undefined')
      }
      const updatedAction = await testSpace.getScheduledAction({
        environmentId: payload.environment.sys.id,
        scheduledActionId: scheduledAction.sys.id,
      })

      expect(updatedAction.entity).toEqual(makeLink('Asset', asset.sys.id))
      expect(updatedAction.action).toBe('unpublish')
      expect(updatedAction.scheduledFor).toEqual({
        datetime: updatedSchedule,
        timezone: 'Europe/Kiev',
      })

      // cleanup
      await updatedAction.delete()
    })

    it('update scheduled actions with instance method', async () => {
      const updatedSchedule = new Date(new Date(datetime).getTime() + ONE_DAY_MS).toISOString()

      const scheduledAction = await testSpace.createScheduledAction({
        entity: makeLink('Asset', asset.sys.id),
        environment: makeLink('Environment', environment.sys.id),
        action: 'unpublish',
        scheduledFor: {
          datetime,
        },
      })

      expect(scheduledAction.entity).toEqual(makeLink('Asset', asset.sys.id))
      expect(scheduledAction.scheduledFor).toEqual({
        datetime,
      })

      scheduledAction.scheduledFor.timezone = 'Europe/Kiev'
      scheduledAction.scheduledFor.datetime = updatedSchedule

      const payload = await scheduledAction.update()

      if (!payload.environment) {
        throw new Error('payload.environment can not be undefined')
      }

      const updatedAction = await testSpace.getScheduledAction({
        environmentId: payload.environment.sys.id,
        scheduledActionId: scheduledAction.sys.id,
      })

      expect(updatedAction.entity).toEqual(makeLink('Asset', asset.sys.id))
      expect(updatedAction.action).toBe('unpublish')
      expect(updatedAction.scheduledFor).toEqual({
        datetime: updatedSchedule,
        timezone: 'Europe/Kiev',
      })
    })

    it('delete scheduled action', async () => {
      const scheduledAction = await testSpace.createScheduledAction({
        entity: makeLink('Asset', asset.sys.id),
        environment: makeLink('Environment', environment.sys.id),
        action: 'unpublish',
        scheduledFor: {
          datetime,
        },
      })

      await testSpace.deleteScheduledAction({
        environmentId: environment.sys.id,
        scheduledActionId: scheduledAction.sys.id,
      })

      if (!scheduledAction.environment) {
        throw new Error('scheduledAction.environment can not be undefined')
      }

      const deletedScheduledAction = await testSpace.getScheduledAction({
        environmentId: scheduledAction.environment.sys.id,
        scheduledActionId: scheduledAction.sys.id,
      })

      expect(deletedScheduledAction.sys.status).toBe('canceled')
    })
  })

  describe('PlainClient', () => {
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
    }
    const plainClient = initPlainClient(defaultParams)

    it('lifecycle of a scheduled action (create, read, update, delete)', async () => {
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

      expect(scheduledAction.sys.id).toBe(action.sys.id)

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

      expect(updatedAction.scheduledFor.timezone).toBe('Europe/Berlin')
    })

    describe('for AggregateRoot annotated entry', () => {
      beforeEach(async () => {
        const aggregateRootAnnotation: ContentTypeMetadata = {
          annotations: {
            ContentType: [makeLink('Annotation', 'Contentful:AggregateRoot')],
          },
        }
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

      it('create and read with payload', async () => {
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

        expect(scheduledAction.sys.id).toBe(action.sys.id)
        expect(scheduledAction.payload).toEqual(aggregateRootPayload)
      })
    })
  })
})
