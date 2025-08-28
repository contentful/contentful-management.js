import { describe, expect, test } from 'vitest'
import { cloneMock } from '../../../mocks/entities'
import setupRestAdapter from '../helpers/setupRestAdapter'

function setup(promise, params = {}) {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock('releaseEntry'),
  }
}

describe('Rest ReleaseEntry', () => {
  test('get', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.get.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseEntry',
        action: 'get',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          releaseId: 'black-friday',
          entryId: 'abc123',
        },
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/black-friday/entries/abc123'
        )
      })
  })

  test('getMany', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.get.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseEntry',
        action: 'getMany',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          releaseId: 'black-friday',
        },
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/black-friday/entries'
        )
      })
  })

  test('update', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.put.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseEntry',
        action: 'update',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          releaseId: 'black-friday',
          entryId: 'abc123',
        },
        payload: entityMock,
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/black-friday/entries/abc123'
        )
      })
  })

  test('patch', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.patch.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseEntry',
        action: 'patch',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          releaseId: 'black-friday',
          entryId: 'abc123',
        },
        userAgent: 'mocked',
      })
      .then(() => {
        expect(httpMock.patch.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/black-friday/entries/abc123'
        )
      })
  })

  test('createWithId', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.put.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'ReleaseEntry',
        action: 'createWithId',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          releaseId: 'black-friday',
          entryId: 'abc123',
          contentTypeId: 'contentType123',
        },
        payload: entityMock,
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/black-friday/entries/abc123'
        )
      })
  })
})
