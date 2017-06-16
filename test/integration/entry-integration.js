/* global test, expect */
import filter from 'lodash/filter'
import map from 'lodash/map'
import generateRandomId from './generate-random-id'
import { getSpace } from './utils'

export function entryReadOnlyTests (space) {
  test('Gets entry', (t) => {
    return space.getEntry('5ETMRzkl9KM4omyMwKAOki')
    .then((response) => {
      expect(response.sys).toBeTruthy()
      expect(response.fields).toBeTruthy()
    })
  })

  test('Gets entries', (t) => {
    return space.getEntries()
    .then((response) => {
      expect(response.items).toBeTruthy()
    })
  })

  test('Gets entries with a limit parameter', () => {
    return space.getEntries({
      limit: 2
    })
    .then((response) => {
      expect(response.items).toBeTruthy()
      expect(response.items.length).toBe(2)
    })
  })

  test('Gets entries with a skip parameter', () => {
    return space.getEntries({
      skip: 2
    })
      .then((response) => {
        expect(response.items).toBeTruthy()
        expect(response.skip).toBe(2)
      })
  })

  test('Gets entries with content type query param', () => {
    return space.getEntries({content_type: 'cat'})
    .then((response) => {
      expect(response.total).toBe(3)
      expect(map(response.items, 'sys.contentType.sys.id')).toEqual(['cat', 'cat', 'cat'])
    })
  })

  test('Gets entries with equality query', () => {
    return space.getEntries({'sys.id': 'nyancat'})
    .then((response) => {
      expect(response.total).toBe(1)
      expect(response.items[0].sys.id).toBe('nyancat')
    })
  })

  test('Gets entries with inequality query', () => {
    return space.getEntries({'sys.id[ne]': 'nyancat'})
    .then((response) => {
      expect(response.total > 0).toBeTruthy()
      expect(filter(response.items, ['sys.id', 'nyancat']).length).toBe(0)
    })
  })

  test('Gets entries with array equality query', () => {
    return space.getEntries({
      content_type: 'cat',
      'fields.likes': 'lasagna'
    })
    .then((response) => {
      expect(response.total).toBe(1)
      expect(filter(response.items[0].fields.likes['en-US'], (i) => i === 'lasagna').length).toBe(1)
    })
  })

  test('Gets entries with array inequality query', () => {
    return space.getEntries({
      content_type: 'cat',
      'fields.likes[ne]': 'lasagna'
    })
    .then((response) => {
      expect(response.total > 0).toBeTruthy()
      expect(filter(response.items[0].fields.likes['en-US'], (i) => i === 'lasagna').length).toBe(0)
    })
  })

  test('Gets entries with inclusion query', () => {
    return space.getEntries({'sys.id[in]': 'finn,jake'})
    .then((response) => {
      expect(response.total).toBe(2)
      expect(filter(response.items, ['sys.id', 'finn']).length).toBe(1)
      expect(filter(response.items, ['sys.id', 'jake']).length).toBe(1)
    })
  })

  test('Gets entries with exclusion query', () => {
    return space.getEntries({
      content_type: 'cat',
      'fields.likes[nin]': 'rainbows,lasagna'
    })
    .then((response) => {
      expect(response.total > 0).toBeTruthy()
      expect(filter(response.items[0].fields.likes['en-US'], (i) => i === 'lasagna').length).toBe(0)
      expect(filter(response.items[0].fields.likes['en-US'], (i) => i === 'rainbows').length).toBe(0)
    })
  })

  test('Gets entries with exists query', () => {
    return space.getEntries({
      content_type: 'cat',
      'fields.likes[exists]': 'true'
    })
    .then((response) => {
      expect(map(response.items, 'fields.likes').length).toBe(response.total)
    })
  })

  test('Gets entries with inverse exists query', (xt) => {
    return space.getEntries({
      content_type: 'cat',
      'fields.likes[exists]': 'false'
    })
    .then((response) => {
      expect(map(response.items, 'fields.likes').length).toBe(0)
    })
  })

  test('Gets entries with field link query', () => {
    return space.getEntries({
      content_type: 'cat',
      'fields.bestFriend.sys.id': 'happycat'
    })
    .then((response) => {
      expect(response.items[0].sys.id).toBe('nyancat')
    })
  })

  test('Gets entries with gte range query', () => {
    return space.getEntries({
      'sys.updatedAt[gte]': '2013-01-01T00:00:00Z'
    })
    .then((response) => {
      expect(response.total > 0).toBeTruthy()
    })
  })

  test('Gets entries with lte range query', () => {
    return space.getEntries({
      'sys.updatedAt[lte]': '2013-01-01T00:00:00Z'
    })
    .then((response) => {
      expect(response.total).toBe(0)
    })
  })

  test('Gets entries with full text search query', () => {
    return space.getEntries({
      query: 'bacon'
    })
    .then((response) => {
      expect(response.items[0].fields.description['en-US'].match(/bacon/)).toBeTruthy()
    })
  })

  test('Gets entries with full text search query on field', () => {
    return space.getEntries({
      content_type: 'dog',
      'fields.description[match]': 'bacon pancakes'
    })
    .then((response) => {
      expect(response.items[0].fields.description['en-US'].match(/bacon/)).toBeTruthy()
    })
  })

  test('Gets entries with location proximity search', () => {
    return space.getEntries({
      content_type: '1t9IbcfdCk6m04uISSsaIK',
      'fields.center[near]': '38,-122'
    })
    .then((response) => {
      expect(response.items[0].fields.center['en-US'].lat).toBeTruthy()
      expect(response.items[0].fields.center['en-US'].lon).toBeTruthy()
    })
  })

  test('Gets entries with location in bounding object', () => {
    return space.getEntries({
      content_type: '1t9IbcfdCk6m04uISSsaIK',
      'fields.center[within]': '40,-124,36,-120'
    })
    .then((response) => {
      expect(response.items[0].fields.center['en-US'].lat).toBeTruthy()
      expect(response.items[0].fields.center['en-US'].lon).toBeTruthy()
    })
  })

  test('Gets entries by creation order', () => {
    return space.getEntries({
      order: 'sys.createdAt'
    })
    .then((response) => {
      expect(response.items[0].sys.createdAt < response.items[1].sys.createdAt).toBeTruthy()
    })
  })

  test('Gets entries by inverse creation order', () => {
    return space.getEntries({
      order: '-sys.createdAt'
    })
    .then((response) => {
      expect(response.items[0].sys.createdAt > response.items[1].sys.createdAt).toBeTruthy()
    })
  })

  /**
   * This test checks if entries can be ordered by two properties. The first
   * property (in this case version) takes priority. The test checks if two
   * entries with the same version are ordered by the second property, id.
   * It also checks if the entry which comes before these two has a lower version.
   *
   * It's a slightly fragile test as it can break if any of the entries are
   * updated and republished.
   */
  test('Gets entries by creation order and id order', () => {
    return space.getEntries({
      order: 'sys.version,sys.id'
    })
    .then((response) => {
      expect(response.items[3].sys.version < response.items[4].sys.version).toBeTruthy()
      expect(response.items[4].sys.version).toBe(response.items[5].sys.version)
      expect(response.items[4].sys.version).toBe(11)
      expect(response.items[5].sys.version).toBe(11)
      expect(response.items[4].sys.id < response.items[5].sys.id).toBeTruthy()
    })
  })
}

