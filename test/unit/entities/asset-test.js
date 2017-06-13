/* global test, expect, jest */

import { Promise } from 'es6-promise'
import {cloneMock} from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import {wrapAsset, wrapAssetCollection} from '../../../lib/entities/asset'
import {
  entityWrappedTest,
  entityCollectionWrappedTest,
  entityUpdateTest,
  entityDeleteTest,
  entityPublishTest,
  entityActionTest,
  failingActionTest,
  failingVersionActionTest,
  isPublishedTest,
  isUpdatedTest,
  isDraftTest,
  isArchivedTest
} from '../test-creators/instance-entity-methods'

function setup (promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('asset')
  }
}

test('Asset is wrapped', () => {
  entityWrappedTest(jest, setup, {
    wrapperMethod: wrapAsset
  })
})

test('Asset collection is wrapped', () => {
  return entityCollectionWrappedTest(jest, setup, {
    wrapperMethod: wrapAssetCollection
  })
})

test('Asset update', () => {
  return entityUpdateTest(jest, setup, {
    wrapperMethod: wrapAsset
  })
})

test('Asset update fails', () => {
  return failingVersionActionTest(jest, setup, {
    wrapperMethod: wrapAsset,
    actionMethod: 'update'
  })
})

test('Asset delete', () => {
  return entityDeleteTest(jest, setup, {
    wrapperMethod: wrapAsset
  })
})

test('Asset delete fails', () => {
  return failingActionTest(jest, setup, {
    wrapperMethod: wrapAsset,
    actionMethod: 'delete'
  })
})

test('Asset publish', () => {
  return entityPublishTest(jest, setup, {
    wrapperMethod: wrapAsset
  })
})

test('Asset publish fails', () => {
  return failingVersionActionTest(jest, setup, {
    wrapperMethod: wrapAsset,
    actionMethod: 'publish'
  })
})

test('Asset unpublish', () => {
  return entityActionTest(jest, setup, {
    wrapperMethod: wrapAsset,
    actionMethod: 'unpublish'
  })
})

test('Asset unpublish fails', () => {
  return failingActionTest(jest, setup, {
    wrapperMethod: wrapAsset,
    actionMethod: 'unpublish'
  })
})

test('Asset archive', () => {
  return entityActionTest(jest, setup, {
    wrapperMethod: wrapAsset,
    actionMethod: 'archive'
  })
})

test('Asset archive fails', () => {
  return failingVersionActionTest(jest, setup, {
    wrapperMethod: wrapAsset,
    actionMethod: 'archive'
  })
})

test('Asset unarchive', () => {
  return entityActionTest(jest, setup, {
    wrapperMethod: wrapAsset,
    actionMethod: 'unarchive'
  })
})

test('Asset unarchive fails', () => {
  return failingActionTest(jest, setup, {
    wrapperMethod: wrapAsset,
    actionMethod: 'unarchive'
  })
})

test('Asset isPublished', () => {
  isPublishedTest(jest, setup, {wrapperMethod: wrapAsset})
})

test('Asset isUpdated', () => {
  isUpdatedTest(jest, setup, {wrapperMethod: wrapAsset})
})

test('Asset isDraft', () => {
  isDraftTest(jest, setup, {wrapperMethod: wrapAsset})
})

test('Asset isArchived', () => {
  isArchivedTest(jest, setup, {wrapperMethod: wrapAsset})
})

test('Asset processing for one locale succeeds', () => {
  expect.assertions(3)
  const responseMock = cloneMock('asset')
  responseMock.fields = {
    file: {'en-US': {fileName: 'filename.jpg', url: 'http://server/filename.jpg'}}
  }
  const {httpMock, entityMock} = setup(Promise.resolve({data: responseMock}))
  entityMock.sys.version = 2
  const entity = wrapAsset(httpMock, entityMock)
  return entity.processForLocale('en-US')
  .then((response) => {
    expect(httpMock.put.calls[0][0]).toBe('assets/id/files/en-US/process')
    expect(httpMock.put.calls[0][2].headers['X-Contentful-Version']).toBe(2)
    expect(httpMock.get.calls[0][0]).toBe('assets/id')
  })
})

test('Asset processing for one locale fails due to timeout', () => {
  expect.assertions(2)
  const responseMock = cloneMock('asset')
  responseMock.fields = {
    file: {'en-US': {fileName: 'filename.jpg'}} // url property never sent in response
  }
  const {httpMock, entityMock} = setup(Promise.resolve({data: responseMock}))
  entityMock.sys.version = 2
  const entity = wrapAsset(httpMock, entityMock)
  return entity.processForLocale('en-US')
  .catch((error) => {
    expect(httpMock.get.callCount > 1).toBeTruthy()
    expect(error.name).toBe('AssetProcessingTimeout')
  })
})

test('Asset processing for multiple locales succeeds', () => {
  expect.assertions(6)
  const responseMock = cloneMock('asset')
  responseMock.fields = {
    file: {
      'en-US': {fileName: 'filename.jpg', url: 'http://server/filename.jpg'},
      'de-DE': {fileName: 'filename.jpg', url: 'http://server/filename.jpg'}
    }
  }
  const {httpMock, entityMock} = setup(Promise.resolve({data: responseMock}))
  entityMock.fields = {
    file: {
      'en-US': {fileName: 'filename.jpg', upload: 'http://server/filename.jpg'},
      'de-DE': {fileName: 'filename.jpg', upload: 'http://server/filename.jpg'}
    }
  }
  entityMock.sys.version = 2
  const entity = wrapAsset(httpMock, entityMock)
  return entity.processForAllLocales()
  .then((response) => {
    expect(httpMock.put.calls[0][0]).toBe('assets/id/files/en-US/process')
    expect(httpMock.put.calls[1][0]).toBe('assets/id/files/de-DE/process')
    expect(httpMock.put.calls[0][2].headers['X-Contentful-Version']).toBe(2)
    expect(httpMock.put.calls[1][2].headers['X-Contentful-Version']).toBe(2)
    expect(httpMock.get.calls[0][0]).toBe('assets/id')
    expect(httpMock.get.calls[1][0]).toBe('assets/id')
  })
})

test('Asset processing for multiple locales fails due to timeout', () => {
  expect.assertions(2)
  const responseMock = cloneMock('asset')
  responseMock.fields = {
    file: {
      'en-US': {fileName: 'filename.jpg'}, // url property never sent
      'de-DE': {fileName: 'filename.jpg'} // url property never sent
    }
  }
  const {httpMock, entityMock} = setup(Promise.resolve({data: responseMock}))
  entityMock.fields = {
    file: {
      'en-US': {fileName: 'filename.jpg', upload: 'http://server/filename.jpg'},
      'de-DE': {fileName: 'filename.jpg', upload: 'http://server/filename.jpg'}
    }
  }
  entityMock.sys.version = 2
  const entity = wrapAsset(httpMock, entityMock)
  return entity.processForAllLocales()
  .catch((error) => {
    expect(httpMock.get.callCount > 1).toBeTruthy()
    expect(error.name).toBe('AssetProcessingTimeout')
  })
})
