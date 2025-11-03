/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, describe, it, beforeAll, vi, afterAll } from 'vitest'
import { cloneDeep } from 'lodash'
import type {
  BulkActionPublishPayload,
  BulkActionUnpublishPayload,
  BulkActionValidatePayload,
  UnpublishBulkActionV2Payload,
} from '../../lib/contentful-management'
import type { Environment, Space } from '../../lib/contentful-management'
import { TestDefaults } from '../defaults'
import {
  getDefaultSpace,
  initPlainClient,
  timeoutToCalmRateLimiting,
  waitForBulkActionProcessing,
  waitForBulkActionV2Processing,
} from '../helpers'
import { makeLink, makeVersionedLink } from '../utils'
import {
  BulkActionStatus,
  PublishBulkActionV2Payload,
  ValidateBulkActionV2Payload,
} from '../../lib/entities/bulk-action'

describe('BulkActions Api v1', () => {
  let testSpace: Space
  let testEnvironment: Environment

  beforeAll(async () => {
    testSpace = await getDefaultSpace()
    testEnvironment = await testSpace.getEnvironment('master')
  })

  afterAll(timeoutToCalmRateLimiting)

  describe('Read', () => {
    it('Get BulkAction', async () => {
      const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryId)

      const createdBulkAction = await testEnvironment.createValidateBulkAction({
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', entry.sys.id)],
        },
      })

      const bulkActionInProgress = await testEnvironment.getBulkAction<BulkActionValidatePayload>(
        createdBulkAction.sys.id,
      )
      expect(bulkActionInProgress.sys.id).toBe(createdBulkAction.sys.id)
    })

    it('Get BulkAction on wrong id', async () => {
      try {
        await testEnvironment.getBulkAction('fakeId')
      } catch (error: any) {
        const parsed = JSON.parse(error.message)
        expect(parsed.status).toBe(404)
        expect(parsed.message).toBe('The resource could not be found.')
        expect(parsed.details).toEqual({
          type: 'BulkAction',
          id: 'fakeId',
        })
      }
    })
  })

  describe('Write', () => {
    it('Publish BulkAction', async () => {
      const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryBulkActionId)

      const createdBulkAction = await testEnvironment.createPublishBulkAction({
        entities: {
          sys: { type: 'Array' },
          items: [makeVersionedLink('Entry', entry.sys.id, entry.sys.version)],
        },
      })

      const bulkAction = await createdBulkAction.waitProcessing({ initialDelayMs: 500 })

      expect(bulkAction.sys.status).toBe('succeeded')
      expect(bulkAction.action).toBe('publish')
    })

    it('Publish BulkAction with wrong payload', async () => {
      const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryBulkActionId)

      // The publish action relies on the Link object having a `version` property
      try {
        await testEnvironment.createPublishBulkAction({
          entities: {
            sys: { type: 'Array' },
            items: [makeLink('Entry', entry.sys.id) as any],
          },
        })
      } catch (error: any) {
        const parsed = JSON.parse(error.message)
        expect(parsed.status).toBe(422)
        expect(parsed.message).toBe('Validation error')
        expect(parsed.details).toEqual({
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

    it('Unpublish BulkAction', async () => {
      const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryId)

      const createdBulkAction = await testEnvironment.createUnpublishBulkAction({
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', entry.sys.id)],
        },
      })

      const bulkAction = await createdBulkAction.waitProcessing({ initialDelayMs: 500 })
      expect(bulkAction.sys.status).toBe('succeeded')
      expect(bulkAction.action).toBe('unpublish')
    })

    it('Validate BulkAction', async () => {
      const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryId)

      const createdBulkAction = await testEnvironment.createValidateBulkAction({
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', entry.sys.id)],
        },
      })

      const bulkAction = await createdBulkAction.waitProcessing({ initialDelayMs: 500 })
      expect(bulkAction.sys.status).toBe('succeeded')
      expect(bulkAction.action).toBe('validate')
    })
  })

  describe('PlainClient', () => {
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
    }
    const plainClient = initPlainClient(defaultParams)

    it('bulkAction.publish', async () => {
      const entry = await plainClient.entry.get({
        entryId: TestDefaults.entry.testEntryBulkActionId,
      })

      const bulkActionInProgress = await plainClient.bulkAction.publish(defaultParams, {
        entities: {
          sys: { type: 'Array' },
          items: [makeVersionedLink('Entry', entry.sys.id, entry.sys.version)],
        },
      })

      const bulkActionCompleted = await waitForBulkActionProcessing<BulkActionPublishPayload>({
        ...defaultParams,
        plainClient,
        bulkActionId: bulkActionInProgress.sys.id,
      })

      expect(bulkActionCompleted.sys.status).toBe('succeeded')
      expect(bulkActionCompleted.action).toBe('publish')
    })

    it('bulkAction.unpublish', async () => {
      const entry = await plainClient.entry.get({ entryId: TestDefaults.entry.testEntryId })

      const bulkActionInProgress = await plainClient.bulkAction.unpublish(defaultParams, {
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', entry.sys.id)],
        },
      })

      const bulkActionCompleted = await waitForBulkActionProcessing<BulkActionUnpublishPayload>({
        ...defaultParams,
        plainClient,
        bulkActionId: bulkActionInProgress.sys.id,
      })

      expect(bulkActionCompleted.sys.status).toBe('succeeded')
      expect(bulkActionCompleted.action).toBe('unpublish')
    })

    it('bulkAction.validate', async () => {
      const entry = await plainClient.entry.get({ entryId: TestDefaults.entry.testEntryId })

      const bulkActionInProgress = await plainClient.bulkAction.validate(defaultParams, {
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', entry.sys.id)],
        },
      })

      const bulkActionCompleted = await waitForBulkActionProcessing<BulkActionValidatePayload>({
        ...defaultParams,
        plainClient,
        bulkActionId: bulkActionInProgress.sys.id,
      })

      expect(bulkActionCompleted.sys.status).toBe('succeeded')
      expect(bulkActionCompleted.action).toBe('validate')
    })
  })

  describe('Processing errors', () => {
    it('when the BulkAction does not get processed in the expected retry count', async () => {
      const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryId)

      const createdBulkAction = await testEnvironment.createPublishBulkAction({
        entities: {
          sys: { type: 'Array' },
          items: [makeVersionedLink('Entry', entry.sys.id, entry.sys.version)],
        },
      })

      // returns the same bulkAction with status = created
      vi.spyOn(createdBulkAction, 'get').mockResolvedValue(createdBulkAction)

      try {
        await createdBulkAction.waitProcessing({
          initialDelayMs: 0,
          retryCount: 10,
          retryIntervalMs: 100,
        })
      } catch (error: any) {
        expect(error.message).toBe(
          "BulkAction didn't finish processing within the expected timeframe."
        )
        expect(error.action.sys.id).toBe(createdBulkAction.sys.id)
      }
    })

    it('when the BulkAction returns a `failed` status', async () => {
      const entry = await testEnvironment.getEntry(TestDefaults.entry.testEntryId)

      const createdBulkAction = await testEnvironment.createValidateBulkAction({
        entities: {
          sys: { type: 'Array' },
          items: [makeLink('Entry', entry.sys.id)],
        },
      })

      // returns the same bulkAction with status = failed
      const failedAction = cloneDeep(createdBulkAction)
      failedAction.sys.status = BulkActionStatus.failed
      vi.spyOn(createdBulkAction, 'get').mockResolvedValue(failedAction)

      try {
        await createdBulkAction.waitProcessing({
          initialDelayMs: 0,
          retryCount: 1,
          retryIntervalMs: 0,
          throwOnFailedExecution: true,
        })
      } catch (error: any) {
        expect(error.message).toBe('BulkAction failed to execute.')
        expect(error.action.sys.status).toBe('failed')
      }
    })
  })
})

