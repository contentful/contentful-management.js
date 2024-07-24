import { describe, it } from 'mocha'
import sinon from 'sinon'
import defaultsDeep from 'lodash/defaultsDeep'
import type {
  CursorBasedParams,
  FetchFn,
  OffsetBasedParams,
} from '../../../lib/plain/pagination-helper'
import { fetchAll } from '../../../lib/plain/pagination-helper'
import type { BasicCursorPaginationOptions } from '../../../lib/common-types'
import { type CollectionProp, type CursorPaginatedCollectionProp } from '../../../lib/common-types'
import { expect } from 'chai'

const defaultLimit = 2

describe(`pagination helpers`, () => {
  describe('offset based pagination', () => {
    function createOffsetBasedEndpoint<T>(items: T[]): FetchFn<OffsetBasedParams, T> {
      return async (params): Promise<CollectionProp<T>> => {
        const {
          query: { skip, limit },
        } = defaultsDeep(params, { query: { limit: defaultLimit, skip: 0 } })
        return {
          sys: {
            type: 'Array',
          },
          items: items.slice(skip, skip + limit),
          total: items.length,
          skip,
          limit,
        }
      }
    }

    it('only fires one request if all fetched are in one request', async () => {
      const items = [1, 2, 3, 4, 5]
      const iterableFn = sinon.spy(createOffsetBasedEndpoint(items))

      const params = { query: { limit: 100 } }
      const actualItems = await fetchAll(iterableFn, params)

      expect(actualItems).to.eql(items)
      sinon.assert.calledOnce(iterableFn)
      sinon.assert.calledWith(iterableFn, params)
    })

    it('returns all items from offset based endpoints', async () => {
      const items = [1, 2, 3, 4, 5]
      const iterableFn = sinon.spy(createOffsetBasedEndpoint(items))

      const actualItems = await fetchAll(iterableFn, {})

      expect(actualItems).to.eql(items)
      sinon.assert.calledThrice(iterableFn)
      sinon.assert.calledWith(iterableFn, { query: { limit: defaultLimit, skip: 0 } })
      sinon.assert.calledWith(iterableFn, { query: { limit: defaultLimit, skip: 2 } })
      sinon.assert.calledWith(iterableFn, { query: { limit: defaultLimit, skip: 4 } })
    })

    it('forwards given params', async () => {
      const items = [1, 2, 3, 4, 5]
      const iterableFn = sinon.spy(createOffsetBasedEndpoint(items))

      const actualItems = await fetchAll(iterableFn, {
        query: { limit: 99, order: '-sys.updatedAt' },
      })

      expect(actualItems).to.eql(items)
      sinon.assert.calledOnce(iterableFn)
      sinon.assert.calledWith(iterableFn, {
        query: { limit: 99, skip: 0, order: '-sys.updatedAt' },
      })
    })
  })

  describe(`cursor based pagination`, () => {
    function createCursorBasedEndpoint<
      P extends CursorBasedParams = CursorBasedParams,
      T = unknown
    >(items: T[]): FetchFn<P, T> {
      return async (params): Promise<CursorPaginatedCollectionProp<T>> => {
        const {
          query: { limit, pageNext },
        } = defaultsDeep(params, { query: { limit: defaultLimit } })
        const skip = parseInt(pageNext ?? '0', 10)
        const end = skip + limit
        const next = end < items.length ? `/does/not/matter?pageNext=${String(end)}` : undefined

        return {
          sys: {
            type: 'Array',
          },
          items: items.slice(skip, skip + limit),
          limit,
          pages: { next },
        }
      }
    }

    it('only fires one request if all fetched are in one request', async () => {
      const items = [1, 2, 3, 4, 5]
      const iterableFn = sinon.spy(createCursorBasedEndpoint(items))
      const actualItems = await fetchAll(iterableFn, { query: { limit: 10 } })

      expect(actualItems).to.eql(items)
      sinon.assert.calledOnce(iterableFn)
    })

    it('returns all items from cursor based endpoints', async () => {
      const items = [1, 2, 3, 4, 5]
      const iterableFn = sinon.spy(createCursorBasedEndpoint(items))

      const actualItems = await fetchAll(iterableFn, {})

      expect(actualItems).to.eql(items)
      sinon.assert.calledThrice(iterableFn)
      sinon.assert.calledWith(iterableFn, { query: { limit: defaultLimit } })
      sinon.assert.calledWith(iterableFn, { query: { limit: defaultLimit, pageNext: '2' } })
      sinon.assert.calledWith(iterableFn, { query: { limit: defaultLimit, pageNext: '4' } })
    })

    it('forwards given params', async () => {
      const items = [1, 2, 3, 4, 5]
      type AdditionalParams = {
        query?: {
          foo?: string
        } & BasicCursorPaginationOptions
      }
      const iterableFn = sinon.spy(createCursorBasedEndpoint<AdditionalParams>(items))

      const actualItems = await fetchAll(iterableFn, { query: { foo: 'bar', limit: 100 } })

      expect(actualItems).to.eql(items)
      sinon.assert.calledOnce(iterableFn)
      sinon.assert.calledWith(iterableFn, { query: { limit: 100, foo: 'bar' } })
    })
  })
})
