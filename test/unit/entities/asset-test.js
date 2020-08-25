import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import { wrapAsset, wrapAssetCollection } from '../../../lib/entities/asset'
import {
  entityActionTest,
  entityCollectionWrappedTest,
  entityDeleteTest,
  entityPublishTest,
  entityUpdateTest,
  entityWrappedTest,
  failingActionTest,
  failingVersionActionTest,
  isArchivedTest,
  isDraftTest,
  isPublishedTest,
  isUpdatedTest,
} from '../test-creators/instance-entity-methods'
import { describe, test } from 'mocha'
import { expect } from 'chai'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('asset'),
  }
}

describe('Entity Asset', () => {
  test('Asset is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapAsset,
    })
  })

  test('Asset collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapAssetCollection,
    })
  })

  test('Asset update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapAsset,
    })
  })

  test('Asset update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapAsset,
      actionMethod: 'update',
    })
  })

  test('Asset update with tags works', async () => {
    const { httpMock } = setup()
    const entityMock = cloneMock('assetWithTags')
    entityMock.sys.version = 2
    const entity = wrapAsset(httpMock, entityMock)
    entity.metadata.tags[0] = {
      name: 'newname',
      sys: entityMock.metadata.tags[0].sys,
    }
    return entity.update().then((response) => {
      expect(response.toPlainObject, 'response is wrapped').to.be.ok
      expect(httpMock.put.args[0][1].metadata.tags[0].name).equals('newname', 'metadata is sent')
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
  })

  test('Asset delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapAsset,
    })
  })

  test('Asset delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapAsset,
      actionMethod: 'delete',
    })
  })

  test('Asset publish', async () => {
    return entityPublishTest(setup, {
      wrapperMethod: wrapAsset,
    })
  })

  test('Asset publish fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapAsset,
      actionMethod: 'publish',
    })
  })

  test('Asset unpublish', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapAsset,
      actionMethod: 'unpublish',
    })
  })

  test('Asset unpublish fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapAsset,
      actionMethod: 'unpublish',
    })
  })

  test('Asset archive', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapAsset,
      actionMethod: 'archive',
    })
  })

  test('Asset archive fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapAsset,
      actionMethod: 'archive',
    })
  })

  test('Asset unarchive', async () => {
    return entityActionTest(setup, {
      wrapperMethod: wrapAsset,
      actionMethod: 'unarchive',
    })
  })

  test('Asset unarchive fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapAsset,
      actionMethod: 'unarchive',
    })
  })

  test('Asset isPublished', async () => {
    return isPublishedTest(setup, { wrapperMethod: wrapAsset })
  })

  test('Asset isUpdated', async () => {
    return isUpdatedTest(setup, { wrapperMethod: wrapAsset })
  })

  test('Asset isDraft', async () => {
    return isDraftTest(setup, { wrapperMethod: wrapAsset })
  })

  test('Asset isArchived', async () => {
    return isArchivedTest(setup, { wrapperMethod: wrapAsset })
  })

  test('Asset processing for one locale succeeds', async () => {
    const responseMock = cloneMock('asset')
    responseMock.fields = {
      file: {
        'en-US': {
          fileName: 'filename.jpg',
          url: 'http://server/filename.jpg',
        },
      },
    }
    const { httpMock, entityMock } = setup(Promise.resolve({ data: responseMock }))
    entityMock.sys.version = 2
    const entity = wrapAsset(httpMock, entityMock)
    return entity.processForLocale('en-US').then(() => {
      expect(httpMock.put.args[0][0]).equals(
        'assets/id/files/en-US/process',
        'correct locale is sent'
      )
      expect(httpMock.put.args[0][2].headers['X-Contentful-Version']).equals(
        2,
        'version header is sent'
      )
      expect(httpMock.get.args[0][0]).equals('assets/id', 'asset was checked after processing')
    })
  })

  /*
    - Test is failing
    - it also causes a memory leak in watch mode
   */
  test.skip('Asset processing for one locale fails due to timeout', async () => {
    const responseMock = cloneMock('asset')
    responseMock.fields = {
      file: { 'en-US': { fileName: 'filename.jpg' } }, // url property never sent in response
    }
    const { httpMock, entityMock } = setup(Promise.resolve({ data: responseMock }))
    entityMock.sys.version = 2
    const entity = wrapAsset(httpMock, entityMock)
    try {
      await entity.processForLocale('en-US')
    } catch (error) {
      expect(httpMock.get.callCount > 1, 'asset is checked multiple times').to.be.ok
      expect(error.name).equals('AssetProcessingTimeout', 'timeout is thrown')
    }
  })

  test('Asset processing for multiple locales succeeds', async () => {
    const responseMock = cloneMock('asset')
    responseMock.fields = {
      file: {
        'en-US': {
          fileName: 'filename.jpg',
          url: 'http://server/filename.jpg',
        },
        'de-DE': {
          fileName: 'filename.jpg',
          url: 'http://server/filename.jpg',
        },
      },
    }
    const { httpMock, entityMock } = setup(Promise.resolve({ data: responseMock }))
    entityMock.fields = {
      file: {
        'en-US': {
          fileName: 'filename.jpg',
          upload: 'http://server/filename.jpg',
        },
        'de-DE': {
          fileName: 'filename.jpg',
          upload: 'http://server/filename.jpg',
        },
      },
    }
    entityMock.sys.version = 2
    const entity = wrapAsset(httpMock, entityMock)
    return entity.processForAllLocales().then(() => {
      expect(httpMock.put.args[0][0]).equals(
        'assets/id/files/en-US/process',
        'en-US locale is sent'
      )
      expect(httpMock.put.args[1][0]).equals(
        'assets/id/files/de-DE/process',
        'de-DE locale is sent'
      )
      expect(httpMock.put.args[0][2].headers['X-Contentful-Version']).equals(
        2,
        'version header is sent for first locale'
      )
      expect(httpMock.put.args[1][2].headers['X-Contentful-Version']).equals(
        2,
        'version header is sent for second locale'
      )
      expect(httpMock.get.args[0][0]).equals(
        'assets/id',
        'asset was checked after processing for first locale'
      )
      expect(httpMock.get.args[1][0]).equals(
        'assets/id',
        'asset was checked after processing for second locale'
      )
    })
  })

  /*
    - Test is failing
    - it also causes a memory leak in watch mode
  */
  test.skip('Asset processing for multiple locales fails due to timeout', async () => {
    const responseMock = cloneMock('asset')
    responseMock.fields = {
      file: {
        'en-US': { fileName: 'filename.jpg' }, // url property never sent
        'de-DE': { fileName: 'filename.jpg' }, // url property never sent
      },
    }
    const { httpMock, entityMock } = setup(Promise.resolve({ data: responseMock }))
    entityMock.fields = {
      file: {
        'en-US': {
          fileName: 'filename.jpg',
          upload: 'http://server/filename.jpg',
        },
        'de-DE': {
          fileName: 'filename.jpg',
          upload: 'http://server/filename.jpg',
        },
      },
    }
    entityMock.sys.version = 2
    const entity = wrapAsset(httpMock, entityMock)
    return entity.processForAllLocales().catch((error) => {
      expect(httpMock.get.callCount > 1, 'asset is checked multiple times').to.be.ok
      expect(error.name).equals('AssetProcessingTimeout', 'timeout is thrown')
    })
  })
})
