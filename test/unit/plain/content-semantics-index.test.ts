import { describe, test, expect } from 'vitest'
import { createClient } from '../../../lib/index'
import setupRestAdapter from '../adapters/REST/helpers/setupRestAdapter'
import { contentSemanticsIndexMock, contentSemanticsIndexCollectionMock } from '../mocks/entities'

describe('ContentSemanticsIndex', () => {
  const organizationId = 'mock-org-id'
  const indexId = 'mock-index-id'
  const spaceId = 'mock-space-id'
  const environmentId = 'mock-environment-id'

  test('get', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: contentSemanticsIndexMock }),
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.contentSemanticsIndex.get({ organizationId, indexId })

    expect(response).toBeInstanceOf(Object)
    expect(response.sys.id).toBe(indexId)
    expect(response.sys.status).toBe('ACTIVE')

    expect(httpMock.get.mock.calls[0][0]).toBe(
      `/organizations/${organizationId}/semantic/search-index/${indexId}`,
    )
  })

  test('getMany', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: contentSemanticsIndexCollectionMock }),
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.contentSemanticsIndex.getMany({ organizationId })

    expect(response).toBeInstanceOf(Object)
    expect(response.items).toHaveLength(1)
    expect(response.items[0].sys.id).toBe(indexId)

    expect(httpMock.get.mock.calls[0][0]).toBe(
      `/organizations/${organizationId}/semantic/search-index`,
    )
  })

  test('getMany with status filter', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: contentSemanticsIndexCollectionMock }),
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    await plainClient.contentSemanticsIndex.getMany({ organizationId, status: 'ACTIVE' })

    expect(httpMock.get.mock.calls[0][0]).toBe(
      `/organizations/${organizationId}/semantic/search-index`,
    )
    expect(httpMock.get.mock.calls[0][1].params).toEqual({ status: 'ACTIVE' })
  })

  test('getManyForEnvironment', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: contentSemanticsIndexCollectionMock }),
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.contentSemanticsIndex.getManyForEnvironment({
      spaceId,
      environmentId,
    })

    expect(response).toBeInstanceOf(Object)
    expect(response.items).toHaveLength(1)

    expect(httpMock.get.mock.calls[0][0]).toBe(
      `/spaces/${spaceId}/environments/${environmentId}/semantic/search-index`,
    )
  })

  test('getManyForEnvironment with status filter', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: contentSemanticsIndexCollectionMock }),
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    await plainClient.contentSemanticsIndex.getManyForEnvironment({
      spaceId,
      environmentId,
      status: 'PENDING',
    })

    expect(httpMock.get.mock.calls[0][0]).toBe(
      `/spaces/${spaceId}/environments/${environmentId}/semantic/search-index`,
    )
    expect(httpMock.get.mock.calls[0][1].params).toEqual({ status: 'PENDING' })
  })

  test('create', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: contentSemanticsIndexMock }),
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const payload = { spaceId, locale: 'en-US' }
    const response = await plainClient.contentSemanticsIndex.create({ organizationId }, payload)

    expect(response).toBeInstanceOf(Object)
    expect(response.sys.id).toBe(indexId)

    expect(httpMock.post.mock.calls[0][0]).toBe(
      `/organizations/${organizationId}/semantic/search-index`,
    )
    expect(httpMock.post.mock.calls[0][1]).toEqual(payload)
  })

  test('delete', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: '' }))
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    await plainClient.contentSemanticsIndex.delete({ organizationId, indexId })

    expect(httpMock.delete.mock.calls[0][0]).toBe(
      `/organizations/${organizationId}/semantic/search-index/${indexId}`,
    )
  })
})
