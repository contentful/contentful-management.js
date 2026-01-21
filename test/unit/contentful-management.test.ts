import type { MockedFunction } from 'vitest'
import { describe, it, afterEach, expect, vi, beforeAll } from 'vitest'
import { createClient } from '../../lib/index'
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

  it('creates plain client by default when no type is provided', () => {
    createClient({ accessToken: 'token' })

    expect(createPlainClientMock).toHaveBeenCalled()
    expect(createContentfulApiMock).not.toHaveBeenCalled()
  })

  it('creates plain client when type is explicitly set to plain', () => {
    createClient({ accessToken: 'token' }, { type: 'plain' })

    expect(createPlainClientMock).toHaveBeenCalled()
    expect(createContentfulApiMock).not.toHaveBeenCalled()
  })

  it('creates legacy waterfall client when type is legacy', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    createClient({ accessToken: 'token' }, { type: 'legacy' })

    expect(createContentfulApiMock).toHaveBeenCalled()
    expect(createPlainClientMock).not.toHaveBeenCalled()
    expect(warnSpy).toHaveBeenCalledWith(
      '[contentful-management] The waterfall (legacy) client is deprecated and will be removed in the next major version. Please migrate to the plain client. See the README for migration guidance.',
    )

    warnSpy.mockRestore()
  })

  it('creates a plain client with releaseSchema defaults', () => {
    createClient(
      { accessToken: 'token' },
      { type: 'plain', defaults: { releaseSchemaVersion: 'Release.v2' } },
    )

    expect(createPlainClientMock).toHaveBeenCalledWith(expect.any(Function), {
      releaseSchemaVersion: 'Release.v2',
    })
    expect(createContentfulApiMock).not.toHaveBeenCalled()
  })

  it('generates the correct releaseId', () => {
    createClient(
      { accessToken: 'token' },
      { type: 'plain', defaults: { releaseId: 'my-release-id' } },
    )

    expect(createPlainClientMock).toHaveBeenCalledWith(expect.any(Function), {
      releaseId: 'my-release-id',
    })
    expect(createContentfulApiMock).not.toHaveBeenCalled()
  })

  it('generates the correct default user agent for plain client', () => {
    createClient({ accessToken: 'token' })

    expect(makeRequestMock).not.toHaveBeenCalled()

    const makeRequestWithUserAgent = createPlainClientMock.mock.calls[0][0]
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
    expect(userAgentParts[0]).to.match(/^sdk contentful-management-plain\.js\/.+/)
    expect(userAgentParts[1]).to.match(/^platform (.+\/.+|browser)/)
    expect(userAgentParts[2]).to.match(/^os .+/)
  })

  it('generates the correct user agent for legacy client', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})

    createClient(
      {
        accessToken: 'token',
        application: 'myApplication/1.1.1',
        integration: 'myIntegration/1.0.0',
        feature: 'some-feature',
      },
      { type: 'legacy' },
    )

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