describe('BulkActions Api v2 (Plain Client only)', () => {
  afterAll(timeoutToCalmRateLimiting)

  const defaultParams = {
    environmentId: TestDefaults.environmentId,
    spaceId: TestDefaults.spaceId,
  }
  const plainClient = initPlainClient(defaultParams)

  it('bulkAction.publishV2', async () => {
    const entry = await plainClient.entry.get({ entryId: TestDefaults.entry.testEntryBulkActionId })

    const bulkActionInProgress = await plainClient.bulkAction.publishV2(defaultParams, {
      action: 'publish',
      entities: [
        {
          entity: makeVersionedLink('Entry', entry.sys.id, entry.sys.version),
          add: { fields: { '*': ['en-US'] } },
        },
      ],
    })

    const bulkActionCompleted = await waitForBulkActionV2Processing<
      PublishBulkActionV2Payload<'add'>
    >({
      ...defaultParams,
      plainClient,
      bulkActionId: bulkActionInProgress.sys.id,
    })

    expect(bulkActionCompleted.sys.status).toBe('succeeded')
    expect(bulkActionCompleted.action).toBe('publish')
  })

  it('bulkAction.unpublishV2', async () => {
    const entry = await plainClient.entry.get({ entryId: TestDefaults.entry.testEntryBulkActionId })

    const bulkActionInProgress = await plainClient.bulkAction.unpublishV2(defaultParams, {
      action: 'unpublish',
      entities: [
        {
          entity: makeLink('Entry', entry.sys.id),
        },
      ],
    })

    const bulkActionCompleted = await waitForBulkActionV2Processing<UnpublishBulkActionV2Payload>({
      ...defaultParams,
      plainClient,
      bulkActionId: bulkActionInProgress.sys.id,
    })

    expect(bulkActionCompleted.sys.status).toBe('succeeded')
    expect(bulkActionCompleted.action).toBe('unpublish')
  })

  it('bulkAction.validateV2', async () => {
    const entry = await plainClient.entry.get({ entryId: TestDefaults.entry.testEntryBulkActionId })

    const bulkActionInProgress = await plainClient.bulkAction.validateV2(defaultParams, {
      action: 'validate',
      entities: [
        {
          entity: makeLink('Entry', entry.sys.id),
          add: { fields: { '*': ['en-US'] } },
        },
      ],
    })

    const bulkActionCompleted = await waitForBulkActionV2Processing<ValidateBulkActionV2Payload>({
      ...defaultParams,
      plainClient,
      bulkActionId: bulkActionInProgress.sys.id,
    })

    expect(bulkActionCompleted.sys.status).toBe('succeeded')
    expect(bulkActionCompleted.action).toBe('validate')
  })
})
