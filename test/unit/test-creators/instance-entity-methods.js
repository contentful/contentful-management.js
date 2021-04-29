import { cloneMock, mockCollection } from '../mocks/entities'
import sinon from 'sinon'
import { expect } from 'chai'

export function entityWrappedTest(setup, { wrapperMethod }) {
  const { makeRequest, entityMock } = setup()
  const entity = wrapperMethod(makeRequest, entityMock)
  expect(entity.toPlainObject()).eql(entityMock)
}

export function entityCollectionWrappedTest(setup, { wrapperMethod }) {
  const { makeRequest, entityMock } = setup()
  const collection = mockCollection(entityMock)
  const entity = wrapperMethod(makeRequest, collection)
  expect(entity.toPlainObject()).eql(collection)
}

export async function entityPatchTest(setup, { wrapperMethod }) {
  const { makeRequest, entityMock } = setup()
  const entity = wrapperMethod(makeRequest, entityMock)
  const response = await entity.patch([])
  expect(response.toPlainObject, 'response is wrapped').to.be.ok
}

export async function entityUpdateTest(setup, { wrapperMethod }) {
  await entityActionTest(setup, { wrapperMethod, actionMethod: 'update' })
}

export async function entityCollectionActionTest(setup, { wrapperMethod, actionMethod }) {
  const { makeRequest, entityMock } = setup(Promise.resolve({ items: [] }))
  const entity = wrapperMethod(makeRequest, entityMock)
  return entity[actionMethod]().then((response) => {
    expect(response.toPlainObject, 'response is wrapped').to.be.ok
  })
}

export async function entityActionTest(setup, { wrapperMethod, actionMethod }) {
  const { makeRequest, entityMock } = setup()
  const entity = wrapperMethod(makeRequest, entityMock)
  const response = await entity[actionMethod]()
  expect(response.toPlainObject, 'response is wrapped').to.be.ok
}

export async function entityDeleteTest(setup, { wrapperMethod }) {
  const { makeRequest, entityMock } = setup()
  const entity = wrapperMethod(makeRequest, entityMock)
  expect(await entity.delete()).to.not.throw
}

export async function entityPublishTest(setup, { wrapperMethod }) {
  await entityActionTest(setup, { wrapperMethod, actionMethod: 'publish' })
}

export async function failingActionTest(setup, { wrapperMethod, actionMethod }) {
  const error = cloneMock('error')
  const { makeRequest, entityMock } = setup(Promise.reject(error))
  const entity = wrapperMethod(makeRequest, entityMock)
  await expect(entity[actionMethod]()).to.eventually.be.rejectedWith(error)
}

export async function failingVersionActionTest(setup, { wrapperMethod, actionMethod }) {
  const error = cloneMock('error')
  const { makeRequest, entityMock } = setup(Promise.reject(error))
  entityMock.sys.version = 2
  const entity = wrapperMethod(makeRequest, entityMock)
  await expect(entity[actionMethod]()).to.eventually.be.rejectedWith(error)
}

export async function isPublishedTest(setup, { wrapperMethod }) {
  const { makeRequest, entityMock } = setup()
  const unpublishedEntity = wrapperMethod(makeRequest, entityMock)
  expect(unpublishedEntity.isPublished(), 'entity initially unpublished').to.be.false
  entityMock.sys.publishedVersion = 2
  const publishedEntity = wrapperMethod(makeRequest, entityMock)
  expect(publishedEntity.isPublished(), 'entity is now published').to.be.true
}

export async function isUpdatedTest(setup, { wrapperMethod }) {
  const { makeRequest, entityMock } = setup()
  const unpublishedEntity = wrapperMethod(makeRequest, entityMock)
  expect(unpublishedEntity.isUpdated(), 'entity not published').to.be.false
  entityMock.sys.publishedVersion = 2
  entityMock.sys.version = 3
  const unchangedEntity = wrapperMethod(makeRequest, entityMock)
  expect(unchangedEntity.isUpdated(), 'entity initially unchanged').to.be.false
  entityMock.sys.version = 5
  const changedEntity = wrapperMethod(makeRequest, entityMock)
  expect(changedEntity.isUpdated(), 'entity is now updated').to.be.true
}

export async function isDraftTest(setup, { wrapperMethod }) {
  const { makeRequest, entityMock } = setup()
  const unpublishedEntity = wrapperMethod(makeRequest, entityMock)
  expect(unpublishedEntity.isDraft(), 'entity is in draft mode').to.be.true
  entityMock.sys.publishedVersion = 2
  entityMock.sys.version = 3
  const unchangedEntity = wrapperMethod(makeRequest, entityMock)
  expect(unchangedEntity.isDraft(), 'entity is now published').to.be.false
}

export async function isArchivedTest(setup, { wrapperMethod }) {
  const { makeRequest, entityMock } = setup()
  const unarchivedEntity = wrapperMethod(makeRequest, entityMock)
  expect(unarchivedEntity.isArchived(), 'entity initially unarchived').to.be.false
  entityMock.sys.archivedVersion = 2
  const archivedEntity = wrapperMethod(makeRequest, entityMock)
  expect(archivedEntity.isArchived(), 'entity is now archived').to.be.true
}

export async function omitAndDeleteFieldTest(setup, { wrapperMethod }) {
  let { makeRequest, entityMock } = setup()
  entityMock.fields = [
    {
      id: 'title',
      name: 'Title',
      value: 'myTitle',
      omitted: false,
      deleted: false,
    },
  ]
  /* Since this method calls update() 2x, first call needs to return a properly wrapped entity. */
  const plainEntity = wrapperMethod(makeRequest, entityMock)
  makeRequest = sinon.stub().returns(Promise.resolve(plainEntity))
  const entity = wrapperMethod(makeRequest, entityMock)
  return entity.omitAndDeleteField('title').then((response) => {
    expect(response.toPlainObject, 'response is wrapped').to.be.ok
    expect(
      makeRequest.args[0][0].payload.fields.find((field) => field.id === 'title').omitted
    ).equals(true, 'omitted was set to true in the first update')
    expect(
      makeRequest.args[1][0].payload.fields.find((field) => field.id === 'title').deleted
    ).equals(true, 'deleted was set to true in the first update')
  })
}

export async function failingOmitAndDeleteFieldTest(setup, { wrapperMethod }) {
  const { makeRequest, entityMock } = setup()
  const entity = wrapperMethod(makeRequest, entityMock)
  return entity.omitAndDeleteField('doesntExist').catch((r) => {
    expect(r, "throws an error when field doesn't exist").to.be.ok
  })
}
