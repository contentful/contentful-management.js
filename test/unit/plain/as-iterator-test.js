import test from 'blue-tape'
import sinon from 'sinon'
import defaultsDeep from 'lodash/defaultsDeep'
import { asIterator } from '../../../lib/plain/as-iterator'

const exhaustIterator = async (iterator) => {
  const data = []

  for await (const x of iterator) {
    data.push(x)
  }

  return data
}

const defaultLimit = 2

const createIterableEndpoint = (items) => {
  return (params) => {
    const {
      query: { skip, limit },
    } = defaultsDeep(params, { query: { limit: defaultLimit, skip: 0 } })
    return {
      items: items.slice(skip, skip + limit),
      total: items.length,
      skip,
      limit,
    }
  }
}

test('returns all items when exhausted', async (t) => {
  const items = [1, 2, 3, 4, 5]
  const iterableFn = sinon.spy(createIterableEndpoint(items))

  const actualItems = await exhaustIterator(asIterator(iterableFn, {}))

  t.looseEqual(actualItems, items)
})

test('adheres limit param for pagination', async (t) => {
  const items = [1, 2, 3]
  const iterableFn = sinon.spy(createIterableEndpoint(items))

  const actualItems = await exhaustIterator(asIterator(iterableFn, { query: { limit: 1 } }))

  t.looseEqual(actualItems, [1, 2, 3])
  t.equal(iterableFn.callCount, 3)

  t.ok(iterableFn.calledWith({ query: { limit: 1, skip: 0 } }))
  t.ok(iterableFn.calledWith({ query: { limit: 1, skip: 1 } }))
  t.ok(iterableFn.calledWith({ query: { limit: 1, skip: 2 } }))
})
