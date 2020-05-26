import generateRandomId from './generate-random-id'

export function entryReadOnlyTests(t, space) {
  t.test('Gets entry', (t) => {
    t.plan(2)
    return space.getEntry('5ETMRzkl9KM4omyMwKAOki').then((response) => {
      t.ok(response.sys, 'sys')
      t.ok(response.fields, 'fields')
    })
  })

  t.test('Gets Entry snapshots', (t) => {
    t.plan(2)
    return space.getEntry('5ETMRzkl9KM4omyMwKAOki').then((entry) => {
      return entry.getSnapshots().then((response) => {
        t.ok(response, 'entry snapshots')
        t.ok(response.items, 'entry snapshots items')
      })
    })
  })

  t.test('Gets entries', (t) => {
    t.plan(1)
    return space.getEntries().then((response) => {
      t.ok(response.items, 'items')
    })
  })

  t.test('Gets entries with a limit parameter', (t) => {
    t.plan(2)
    return space
      .getEntries({
        limit: 2,
      })
      .then((response) => {
        t.ok(response.items, 'items')
        t.equal(response.items.length, 2)
      })
  })

  t.test('Gets entries with a skip parameter', (t) => {
    t.plan(2)
    return space
      .getEntries({
        skip: 2,
      })
      .then((response) => {
        t.ok(response.items, 'items')
        t.equal(response.skip, 2)
      })
  })

  t.test('Gets entries with content type query param', (t) => {
    t.plan(2)
    return space.getEntries({ content_type: 'cat' }).then((response) => {
      t.equal(response.total, 3)
      t.looseEqual(
        response.items.map((item) => item.sys.contentType.sys.id),
        ['cat', 'cat', 'cat']
      )
    })
  })

  t.test('Gets entries with equality query', (t) => {
    t.plan(2)
    return space.getEntries({ 'sys.id': 'nyancat' }).then((response) => {
      t.equal(response.total, 1)
      t.equal(response.items[0].sys.id, 'nyancat')
    })
  })

  t.test('Gets entries with inequality query', (t) => {
    t.plan(2)
    return space.getEntries({ 'sys.id[ne]': 'nyancat' }).then((response) => {
      t.ok(response.total > 0)
      t.equal(response.items.filter((item) => item.sys.id === 'nyancat').length, 0)
    })
  })

  t.test('Gets entries with array equality query', (t) => {
    t.plan(2)
    return space
      .getEntries({
        content_type: 'cat',
        'fields.likes': 'lasagna',
      })
      .then((response) => {
        t.equal(response.total, 1)
        t.equal(response.items[0].fields.likes['en-US'].filter((i) => i === 'lasagna').length, 1)
      })
  })

  t.test('Gets entries with array inequality query', (t) => {
    t.plan(2)
    return space
      .getEntries({
        content_type: 'cat',
        'fields.likes[ne]': 'lasagna',
      })
      .then((response) => {
        t.ok(response.total > 0)
        t.equal(response.items[0].fields.likes['en-US'].filter((i) => i === 'lasagna').length, 0)
      })
  })

  t.test('Gets entries with inclusion query', (t) => {
    t.plan(3)
    return space.getEntries({ 'sys.id[in]': 'finn,jake' }).then((response) => {
      t.equal(response.total, 2)
      t.equal(response.items.filter((item) => item.sys.id === 'finn').length, 1)
      t.equal(response.items.filter((item) => item.sys.id === 'jake').length, 1)
    })
  })

  t.test('Gets entries with exclusion query', (t) => {
    t.plan(3)
    return space
      .getEntries({
        content_type: 'cat',
        'fields.likes[nin]': 'rainbows,lasagna',
      })
      .then((response) => {
        t.ok(response.total > 0)
        t.equal(response.items[0].fields.likes['en-US'].filter((i) => i === 'lasagna').length, 0)
        t.equal(response.items[0].fields.likes['en-US'].filter((i) => i === 'rainbows').length, 0)
      })
  })

  t.test('Gets entries with exists query', (t) => {
    t.plan(1)
    return space
      .getEntries({
        content_type: 'cat',
        'fields.likes[exists]': 'true',
      })
      .then((response) => {
        t.equal(response.items.map((item) => item.fields.likes).length, response.total)
      })
  })

  t.test('Gets entries with inverse exists query', (t) => {
    t.plan(1)
    return space
      .getEntries({
        content_type: 'cat',
        'fields.likes[exists]': 'false',
      })
      .then((response) => {
        t.equal(response.items.map((item) => item.fields.likes).length, 0)
      })
  })

  t.test('Gets entries with field link query', (t) => {
    t.plan(1)
    return space
      .getEntries({
        content_type: 'cat',
        'fields.bestFriend.sys.id': 'happycat',
      })
      .then((response) => {
        t.equal(
          response.items[0].sys.id,
          'nyancat',
          'returned entry has link to specified linked entry'
        )
      })
  })

  t.test('Gets entries with gte range query', (t) => {
    t.plan(1)
    return space
      .getEntries({
        'sys.updatedAt[gte]': '2013-01-01T00:00:00Z',
      })
      .then((response) => {
        t.ok(response.total > 0)
      })
  })

  t.test('Gets entries with lte range query', (t) => {
    t.plan(1)
    return space
      .getEntries({
        'sys.updatedAt[lte]': '2013-01-01T00:00:00Z',
      })
      .then((response) => {
        t.equal(response.total, 0)
      })
  })

  t.test('Gets entries with full text search query', (t) => {
    t.plan(1)
    return space
      .getEntries({
        query: 'bacon',
      })
      .then((response) => {
        t.ok(response.items[0].fields.description['en-US'].match(/bacon/))
      })
  })

  t.test('Gets entries with full text search query on field', (t) => {
    t.plan(1)
    return space
      .getEntries({
        content_type: 'dog',
        'fields.description[match]': 'bacon pancakes',
      })
      .then((response) => {
        t.ok(response.items[0].fields.description['en-US'].match(/bacon/))
      })
  })

  t.test('Gets entries with location proximity search', (t) => {
    t.plan(2)
    return space
      .getEntries({
        content_type: '1t9IbcfdCk6m04uISSsaIK',
        'fields.center[near]': '38,-122',
      })
      .then((response) => {
        t.ok(response.items[0].fields.center['en-US'].lat, 'has latitude')
        t.ok(response.items[0].fields.center['en-US'].lon, 'has longitude')
      })
  })

  t.test('Gets entries with location in bounding object', (t) => {
    t.plan(2)
    return space
      .getEntries({
        content_type: '1t9IbcfdCk6m04uISSsaIK',
        'fields.center[within]': '40,-124,36,-120',
      })
      .then((response) => {
        t.ok(response.items[0].fields.center['en-US'].lat, 'has latitude')
        t.ok(response.items[0].fields.center['en-US'].lon, 'has longitude')
      })
  })

  t.test('Gets entries by creation order', (t) => {
    t.plan(1)
    return space
      .getEntries({
        order: 'sys.createdAt',
      })
      .then((response) => {
        t.ok(response.items[0].sys.createdAt < response.items[1].sys.createdAt)
      })
  })

  t.test('Gets entries by inverse creation order', (t) => {
    t.plan(1)
    return space
      .getEntries({
        order: '-sys.createdAt',
      })
      .then((response) => {
        t.ok(response.items[0].sys.createdAt > response.items[1].sys.createdAt)
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
  t.test('Gets entries by creation order and id order', (t) => {
    t.plan(2)
    return space
      .getEntries({
        order: 'sys.contentType.sys.id,sys.id',
      })
      .then((response) => {
        const contentTypeOrder = response.items
          .map((item) => item.sys.contentType.sys.id)
          .filter((value, index, self) => self.indexOf(value) === index)
        t.deepEqual(contentTypeOrder, ['1t9IbcfdCk6m04uISSsaIK', 'cat', 'dog', 'human'], 'orders')
        t.ok(
          response.items[0].sys.id < response.items[1].sys.id,
          'id of entry with index 1 is higher than the one of index 0 since they share content type'
        )
      })
  })
}

export function entryWriteTests(t, space) {
  function prepareContentTypeForEntryTest() {
    return space
      .createContentTypeWithId(generateRandomId('testcontenttype'), {
        name: 'testCT',
        fields: [{ id: 'title', name: 'Title', type: 'Text' }],
      })
      .then(
        (contentType) => contentType.publish(),
        (err) => console.log(err)
      )
  }

  function teardownContentTypeForEntryTest(contentType) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        contentType
          .unpublish()
          .then((unpublishedContentType) => unpublishedContentType.delete())
          .then(resolve, reject)
      }, 2000)
    )
  }

  t.test('Create, update, publish, unpublish, archive, unarchive and delete entry', (t) => {
    t.plan(9)

    return prepareContentTypeForEntryTest().then((contentType) => {
      return space
        .createEntry(contentType.sys.id, { fields: { title: { 'en-US': 'this is the title' } } })
        .then((entry) => {
          t.ok(entry.isDraft(), 'entry is in draft')
          t.equals(entry.fields.title['en-US'], 'this is the title', 'original title')
          return entry.publish().then((publishedEntry) => {
            t.ok(publishedEntry.isPublished(), 'entry is published')
            publishedEntry.fields.title['en-US'] = 'title has changed'
            return publishedEntry.update().then((updatedEntry) => {
              t.ok(updatedEntry.isUpdated(), 'entry is updated')
              t.equals(updatedEntry.fields.title['en-US'], 'title has changed', 'updated title')
              return updatedEntry.unpublish().then((unpublishedEntry) => {
                t.ok(unpublishedEntry.isDraft(), 'entry is back in draft')
                return unpublishedEntry.archive().then((archivedEntry) => {
                  t.ok(archivedEntry.isArchived(), 'entry is archived')
                  return archivedEntry.unarchive().then((unarchivedEntry) => {
                    t.notOk(unarchivedEntry.isArchived(), 'entry is not archived anymore')
                    t.ok(unarchivedEntry.isDraft(), 'entry is back in draft')
                    return unarchivedEntry
                      .delete()
                      .then(teardownContentTypeForEntryTest(contentType))
                  })
                })
              })
            })
          })
        })
    })
  })

  t.test('Create with id and delete entry', (t) => {
    t.plan(1)

    return prepareContentTypeForEntryTest().then((contentType) => {
      return space
        .createEntryWithId(contentType.sys.id, 'entryid', {
          fields: { title: { 'en-US': 'this is the title' } },
        })
        .then((entry) => {
          t.equals(entry.fields.title['en-US'], 'this is the title', 'original title')
          return entry.delete().then(teardownContentTypeForEntryTest(contentType))
        })
    })
  })
}
