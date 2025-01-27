import { setupEntitiesMock, functionLogMock, functionLogCollectionMock } from './mocks/entities'
import { makeGetEntityTest } from './test-creators/static-entity-methods'
import setupMakeRequest from './mocks/makeRequest'
import { describe, test } from 'vitest'
import createFunctionLogApi from '../../lib/create-function-log-api'

function setup<T>(promise: Promise<T>) {
  const entitiesMock = setupEntitiesMock()
  const makeRequest = setupMakeRequest(promise)
  const api = createFunctionLogApi(makeRequest)

  return {
    api: {
      ...api,
      toPlainObject: () => functionLogMock,
    },
    makeRequest,
    entitiesMock,
  }
}

describe('A createFunctionLogApi', () => {
  test('API call getFunctionLog', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'FunctionLog',
      mockToReturn: functionLogMock,
      methodToTest: 'get',
    })
  })

  test('API call getAll', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'FunctionLog',
      mockToReturn: functionLogCollectionMock,
      methodToTest: 'getMany',
    })
  })
})
