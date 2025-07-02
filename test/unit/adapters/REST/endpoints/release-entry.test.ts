import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { cloneMock } from '../../../mocks/entities'
import * as raw from '../../../../../lib/adapters/REST/endpoints/raw'
import { get, getMany } from '../../../../../lib/adapters/REST/endpoints/release-entry'
import { EntryProps } from '../../../../../lib/entities/entry'
import { GetReleaseEntryParams } from '../../../../../lib/contentful-management'

describe('Rest ReleaseEntry', () => {
  let mockReleaseEntry: EntryProps<
    any,
    { release: { sys: { type: 'Link'; linkType: 'Release'; id: string } } }
  >
  let rawGetSpy: any
  let params: GetReleaseEntryParams
  let httpMock: any

  beforeEach(async () => {
    mockReleaseEntry = cloneMock('releaseEntry')
    rawGetSpy = vi.spyOn(raw, 'get').mockResolvedValue(mockReleaseEntry)
    httpMock = {}
    params = {
      spaceId: 'space123',
      environmentId: 'master',
      releaseId: 'black-friday',
      entryId: 'abc123',
    }
    await get(httpMock, params)
  })

  afterEach(() => {
    rawGetSpy.mockRestore()
  })

  test('release.entry.get calls raw.get with correct URL and params', async () => {
    expect(rawGetSpy).toHaveBeenCalledWith(
      httpMock,
      '/spaces/space123/environments/master/releases/black-friday/entries/abc123'
    )
  })

  test('release.entry.getMany calls raw.get with the correct URL and params', async () => {
    const expectedParams = {
      spaceId: 'space123',
      environmentId: 'master',
      releaseId: 'black-friday',
    }

    await getMany(httpMock, expectedParams)

    expect(rawGetSpy).toHaveBeenCalledWith(
      httpMock,
      '/spaces/space123/environments/master/releases/black-friday/entries'
    )
  })
})
