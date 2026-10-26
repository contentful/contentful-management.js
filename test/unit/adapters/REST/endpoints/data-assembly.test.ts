import { describe, test, expect } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'
import type {
  CreateDataAssemblyProps,
  DataAssemblyParameterConfig,
  UpdateDataAssemblyProps,
} from '../../../../../lib/entities/data-assembly'

function deepFreeze<T extends object>(value: T): Readonly<T> {
  Object.values(value).forEach((child) => {
    if (child !== null && typeof child === 'object') deepFreeze(child)
  })
  return Object.freeze(value)
}

const canonicalParameters: DataAssemblyParameterConfig = [
  {
    id: 'second',
    name: 'Resource',
    description: 'Preserve authored order',
    type: 'ResourceLink',
    required: false,
    allowedResources: [
      {
        type: 'Contentful:Asset',
        source: 'crn:contentful:::content:spaces/$self/environments/$self',
      },
    ],
  },
  { id: 'first', type: 'String', required: true, fallbackValue: '', locked: false },
  { id: 'limit', type: 'Number', required: false, fallbackValue: 0, validation: { min: 0 } },
  {
    id: 'query',
    type: 'Record',
    required: true,
    fields: [
      { id: 'limit', type: 'Number', required: false, fallbackValue: 0 },
      {
        id: 'order',
        type: 'OrderExpression',
        target: { resourceLink: 'second' },
        fallbackValue: [{ path: 'sys.createdAt', direction: 'desc' }],
      },
    ],
  },
  {
    id: 'order',
    type: 'OrderExpression',
    required: false,
    target: { resourceLink: 'second' },
    fallbackValue: [],
  },
]

describe('Rest DataAssembly', { concurrent: true }, () => {
  test.each(['create', 'update'] as const)(
    '%s preserves canonical declarations without mutating the input',
    async (action) => {
      const createPayload: CreateDataAssemblyProps = {
        metadata: { tags: [] },
        name: 'Canonical assembly',
        description: '',
        parameters: structuredClone(canonicalParameters),
        resolvers: {
          query: {
            source: 'Contentful:GraphQL',
            query: 'query { articleCollection(limit: $limit) { items { title } } }',
            parameters: { limit: { $literal: 0 } },
          },
        },
        return: { $from: { source: 'query', select: 'articleCollection.items' } },
      }
      const updatePayload: UpdateDataAssemblyProps = {
        ...createPayload,
      }
      const payload = deepFreeze(action === 'create' ? createPayload : updatePayload)
      const before = structuredClone(payload)
      const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: payload }))
      const result = await adapterMock.makeRequest({
        entityType: 'DataAssembly',
        action,
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          dataAssemblyId: 'assembly',
          ...(action === 'update' && { version: 3 }),
        },
        payload,
      })
      const requestBody = httpMock[action === 'create' ? 'post' : 'put'].mock.calls[0][1]
      expect(requestBody).toEqual(before)
      expect(requestBody.parameters.map((parameter) => parameter.id)).toEqual([
        'second',
        'first',
        'limit',
        'query',
        'order',
      ])
      expect(requestBody).not.toBe(payload)
      expect(requestBody.parameters).not.toBe(payload.parameters)
      expect(payload).toEqual(before)
      expect(result).toEqual(before)
    },
  )

  test.each(['get', 'getPublished', 'getMany', 'getManyPublished'] as const)(
    '%s preserves canonical API response arrays',
    async (action) => {
      const assembly = deepFreeze({
        sys: { id: 'assembly', type: 'DataAssembly' },
        parameters: structuredClone(canonicalParameters),
      })
      const response =
        action === 'getMany' || action === 'getManyPublished'
          ? deepFreeze({ sys: { type: 'Array' }, items: [assembly] })
          : assembly
      const before = structuredClone(response)
      const { adapterMock } = setupRestAdapter(Promise.resolve({ data: response }))
      const result = await adapterMock.makeRequest({
        entityType: 'DataAssembly',
        action,
        userAgent: 'mocked',
        params: {
          spaceId: 'space123',
          environmentId: 'master',
          dataAssemblyId: 'assembly',
          query: {},
        },
      })
      // The frozen response guards against mutation; compare the returned contents once.
      expect(result).toEqual(before)
    },
  )

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
          metadata: { tags: [] },
          name: 'New Assembly',
          description: 'A data assembly',
          parameters: [],
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
          metadata: { tags: [] },
          name: 'New Assembly',
          description: 'A data assembly',
          parameters: [],
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

  test('update without a version omits the version header', async () => {
    const mockResponse = {
      sys: { id: 'da123', type: 'DataAssembly', version: 2 },
      name: 'Updated Assembly',
      description: 'An updated data assembly',
      metadata: { tags: [] },
      parameters: [],
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
          name: 'Updated Assembly',
          description: 'An updated data assembly',
          metadata: { tags: [] },
          parameters: [],
          resolvers: {},
          return: {},
        },
      })
      .then((r) => {
        expect(r).to.eql(mockResponse)
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/data_assemblies/da123',
        )
        expect(httpMock.put.mock.calls[0][2].headers).not.toHaveProperty('X-Contentful-Version')
      })
  })

  test('create sends the payload as the body', async () => {
    const mockResponse = {
      sys: { id: 'new123', type: 'DataAssembly', version: 1 },
    }
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    const payload: CreateDataAssemblyProps = {
      metadata: { tags: [] },
      name: 'Assembly',
      description: '',
      parameters: [],
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

    expect(httpMock.post.mock.calls[0][0]).to.eql(
      '/spaces/space123/environments/master/data_assemblies',
    )
    expect(httpMock.post.mock.calls[0][1]).to.eql(payload)
  })

  test('update sends the version from params', async () => {
    const mockResponse = {
      sys: { id: 'da123', type: 'DataAssembly', version: 4 },
    }
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: mockResponse }))

    const payload: UpdateDataAssemblyProps = {
      metadata: { tags: [] },
      name: 'Assembly',
      description: '',
      parameters: [],
      resolvers: {},
      return: {},
    }

    await adapterMock.makeRequest({
      entityType: 'DataAssembly',
      action: 'update',
      userAgent: 'mocked',
      params: {
        spaceId: 'space123',
        environmentId: 'master',
        dataAssemblyId: 'da123',
        version: 3,
      },
      payload,
    })

    expect(httpMock.put.mock.calls[0][0]).to.eql(
      '/spaces/space123/environments/master/data_assemblies/da123',
    )
    expect(httpMock.put.mock.calls[0][1]).to.eql(payload)
    expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(3)
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
      metadata: { tags: [] },
      name: 'Bare-string return',
      description: '',
      parameters: [],
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
      metadata: { tags: [] },
      name: '$from return',
      description: '',
      parameters: [],
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
      metadata: { tags: [] },
      name: '$object return',
      description: '',
      parameters: [],
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
      metadata: { tags: [] },
      name: '$on return',
      description: '',
      parameters: [],
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
      metadata: { tags: [] },
      name: 'ResourceLink param',
      description: '',
      parameters: [
        {
          id: 'primary',
          required: true,
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
      ],
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

    expect(httpMock.post.mock.calls[0][1].parameters[0].type).to.eql('ResourceLink')
    expect(httpMock.post.mock.calls[0][1].parameters[0].allowedResources[0].source).to.eql(
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
