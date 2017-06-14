/* global expect, test */
import generateRandomId from './generate-random-id'
import { getSpace } from './utils'

export function contentTypeReadOnlyTests (space) {
  test('Gets content type', () => {
    return space.getContentType('1t9IbcfdCk6m04uISSsaIK')
    .then((response) => {
      expect(response.sys).toBeTruthy()
      expect(response.name).toBeTruthy()
      expect(response.fields).toBeTruthy()
    })
  })

  test('Gets content types', (t) => {
    return space.getContentTypes()
    .then((response) => {
      expect(response.items).toBeTruthy()
    })
  })
}

export function contentTypeWriteTests (space) {
  test('Create, update, publish, getEditorInterface, unpublish and delete content type', (t) => {
    return getSpace()
      .then((space) => {
        return space.createContentType({name: 'testentity'})
          .then((contentType) => {
            expect(contentType.isDraft()).toBeTruthy()
            expect(contentType.sys.type).toBe('ContentType')
            expect(contentType.name).toBe('testentity')
            return contentType.publish()
              .then((publishedContentType) => {
                expect(publishedContentType.isPublished()).toBeTruthy()
                publishedContentType.fields = [
                  {id: 'field', name: 'field', type: 'Text'}
                ]
                return publishedContentType.update()
                  .then((updatedContentType) => {
                    expect(updatedContentType.isUpdated()).toBeTruthy()
                    expect(updatedContentType.fields[0].id).toBe('field')
                    expect(updatedContentType.getEditorInterface).toBeTruthy()
                    return updatedContentType.publish()
                      .then((publishedContentType) => {
                        return publishedContentType.getEditorInterface()
                          .then((editorInterface) => {
                            expect(editorInterface.controls).toBeTruthy()
                            expect(editorInterface.sys).toBeTruthy()
                            return editorInterface.update()
                              .then((editorInterface) => {
                                return updatedContentType.unpublish()
                                  .then((unpublishedContentType) => {
                                    expect(unpublishedContentType.isDraft()).toBeTruthy()
                                    return unpublishedContentType.delete()
                                  })
                              })
                          })
                      })
                  })
              })
          })
      })
  }, 10000)

  test('Create with id and delete content type', () => {
    const id = generateRandomId('testCT')
    return getSpace()
      .then((space) => {
        return space.createContentTypeWithId(id, {name: 'testentitywithid'})
          .then((contentType) => {
            expect(contentType.sys.id).toBe(id)
            expect(contentType.sys.type).toBe('ContentType')
            expect(contentType.name).toBe('testentitywithid')
            return contentType.delete()
          })
      })
  })
}
