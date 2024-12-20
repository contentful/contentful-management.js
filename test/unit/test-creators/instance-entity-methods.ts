import type { MakeRequest, MetaSysProps } from '../../../lib/common-types'
import type { ContentTypeProps } from '../../../lib/entities/content-type'
import type { errorMock } from '../mocks/entities'
import { cloneMock, mockCollection } from '../mocks/entities'
import { expect, vi } from 'vitest'

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
  const { makeRequest, entityMock } = setup(Promise.resolve({}))
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

export async function entityActionTest(
  setup,
  { wrapperMethod, actionMethod },
  checkResponse = true
) {
  const { makeRequest, entityMock } = setup(Promise.resolve({}))
  const entity = wrapperMethod(makeRequest, entityMock)
  if (checkResponse) {
    const response = await entity[actionMethod]()
    expect(response.toPlainObject, 'response is wrapped').to.be.ok
  } else {
    expect(await entity[actionMethod]()).to.not.throw
  }
}

export async function entityDeleteTest(setup, { wrapperMethod }) {
  const { makeRequest, entityMock } = setup(Promise.resolve({}))
  const entity = wrapperMethod(makeRequest, entityMock)
  expect(await entity.delete()).to.not.throw
}

export async function entityPublishTest(setup, { wrapperMethod }) {
  await entityActionTest(setup, { wrapperMethod, actionMethod: 'publish' })
}

type FailedActionSetup = (a: Promise<unknown>) => {
  makeRequest: MakeRequest
  entityMock: Partial<{
    sys: Partial<MetaSysProps>
  }>
}

export async function failingActionTest(setup: FailedActionSetup, { wrapperMethod, actionMethod }) {
  const error = cloneMock('error') as typeof errorMock
  const { makeRequest, entityMock } = setup(Promise.reject(error))
  const entity = wrapperMethod(makeRequest, entityMock)
  await expect(async () => await entity[actionMethod]()).rejects.toBe(error)
}

export async function failingVersionActionTest(setup, { wrapperMethod, actionMethod }) {
  const error = cloneMock('error')
  const { makeRequest, entityMock } = setup(Promise.reject(error))
  entityMock.sys.version = 2
  const entity = wrapperMethod(makeRequest, entityMock)
  await expect(async () => await entity[actionMethod]()).rejects.toBe(error)
}

export async function isPublishedTest(setup, { wrapperMethod }) {
  const { makeRequest, entityMock } = setup(Promise.resolve({}))
  const unpublishedEntity = wrapperMethod(makeRequest, entityMock)
  expect(unpublishedEntity.isPublished(), 'entity initially unpublished').to.be.false
  entityMock.sys.publishedVersion = 2
  const publishedEntity = wrapperMethod(makeRequest, entityMock)
  expect(publishedEntity.isPublished(), 'entity is now published').to.be.true
}

export async function isUpdatedTest(setup, { wrapperMethod }) {
  const { makeRequest, entityMock } = setup(Promise.resolve({}))
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
  const { makeRequest, entityMock } = setup(Promise.resolve({}))
  const unpublishedEntity = wrapperMethod(makeRequest, entityMock)
  expect(unpublishedEntity.isDraft(), 'entity is in draft mode').to.be.true
  entityMock.sys.publishedVersion = 2
  entityMock.sys.version = 3
  const unchangedEntity = wrapperMethod(makeRequest, entityMock)
  expect(unchangedEntity.isDraft(), 'entity is now published').to.be.false
}

export async function isArchivedTest(setup, { wrapperMethod }) {
  const { makeRequest, entityMock } = setup(Promise.resolve({}))
  const unarchivedEntity = wrapperMethod(makeRequest, entityMock)
  expect(unarchivedEntity.isArchived(), 'entity initially unarchived').to.be.false
  entityMock.sys.archivedVersion = 2
  const archivedEntity = wrapperMethod(makeRequest, entityMock)
  expect(archivedEntity.isArchived(), 'entity is now archived').to.be.true
}

type OmitAndDeleteSetup = (a: Promise<unknown>) => {
  makeRequest: MakeRequest
  entityMock: ContentTypeProps
}

export async function omitAndDeleteFieldTest(setup: OmitAndDeleteSetup, { wrapperMethod }) {
  const titleField = {
    id: 'title',
    name: 'Title',
    omitted: false,
    deleted: false,
    localized: false,
    required: false,
    type: 'mocked',
  }
  const setupData = setup(
    Promise.resolve({
      fields: [titleField],
    })
  )
  setupData.entityMock.fields = [titleField]
  /* Since this method calls update() 2x, first call needs to return a properly wrapped entity. */
  const makeRequestSpy = vi.spyOn(setupData, 'makeRequest')

  const entity = wrapperMethod(setupData.makeRequest, setupData.entityMock)
  return entity.omitAndDeleteField('title').then((response) => {
    expect(response.toPlainObject, 'response is wrapped').to.be.ok
    // @todo type is not correct, it complains that payload does not exist (but it does)
    expect(
      makeRequestSpy.mock.calls[0][0].payload.fields.find((field) => field.id === 'title').omitted
    ).equals(true, 'omitted was se  t to true in the first update')
    expect(
      makeRequestSpy.mock.calls[1][0].payload.fields.find((field) => field.id === 'title').deleted
    ).equals(true, 'deleted was set to true in the first update')
  })
}

export async function failingOmitAndDeleteFieldTest(setup, { wrapperMethod }) {
  const { makeRequest, entityMock } = setup(Promise.resolve({}))
  const entity = wrapperMethod(makeRequest, entityMock)
  return entity.omitAndDeleteField('doesntExist').catch((r) => {
    expect(r, "throws an error when field doesn't exist").to.be.ok
  })
}

export async function entityReferenceCollectionTest(setup, { wrapperMethod }) {
  const { makeRequest, entityMock } = setup(Promise.resolve({}))
  const entity = wrapperMethod(makeRequest, entityMock)
  expect(entity.includes).not.to.be.empty
}
