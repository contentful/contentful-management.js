import { expect } from 'chai'
import { describe, it } from 'mocha'
import { RestAdapter } from '../../../../lib/adapters/REST/rest-adapter'
import setupRestAdapter, { resetRestAdapterRewire } from './helpers/setupRestAdapter'

describe('Rest Adapter', () => {
  it('throws if no accessToken is defined', () => {
    expect(() => new RestAdapter({})).to.throw('Expected parameter accessToken')
  })

  it('throws if unknown endpoint is called', async () => {
    const { adapterMock } = setupRestAdapter()

    await expect(
      adapterMock.makeRequest({
        entityType: 'nothing',
        action: 'nothing',
        userAgent: 'test-runner',
      })
    ).to.eventually.be.rejectedWith('Unknown endpoint')

    resetRestAdapterRewire()
  })
})
