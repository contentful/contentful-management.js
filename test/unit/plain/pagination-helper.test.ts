import { describe, it, expect, vi } from 'vitest'
import defaultsDeep from 'lodash/defaultsDeep'
import type {
  CursorBasedParams,
  FetchFn,
  OffsetBasedParams,
} from '../../../lib/plain/pagination-helper.js'
import { fetchAll } from '../../../lib/plain/pagination-helper.js'
import type { BasicCursorPaginationOptions } from '../../../lib/common-types.js'
import {
  type CollectionProp,
  type CursorPaginatedCollectionProp,
} from '../../../lib/common-types.js'

const defaultLimit = 2

describe('pagination helpers', () => {
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
      const iterableFn = vi.fn(createOffsetBasedEndpoint(items))

      const params = { query: { limit: 100 } }
      const actualItems = await fetchAll(iterableFn, params)

      expect(actualItems).toEqual(items)
      expect(iterableFn).toHaveBeenCalledOnce()
      expect(iterableFn).toHaveBeenCalledWith(params)
    })

    it('returns all items from offset based endpoints', async () => {
      const items = [1, 2, 3, 4, 5]
      const iterableFn = vi.fn(createOffsetBasedEndpoint(items))

      const actualItems = await fetchAll(iterableFn, {})

      expect(actualItems).toEqual(items)
      expect(iterableFn).toHaveBeenCalledTimes(3)
      expect(iterableFn).toHaveBeenCalledWith({ query: { limit: defaultLimit, skip: 0 } })
      expect(iterableFn).toHaveBeenCalledWith({ query: { limit: defaultLimit, skip: 2 } })
      expect(iterableFn).toHaveBeenCalledWith({ query: { limit: defaultLimit, skip: 4 } })
    })

    it('forwards given params', async () => {
      const items = [1, 2, 3, 4, 5]
      const iterableFn = vi.fn(createOffsetBasedEndpoint(items))

      const actualItems = await fetchAll(iterableFn, {
        query: { limit: 99, order: '-sys.updatedAt' },
      })

      expect(actualItems).toEqual(items)
      expect(iterableFn).toHaveBeenCalledOnce()
      expect(iterableFn).toHaveBeenCalledWith({
        query: { limit: 99, skip: 0, order: '-sys.updatedAt' },
      })
    })
  })

  describe('cursor based pagination', () => {
    function createCursorBasedEndpoint<
      P extends CursorBasedParams = CursorBasedParams,
      T = unknown,
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
      const iterableFn = vi.fn(createCursorBasedEndpoint(items))
      const actualItems = await fetchAll(iterableFn, { query: { limit: 10 } })

      expect(actualItems).toEqual(items)
      expect(iterableFn).toHaveBeenCalledOnce()
    })

    it('returns all items from cursor based endpoints', async () => {
      const items = [1, 2, 3, 4, 5]
      const iterableFn = vi.fn(createCursorBasedEndpoint(items))

      const actualItems = await fetchAll(iterableFn, {})

      expect(actualItems).toEqual(items)
      expect(iterableFn).toHaveBeenCalledTimes(3)
      expect(iterableFn).toHaveBeenCalledWith({ query: { limit: defaultLimit } })
      expect(iterableFn).toHaveBeenCalledWith({ query: { limit: defaultLimit, pageNext: '2' } })
      expect(iterableFn).toHaveBeenCalledWith({ query: { limit: defaultLimit, pageNext: '4' } })
    })

    it('forwards given params', async () => {
      const items = [1, 2, 3, 4, 5]
      type AdditionalParams = {
        query?: {
          foo?: string
        } & BasicCursorPaginationOptions
      }
      const iterableFn = vi.fn(createCursorBasedEndpoint<AdditionalParams>(items))

      const actualItems = await fetchAll(iterableFn, { query: { foo: 'bar', limit: 100 } })

      expect(actualItems).toEqual(items)
      expect(iterableFn).toHaveBeenCalledOnce()
      expect(iterableFn).toHaveBeenCalledWith({ query: { limit: 100, foo: 'bar' } })
    })
  })
})
