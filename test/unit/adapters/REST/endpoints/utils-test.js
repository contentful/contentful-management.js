import { expect } from 'chai'
import { describe, it } from 'mocha'
import { normalizeSpaceId } from '../../../../../lib/adapters/REST/endpoints/utils'

describe('normalizeSpaceId', () => {
  it('replaces the `spaceId` property of a query', () => {
    const query = {
      spaceId: 'some-space-id',
    }

    const expected = {
      'sys.space.sys.id[in]': 'some-space-id',
    }

    expect(normalizeSpaceId(query)).to.deep.equal(expected)
  })

  it('does not replace other properties', () => {
    const query = {
      limit: 10,
      spaceId: 'some-space-id',
    }

    const expected = {
      limit: 10,
      'sys.space.sys.id[in]': 'some-space-id',
    }

    expect(normalizeSpaceId(query)).to.deep.equal(expected)
  })
})
