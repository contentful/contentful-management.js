import { expect } from 'chai'
import { describe, it, afterEach, beforeEach } from 'mocha'
import { version } from '../../package.json'

import {
  createCMAHttpClient,
  __RewireAPI__ as createCMAHttpClientRewireApi,
} from '../../lib/create-cma-http-client'

import sinon from 'sinon'

const setupClient = (params = {}) => {
  const createHttpClientStub = sinon.stub()
  createCMAHttpClientRewireApi.__Rewire__('createHttpClient', createHttpClientStub)
  createCMAHttpClient({ accessToken: 'accesstoken', ...params })
  return createHttpClientStub
}

describe('A createCMAHttpClient function', () => {
  beforeEach(() => {
    createCMAHttpClientRewireApi.__Rewire__('axios', { create: sinon.stub() })
  })

  afterEach(() => {
    createCMAHttpClientRewireApi.__ResetDependency__('createHttpClient')
    createCMAHttpClientRewireApi.__ResetDependency__('wrapHttpClient')
  })

  it('throws if no accessToken is defined', () => {
    const createHttpClientStub = sinon.stub()
    createCMAHttpClientRewireApi.__Rewire__('createHttpClient', createHttpClientStub)
    expect(() => createCMAHttpClient({})).to.throw('Expected parameter accessToken')
  })

  it('passes along HTTP client parameters', () => {
    /*
    t.ok(createHttpClientStub.args[0][1].headers['Content-Type'], 'sets the content type')
    createCMAHttpClientRewireApi.__ResetDependency__('createHttpClient')
    createCMAHttpClientRewireApi.__ResetDependency__('wrapHttpClient')
    t.end()
     */
  })

  it('generates the correct default User Agent Header', () => {
    const client = setupClient()
    const headerParts = client.args[0][1].headers['X-Contentful-User-Agent'].split('; ')
    expect(headerParts).to.have.lengthOf(3)

    expect(headerParts[0]).to.match(/^sdk contentful-management\.js\/.+/)
    expect(headerParts[1]).to.match(/^platform (.+\/.+|browser)/)
    expect(headerParts[2]).to.match(/^os .+/)
  })

  it('generates the correct custom User Agent Header', () => {
    const client = setupClient({
      accessToken: 'accesstoken',
      application: 'myApplication/1.1.1',
      integration: 'myIntegration/1.0.0',
      feature: 'some-feature',
    })

    const headerParts = client.args[0][1].headers['X-Contentful-User-Agent'].split('; ')

    //expect(headerParts).to.have.length(6);
    expect(headerParts[0]).to.eq('app myApplication/1.1.1')
    expect(headerParts[1]).to.eq('integration myIntegration/1.0.0')
    expect(headerParts[2]).to.eq('feature some-feature')
    expect(headerParts[3]).to.eq(`sdk contentful-management.js/${version}`)
  })
})
