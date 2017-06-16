/* global test, expect */

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
  entityWrappedTest(setup, {
    wrapperMethod: wrapAsset
  })
})

test('Asset collection is wrapped', () => {
  return entityCollectionWrappedTest(setup, {
    wrapperMethod: wrapAssetCollection
  })
})

test('Asset update', () => {
  return entityUpdateTest(setup, {
    wrapperMethod: wrapAsset
  })
})

test('Asset update fails', () => {
  return failingVersionActionTest(setup, {
    wrapperMethod: wrapAsset,
    actionMethod: 'update'
  })
})

test('Asset delete', () => {
  return entityDeleteTest(setup, {
    wrapperMethod: wrapAsset
  })
})

test('Asset delete fails', () => {
  return failingActionTest(setup, {
    wrapperMethod: wrapAsset,
    actionMethod: 'delete'
  })
})

test('Asset publish', () => {
  return entityPublishTest(setup, {
    wrapperMethod: wrapAsset
  })
})

test('Asset publish fails', () => {
  return failingVersionActionTest(setup, {
    wrapperMethod: wrapAsset,
    actionMethod: 'publish'
  })
})

test('Asset unpublish', () => {
  return entityActionTest(setup, {
    wrapperMethod: wrapAsset,
    actionMethod: 'unpublish'
  })
})

test('Asset unpublish fails', () => {
  return failingActionTest(setup, {
    wrapperMethod: wrapAsset,
    actionMethod: 'unpublish'
  })
})

test('Asset archive', () => {
  return entityActionTest(setup, {
    wrapperMethod: wrapAsset,
    actionMethod: 'archive'
  })
})

test('Asset archive fails', () => {
  return failingVersionActionTest(setup, {
    wrapperMethod: wrapAsset,
    actionMethod: 'archive'
  })
})

test('Asset unarchive', () => {
  return entityActionTest(setup, {
    wrapperMethod: wrapAsset,
    actionMethod: 'unarchive'
  })
})

test('Asset unarchive fails', () => {
  return failingActionTest(setup, {
    wrapperMethod: wrapAsset,
    actionMethod: 'unarchive'
  })
})

test('Asset isPublished', () => {
  isPublishedTest(setup, {wrapperMethod: wrapAsset})
})

test('Asset isUpdated', () => {
  isUpdatedTest(setup, {wrapperMethod: wrapAsset})
})

test('Asset isDraft', () => {
  isDraftTest(setup, {wrapperMethod: wrapAsset})
})

test('Asset isArchived', () => {
  isArchivedTest(setup, {wrapperMethod: wrapAsset})
})

test('Asset processing for one locale succeeds', () => {
  const responseMock = cloneMock('asset')
  responseMock.fields = {
    file: {'en-US': {fileName: 'filename.jpg', url: 'http://server/filename.jpg'}}
  }
  const {httpMock, entityMock} = setup(Promise.resolve({data: responseMock}))
  entityMock.sys.version = 2
  const entity = wrapAsset(httpMock, entityMock)
  return entity.processForLocale('en-US')
  .then((response) => {
    expect(httpMock.put.mock.calls[0][0]).toBe('assets/id/files/en-US/process')
    expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).toBe(2)
    expect(httpMock.get.mock.calls[0][0]).toBe('assets/id')
  })
})

test('Asset processing for one locale fails due to timeout', () => {
  const responseMock = cloneMock('asset')
  responseMock.fields = {
    file: {'en-US': {fileName: 'filename.jpg'}} // url property never sent in response
  }
  const {httpMock, entityMock} = setup(Promise.resolve({data: responseMock}))
  entityMock.sys.version = 2
  const entity = wrapAsset(httpMock, entityMock)
  return entity.processForLocale('en-US')
  .catch((error) => {
    expect(httpMock.get.mock.calls.length > 1).toBeTruthy()
    expect(error.name).toBe('AssetProcessingTimeout')
  })
}, 30000)

test('Asset processing for multiple locales succeeds', () => {
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
    expect(httpMock.put.mock.calls[0][0]).toBe('assets/id/files/en-US/process')
    expect(httpMock.put.mock.calls[1][0]).toBe('assets/id/files/de-DE/process')
    expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).toBe(2)
    expect(httpMock.put.mock.calls[1][2].headers['X-Contentful-Version']).toBe(2)
    expect(httpMock.get.mock.calls[0][0]).toBe('assets/id')
    expect(httpMock.get.mock.calls[1][0]).toBe('assets/id')
  })
})

test('Asset processing for multiple locales fails due to timeout', () => {
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
    expect(httpMock.get.mock.calls.length > 1).toBeTruthy()
    expect(error.name).toBe('AssetProcessingTimeout')
  })
}, 30000)
