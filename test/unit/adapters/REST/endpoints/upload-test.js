import { describe, test } from 'mocha'
import { cloneMock } from '../../../mocks/entities'
import { expect } from 'chai'
import setupRestAdapter from '../helpers/setupRestAdapter'

function setup(promise, params = {}) {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock('upload'),
  }
}

describe('Rest Upload', async () => {
  test('API call createUpload', async () => {
    const { adapterMock, httpMock } = setup(Promise.resolve({}))

    return adapterMock
      .makeRequest({
        entityType: 'Upload',
        action: 'create',
        params: {
          spaceId: 'id',
        },
        payload: {
          contentType: 'image/svg',
          fileName: 'filename.svg',
          file: '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>',
        },
      })
      .then(() => {
        expect(httpMock.post.args[0][0]).equals('/spaces/id/uploads')
        expect(httpMock.post.args[0][2].headers['Content-Type']).equals('application/octet-stream')
        expect(httpMock.post.args[0][1]).equals(
          '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>',
          'uploads file to upload endpoint'
        )
      })
  })

  test('API call createUpload defaults the content type to octet-stream', async () => {
    const { adapterMock, httpMock } = setup(Promise.resolve({}))

    return adapterMock
      .makeRequest({
        entityType: 'Upload',
        action: 'create',
        params: { spaceId: 'id' },
        payload: {
          // no contentType set here
          fileName: 'filename.svg',
          file: '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>',
        },
      })
      .then(() => {
        expect(httpMock.post.args[0][2].headers['Content-Type']).equals('application/octet-stream')
        expect(httpMock.post.args[0][1]).equals(
          '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>',
          'uploads file to upload endpoint'
        )
      })
  })
})
