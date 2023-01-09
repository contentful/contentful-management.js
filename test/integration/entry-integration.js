import { expect } from 'chai'
import { after, afterEach, beforeEach, before, describe, test } from 'mocha'
import { TestDefaults } from '../defaults'
import {
  initClient,
  createTestEnvironment,
  createTestSpace,
  generateRandomId,
  getDefaultSpace,
  initPlainClient,
} from '../helpers'

describe('Entry Api', () => {
  describe('read', () => {
    // we should reference an env, not the space
    let space
    let environment
    before(async () => {
      space = await getDefaultSpace()
      environment = await space.getEnvironment('master')
    })

    test('Gets entry', async () => {
      return environment.getEntry('5ETMRzkl9KM4omyMwKAOki').then((response) => {
        expect(response.sys, 'sys').to.be.ok
        expect(response.fields, 'fields').to.be.ok
      })
    })
    test('Gets published entries', async () => {
      return environment.getPublishedEntries().then((response) => {
        expect(response.items[0].sys.firstPublishedAt).to.not.be.undefined
        expect(response.items[0].sys.publishedVersion).to.not.be.undefined
        expect(response.items[0].sys.publishedAt).to.not.be.undefined
      })
    })
    test('Gets Entry snapshots', async () => {
      return environment.getEntry('5ETMRzkl9KM4omyMwKAOki').then((entry) => {
        return entry.getSnapshots().then((response) => {
          expect(response, 'entry snapshots').ok
          expect(response.items, 'entry snapshots items').ok
        })
      })
    })

    test('Gets entries', async () => {
      return environment.getEntries().then((response) => {
        expect(response.items, 'items').ok
      })
    })

    test('Gets entries with a limit parameter', async () => {
      return environment
        .getEntries({
          limit: 2,
        })
        .then((response) => {
          expect(response.items, 'items').ok
          expect(response.items).lengthOf(2)
        })
    })

    test('Gets entries with a skip parameter', async () => {
      return environment
        .getEntries({
          skip: 2,
        })
        .then((response) => {
          expect(response.items, 'items').ok
          expect(response.skip).eql(2)
        })
    })

    test('Gets entries with content type query param', async () => {
      return environment.getEntries({ content_type: 'cat' }).then((response) => {
        expect(response.total).to.eql(4)
        response.items.forEach((entry) => {
          expect(entry.sys.contentType.sys.id).to.eql('cat')
        })
      })
    })

    test('Gets entries with equality query', async () => {
      return environment.getEntries({ 'sys.id': 'nyancat' }).then((response) => {
        expect(response.total).equal(1)
        expect(response.items[0].sys.id).equal('nyancat')
      })
    })

    test('Gets entries with inequality query', async () => {
      return environment.getEntries({ 'sys.id[ne]': 'nyancat' }).then((response) => {
        expect(response.total > 0).ok
        expect(response.items.filter((item) => item.sys.id === 'nyancat').length).equal(0)
      })
    })

    test('Gets entries with array equality query', async () => {
      return environment
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
      return environment
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
      return environment.getEntries({ 'sys.id[in]': 'finn,jake' }).then((response) => {
        expect(response.total).equal(2)
        expect(response.items.filter((item) => item.sys.id === 'finn').length).equal(1)
        expect(response.items.filter((item) => item.sys.id === 'jake').length).equal(1)
      })
    })

    test('Gets entries with exclusion query', async () => {
      return environment
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
      return environment
        .getEntries({
          content_type: 'cat',
          'fields.likes[exists]': 'true',
        })
        .then((response) => {
          expect(response.items.map((item) => item.fields.likes).length).equal(response.total)
        })
    })

    test('Gets entries with inverse exists query', async () => {
      return environment
        .getEntries({
          content_type: 'cat',
          'fields.likes[exists]': 'false',
        })
        .then((response) => {
          expect(response.items.map((item) => item.fields.likes).length).equal(0)
        })
    })

    test('Gets entries with field link query', async () => {
      return environment
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
      return environment
        .getEntries({
          'sys.updatedAt[gte]': '2013-01-01T00:00:00Z',
        })
        .then((response) => {
          expect(response.total > 0).ok
        })
    })

    test('Gets entries with lte range query', async () => {
      return environment
        .getEntries({
          'sys.updatedAt[lte]': '2013-01-01T00:00:00Z',
        })
        .then((response) => {
          expect(response.total).equal(0)
        })
    })

    test('Gets entries with full text search query', async () => {
      return environment
        .getEntries({
          query: 'bacon',
        })
        .then((response) => {
          expect(response.items[0].fields.description['en-US'].match(/bacon/)).ok
        })
    })

    test('Gets entries with full text search query on field', async () => {
      return environment
        .getEntries({
          content_type: 'dog',
          'fields.description[match]': 'bacon pancakes',
        })
        .then((response) => {
          expect(response.items[0].fields.description['en-US'].match(/bacon/)).ok
        })
    })

    test('Gets entries with location proximity search', async () => {
      return environment
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
      return environment
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
      return environment
        .getEntries({
          order: 'sys.createdAt',
        })
        .then((response) => {
          expect(response.items[0].sys.createdAt < response.items[1].sys.createdAt).ok
        })
    })

    test('Gets entries by inverse creation order', async () => {
      return environment
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
      return environment
        .getEntries({
          order: 'sys.contentType.sys.id,sys.id',
        })
        .then((response) => {
          const contentTypeOrder = response.items
            .map((item) => item.sys.contentType.sys.id)
            .filter((value, index, self) => self.indexOf(value) === index)
          expect(contentTypeOrder).eql(
            [
              '1t9IbcfdCk6m04uISSsaIK',
              'cat',
              'contentTypeWithMetadataField',
              'dog',
              'human',
              'kangaroo',
            ],
            'orders'
          )
          expect(
            response.items[0].sys.id < response.items[1].sys.id,
            'id of entry with index 1 is higher than the one of index 0 since they share content type'
          ).ok
        })
    })
  })

  describe('write', () => {
    let space
    let environment
    let contentType

    before(async () => {
      space = await createTestSpace(initClient(), 'Entry')
      environment = await createTestEnvironment(space, 'Testing Environment')
    })

    after(async () => {
      if (space) {
        return space.delete()
      }
    })

    beforeEach(async () => {
      contentType = await environment.createContentTypeWithId(
        generateRandomId('test-content-type'),
        {
          name: 'testCT',
          fields: [
            {
              id: 'title',
              name: 'Title',
              type: 'Text',
            },
          ],
        }
      )
      await contentType.publish()
    })

    afterEach(async () => {
      return contentType
        .unpublish()
        .then((unpublishedContentType) => unpublishedContentType.delete())
    })

    test('Create, update, patch, publish, unpublish, archive, unarchive and delete entry', async () => {
      return environment
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
              const patchOp = {
                op: 'replace',
                path: '/fields/title/en-US',
                value: 'title was patched',
              }
              return updatedEntry.patch([patchOp]).then((patchedEntry) => {
                expect(patchedEntry.fields.title['en-US']).equals(
                  'title was patched',
                  'updated title'
                )
                return patchedEntry.unpublish().then((unpublishedEntry) => {
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
    })

    test('Create with id and delete entry', async () => {
      return environment
        .createEntryWithId(contentType.sys.id, 'entryid', {
          fields: { title: { 'en-US': 'this is the title' } },
        })
        .then((entry) => {
          expect(entry.fields.title['en-US']).equals('this is the title', 'original title')
          return entry.delete()
        })
    })

    test('Create with id and delete entry with deleteEntry method', async () => {
      return environment
        .createEntryWithId(contentType.sys.id, 'entryid', {
          fields: { title: { 'en-US': 'this is the title' } },
        })
        .then(() => {
          return environment.deleteEntry('entryid')
        })
    })
  })

  describe('read plainClientApi', () => {
    /**
     * @type {import('../../lib/contentful-management').PlainClientAPI}
     */
    let plainClient
    before(async () => {
      plainClient = initPlainClient({ spaceId: TestDefaults.spaceId })
    })
    test('getPublished', async () => {
      const response = await plainClient.entry.getPublished({ environmentId: 'master' })
      expect(response.items[0].sys.firstPublishedAt).to.not.be.undefined
      expect(response.items[0].sys.publishedVersion).to.not.be.undefined
      expect(response.items[0].sys.publishedAt).to.not.be.undefined
    })
  })

  /**
   * This test was created to make sure the SDK supports
   * creating/updating/publishing/upublishing/deleting of
   * entries with cross space links
   *
   * This test is slightly fragile as it can break if the
   * entry '4zimQzVMxDsSX607PCfo2u' from the space '6mqcevu5a50r' is deleted
   */
  describe('write with xspace references', () => {
    let xSpaceEnabledSpace
    let xSpaceEnabledEnvironment
    let xSpaceDisabledSpace
    let xSpaceDisabledEnvironment
    let xSpaceDisabledContentType
    let xSpaceEnabledContentType
    let xSpaceDisabledEntryId

    let contentTypeData = {
      name: 'testCTXSpace',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Text',
        },
        {
          id: 'multiRefXSpace',
          name: 'multiRefXSpace',
          type: 'Array',
          items: {
            type: 'ResourceLink',
            validations: [],
          },
          allowedResources: [
            {
              type: 'Contentful:Entry',
              source: 'crn:contentful:::content:spaces/6mqcevu5a50r',
              contentTypes: ['testCtxSpace'],
            },
          ],
        },
      ],
    }

    let entryData = {
      fields: {
        title: { 'en-US': 'this is the title' },
        multiRefXSpace: {
          'en-US': [
            {
              sys: {
                type: 'ResourceLink',
                linkType: 'Contentful:Entry',
                urn: 'crn:contentful:::content:spaces/6mqcevu5a50r/entries/4zimQzVMxDsSX607PCfo2u',
              },
            },
          ],
        },
      },
    }

    before(async () => {
      // The default space has xspace enabled in it through the feature flags
      xSpaceEnabledSpace = await getDefaultSpace()
      xSpaceEnabledEnvironment = await xSpaceEnabledSpace.getEnvironment('master')
      xSpaceEnabledContentType = await xSpaceEnabledEnvironment.createContentTypeWithId(
        generateRandomId('test-content-type'),
        contentTypeData
      )
      await xSpaceEnabledContentType.publish()

      // Creating a new space that doesn't have the xspace feature enabled
      xSpaceDisabledSpace = await createTestSpace(initClient(), 'XSpaceDisabledEntry')
      xSpaceDisabledEnvironment = await createTestEnvironment(
        xSpaceDisabledSpace,
        'Testing Environment'
      )
      xSpaceDisabledContentType = await xSpaceDisabledEnvironment.createContentTypeWithId(
        generateRandomId('test-content-type'),
        contentTypeData
      )
      await xSpaceDisabledContentType.publish()
    })

    after(async () => {
      // Cleaning up the xSpaceDisabled Space
      await xSpaceDisabledEnvironment.deleteEntry(xSpaceDisabledEntryId)
      await xSpaceDisabledContentType
        .unpublish()
        .then((unpublishedContentType) => unpublishedContentType.delete())

      await xSpaceDisabledSpace.delete()

      // Cleaning up the the default Space (xSpace feature enabled)
      await xSpaceEnabledContentType
        .unpublish()
        .then((unpublishedContentType) => unpublishedContentType.delete())
    })

    test('Blocks publishing an entry with xspace references if the feature is disabled for the space', async () => {
      return xSpaceDisabledEnvironment
        .createEntry(xSpaceDisabledContentType.sys.id, entryData)
        .then((entry) => {
          xSpaceDisabledEntryId = entry.sys.id
          expect(entry.isDraft(), 'entry is in draft').ok
          expect(entry.fields.title['en-US']).equals('this is the title', 'original title')
          return entry.publish().catch((accessDeniedError) => {
            let errorMessage = JSON.parse(accessDeniedError.message)
            expect(accessDeniedError.name).equals('AccessDenied', 'Access Denied Error')
            expect(errorMessage.status).equals(403, '403 forbidden status')
            expect(errorMessage.details.reasons).equals(
              'Cross space links feature is not enabled for this space',
              'reason explained'
            )
          })
        })
    })

    test('can create, publish, unpublish and delete an entry with xspace references if the feature is enabled for the space', async () => {
      return xSpaceEnabledEnvironment
        .createEntry(xSpaceEnabledContentType.sys.id, entryData)
        .then((entry) => {
          expect(entry.isDraft(), 'entry is in draft').ok
          expect(entry.fields.title['en-US']).equals('this is the title', 'original title')
          return entry.publish().then((publishedEntry) => {
            expect(publishedEntry.isPublished(), 'entry is published').ok
            return publishedEntry.unpublish().then((unpublishedEntry) => {
              expect(unpublishedEntry.isDraft(), 'entry is back in draft').ok
              return publishedEntry.delete()
            })
          })
        })
    })
  })
})