export function entryWriteTests () {
  function prepareContentTypeForEntryTest (space) {
    return space.createContentTypeWithId(generateRandomId('testcontenttype'), {name: 'testCT',
      fields: [
        {id: 'title', name: 'Title', type: 'Text'}
      ]})
    .then((contentType) => contentType.publish(), (err) => console.log(err))
  }

  function teardownContentTypeForEntryTest (contentType) {
    return new Promise((resolve, reject) => setTimeout(() => {
      contentType.unpublish()
      .then((unpublishedContentType) => unpublishedContentType.delete())
      .then(resolve, reject)
    }, 2000))
  }

  test('Create, update, publish, unpublish, archive, unarchive and delete entry', () => {
    getSpace()
      .then((space) => {
        return prepareContentTypeForEntryTest(space)
          .then((contentType) => {
            return space.createEntry(contentType.sys.id, {fields: {title: {'en-US': 'this is the title'}}})
              .then((entry) => {
                expect(entry.isDraft()).toBeTruthy()
                expect(entry.fields.title['en-US']).toBe('this is the title')
                return entry.publish()
                  .then((publishedEntry) => {
                    expect(publishedEntry.isPublished()).toBeTruthy()
                    publishedEntry.fields.title['en-US'] = 'title has changed'
                    return publishedEntry.update()
                      .then((updatedEntry) => {
                        expect(updatedEntry.isUpdated()).toBeTruthy()
                        expect(updatedEntry.fields.title['en-US']).toBe('title has changed')
                        return updatedEntry.unpublish()
                          .then((unpublishedEntry) => {
                            expect(unpublishedEntry.isDraft()).toBeTruthy()
                            return unpublishedEntry.archive()
                              .then((archivedEntry) => {
                                expect(archivedEntry.isArchived()).toBeTruthy()
                                return archivedEntry.unarchive()
                                  .then((unarchivedEntry) => {
                                    expect(unarchivedEntry.isArchived()).toBeFalsy()
                                    expect(unarchivedEntry.isDraft()).toBeTruthy()
                                    return unarchivedEntry.delete()
                                      .then(teardownContentTypeForEntryTest(contentType))
                                  })
                              })
                          })
                      })
                  })
              })
          })
      })
  })

  test('Create with id and delete entry', () => {
    getSpace()
      .then((space) => {
        return prepareContentTypeForEntryTest()
          .then((contentType) => {
            return space.createEntryWithId(contentType.sys.id, 'entryid', {fields: {title: {'en-US': 'this is the title'}}})
              .then((entry) => {
                expect(entry.fields.title['en-US']).toBe('this is the title')
                return entry.delete()
                  .then(teardownContentTypeForEntryTest(contentType))
              })
          })
      })
  })
}
