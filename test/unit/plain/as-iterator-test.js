import { test } from 'mocha'
import sinon from 'sinon'
import defaultsDeep from 'lodash/defaultsDeep'
import { asIterator } from '../../../lib/plain/as-iterator'
import { expect } from "chai";

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


test('returns all items when exhausted', async () => {
  const items = [1, 2, 3, 4, 5]
  const iterableFn = sinon.spy(createIterableEndpoint(items))
  const actualItems = await exhaustIterator(asIterator(iterableFn, {}))
  expect(actualItems).to.eql(items)
})

test('adheres limit param for pagination',  async function ()  {
  this.timeout(60000)
  const items = [1, 2, 3]
  const iterableFn = sinon.spy(createIterableEndpoint(items))

  const actualItems = await exhaustIterator(asIterator(iterableFn, { query: { limit: 1 } }))
  expect(actualItems).to.eql( [1, 2, 3])
  expect(iterableFn.callCount).to.eql( 3)

  expect(iterableFn.calledWith({ query: { limit: 1, skip: 0 } })).to.ok
  expect(iterableFn.calledWith({ query: { limit: 1, skip: 1 } })).to.ok
  expect(iterableFn.calledWith({ query: { limit: 1, skip: 2 } })).to.ok
})
