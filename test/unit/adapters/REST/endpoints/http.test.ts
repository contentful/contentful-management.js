import { vi, expect, describe, test } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'

vi.mock('contentful-sdk-core')

function setup(promise, params = {}) {
  return setupRestAdapter(promise, params)
}

describe('Rest Http', () => {
  const URL = '/some/random/endpoint'
  const CONFIG = {
    headers: {
      'X-Random-Headers': 'random value',
    },
  }
  const PAYLOAD = 'some random payload'

  test('get', async () => {
    const { httpMock, adapterMock: adapter } = setup(Promise.resolve({ data: 'mocked' }))

    await adapter.makeRequest({
      entityType: 'Http',
      action: 'get',
      params: { url: URL, config: CONFIG },
      userAgent: 'mocked',
    })

    expect(httpMock.get.mock.calls[0][0]).to.equal(URL)
    expect(httpMock.get.mock.calls[0][1]).to.contain(CONFIG)
  })

  test('post', async () => {
    const { httpMock, adapterMock: adapter } = setup(Promise.resolve({ data: 'mocked' }))

    await adapter.makeRequest({
      entityType: 'Http',
      action: 'post',
      params: { url: URL, config: CONFIG },
      userAgent: 'mocked',
      payload: PAYLOAD,
    })

    expect(httpMock.post.mock.calls[0][0]).to.equal(URL)
    expect(httpMock.post.mock.calls[0][1]).to.equal(PAYLOAD)
    expect(httpMock.post.mock.calls[0][2]).to.contain(CONFIG)
  })

  test('put', async () => {
    const { httpMock, adapterMock: adapter } = setup(Promise.resolve({ data: 'mocked' }))

    await adapter.makeRequest({
      entityType: 'Http',
      action: 'put',
      params: { url: URL, config: CONFIG },
      userAgent: 'mocked',
      payload: PAYLOAD,
    })

    expect(httpMock.put.mock.calls[0][0]).to.equal(URL)
    expect(httpMock.put.mock.calls[0][1]).to.equal(PAYLOAD)
    expect(httpMock.put.mock.calls[0][2]).to.contain(CONFIG)
  })

  test('patch', async () => {
    const { httpMock, adapterMock: adapter } = setup(Promise.resolve({ data: 'mocked' }))

    await adapter.makeRequest({
      entityType: 'Http',
      action: 'patch',
      params: { url: URL, config: CONFIG },
      userAgent: 'mocked',
      payload: PAYLOAD,
    })

    expect(httpMock.patch.mock.calls[0][0]).to.equal(URL)
    expect(httpMock.patch.mock.calls[0][1]).to.equal(PAYLOAD)
    expect(httpMock.patch.mock.calls[0][2]).to.contain(CONFIG)
  })

  test('delete', async () => {
    const { httpMock, adapterMock: adapter } = setup(Promise.resolve({ data: 'mocked' }))

    await adapter.makeRequest({
      entityType: 'Http',
      action: 'delete',
      params: { url: URL, config: CONFIG },
      userAgent: 'mocked',
    })

    expect(httpMock.delete.mock.calls[0][0]).to.equal(URL)
    expect(httpMock.delete.mock.calls[0][1]).to.contain(CONFIG)
  })
  test('request', async () => {
    const { httpMock, adapterMock: adapter } = setup(Promise.resolve({ data: 'mocked' }))

    const requestConfig = { ...CONFIG, method: 'put' }
    await adapter.makeRequest({
      entityType: 'Http',
      action: 'request',
      params: { url: URL, config: requestConfig },
      userAgent: 'mocked',
      payload: PAYLOAD,
    })

    expect(httpMock.mock.calls[0][0]).to.equal(URL)
    expect(httpMock.mock.calls[0][1]).to.contain(requestConfig)
  })
})
