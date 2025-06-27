import { describe, test, vi, expect, it } from 'vitest'
import { wrapEntry, wrapEntryCollection } from '../../../lib/entities/entry'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  entityCollectionWrappedTest,
  entityWrappedTest,
} from '../test-creators/instance-entity-methods'
import { get } from '../../../lib/adapters/REST/endpoints/release-entry'
import * as raw from '../../../lib/adapters/REST/endpoints/raw'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('releaseEntry'),
  }
}

describe('Entity ReleaseEntry', () => {
  test('ReleaseEntry is wrapped correctly', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapEntry,
    })
  })

  test('ReleaseEntry collection is wrapped correctly', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapEntryCollection,
    })
  })
})

describe('release.entry.get endpoint', () => {
  it('calls raw.get with correct URL and params', async () => {
    const mockReleaseEntry = cloneMock('releaseEntry')
    const rawGetSpy = vi.spyOn(raw, 'get').mockResolvedValue(mockReleaseEntry)
    const httpMock = {} as any
    const params = {
      spaceId: 'space123',
      environmentId: 'env456',
      releaseId: 'rel789',
      entryId: 'entryId',
    }

    const result = await get(httpMock, params)

    expect(rawGetSpy).toHaveBeenCalledWith(
      httpMock,
      '/spaces/space123/environments/env456/releases/rel789/entries/entryId'
    )
    expect(result).toEqual(mockReleaseEntry)
    expect(result.sys.release).toBeDefined()

    rawGetSpy.mockRestore()
  })

  it.each([
    {
      params: {
        spaceId: 'space-1',
        environmentId: 'master',
        releaseId: 'release-123',
        entryId: 'entry-456',
      },
      expectedUrl: '/spaces/space-1/environments/master/releases/release-123/entries/entry-456',
    },
    {
      params: {
        spaceId: 'another-space',
        environmentId: 'staging',
        releaseId: 'rel-abc',
        entryId: 'entry-xyz',
      },
      expectedUrl:
        '/spaces/another-space/environments/staging/releases/rel-abc/entries/entry-xyz',
    },
  ])(
    'constructs correct URL for spaceId: $params.spaceId, environmentId: $params.environmentId',
    async ({ params, expectedUrl }) => {
      const mockReleaseEntry = cloneMock('releaseEntry')
      const rawGetSpy = vi.spyOn(raw, 'get').mockResolvedValue(mockReleaseEntry)
      const httpMock = {} as any

      await get(httpMock, params)
      expect(rawGetSpy).toHaveBeenCalledWith(httpMock, expectedUrl)

      rawGetSpy.mockRestore()
    }
  )
})
