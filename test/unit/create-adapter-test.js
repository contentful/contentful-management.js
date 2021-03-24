import { expect } from 'chai'
import { describe, it, beforeEach, afterEach } from 'mocha'
import { RestAdapter } from '../../lib/adapters/REST/rest-adapter'
import { createAdapter, __Rewire__, __ResetDependency__ } from '../../lib/create-adapter'
import sinon from 'sinon'

describe('createAdapter', () => {
  it('returns adapter if provided', () => {
    const apiAdapter = new RestAdapter({ accessToken: 'token' })

    const createdAdapter = createAdapter({
      apiAdapter,
    })

    expect(createdAdapter).to.eq(apiAdapter)
  })

  describe('creates RestAdapter', () => {
    const fakeAdapter = { makeRequest: sinon.stub() }
    let restAdapterConstructorMock = sinon.stub().returns(fakeAdapter)

    beforeEach(() => {
      __Rewire__('RestAdapter', restAdapterConstructorMock)
    })

    afterEach(() => {
      __ResetDependency__('RestAdapter')
    })

    it('if no apiAdapter is provided', () => {
      const createdAdapter = createAdapter({ accessToken: 'token' })

      expect(restAdapterConstructorMock.called).to.be.ok
      expect(createdAdapter).to.eq(fakeAdapter)
    })
  })
})
