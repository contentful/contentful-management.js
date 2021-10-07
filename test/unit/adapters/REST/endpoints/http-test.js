import { expect } from 'chai'
import { describe, test } from 'mocha'
import setupRestAdapter from '../helpers/setupRestAdapter'

function setup(promise, params = {}) {
  return setupRestAdapter(promise, params)
}

const DEFAULT_HEADERS = {
  'Content-Type': 'application/vnd.contentful.management.v1+json',
  'X-Contentful-User-Agent': undefined,
}

const requestWithDefaults = (request) => {
  return {
    baseURL: 'https://api.contentful.com',
    ...request,
    headers: { ...DEFAULT_HEADERS, ...request.headers },
  }
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
    const { httpMock, adapterMock: adapter } = setup()

    await adapter.makeRequest({
      entityType: 'Http',
      action: 'get',
      params: {
        url: URL,
        config: CONFIG,
      },
    })

    expect(httpMock.get.args[0][0]).to.equal(URL)
    expect(httpMock.get.args[0][1]).to.eql(requestWithDefaults(CONFIG))
  })

  test('post', async () => {
    const { httpMock, adapterMock: adapter } = setup()

    await adapter.makeRequest({
      entityType: 'Http',
      action: 'post',
      params: {
        url: URL,
        config: CONFIG,
      },
      payload: PAYLOAD,
    })

    expect(httpMock.post.args[0][0]).to.equal(URL)
    expect(httpMock.post.args[0][1]).to.equal(PAYLOAD)
    expect(httpMock.post.args[0][2]).to.eql(requestWithDefaults(CONFIG))
  })

  test('put', async () => {
    const { httpMock, adapterMock: adapter } = setup()

    await adapter.makeRequest({
      entityType: 'Http',
      action: 'put',
      params: {
        url: URL,
        config: CONFIG,
      },
      payload: PAYLOAD,
    })

    expect(httpMock.put.args[0][0]).to.equal(URL)
    expect(httpMock.put.args[0][1]).to.equal(PAYLOAD)
    expect(httpMock.put.args[0][2]).to.eql(requestWithDefaults(CONFIG))
  })

  test('delete', async () => {
    const { httpMock, adapterMock: adapter } = setup()

    await adapter.makeRequest({
      entityType: 'Http',
      action: 'delete',
      params: {
        url: URL,
        config: CONFIG,
      },
    })

    expect(httpMock.delete.args[0][0]).to.equal(URL)
    expect(httpMock.delete.args[0][1]).to.eql(requestWithDefaults(CONFIG))
  })
  test('request', async () => {
    const { httpMock, adapterMock: adapter } = setup()

    const requestConfig = {
      ...CONFIG,
      method: 'put',
    }
    await adapter.makeRequest({
      entityType: 'Http',
      action: 'request',
      params: {
        url: URL,
        config: requestConfig,
      },
      payload: PAYLOAD,
    })

    expect(httpMock.args[0][0]).to.equal(URL)
    expect(httpMock.args[0][1]).to.eql(requestWithDefaults(requestConfig))
  })
})
