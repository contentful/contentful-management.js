import { cloneMock, mockCollection } from '../mocks/entities'
import sinon from 'sinon'
import { expect } from 'chai'

export async function entityWrappedTest(setup, { wrapperMethod }) {
  const { httpMock, entityMock } = setup()
  const entity = wrapperMethod(httpMock, entityMock)
  expect(entity.toPlainObject()).eql(entityMock)
}

export async function entityCollectionWrappedTest(setup, { wrapperMethod }) {
  const { httpMock, entityMock } = setup()
  const collection = mockCollection(entityMock)
  const entity = wrapperMethod(httpMock, collection)
  expect(entity.toPlainObject()).eql(collection)
}

export async function entityUpdateTest(setup, { wrapperMethod }) {
  const { httpMock, entityMock } = setup()
  entityMock.sys.version = 2
  const entity = wrapperMethod(httpMock, entityMock)
  entity.name = 'updatedname'
  return entity.update().then((response) => {
    expect(response.toPlainObject, 'response is wrapped').to.be.ok
    expect(httpMock.put.args[0][1].name).equals('updatedname', 'data is sent')
    expect(httpMock.put.args[0][2].headers['X-Contentful-Version']).equals(
      2,
      'version header is sent'
    )
    return {
      httpMock,
      entityMock,
      response,
    }
  })
}

export async function entityCollectionActionTest(setup, { wrapperMethod, actionMethod }) {
  const { httpMock, entityMock } = setup(Promise.resolve({ data: { items: [] } }))
  const entity = wrapperMethod(httpMock, entityMock)
  return entity[actionMethod]().then((response) => {
    expect(response.toPlainObject, 'response is wrapped').to.be.ok
  })
}

export async function entityActionTest(setup, { wrapperMethod, actionMethod }) {
  const { httpMock, entityMock } = setup()
  const entity = wrapperMethod(httpMock, entityMock)
  return entity[actionMethod]().then((response) => {
    expect(response.toPlainObject, 'response is wrapped').to.be.ok
  })
}

export async function entityDeleteTest(setup, { wrapperMethod }) {
  const { httpMock, entityMock } = setup()
  const entity = wrapperMethod(httpMock, entityMock)
  expect(await entity.delete()).to.not.throw
}

export async function entityPublishTest(setup, { wrapperMethod }) {
  const { httpMock, entityMock } = setup()
  entityMock.sys.version = 2
  const entity = wrapperMethod(httpMock, entityMock)
  return entity.publish().then((response) => {
    expect(response.toPlainObject, 'response is wrapped').to.be.ok
    expect(httpMock.put.args[0][2].headers['X-Contentful-Version']).equals(
      2,
      'version header is sent'
    )
  })
}

export async function failingActionTest(setup, { wrapperMethod, actionMethod }) {
  const error = cloneMock('error')
  const { httpMock, entityMock } = setup(Promise.reject(error))
  const entity = wrapperMethod(httpMock, entityMock)
  return entity[actionMethod]().catch((r) => {
    expect(r.name).equals('404 Not Found')
  })
}

export async function failingVersionActionTest(setup, { wrapperMethod, actionMethod }) {
  const error = cloneMock('error')
  const { httpMock, entityMock } = setup(Promise.reject(error))
  entityMock.sys.version = 2
  const entity = wrapperMethod(httpMock, entityMock)
  return entity[actionMethod]().catch((r) => {
    expect(r.name).equals('404 Not Found')
  })
}

export async function isPublishedTest(setup, { wrapperMethod }) {
  const { httpMock, entityMock } = setup()
  const unpublishedEntity = wrapperMethod(httpMock, entityMock)
  expect(unpublishedEntity.isPublished(), 'entity initially unpublished').to.be.false
  entityMock.sys.publishedVersion = 2
  const publishedEntity = wrapperMethod(httpMock, entityMock)
  expect(publishedEntity.isPublished(), 'entity is now published').to.be.true
}

export async function isUpdatedTest(setup, { wrapperMethod }) {
  const { httpMock, entityMock } = setup()
  const unpublishedEntity = wrapperMethod(httpMock, entityMock)
  expect(unpublishedEntity.isUpdated(), 'entity not published').to.be.false
  entityMock.sys.publishedVersion = 2
  entityMock.sys.version = 3
  const unchangedEntity = wrapperMethod(httpMock, entityMock)
  expect(unchangedEntity.isUpdated(), 'entity initially unchanged').to.be.false
  entityMock.sys.version = 5
  const changedEntity = wrapperMethod(httpMock, entityMock)
  expect(changedEntity.isUpdated(), 'entity is now updated').to.be.true
}

export async function isDraftTest(setup, { wrapperMethod }) {
  const { httpMock, entityMock } = setup()
  const unpublishedEntity = wrapperMethod(httpMock, entityMock)
  expect(unpublishedEntity.isDraft(), 'entity is in draft mode').to.be.true
  entityMock.sys.publishedVersion = 2
  entityMock.sys.version = 3
  const unchangedEntity = wrapperMethod(httpMock, entityMock)
  expect(unchangedEntity.isDraft(), 'entity is now published').to.be.false
}

export async function isArchivedTest(setup, { wrapperMethod }) {
  const { httpMock, entityMock } = setup()
  const unarchivedEntity = wrapperMethod(httpMock, entityMock)
  expect(unarchivedEntity.isArchived(), 'entity initially unarchived').to.be.false
  entityMock.sys.archivedVersion = 2
  const archivedEntity = wrapperMethod(httpMock, entityMock)
  expect(archivedEntity.isArchived(), 'entity is now archived').to.be.true
}

export async function omitAndDeleteFieldTest(setup, { wrapperMethod }) {
  const { httpMock, entityMock } = setup()
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
  const plainEntity = wrapperMethod(httpMock, entityMock)
  httpMock.put = sinon.stub().returns(Promise.resolve({ data: plainEntity }))
  const entity = wrapperMethod(httpMock, entityMock)
  return entity.omitAndDeleteField('title').then((response) => {
    expect(response.toPlainObject, 'response is wrapped').to.be.ok
    expect(httpMock.put.args[0][1].fields.find((field) => field.id === 'title').omitted).equals(
      true,
      'omitted was set to true in the first update'
    )
    expect(httpMock.put.args[1][1].fields.find((field) => field.id === 'title').deleted).equals(
      true,
      'deleted was set to true in the first update'
    )
  })
}

export async function failingOmitAndDeleteFieldTest(setup, { wrapperMethod }) {
  const { httpMock, entityMock } = setup()
  const entity = wrapperMethod(httpMock, entityMock)
  return entity.omitAndDeleteField('doesntExist').catch((r) => {
    expect(r, "throws an error when field doesn't exist").to.be.ok
  })
}
