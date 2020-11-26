import { describe, test } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import { wrapUsageCollection } from '../../../lib/entities/usage'
import { entityCollectionWrappedTest } from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('usage'),
  }
}

describe('Entity Usage', () => {
  test('Usage period collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapUsageCollection,
    })
  })
})
