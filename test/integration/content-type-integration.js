import { expect } from 'chai'
import { before, after, describe, test } from 'mocha'
import { client, createTestSpace, generateRandomId } from '../helpers'

describe('ContentType Api', () => {
  let space
  let contentType

  before(async () => {
    space = await createTestSpace(client(), 'ContentType')
    contentType = await space.createContentType({ name: 'test-content-type' })
  })

  after(async () => {
    return space.delete()
  })

  describe('read', () => {
    test('Gets content type', async () => {
      return space.getContentType(contentType.sys.id).then((response) => {
        expect(response.sys, 'sys').to.be.ok
        expect(response.name, 'name').to.be.ok
        expect(response.fields, 'fields').to.be.ok
      })
    })

    test('Gets ContentType snapshots', async () => {
      return space.getContentType(contentType.sys.id).then((contentType) => {
        return contentType.getSnapshots().then((response) => {
          expect(response, 'contentType snapshots').to.be.ok
          expect(response.items, 'contentType snapshots items').to.be.ok
        })
      })
    })

    test('Gets content types', async () => {
      return space.getContentTypes().then((response) => {
        expect(response.items, 'items').to.be.ok
      })
    })
  })

  describe('write', function () {
    this.timeout(60000)

    test('Create, update, publish, getEditorInterface, unpublish and delete content type', async () => {
      return space.createContentType({ name: 'testentity' }).then((contentType) => {
        // create contentType
        expect(contentType.isDraft(), 'contentType is in draft').to.be.ok
        expect(contentType.sys.type).equals('ContentType', 'type')
        expect(contentType.name).equals('testentity', 'name')
        return contentType
          .publish() // publish
          .then((publishedContentType) => {
            expect(publishedContentType.isPublished(), 'contentType is published').to.be.ok
            publishedContentType.fields = [
              {
                id: 'field',
                name: 'field',
                type: 'Text',
              },
              {
                id: 'field2delete',
                name: 'field2delete',
                type: 'Text',
              },
            ]
            return publishedContentType
              .update() // update with fields
              .then((updatedContentType) => {
                expect(updatedContentType.isUpdated(), 'contentType is updated').to.be.ok
                expect(updatedContentType.fields[0].id).equals('field', 'field id')
                expect(updatedContentType.fields[1].id).equals('field2delete', 'field2delete id')
                return updatedContentType
                  .omitAndDeleteField('field2delete') // omit and delete field
                  .then((deletedFieldContentType) => {
                    expect(
                      deletedFieldContentType.fields.filter((field) => field.id === 'field2delete')
                    ).length(0, 'field should be deleted')
                    expect(
                      deletedFieldContentType.getEditorInterface,
                      'updatedContentType.getEditorInterface'
                    ).to.be.ok
                    return deletedFieldContentType
                      .publish() // publish changes
                      .then((publishedContentType) => {
                        return publishedContentType
                          .getEditorInterface() // get editorInterface
                          .then((editorInterface) => {
                            expect(editorInterface.controls, 'editor interface controls').to.be.ok
                            expect(editorInterface.sys, 'editor interface sys').to.be.ok
                            return editorInterface
                              .update() // update editor interface
                              .then(() => {
                                return updatedContentType
                                  .unpublish() // unpublish contentType
                                  .then((unpublishedContentType) => {
                                    expect(
                                      unpublishedContentType.isDraft(),
                                      'contentType is back in draft'
                                    ).to.be.ok
                                    return unpublishedContentType.delete() // delete contentType
                                  })
                              })
                          })
                      })
                  })
              })
          })
      })
    })

    test('Create with id and delete content type', async () => {
      const id = generateRandomId('testCT')
      return space.createContentTypeWithId(id, { name: 'testentitywithid' }).then((contentType) => {
        expect(contentType.sys.id).equals(id, 'specified id')
        expect(contentType.sys.type).equals('ContentType', 'type')
        expect(contentType.name).equals('testentitywithid', 'name')
        return contentType.delete()
      })
    })
  })
})
