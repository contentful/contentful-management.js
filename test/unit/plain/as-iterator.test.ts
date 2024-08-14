import { vi, test, expect } from 'vitest'
import defaultsDeep from 'lodash/defaultsDeep'
import { asIterator } from '../../../lib/plain/as-iterator'
import { CollectionProp } from '../../../lib/common-types'

const exhaustIterator = async (iterator) => {
  const data: unknown[] = []

  for await (const x of iterator) {
    data.push(x)
  }

  return data
}

const defaultLimit = 2

const createIterableEndpoint = (items): ((params: unknown) => Promise<CollectionProp<unknown>>) => {
  return async (params) => {
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

test('returns all items when exhausted', async () => {
  const items = [1, 2, 3, 4, 5]
  const iterableFn = createIterableEndpoint(items)
  const actualItems = await exhaustIterator(asIterator(iterableFn, {}))
  expect(actualItems).to.eql(items)
})

test('adheres limit param for pagination', async function () {
  const items = [1, 2, 3]
  const iterableFn = createIterableEndpoint(items)
  const spy = vi.fn(iterableFn)

  const actualItems = await exhaustIterator(asIterator(spy, { query: { limit: 1 } }))
  expect(actualItems).to.eql([1, 2, 3])
  expect(spy.mock.calls).toHaveLength(3)

  expect(spy).toHaveBeenNthCalledWith(1, { query: { limit: 1, skip: 0 } })
  expect(spy).toHaveBeenNthCalledWith(2, { query: { limit: 1, skip: 1 } })
  expect(spy).toHaveBeenNthCalledWith(3, { query: { limit: 1, skip: 2 } })
})
