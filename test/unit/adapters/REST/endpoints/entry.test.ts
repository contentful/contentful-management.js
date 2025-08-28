import { describe, test, expect } from 'vitest'
import { cloneMock } from '../../../mocks/entities'
import { wrapEntry } from '../../../../../lib/entities/entry'

import setupRestAdapter from '../helpers/setupRestAdapter'

function setup(promise, params = {}) {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock('entry'),
  }
}

describe('Rest Entry', () => {
  test('Entry update with tags works', async () => {
    const entityMock = cloneMock('entryWithTags')
    entityMock.sys.version = 2

    const { httpMock, adapterMock } = setup(Promise.resolve({ data: entityMock }))

    const entity = wrapEntry((...args) => adapterMock.makeRequest(...args), entityMock)

    entity.metadata.tags = entityMock.metadata.tags
    entity.metadata.tags[0].sys.id = 'changed-link-target'

    return entity.update().then((response) => {
      expect(response.toPlainObject, 'response is wrapped').to.be.ok
      expect(httpMock.put.mock.calls[0][1].metadata.tags[0].sys.id).equals(
        'changed-link-target',
        'metadata is sent'
      )
      expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).equals(
        2,
        'version header is sent'
      )
      return {
        httpMock,
        entityMock,
        response,
      }
    })
  })

  test('API call createEntryWithId', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.put.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Entry',
        action: 'createWithId',
        userAgent: 'mocked',
        params: {
          environmentId: 'id',
          spaceId: 'id',
          contentTypeId: 'contentTypeId',
          entryId: 'entryId',
        },
        payload: entityMock,
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/id/environments/id/entries/entryId',
          'entry id is sent'
        )
        expect(httpMock.put.mock.calls[0][1]).to.eql(entityMock, 'data is sent')
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Content-Type']).to.eql(
          'contentTypeId',
          'content type is specified'
        )
      })
  })

  test('get', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.get.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Entry',
        action: 'get',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          entryId: 'entry123',
        },
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/entries/entry123'
        )
        expect(httpMock.get.mock.calls[0][1].params).toBeUndefined
      })
  })

  test('get with releaseId', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.get.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Entry',
        action: 'get',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          entryId: 'entry123',
          releaseId: 'release456',
        },
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/entries/entry123'
        )
        // Should have release query parameter
        expect(httpMock.get.mock.calls[0][1].params).toMatchObject({
          'release[lte]': 'release456',
        })
      })
  })

  test('getMany', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.get.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Entry',
        action: 'getMany',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
        },
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.get.mock.calls[0][0]).to.eql('/spaces/space123/environments/master/entries')
        expect(httpMock.get.mock.calls[0][1].params).toBeUndefined
      })
  })

  test('getMany with releaseId', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.get.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Entry',
        action: 'getMany',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          releaseId: 'release456',
        },
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.get.mock.calls[0][0]).to.eql('/spaces/space123/environments/master/entries')
        // Should have release query parameter
        expect(httpMock.get.mock.calls[0][1].params).toMatchObject({
          'release[lte]': 'release456',
        })
      })
  })

  test('patch without releaseId', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.patch.mockReturnValue(Promise.resolve({ data: entityMock }))

    const patchOps = [{ op: 'replace', path: '/fields/title/en-US', value: 'New Title' }]

    return adapterMock
      .makeRequest({
        entityType: 'Entry',
        action: 'patch',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          entryId: 'entry123',
          version: 5,
        },
        payload: patchOps,
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.patch.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/entries/entry123'
        )
        expect(httpMock.patch.mock.calls[0][1]).to.eql(patchOps)
        expect(httpMock.patch.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(5)
        expect(httpMock.patch.mock.calls[0][2].headers['Content-Type']).to.eql(
          'application/json-patch+json'
        )
      })
  })

  test('patch with releaseId delegates to release entry', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    // Mock the release entry endpoint
    httpMock.patch.mockReturnValue(Promise.resolve({ data: entityMock }))

    const patchOps = [{ op: 'replace', path: '/fields/title/en-US', value: 'New Title' }]

    return adapterMock
      .makeRequest({
        entityType: 'Entry',
        action: 'patch',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          entryId: 'entry123',
          releaseId: 'release456',
          version: 5,
        },
        payload: patchOps,
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        // When releaseId is provided, it should call the release entry endpoint
        expect(httpMock.patch.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/release456/entries/entry123'
        )
        expect(httpMock.patch.mock.calls[0][1]).to.eql(patchOps)
        expect(httpMock.patch.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(5)
        expect(httpMock.patch.mock.calls[0][2].headers['Content-Type']).to.eql(
          'application/json-patch+json'
        )
        // Should have schema version for release API
        expect(httpMock.patch.mock.calls[0][1]).toMatchObject(patchOps)
      })
  })
})
