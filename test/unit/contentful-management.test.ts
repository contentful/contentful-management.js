import { describe, it, afterEach, expect, vi, MockedFunction, beforeAll } from 'vitest'
import { createClient } from '../../lib/contentful-management'
import { version } from '../../package.json'

import { createAdapter } from '../../lib/create-adapter'
import createContentfulApi from '../../lib/create-contentful-api'
import { createPlainClient } from '../../lib/plain/plain-client'

vi.mock('../../lib/create-adapter')
vi.mock('../../lib/create-contentful-api')
vi.mock('../../lib/plain/plain-client')

const createAdapterMock = <MockedFunction<typeof createAdapter>>(<unknown>createAdapter)
const createContentfulApiMock = <MockedFunction<typeof createContentfulApi>>(
  (<unknown>createContentfulApi)
)
const createPlainClientMock = <MockedFunction<typeof createPlainClient>>(<unknown>createPlainClient)
const makeRequestMock = vi.fn()

describe('Contentful Management', () => {
  beforeAll(() => {
    createAdapterMock.mockImplementation(() => ({
      makeRequest: makeRequestMock,
    }))
  })
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('creates nested client', () => {
    createClient({ accessToken: 'token' })

    expect(createPlainClientMock).not.toHaveBeenCalled()
    expect(createContentfulApiMock).toHaveBeenCalled()
  })

  it('creates plain client', () => {
    createClient({ accessToken: 'token' }, { type: 'plain' })

    expect(createPlainClientMock).toHaveBeenCalled()
    expect(createContentfulApiMock).not.toHaveBeenCalled()
  })

  it('generates the correct default user agent', () => {
    createClient({ accessToken: 'token' })

    expect(makeRequestMock).not.toHaveBeenCalled()

    const makeRequestWithUserAgent = createContentfulApiMock.mock.calls[0][0]
    makeRequestWithUserAgent({
      action: 'getMany',
      entityType: 'Asset',
      params: {
        environmentId: 'mocked',
        query: {
          'entity.sys.id': 'mocked',
          'entity.sys.linkType': 'mocked',
        },
        spaceId: 'mocked',
      },
    })

    expect(makeRequestMock).toHaveBeenCalled()
    const userAgent = makeRequestMock.mock.calls[0][0].userAgent
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

    expect(makeRequestMock).not.toHaveBeenCalled()

    const makeRequestWithUserAgent = createContentfulApiMock.mock.calls[0][0]
    makeRequestWithUserAgent({
      action: 'getMany',
      entityType: 'Asset',
      params: {
        environmentId: 'mocked',
        query: {
          'entity.sys.id': 'mocked',
          'entity.sys.linkType': 'mocked',
        },
        spaceId: 'mocked',
      },
    })

    expect(makeRequestMock).toHaveBeenCalled()

    const userAgent = makeRequestMock.mock.calls[0][0].userAgent
    const userAgentParts = userAgent.split('; ')
    expect(userAgentParts).to.have.lengthOf(6)
    expect(userAgentParts[0]).to.eq('app myApplication/1.1.1')
    expect(userAgentParts[1]).to.eq('integration myIntegration/1.0.0')
    expect(userAgentParts[2]).to.eq('feature some-feature')
    expect(userAgentParts[3]).to.eq(`sdk contentful-management.js/${version}`)
  })
})
