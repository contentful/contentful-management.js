import { describe, test, expect } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'
import type { CreateDataAssemblyProps } from '../../../../../lib/entities/data-assembly'

describe('Rest DataAssembly', { concurrent: true }, () => {
  test('getMany calls correct URL', async () => {
    const mockResponse = {
      sys: { type: 'Array' },
      limit: 100,
      items: [],
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'DataAssembly',
        action: 'getMany',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          query: {},
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/data_assemblies',
        )
        expect(httpMock.get.mock.calls[0][1].params).to.eql({})
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
        entityType: 'DataAssembly',
        action: 'getMany',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          query: {
            limit: 20,
            pageNext: 'next-page-token',
          },
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/data_assemblies',
        )
        expect(httpMock.get.mock.calls[0][1].params).to.eql({
          limit: 20,
          pageNext: 'next-page-token',
        })
      })
  })

  test('get calls correct URL', async () => {
    const mockResponse = {
      sys: { id: 'da123', type: 'DataAssembly' },
      name: 'Test Assembly',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'DataAssembly',
        action: 'get',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          dataAssemblyId: 'da123',
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/data_assemblies/da123',
        )
      })
  })

  test('create calls correct URL with POST method', async () => {
    const mockResponse = {
      sys: { id: 'new123', type: 'DataAssembly', version: 1 },
      name: 'New Assembly',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'DataAssembly',
        action: 'create',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
        },
        payload: {
          sys: { type: 'DataAssembly', dataType: [] },
          metadata: { tags: [] },
          name: 'New Assembly',
          description: 'A data assembly',
          parameters: {},
          resolvers: {},
          return: {},
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.post.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/data_assemblies',
        )
      })
  })

  test('create passes custom headers to the request', async () => {
    const mockResponse = {
      sys: { id: 'new123', type: 'DataAssembly', version: 1 },
      name: 'New Assembly',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'DataAssembly',
        action: 'create',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
        },
        payload: {
          sys: { type: 'DataAssembly', dataType: [] },
          metadata: { tags: [] },
          name: 'New Assembly',
          description: 'A data assembly',
          parameters: {},
          resolvers: {},
          return: {},
        },
        headers: {
          'X-Custom-Header': 'custom-value',
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.post.mock.calls[0][2].headers['X-Custom-Header']).to.eql('custom-value')
      })
  })

  test('update calls correct URL with version header', async () => {
    const mockResponse = {
      sys: { id: 'da123', type: 'DataAssembly', version: 2 },
      name: 'Updated Assembly',
      description: 'An updated data assembly',
      metadata: { tags: [] },
      parameters: {},
      resolvers: {},
      return: {},
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'DataAssembly',
        action: 'update',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          dataAssemblyId: 'da123',
        },
        payload: {
          sys: { id: 'da123', type: 'DataAssembly', version: 1, dataType: [] },
          name: 'Updated Assembly',
          description: 'An updated data assembly',
          metadata: { tags: [] },
          parameters: {},
          resolvers: {},
          return: {},
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/data_assemblies/da123',
        )
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(1)
      })
  })

  test('delete calls correct URL', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: '' }))

    return adapterMock
      .makeRequest({
        entityType: 'DataAssembly',
        action: 'delete',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          dataAssemblyId: 'da123',
        },
      })
      .then(() => {
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/data_assemblies/da123',
        )
      })
  })

  test('publish calls correct URL with PUT method and version header', async () => {
    const mockResponse = {
      sys: { id: 'da123', type: 'DataAssembly', version: 2 },
      name: 'Test Assembly',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'DataAssembly',
        action: 'publish',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          dataAssemblyId: 'da123',
          version: 1,
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/data_assemblies/da123/published',
        )
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(1)
      })
  })

  test('getPublished calls correct public URL', async () => {
    const mockResponse = {
      sys: { id: 'da123', type: 'DataAssembly' },
      name: 'Test Assembly',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'DataAssembly',
        action: 'getPublished',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          dataAssemblyId: 'da123',
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/public/data_assemblies/da123',
        )
      })
  })

  test('getManyPublished calls correct URL', async () => {
    const mockResponse = {
      sys: { type: 'Array' },
      limit: 100,
      items: [],
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'DataAssembly',
        action: 'getManyPublished',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          query: {},
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/public/data_assemblies',
        )
        expect(httpMock.get.mock.calls[0][1].params).to.eql({})
      })
  })

  test('getManyPublished passes pagination query parameters', async () => {
    const mockResponse = {
      sys: { type: 'Array' },
      limit: 20,
      items: [],
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'DataAssembly',
        action: 'getManyPublished',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          query: {
            limit: 20,
            pageNext: 'next-page-token',
          },
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/public/data_assemblies',
        )
        expect(httpMock.get.mock.calls[0][1].params).to.eql({
          limit: 20,
          pageNext: 'next-page-token',
        })
      })
  })

  test('create accepts a bare-string return mapping', async () => {
    const mockResponse = {
      sys: { id: 'da123', type: 'DataAssembly', version: 1 },
    }
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    const payload: CreateDataAssemblyProps = {
      sys: { type: 'DataAssembly', dataType: [] },
      metadata: { tags: [] },
      name: 'Bare-string return',
      description: '',
      parameters: {},
      resolvers: {},
      return: 'graphql.entry.fields.title',
    }

    await adapterMock.makeRequest({
      entityType: 'DataAssembly',
      action: 'create',
      userAgent: 'mocked',
      params: { spaceId: 'space123', environmentId: 'master' },
      payload,
    })

    expect(httpMock.post.mock.calls[0][1].return).to.eql('graphql.entry.fields.title')
  })

  test('create accepts a top-level $from return mapping', async () => {
    const mockResponse = {
      sys: { id: 'da123', type: 'DataAssembly', version: 1 },
    }
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    const payload: CreateDataAssemblyProps = {
      sys: { type: 'DataAssembly', dataType: [] },
      metadata: { tags: [] },
      name: '$from return',
      description: '',
      parameters: {},
      resolvers: {},
      return: { $from: { source: 'graphql.entry', select: 'fields.title' } },
    }

    await adapterMock.makeRequest({
      entityType: 'DataAssembly',
      action: 'create',
      userAgent: 'mocked',
      params: { spaceId: 'space123', environmentId: 'master' },
      payload,
    })

    expect(httpMock.post.mock.calls[0][1].return).to.eql({
      $from: { source: 'graphql.entry', select: 'fields.title' },
    })
  })

  test('create accepts a top-level $object return mapping', async () => {
    const mockResponse = {
      sys: { id: 'da123', type: 'DataAssembly', version: 1 },
    }
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    const payload: CreateDataAssemblyProps = {
      sys: { type: 'DataAssembly', dataType: [] },
      metadata: { tags: [] },
      name: '$object return',
      description: '',
      parameters: {},
      resolvers: {},
      return: {
        $object: {
          title: 'graphql.entry.fields.title',
          subtitle: { $literal: 'static value' },
        },
      },
    }

    await adapterMock.makeRequest({
      entityType: 'DataAssembly',
      action: 'create',
      userAgent: 'mocked',
      params: { spaceId: 'space123', environmentId: 'master' },
      payload,
    })

    expect(httpMock.post.mock.calls[0][1].return).to.eql({
      $object: {
        title: 'graphql.entry.fields.title',
        subtitle: { $literal: 'static value' },
      },
    })
  })

  test('create accepts a top-level $on return mapping', async () => {
    const mockResponse = {
      sys: { id: 'da123', type: 'DataAssembly', version: 1 },
    }
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    const payload: CreateDataAssemblyProps = {
      sys: { type: 'DataAssembly', dataType: [] },
      metadata: { tags: [] },
      name: '$on return',
      description: '',
      parameters: {},
      resolvers: {},
      return: {
        $on: {
          type: {
            article: 'graphql.entry.fields.headline',
            page: 'graphql.entry.fields.title',
          },
          default: { $literal: null },
        },
      },
    }

    await adapterMock.makeRequest({
      entityType: 'DataAssembly',
      action: 'create',
      userAgent: 'mocked',
      params: { spaceId: 'space123', environmentId: 'master' },
      payload,
    })

    expect(httpMock.post.mock.calls[0][1].return).to.eql({
      $on: {
        type: {
          article: 'graphql.entry.fields.headline',
          page: 'graphql.entry.fields.title',
        },
        default: { $literal: null },
      },
    })
  })

  test('create accepts a ResourceLink parameter with literal Contentful:Entry source', async () => {
    const mockResponse = {
      sys: { id: 'da123', type: 'DataAssembly', version: 1 },
    }
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    const payload: CreateDataAssemblyProps = {
      sys: { type: 'DataAssembly', dataType: [] },
      metadata: { tags: [] },
      name: 'ResourceLink param',
      description: '',
      parameters: {
        primary: {
          name: 'Primary',
          type: 'ResourceLink',
          linkType: 'Contentful:Entry',
          allowedResources: [
            {
              type: 'Contentful:Entry',
              source: 'crn:contentful:::content:spaces/$self/environments/$self',
              allowedTypes: ['article'],
            },
          ],
        },
      },
      resolvers: {},
      return: {},
    }

    await adapterMock.makeRequest({
      entityType: 'DataAssembly',
      action: 'create',
      userAgent: 'mocked',
      params: { spaceId: 'space123', environmentId: 'master' },
      payload,
    })

    expect(httpMock.post.mock.calls[0][1].parameters.primary.type).to.eql('ResourceLink')
    expect(httpMock.post.mock.calls[0][1].parameters.primary.allowedResources[0].source).to.eql(
      'crn:contentful:::content:spaces/$self/environments/$self',
    )
  })

  test('unpublish calls correct URL with DELETE method and version header', async () => {
    const mockResponse = {
      sys: { id: 'da123', type: 'DataAssembly', version: 2 },
      name: 'Test Assembly',
    }

    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'DataAssembly',
        action: 'unpublish',
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          dataAssemblyId: 'da123',
          version: 1,
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/data_assemblies/da123/published',
        )
        expect(httpMock.delete.mock.calls[0][1].headers['X-Contentful-Version']).to.eql(1)
      })
  })
})
