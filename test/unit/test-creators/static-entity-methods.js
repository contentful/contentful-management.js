/* global expect */
import upperFirst from 'lodash/upperFirst'
import {cloneMock} from '../mocks/entities'
import { Promise } from 'es6-promise'

export function makeGetEntityTest (setup, teardown, {entityType, mockToReturn, methodToTest, wrapperSuffix = ''}) {
  const {api, entitiesMock} = setup(Promise.resolve({}))
  entitiesMock[entityType][`wrap${upperFirst(entityType)}${wrapperSuffix}`]
  .mockReturnValue(mockToReturn)

  return api[methodToTest]('eid')
  .then((r) => {
    expect(r).toEqual(mockToReturn)
    teardown()
  })
}

export function makeGetCollectionTest (setup, teardown, {entityType, mockToReturn, methodToTest}) {
  makeGetEntityTest(setup, teardown, {
    entityType: entityType,
    mockToReturn: {
      total: 100,
      skip: 0,
      limit: 10,
      items: [mockToReturn]
    },
    methodToTest: methodToTest,
    wrapperSuffix: 'Collection'
  })
}

export function makeEntityMethodFailingTest (setup, teardown, {methodToTest}) {
  const error = cloneMock('error')
  const {api} = setup(Promise.reject(error))

  return api[methodToTest]('eid')
  .then(() => {}, (r) => {
    expect(r.name).toBe('404 Not Found')
    teardown()
  })
}

export function makeCreateEntityTest (setup, teardown, {entityType, mockToReturn, methodToTest}) {
  const {api, httpMock, entitiesMock} = setup(Promise.resolve({}))
  entitiesMock[entityType][`wrap${upperFirst(entityType)}`]
  .mockReturnValue(mockToReturn)

  return api[methodToTest](mockToReturn)
  .then((r) => {
    expect(r).toEqual(mockToReturn)
    expect(httpMock.post.mock.calls[0][1]).toEqual(mockToReturn)
    teardown()
  })
}

export function makeCreateEntityWithIdTest (setup, teardown, {entityType, entityPath, mockToReturn, methodToTest}) {
  const id = 'entityId'
  const {api, httpMock, entitiesMock} = setup(Promise.resolve({}))
  entitiesMock[entityType][`wrap${upperFirst(entityType)}`]
  .mockReturnValue(mockToReturn)

  return api[methodToTest](id, mockToReturn)
  .then((r) => {
    expect(r).toEqual(mockToReturn)
    expect(httpMock.put.mock.calls[0][0]).toBe(`${entityPath}${id}`)
    expect(httpMock.put.mock.calls[0][1]).toEqual(mockToReturn)
    teardown()
  })
}
