import { setupEntitiesMock, functionMock, functionCollectionMock } from './mocks/entities'
import { makeGetEntityTest } from './test-creators/static-entity-methods'
import setupMakeRequest from './mocks/makeRequest'
import { describe, test } from 'vitest'
import createFunctionApi from '../../lib/create-function-api'

function setup<T>(promise: Promise<T>) {
  const entitiesMock = setupEntitiesMock()
  const makeRequest = setupMakeRequest(promise)
  const api = createFunctionApi(makeRequest)

  return {
    api: {
      ...api,
      toPlainObject: () => functionMock,
    },
    makeRequest,
    entitiesMock,
  }
}

describe('A createFunctionApi', () => {
  test('API call getFunction', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'Function',
      mockToReturn: functionMock,
      methodToTest: 'getFunction',
    })
  })

  test('API call getManyFunctions', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'Function',
      mockToReturn: functionCollectionMock,
      methodToTest: 'getManyFunctions',
    })
  })

  test('API call getManyFunctionsForEnvironment', async () => {
    return makeGetEntityTest(setup, {
      entityType: 'Function',
      mockToReturn: functionCollectionMock,
      methodToTest: 'getManyFunctionsForEnvironment',
    })
  })
})
