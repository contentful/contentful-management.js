/* global expect, jest, test */
import sinon from 'sinon'
import {createClient, __RewireAPI__ as createClientRewireApi} from '../../lib/contentful-management'
import version from '../../version'

test('Throws if no accessToken is defined', () => {
  expect(() => {
    createClient({space: 'spaceid'})
  }).toThrowError(/Expected parameter accessToken/)
})

test('Passes along HTTP client parameters', () => {
  createClientRewireApi.__Rewire__('axios', {create: jest.fn()})

  const createHttpClientStub = sinon.stub()
  createClientRewireApi.__Rewire__('createHttpClient', createHttpClientStub)
  createClientRewireApi.__Rewire__('createContentfulApi', jest.fn().mockReturnValue({}))

  const client = createClient({accessToken: 'accesstoken'})
  expect(createHttpClientStub.calls[0][1].headers['Content-Type']).toBeTruthy()
  expect(client).toBeTruthy()
  createClientRewireApi.__ResetDependency__('createHttpClient')
  createClientRewireApi.__ResetDependency__('wrapHttpClient')
  createClientRewireApi.__ResetDependency__('createContentfulApi')
})

test('Generate the correct User Agent Header', () => {
  createClientRewireApi.__Rewire__('axios', {create: jest.fn()})

  const createHttpClientStub = sinon.stub()
  createClientRewireApi.__Rewire__('createHttpClient', createHttpClientStub)
  createClientRewireApi.__Rewire__('createContentfulApi', jest.fn().mockReturnValue({}))
  createClient({accessToken: 'accesstoken', application: 'myApplication/1.1.1', integration: 'myIntegration/1.0.0'})
  const headerParts = createHttpClientStub.calls[0][1].headers['X-Contentful-User-Agent'].split('; ')
  expect(headerParts.length).toBe(5)
  expect(headerParts[0]).toBe('app myApplication/1.1.1')
  expect(headerParts[1]).toBe('integration myIntegration/1.0.0')
  expect(headerParts[2]).toBe(`sdk contentful-management.js/${version}`)

  createClientRewireApi.__ResetDependency__('createHttpClient')
  createClientRewireApi.__ResetDependency__('wrapHttpClient')
  createClientRewireApi.__ResetDependency__('createContentfulApi')
})
