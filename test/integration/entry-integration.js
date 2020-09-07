import { expect } from 'chai'
import { after, afterEach, beforeEach, before, describe, test } from 'mocha'
import { client, createTestSpace, generateRandomId } from '../helpers'

describe('Entry Api', () => {
  describe('read', () => {
    let space
    before(async () => {
      space = await client().getSpace('ezs1swce23xe')
    })

    test('Gets entry', async () => {
      return space.getEntry('5ETMRzkl9KM4omyMwKAOki').then((response) => {
        expect(response.sys, 'sys').to.be.ok
        expect(response.fields, 'fields').to.be.ok
      })
    })

    test('Gets Entry snapshots', async () => {
      return space.getEntry('5ETMRzkl9KM4omyMwKAOki').then((entry) => {
        return entry.getSnapshots().then((response) => {
          expect(response, 'entry snapshots').ok
          expect(response.items, 'entry snapshots items').ok
        })
      })
    })

    test('Gets entries', async () => {
      return space.getEntries().then((response) => {
        expect(response.items, 'items').ok
      })
    })

    test('Gets entries with a limit parameter', async () => {
      return space
        .getEntries({
          limit: 2,
        })
        .then((response) => {
          expect(response.items, 'items').ok
          expect(response.items).lengthOf(2)
        })
    })

    test('Gets entries with a skip parameter', async () => {
      return space
        .getEntries({
          skip: 2,
        })
        .then((response) => {
          expect(response.items, 'items').ok
          expect(response.skip).eql(2)
        })
    })

    test('Gets entries with content type query param', async () => {
      return space.getEntries({ content_type: 'cat' }).then((response) => {
        expect(response.total).eql(3)
        expect(response.items.map((item) => item.sys.contentType.sys.id)).eql(['cat', 'cat', 'cat'])
      })
    })

    test('Gets entries with equality query', async () => {
      return space.getEntries({ 'sys.id': 'nyancat' }).then((response) => {
        expect(response.total).equal(1)
        expect(response.items[0].sys.id).equal('nyancat')
      })
    })

    test('Gets entries with inequality query', async () => {
      return space.getEntries({ 'sys.id[ne]': 'nyancat' }).then((response) => {
        expect(response.total > 0).ok
        expect(response.items.filter((item) => item.sys.id === 'nyancat').length).equal(0)
      })
    })

    test('Gets entries with array equality query', async () => {
      return space
        .getEntries({
          content_type: 'cat',
          'fields.likes': 'lasagna',
        })
        .then((response) => {
          expect(response.total).equal(1)
          expect(response.items[0].fields.likes['en-US'].filter((i) => i === 'lasagna')).lengthOf(1)
        })
    })

    test('Gets entries with array inequality query', async () => {
      return space
        .getEntries({
          content_type: 'cat',
          'fields.likes[ne]': 'lasagna',
        })
        .then((response) => {
          expect(response.total > 0).ok
          expect(response.items[0].fields.likes['en-US'].filter((i) => i === 'lasagna')).lengthOf(0)
        })
    })

    test('Gets entries with inclusion query', async () => {
      return space.getEntries({ 'sys.id[in]': 'finn,jake' }).then((response) => {
        expect(response.total).equal(2)
        expect(response.items.filter((item) => item.sys.id === 'finn').length).equal(1)
        expect(response.items.filter((item) => item.sys.id === 'jake').length).equal(1)
      })
    })

    test('Gets entries with exclusion query', async () => {
      return space
        .getEntries({
          content_type: 'cat',
          'fields.likes[nin]': 'rainbows,lasagna',
        })
        .then((response) => {
          expect(response.total > 0).ok
          expect(
            response.items[0].fields.likes['en-US'].filter((i) => i === 'lasagna').length
          ).equal(0)
          expect(
            response.items[0].fields.likes['en-US'].filter((i) => i === 'rainbows').length
          ).equal(0)
        })
    })

    test('Gets entries with exists query', async () => {
      return space
        .getEntries({
          content_type: 'cat',
          'fields.likes[exists]': 'true',
        })
        .then((response) => {
          expect(response.items.map((item) => item.fields.likes).length).equal(response.total)
        })
    })

    test('Gets entries with inverse exists query', async () => {
      return space
        .getEntries({
          content_type: 'cat',
          'fields.likes[exists]': 'false',
        })
        .then((response) => {
          expect(response.items.map((item) => item.fields.likes).length).equal(0)
        })
    })

    test('Gets entries with field link query', async () => {
      return space
        .getEntries({
          content_type: 'cat',
          'fields.bestFriend.sys.id': 'happycat',
        })
        .then((response) => {
          expect(response.items[0].sys.id).equal(
            'nyancat',
            'returned entry has link to specified linked entry'
          )
        })
    })

    test('Gets entries with gte range query', async () => {
      return space
        .getEntries({
          'sys.updatedAt[gte]': '2013-01-01T00:00:00Z',
        })
        .then((response) => {
          expect(response.total > 0).ok
        })
    })

    test('Gets entries with lte range query', async () => {
      return space
        .getEntries({
          'sys.updatedAt[lte]': '2013-01-01T00:00:00Z',
        })
        .then((response) => {
          expect(response.total).equal(0)
        })
    })

    test('Gets entries with full text search query', async () => {
      return space
        .getEntries({
          query: 'bacon',
        })
        .then((response) => {
          expect(response.items[0].fields.description['en-US'].match(/bacon/)).ok
        })
    })

    test('Gets entries with full text search query on field', async () => {
      return space
        .getEntries({
          content_type: 'dog',
          'fields.description[match]': 'bacon pancakes',
        })
        .then((response) => {
          expect(response.items[0].fields.description['en-US'].match(/bacon/)).ok
        })
    })

    test('Gets entries with location proximity search', async () => {
      return space
        .getEntries({
          content_type: '1t9IbcfdCk6m04uISSsaIK',
          'fields.center[near]': '38,-122',
        })
        .then((response) => {
          expect(response.items[0].fields.center['en-US'].lat, 'has latitude').ok
          expect(response.items[0].fields.center['en-US'].lon, 'has longitude').ok
        })
    })

    test('Gets entries with location in bounding object', async () => {
      return space
        .getEntries({
          content_type: '1t9IbcfdCk6m04uISSsaIK',
          'fields.center[within]': '40,-124,36,-120',
        })
        .then((response) => {
          expect(response.items[0].fields.center['en-US'].lat, 'has latitude').ok
          expect(response.items[0].fields.center['en-US'].lon, 'has longitude').ok
        })
    })

    test('Gets entries by creation order', async () => {
      return space
        .getEntries({
          order: 'sys.createdAt',
        })
        .then((response) => {
          expect(response.items[0].sys.createdAt < response.items[1].sys.createdAt).ok
        })
    })

    test('Gets entries by inverse creation order', async () => {
      return space
        .getEntries({
          order: '-sys.createdAt',
        })
        .then((response) => {
          expect(response.items[0].sys.createdAt > response.items[1].sys.createdAt).ok
        })
    })

    /**
     * This test checks if entries can be ordered by two properties. The first
     * property (in this case content type id) takes priority. The test checks if two
     * entries with the same content type are ordered by the second property, id.
     * It also checks if the entry which comes before these has a lower id.
     *
     * It's a slightly fragile test as it can break if entries are added or deleted
     * from the space.
     */
    test('Gets entries by creation order and id order', async () => {
      return space
        .getEntries({
          order: 'sys.contentType.sys.id,sys.id',
        })
        .then((response) => {
          const contentTypeOrder = response.items
            .map((item) => item.sys.contentType.sys.id)
            .filter((value, index, self) => self.indexOf(value) === index)
          expect(contentTypeOrder).eql(['1t9IbcfdCk6m04uISSsaIK', 'cat', 'dog', 'human'], 'orders')
          expect(
            response.items[0].sys.id < response.items[1].sys.id,
            'id of entry with index 1 is higher than the one of index 0 since they share content type'
          ).ok
        })
    })
  })

  describe('write', function () {
    this.timeout(60000)

    let space
    let contentType

    before(async () => {
      space = await createTestSpace(client(), 'Entry')
    })

    after(async () => {
      return space.delete()
    })

    beforeEach(async () => {
      contentType = await space.createContentTypeWithId(generateRandomId('test-content-type'), {
        name: 'testCT',
        fields: [
          {
            id: 'title',
            name: 'Title',
            type: 'Text',
          },
        ],
      })
      await contentType.publish()
    })

    afterEach(async () => {
      return contentType
        .unpublish()
        .then((unpublishedContentType) => unpublishedContentType.delete())
    })

    test('Create, update, publish, unpublish, archive, unarchive and delete entry', async () => {
      return space
        .createEntry(contentType.sys.id, { fields: { title: { 'en-US': 'this is the title' } } })
        .then((entry) => {
          expect(entry.isDraft(), 'entry is in draft').ok
          expect(entry.fields.title['en-US']).equals('this is the title', 'original title')
          return entry.publish().then((publishedEntry) => {
            expect(publishedEntry.isPublished(), 'entry is published').ok
            publishedEntry.fields.title['en-US'] = 'title has changed'
            return publishedEntry.update().then((updatedEntry) => {
              expect(updatedEntry.isUpdated(), 'entry is updated').ok
              expect(updatedEntry.fields.title['en-US']).equals(
                'title has changed',
                'updated title'
              )
              return updatedEntry.unpublish().then((unpublishedEntry) => {
                expect(unpublishedEntry.isDraft(), 'entry is back in draft').ok
                return unpublishedEntry.archive().then((archivedEntry) => {
                  expect(archivedEntry.isArchived(), 'entry is archived').ok
                  return archivedEntry.unarchive().then((unarchivedEntry) => {
                    expect(unarchivedEntry.isArchived(), 'entry is not archived anymore').not.ok
                    expect(unarchivedEntry.isDraft(), 'entry is back in draft').ok
                    return unarchivedEntry.delete()
                  })
                })
              })
            })
          })
        })
    })

    test('Create with id and delete entry', async () => {
      return space
        .createEntryWithId(contentType.sys.id, 'entryid', {
          fields: { title: { 'en-US': 'this is the title' } },
        })
        .then((entry) => {
          expect(entry.fields.title['en-US']).equals('this is the title', 'original title')
          return entry.delete()
        })
    })
  })
})
