import test from 'blue-tape'
import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import { wrapEntry, wrapEntryCollection } from '../../../lib/entities/entry'
import {
  entityWrappedTest,
  entityCollectionWrappedTest,
  entityUpdateTest,
  entityDeleteTest,
  entityPublishTest,
  entityActionTest,
  entityCollectionActionTest,
  failingActionTest,
  failingVersionActionTest,
  isPublishedTest,
  isUpdatedTest,
  isDraftTest,
  isArchivedTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('entry'),
  }
}

test('Entry is wrapped', (t) => {
  entityWrappedTest(t, setup, {
    wrapperMethod: wrapEntry,
  })
})

test('Entry collection is wrapped', (t) => {
  return entityCollectionWrappedTest(t, setup, {
    wrapperMethod: wrapEntryCollection,
  })
})

test('Entry update', (t) => {
  return entityUpdateTest(t, setup, {
    wrapperMethod: wrapEntry,
  })
})

test('Entry update with tags works', (t) => {
  t.plan(3)
  const { httpMock } = setup()
  const entityMock = cloneMock('entryWithTags')
  entityMock.sys.version = 2
  const entity = wrapEntry(httpMock, entityMock)
  entity.metadata.tags[0] = {
    name: 'newname',
    sys: entityMock.metadata.tags[0].sys,
  }
  return entity.update().then((response) => {
    t.ok(response.toPlainObject, 'response is wrapped')
    t.equals(httpMock.put.args[0][1].metadata.tags[0].name, 'newname', 'metadata is sent')
    t.equals(httpMock.put.args[0][2].headers['X-Contentful-Version'], 2, 'version header is sent')
    return { httpMock, entityMock, response }
  })
})

test('Entry update fails', (t) => {
  return failingVersionActionTest(t, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'update',
  })
})

test('Entry delete', (t) => {
  return entityDeleteTest(t, setup, {
    wrapperMethod: wrapEntry,
  })
})

test('Entry delete fails', (t) => {
  return failingActionTest(t, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'delete',
  })
})

test('Entry publish', (t) => {
  return entityPublishTest(t, setup, {
    wrapperMethod: wrapEntry,
  })
})

test('Entry publish fails', (t) => {
  return failingVersionActionTest(t, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'publish',
  })
})

test('Entry unpublish', (t) => {
  return entityActionTest(t, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'unpublish',
  })
})

test('Entry unpublish fails', (t) => {
  return failingActionTest(t, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'unpublish',
  })
})

test('Entry archive', (t) => {
  return entityActionTest(t, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'archive',
  })
})

test('Entry archive fails', (t) => {
  return failingVersionActionTest(t, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'archive',
  })
})

test('Entry unarchive', (t) => {
  return entityActionTest(t, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'unarchive',
  })
})

test('Entry unarchive fails', (t) => {
  return failingActionTest(t, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'unarchive',
  })
})

test('Entry isPublished', (t) => {
  isPublishedTest(t, setup, { wrapperMethod: wrapEntry })
})

test('Entry isUpdated', (t) => {
  isUpdatedTest(t, setup, { wrapperMethod: wrapEntry })
})

test('Entry isDraft', (t) => {
  isDraftTest(t, setup, { wrapperMethod: wrapEntry })
})

test('Entry isArchived', (t) => {
  isArchivedTest(t, setup, { wrapperMethod: wrapEntry })
})

test('Entry getSnapshots fails', (t) => {
  return failingActionTest(t, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'getSnapshots',
  })
})

test('Entry getSnapshot fails', (t) => {
  return failingActionTest(t, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'getSnapshot',
  })
})

test('Entry getSnapshot', (t) => {
  return entityActionTest(t, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'getSnapshot',
  })
})

test('Entry getSnapshots', (t) => {
  return entityCollectionActionTest(t, setup, {
    wrapperMethod: wrapEntry,
    actionMethod: 'getSnapshots',
  })
})
