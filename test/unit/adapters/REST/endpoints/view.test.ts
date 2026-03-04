import { describe, test, expect } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'

describe('Rest View', { concurrent: true }, () => {
  test('getMany calls correct URL', async () => {
    const mockResponse = {
      sys: { type: 'Array' },
      limit: 100,
      items: [],
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'View',
        action: 'getMany',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          query: {
            _experienceCtId: 'experience-ct-id',
          },
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql('/spaces/space123/environments/master/views')
        expect(httpMock.get.mock.calls[0][1].params).to.eql({
          _experienceCtId: 'experience-ct-id',
        })
      })
  })

  test('getMany passes pagination query parameters', async () => {
    const mockResponse = {
      sys: { type: 'Array' },
      limit: 20,
      items: [],
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'View',
        action: 'getMany',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          query: {
            _experienceCtId: 'experience-ct-id',
            limit: 20,
            pageNext: 'next-page-token',
          },
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql('/spaces/space123/environments/master/views')
        expect(httpMock.get.mock.calls[0][1].params).to.eql({
          _experienceCtId: 'experience-ct-id',
          limit: 20,
          pageNext: 'next-page-token',
        })
      })
  })

  test('get calls correct URL', async () => {
    const mockResponse = {
      sys: { id: 'view123', type: 'View' },
      title: 'Test View',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'View',
        action: 'get',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          viewId: 'view123',
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/views/view123',
        )
      })
  })

  test('delete calls correct URL', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: {} }))

    return adapterMock
      .makeRequest({
        entityType: 'View',
        action: 'delete',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          viewId: 'view456',
        },
      })
      .then(() => {
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/views/view456',
        )
      })
  })
})
