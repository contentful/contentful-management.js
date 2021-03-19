import { describe, it, beforeEach, afterEach } from 'mocha'
import { createClient, __Rewire__, __ResetDependency__ } from '../../lib/contentful-management'
import sinon from 'sinon'
import { expect } from 'chai'
import { version } from '../../package.json'

describe('Contentful Management', () => {
  let createPlainClientMock
  let createContentfulApiMock
  let makeRequestMock

  beforeEach(() => {
    createPlainClientMock = sinon.stub()
    __Rewire__('createPlainClient', createPlainClientMock)

    createContentfulApiMock = sinon.stub()
    __Rewire__('createContentfulApi', createContentfulApiMock)

    makeRequestMock = sinon.stub()
    __Rewire__('createAdapter', () => ({ makeRequest: makeRequestMock }))
  })

  afterEach(() => {
    __ResetDependency__('createPlainClient')
    __ResetDependency__('createContentfulApi')
    __ResetDependency__('createAdapter')
  })

  it('creates nested client', () => {
    createClient({ accessToken: 'token' })

    expect(createPlainClientMock.notCalled).to.be.ok
    expect(createContentfulApiMock.called).to.be.ok
  })

  it('creates plain client', () => {
    createClient({ accessToken: 'token' }, { type: 'plain' })

    expect(createPlainClientMock.called).to.be.ok
    expect(createContentfulApiMock.notCalled).to.be.ok
  })

  it('generates the correct default user agent', () => {
    createClient({ accessToken: 'token' })

    expect(makeRequestMock.notCalled).to.be.ok

    const makeRequestWithUserAgent = createContentfulApiMock.args[0][0]
    makeRequestWithUserAgent()

    expect(makeRequestMock.called).to.be.ok

    const userAgent = makeRequestMock.args[0][0].userAgent
    const userAgentParts = userAgent.split('; ')
    expect(userAgentParts).to.have.lengthOf(3)
    expect(userAgentParts[0]).to.match(/^sdk contentful-management\.js\/.+/)
    expect(userAgentParts[1]).to.match(/^platform (.+\/.+|browser)/)
    expect(userAgentParts[2]).to.match(/^os .+/)
  })

  it('generates the correct user agent', () => {
    createClient({
      accessToken: 'token',
      application: 'myApplication/1.1.1',
      integration: 'myIntegration/1.0.0',
      feature: 'some-feature',
    })

    expect(makeRequestMock.notCalled).to.be.ok

    const makeRequestWithUserAgent = createContentfulApiMock.args[0][0]
    makeRequestWithUserAgent()

    expect(makeRequestMock.called).to.be.ok

    const userAgent = makeRequestMock.args[0][0].userAgent
    const userAgentParts = userAgent.split('; ')
    expect(userAgentParts).to.have.lengthOf(6)
    expect(userAgentParts[0]).to.eq('app myApplication/1.1.1')
    expect(userAgentParts[1]).to.eq('integration myIntegration/1.0.0')
    expect(userAgentParts[2]).to.eq('feature some-feature')
    expect(userAgentParts[3]).to.eq(`sdk contentful-management.js/${version}`)
  })
})
