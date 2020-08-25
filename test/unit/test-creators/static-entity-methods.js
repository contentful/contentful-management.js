import { cloneMock } from '../mocks/entities'
import { cloneDeep, upperFirst } from 'lodash'
import { expect } from 'chai'

export async function makeGetEntityTest(
  setup,
  { entityType, mockToReturn, methodToTest, wrapperSuffix = '' }
) {
  const { api, entitiesMock } = setup(Promise.resolve({}))
  entitiesMock[entityType][`wrap${upperFirst(entityType)}${wrapperSuffix}`].returns(mockToReturn)
  const result = await api[methodToTest]('eid')
  expect(result).to.eq(mockToReturn)
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
    expect(e.name).to.eq('404 Not Found')
  }
}

export async function makeCreateEntityTest(setup, { entityType, mockToReturn, methodToTest }) {
  const { api, httpMock, entitiesMock } = setup(Promise.resolve({}))
  entitiesMock[entityType][`wrap${upperFirst(entityType)}`].returns(mockToReturn)
  return api[methodToTest](mockToReturn).then((r) => {
    expect(r).eql(mockToReturn)
    expect(httpMock.post.args[0][1]).equals(mockToReturn)
  })
}

export async function makeCreateEntityWithIdTest(
  setup,
  { entityType, entityPath, mockToReturn, methodToTest }
) {
  const id = 'entityId'
  const { api, httpMock, entitiesMock } = setup(Promise.resolve({}))
  entitiesMock[entityType][`wrap${upperFirst(entityType)}`].returns(mockToReturn)

  return api[methodToTest](id, mockToReturn).then((r) => {
    expect(r).eql(mockToReturn)
    expect(httpMock.put.args[0][0]).eql(entityPath + '/' + id)
    expect(httpMock.put.args[0][1]).eql(mockToReturn, 'data is sent')
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
  let { api, httpMock, entitiesMock } = setup(Promise.resolve({}))
  const resourceData = cloneDeep(resourceMock)
  entitiesMock[type][wrapFunctionName].returns(wrapFunction(httpMock, resourceData))

  expectedFunctions.forEach((funcName) => {
    expect(typeof resourceData[funcName]).not.equals('function')
  })

  const sdkEntry = api[getResourceFromDataFunctionName](resourceData)
  //expect(sdkEntry);
  expectedFunctions.forEach((funcName) => {
    expect(typeof sdkEntry[funcName]).equals('function')
  })
}
