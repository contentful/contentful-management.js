/* global expect */
import {cloneMock, mockCollection} from '../mocks/entities'
import { Promise } from 'es6-promise'

export function entityWrappedTest (setup, {wrapperMethod}) {
  const {httpMock, entityMock} = setup()
  const entity = wrapperMethod(httpMock, entityMock)
  expect(entity.toPlainObject()).toEqual(entityMock)
}

export function entityCollectionWrappedTest (setup, {wrapperMethod}) {
  const {httpMock, entityMock} = setup()
  const collection = mockCollection(entityMock)
  const entity = wrapperMethod(httpMock, collection)
  expect(entity.toPlainObject()).toEqual(collection)
}

export function entityUpdateTest (setup, {wrapperMethod}) {
  const {httpMock, entityMock} = setup()
  entityMock.sys.version = 2
  const entity = wrapperMethod(httpMock, entityMock)
  entity.name = 'updatedname'
  return entity.update()
  .then((response) => {
    expect(response.toPlainObject).toBeTruthy()
    expect(httpMock.put.mock.calls[0][1].name).toBe('updatedname')
    expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).toBe(2)
  })
}

export function entityActionTest (setup, {wrapperMethod, actionMethod}) {
  const {httpMock, entityMock} = setup()
  const entity = wrapperMethod(httpMock, entityMock)
  return entity[actionMethod]()
  .then((response) => {
    expect(response.toPlainObject).toBeTruthy()
  })
}

export function entityDeleteTest (setup, {wrapperMethod}) {
  const {httpMock, entityMock} = setup()
  const entity = wrapperMethod(httpMock, entityMock)
  return entity.delete()
  .then((response) => {
    expect(true).toBeTruthy() // pass
  })
}

export function entityPublishTest (setup, {wrapperMethod}) {
  const {httpMock, entityMock} = setup()
  entityMock.sys.version = 2
  const entity = wrapperMethod(httpMock, entityMock)
  return entity.publish()
  .then((response) => {
    expect(response.toPlainObject).toBeTruthy()
    expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).toBe(2)
  })
}

export function failingActionTest (setup, {wrapperMethod, actionMethod}) {
  const error = cloneMock('error')
  const {httpMock, entityMock} = setup(Promise.reject(error))
  const entity = wrapperMethod(httpMock, entityMock)

  return entity[actionMethod]()
  .catch((r) => {
    expect(r.name).toBe('404 Not Found')
  })
}
export function failingVersionActionTest (setup, {wrapperMethod, actionMethod}) {
  const error = cloneMock('error')
  const {httpMock, entityMock} = setup(Promise.reject(error))
  entityMock.sys.version = 2
  const entity = wrapperMethod(httpMock, entityMock)

  return entity[actionMethod]()
  .catch((r) => {
    expect(r.name).toBe('404 Not Found')
  })
}

export function isPublishedTest (setup, {wrapperMethod}) {
  const {httpMock, entityMock} = setup()
  const unpublishedEntity = wrapperMethod(httpMock, entityMock)
  expect(unpublishedEntity.isPublished(), 'entity initially unpublished')
  entityMock.sys.publishedVersion = 2
  const publishedEntity = wrapperMethod(httpMock, entityMock)
  expect(publishedEntity.isPublished()).toBeTruthy()
}

export function isUpdatedTest (setup, {wrapperMethod}) {
  const {httpMock, entityMock} = setup()
  const unpublishedEntity = wrapperMethod(httpMock, entityMock)
  expect(unpublishedEntity.isUpdated()).toBeFalsy()
  entityMock.sys.publishedVersion = 2
  entityMock.sys.version = 3
  const unchangedEntity = wrapperMethod(httpMock, entityMock)
  expect(unchangedEntity.isUpdated()).toBeFalsy()
  entityMock.sys.version = 5
  const changedEntity = wrapperMethod(httpMock, entityMock)
  expect(changedEntity.isUpdated()).toBeTruthy()
}

export function isDraftTest (setup, {wrapperMethod}) {
  const {httpMock, entityMock} = setup()
  const unpublishedEntity = wrapperMethod(httpMock, entityMock)
  expect(unpublishedEntity.isDraft()).toBeTruthy()
  entityMock.sys.publishedVersion = 2
  entityMock.sys.version = 3
  const unchangedEntity = wrapperMethod(httpMock, entityMock)
  expect(unchangedEntity.isDraft()).toBeFalsy()
}

export function isArchivedTest (setup, {wrapperMethod}) {
  const {httpMock, entityMock} = setup()
  const unarchivedEntity = wrapperMethod(httpMock, entityMock)
  expect(unarchivedEntity.isArchived()).toBeFalsy()
  entityMock.sys.archivedVersion = 2
  const archivedEntity = wrapperMethod(httpMock, entityMock)
  expect(archivedEntity.isArchived()).toBeTruthy()
}
