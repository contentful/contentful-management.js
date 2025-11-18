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
        'metadata is sent',
      )
      expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).equals(
        2,
        'version header is sent',
      )
      return {
        httpMock,
        entityMock,
        response,
      }
    })
  })

  test('API call createEntryWithId without releaseId', async () => {
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
          'entry id is sent',
        )
        expect(httpMock.put.mock.calls[0][1]).to.eql(entityMock, 'data is sent')
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Content-Type']).to.eql(
          'contentTypeId',
          'content type is specified',
        )
      })
  })

  test('API call createEntryWithId with releaseId', async () => {
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
          releaseId: 'releaseId',
        },
        payload: entityMock,
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/id/environments/id/releases/releaseId/entries/entryId',
          'release entry endpoint is used when releaseId is provided',
        )
        expect(httpMock.put.mock.calls[0][1]).to.eql(entityMock, 'data is sent')
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Content-Type']).to.eql(
          'contentTypeId',
          'content type is specified',
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
          '/spaces/space123/environments/master/entries/entry123',
        )
        expect(httpMock.get.mock.calls[0][1].params).toBeUndefined
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
          '/spaces/space123/environments/master/entries/entry123',
        )
        expect(httpMock.patch.mock.calls[0][1]).to.eql(patchOps)
        expect(httpMock.patch.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(5)
        expect(httpMock.patch.mock.calls[0][2].headers['Content-Type']).to.eql(
          'application/json-patch+json',
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
          '/spaces/space123/environments/master/releases/release456/entries/entry123',
        )
        expect(httpMock.patch.mock.calls[0][1]).to.eql(patchOps)
        expect(httpMock.patch.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(5)
        expect(httpMock.patch.mock.calls[0][2].headers['Content-Type']).to.eql(
          'application/json-patch+json',
        )
      })
  })

  test('update without releaseId', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.put.mockReturnValue(Promise.resolve({ data: entityMock }))

    const updateData = {
      ...entityMock,
      fields: {
        title: { 'en-US': 'Updated Title' },
      },
    }

    return adapterMock
      .makeRequest({
        entityType: 'Entry',
        action: 'update',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          entryId: 'entry123',
        },
        payload: updateData,
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/entries/entry123',
        )
        // Check that sys is removed from the payload
        expect(httpMock.put.mock.calls[0][1]).not.toHaveProperty('sys')
        expect(httpMock.put.mock.calls[0][1].fields.title['en-US']).to.eql('Updated Title')
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(
          updateData.sys.version,
        )
      })
  })

  test('update with releaseId delegates to release entry', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    // Mock the release entry endpoint
    httpMock.put.mockReturnValue(Promise.resolve({ data: entityMock }))

    const updateData = {
      ...entityMock,
      fields: {
        title: { 'en-US': 'Updated Title in Release' },
      },
    }

    return adapterMock
      .makeRequest({
        entityType: 'Entry',
        action: 'update',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          entryId: 'entry123',
          releaseId: 'release456',
        },
        payload: updateData,
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        // When releaseId is provided, it should call the release entry endpoint
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/release456/entries/entry123',
        )
        // Check that sys is removed from the payload
        expect(httpMock.put.mock.calls[0][1]).not.toHaveProperty('sys')
        expect(httpMock.put.mock.calls[0][1].fields.title['en-US']).to.eql(
          'Updated Title in Release',
        )
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(
          updateData.sys.version,
        )
      })
  })

  test('create without releaseId', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.post.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Entry',
        action: 'create',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          contentTypeId: 'contentType123',
        },
        payload: entityMock,
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.post.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/entries',
        )
        expect(httpMock.post.mock.calls[0][1]).to.eql(entityMock)
        expect(httpMock.post.mock.calls[0][2].headers['X-Contentful-Content-Type']).to.eql(
          'contentType123',
        )
      })
  })

  test('create with releaseId delegates to release entry', async () => {
    const { httpMock, adapterMock, entityMock } = setup(Promise.resolve({}))

    httpMock.post.mockReturnValue(Promise.resolve({ data: entityMock }))

    return adapterMock
      .makeRequest({
        entityType: 'Entry',
        action: 'create',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          contentTypeId: 'contentType123',
          releaseId: 'black-friday',
        },
        payload: entityMock,
      })
      .then((r) => {
        expect(r).to.eql(entityMock)
        expect(httpMock.post.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/releases/black-friday/entries',
        )
        expect(httpMock.post.mock.calls[0][1]).to.eql(entityMock)
        expect(httpMock.post.mock.calls[0][2].headers['X-Contentful-Content-Type']).to.eql(
          'contentType123',
        )
      })
  })
})
