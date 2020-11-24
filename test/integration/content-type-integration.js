import { expect } from 'chai'
import { before, after, describe, test } from 'mocha'
import {
  client,
  createTestEnvironment,
  createTestSpace,
  generateRandomId,
  getDefaultSpace,
} from '../helpers'

describe('ContentType Api', async function () {
  let readSpace
  let readEnvironment
  let readContentType
  let writeSpace
  let writeEnvironment

  before(async () => {
    readSpace = await getDefaultSpace()
    readEnvironment = await readSpace.getEnvironment('master')
    readContentType = await readEnvironment.createContentType({ name: 'test-content-type' })

    writeSpace = await createTestSpace(client(), 'ContentType')
    writeEnvironment = await createTestEnvironment(writeSpace, 'Testing Environment')
  })

  after(async () => {
    if (writeSpace) {
      return writeSpace.delete()
    }
  })

  describe('read', () => {
    test('Gets content type', async () => {
      return readEnvironment.getContentType(readContentType.sys.id).then((response) => {
        expect(response.sys, 'sys').to.be.ok
        expect(response.name, 'name').to.be.ok
        expect(response.fields, 'fields').to.be.ok
      })
    })

    //TODO: no snapshots available for just created contentType
    test('Gets ContentType snapshots', async () => {
      return readEnvironment.getContentType(readContentType.sys.id).then((contentType) => {
        return contentType.getSnapshots().then((response) => {
          expect(response, 'contentType snapshots').to.be.ok
          expect(response.items, 'contentType snapshots items').to.be.ok
        })
      })
    })

    test('Gets content types', async () => {
      return readEnvironment.getContentTypes().then((response) => {
        expect(response.items, 'items').to.be.ok
      })
    })
  })

  describe('write', function () {
    test('Create, update, publish, getEditorInterface, unpublish and delete content type', async () => {
      return writeEnvironment.createContentType({ name: 'testentity' }).then((contentType) => {
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
      return writeEnvironment
        .createContentTypeWithId(id, { name: 'testentitywithid' })
        .then((contentType) => {
          expect(contentType.sys.id).equals(id, 'specified id')
          expect(contentType.sys.type).equals('ContentType', 'type')
          expect(contentType.name).equals('testentitywithid', 'name')
          return contentType.delete()
        })
    })
  })
})
