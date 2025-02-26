import { cloneMock } from '../mocks/entities'
import { cloneDeep, upperFirst } from 'lodash'
import { expect } from 'vitest'

export async function makeGetEntityTest(
  setup,
  { entityType, mockToReturn, methodToTest, wrapperSuffix = '' }
) {
  const { api, entitiesMock } = setup(Promise.resolve(mockToReturn))
  entitiesMock[entityType][`wrap${upperFirst(entityType)}${wrapperSuffix}`].mockReturnValue(
    mockToReturn
  )
  const result = await api[methodToTest]('eid')
  expect(result).toEqual(mockToReturn)
}

export async function makeGetCollectionTest(setup, { entityType, mockToReturn, methodToTest }) {
  await makeGetEntityTest(setup, {
    entityType: entityType,
    mockToReturn: {
      total: 100,
      skip: 0,
      limit: 10,
      items: [mockToReturn],
    },
    methodToTest: methodToTest,
    wrapperSuffix: 'Collection',
  })
}

export async function makeEntityMethodFailingTest(setup, { methodToTest }) {
  const error = cloneMock('error')
  const { api } = setup(Promise.reject(error))

  try {
    await api[methodToTest]('eid')
  } catch (e) {
    expect(e).to.eq(error)
  }
}

export async function makeCreateEntityTest(setup, { entityType, mockToReturn, methodToTest }) {
  const { api, makeRequest, entitiesMock } = setup(Promise.resolve(mockToReturn))
  entitiesMock[entityType][`wrap${upperFirst(entityType)}`].mockReturnValue(mockToReturn)
  return api[methodToTest](mockToReturn).then((r) => {
    expect(r).eql(mockToReturn)
    expect(makeRequest.mock.calls[0][0].payload).to.eql(mockToReturn)
  })
}

export async function makeCreateEntityWithIdTest(
  setup,
  { entityType, mockToReturn, methodToTest }
) {
  const id = 'entityId'
  const { api, makeRequest, entitiesMock } = setup(Promise.resolve(mockToReturn))
  entitiesMock[entityType][`wrap${upperFirst(entityType)}`].mockReturnValue(mockToReturn)

  return api[methodToTest](id, mockToReturn).then((r) => {
    expect(r).eql(mockToReturn)
    expect(makeRequest.mock.calls[0][0].payload).eql(mockToReturn, 'data is sent')
  })
}

export function testGettingEntrySDKObject(
  setup,
  {
    type,
    wrapFunctionName,
    resourceMock,
    wrapFunction,
    expectedFunctions,
    getResourceFromDataFunctionName,
  }
) {
  const { api, makeRequest, entitiesMock } = setup(Promise.resolve({}))
  const resourceData = cloneDeep(resourceMock)
  entitiesMock[type][wrapFunctionName].mockReturnValue(wrapFunction(makeRequest, resourceData))

  expectedFunctions.forEach((funcName) => {
    expect(typeof resourceData[funcName]).not.equals('function')
  })

  const sdkEntry = api[getResourceFromDataFunctionName](resourceData)
  expectedFunctions.forEach((funcName) => {
    expect(typeof sdkEntry[funcName]).equals('function')
  })
}
