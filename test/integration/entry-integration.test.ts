import { describe, test, beforeEach, beforeAll, afterAll, afterEach, expect } from 'vitest'
import {
  initClient,
  createTestEnvironment,
  createTestSpace,
  generateRandomId,
  getDefaultSpace,
  initPlainClient,
  waitForEnvironmentToBeReady,
  getTestOrganizationId,
  timeoutToCalmRateLimiting,
} from '../helpers'
import type {
  ConceptProps,
  ContentType,
  EntryProps,
  Environment,
  PlainClientAPI,
  ReleaseProps,
  Space,
} from '../../lib/export-types'
import { TestDefaults } from '../defaults'
import { makeLink } from '../utils'

describe('Entry Api', () => {
  afterAll(async () => await timeoutToCalmRateLimiting())

  describe('read', () => {
    let space: Space
    let environment: Environment

    beforeAll(async () => {
      space = await getDefaultSpace()
      environment = await space.getEnvironment('master')
    })

    test('Gets entry', async () => {
      return environment.getEntry(TestDefaults.entry.testEntryId).then((response) => {
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
      return environment.getEntry(TestDefaults.entry.testEntryId).then((entry) => {
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
              'test-content-type33324244',
              'testEntryReferences',
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
    let space: Space
    let environment: Environment
    let contentType: ContentType
    let client: PlainClientAPI

    beforeAll(async () => {
      space = await createTestSpace(initClient(), 'Entry')
      environment = await createTestEnvironment(space, 'Testing Environment')
      client = initPlainClient({
        organizationId: getTestOrganizationId(),
      })
      await waitForEnvironmentToBeReady(space, environment)
    })

    afterAll(async () => {
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
              required: false,
              localized: false,
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

    describe('Taxonomy', () => {
      const conceptsToCleanUp: ConceptProps[] = []

      afterAll(async () => {
        for (const conceptToBeDeleted of conceptsToCleanUp) {
          await client.concept.delete({
            conceptId: conceptToBeDeleted.sys.id,
            version: conceptToBeDeleted.sys.version,
          })
        }
      })

      test('should create entry with concepts assigned when concepts provided', async () => {
        const parentConcept = await client.concept.create(
          {},
          {
            prefLabel: {
              'en-US': 'Parent concept for validation',
            },
          }
        )
        const childConcept = await client.concept.create(
          {},
          {
            prefLabel: {
              'en-US': 'Child concept to be assigned',
            },
            broader: [
              {
                sys: {
                  id: parentConcept.sys.id,
                  linkType: 'TaxonomyConcept',
                  type: 'Link',
                },
              },
            ],
          }
        )
        conceptsToCleanUp.push(parentConcept, childConcept)

        const contentTypeWithTaxonomyValidation = await environment.createContentTypeWithId(
          generateRandomId('test-content-type'),
          {
            name: 'testCT-with-validation',
            fields: [
              {
                id: 'title',
                name: 'Title',
                type: 'Text',
                required: false,
                localized: false,
              },
            ],
            metadata: {
              taxonomy: [
                {
                  sys: {
                    id: parentConcept.sys.id,
                    linkType: 'TaxonomyConcept',
                    type: 'Link',
                  },
                },
              ],
            },
          }
        )
        await contentTypeWithTaxonomyValidation.publish()

        const createdEntry = await environment.createEntry(
          contentTypeWithTaxonomyValidation.sys.id,
          {
            fields: {
              title: { 'en-US': 'this is the title of an entry with a concept assigned' },
            },
            metadata: {
              concepts: [
                {
                  sys: {
                    id: childConcept.sys.id,
                    linkType: 'TaxonomyConcept',
                    type: 'Link',
                  },
                },
              ],
              tags: [],
            },
          }
        )
        if (!createdEntry.metadata?.concepts) {
          throw new Error('created entry is missing metadata concepts')
        }

        expect(createdEntry.metadata.concepts).lengthOf(1)
        expect(createdEntry.metadata.concepts[0].sys.id).to.eq(childConcept.sys.id)
      })

      test('should update entry with concepts assigned when concepts are provided', async () => {
        const parentConcept = await client.concept.create(
          {},
          {
            prefLabel: {
              'en-US': 'Parent concept for validation',
            },
          }
        )
        const childConcept = await client.concept.create(
          {},
          {
            prefLabel: {
              'en-US': 'Child concept to be assigned',
            },
            broader: [
              {
                sys: {
                  id: parentConcept.sys.id,
                  linkType: 'TaxonomyConcept',
                  type: 'Link',
                },
              },
            ],
          }
        )
        conceptsToCleanUp.push(parentConcept, childConcept)

        const contentTypeWithTaxonomyValidation = await environment.createContentTypeWithId(
          generateRandomId('test-content-type'),
          {
            name: 'testCT-with-validation',
            fields: [
              {
                id: 'title',
                name: 'Title',
                type: 'Text',
                required: false,
                localized: false,
              },
            ],
            metadata: {
              taxonomy: [
                {
                  sys: {
                    id: parentConcept.sys.id,
                    linkType: 'TaxonomyConcept',
                    type: 'Link',
                  },
                },
              ],
            },
          }
        )
        await contentTypeWithTaxonomyValidation.publish()

        const entryToUpdate = await environment.createEntry(
          contentTypeWithTaxonomyValidation.sys.id,
          {
            fields: {
              title: { 'en-US': 'this is the title of an entry with a taxonomy assigned' },
            },
            // metadata intentionally omitted
          }
        )
        if (!entryToUpdate.metadata?.concepts) {
          throw new Error('entry to update is missing metadata concepts')
        }
        expect(entryToUpdate.metadata.concepts).to.be.an('array').that.is.empty

        entryToUpdate.metadata = {
          concepts: [
            {
              sys: {
                id: childConcept.sys.id,
                linkType: 'TaxonomyConcept',
                type: 'Link',
              },
            },
          ],
          tags: [],
        }

        const updatedEntry = await entryToUpdate.update()
        if (!updatedEntry.metadata?.concepts) {
          throw new Error('updated entry is missing metadata concepts')
        }
        expect(updatedEntry.metadata.concepts).lengthOf(1)
        expect(updatedEntry.metadata.concepts[0].sys.id).to.eq(childConcept.sys.id)
      })

      test('should update entry with concepts removed when concepts already exist', async () => {
        const parentConcept = await client.concept.create(
          {},
          {
            prefLabel: {
              'en-US': 'Parent concept for validation',
            },
          }
        )
        const childConcept = await client.concept.create(
          {},
          {
            prefLabel: {
              'en-US': 'Child concept to be assigned',
            },
            broader: [
              {
                sys: {
                  id: parentConcept.sys.id,
                  linkType: 'TaxonomyConcept',
                  type: 'Link',
                },
              },
            ],
          }
        )
        conceptsToCleanUp.push(parentConcept, childConcept)

        const contentTypeWithTaxonomyValidation = await environment.createContentTypeWithId(
          generateRandomId('test-content-type'),
          {
            name: 'testCT-with-validation',
            fields: [
              {
                id: 'title',
                name: 'Title',
                type: 'Text',
                required: false,
                localized: false,
              },
            ],
            metadata: {
              taxonomy: [
                {
                  sys: {
                    id: parentConcept.sys.id,
                    linkType: 'TaxonomyConcept',
                    type: 'Link',
                  },
                },
              ],
            },
          }
        )
        await contentTypeWithTaxonomyValidation.publish()

        const entryToDeleteConceptFrom = await environment.createEntry(
          contentTypeWithTaxonomyValidation.sys.id,
          {
            fields: {
              title: { 'en-US': 'this is the title of an entry with a taxonomy assigned' },
            },
            metadata: {
              concepts: [
                {
                  sys: {
                    id: childConcept.sys.id,
                    linkType: 'TaxonomyConcept',
                    type: 'Link',
                  },
                },
              ],
              tags: [],
            },
          }
        )
        if (!entryToDeleteConceptFrom.metadata?.concepts) {
          throw new Error('entry to delete concept from is missing metadata concepts')
        }
        expect(entryToDeleteConceptFrom.metadata.concepts).lengthOf(1)

        entryToDeleteConceptFrom.metadata.concepts = []
        const updatedEntry = await entryToDeleteConceptFrom.update()
        if (!updatedEntry.metadata?.concepts) {
          throw new Error('updated entry is missing metadata concepts')
        }

        expect(updatedEntry.metadata.concepts).to.be.an('array').that.is.empty
      })
    })
  })

  describe('read plainClientApi', () => {
    let plainClient: PlainClientAPI
    beforeAll(async () => {
      plainClient = initPlainClient({ spaceId: TestDefaults.spaceId })
    })
    test('getPublished', async () => {
      const response = await plainClient.entry.getPublished({ environmentId: 'master' })
      expect(response.items[0].sys.firstPublishedAt).to.not.be.undefined
      expect(response.items[0].sys.publishedVersion).to.not.be.undefined
      expect(response.items[0].sys.publishedAt).to.not.be.undefined
    })
  })

  //test releasev2 entry logic
  describe('read plainClientApi with releaseId', () => {
    let entry: EntryProps
    let entry2: EntryProps
    let release: ReleaseProps
    let createEntryClient: PlainClientAPI

    beforeAll(async () => {
      // create a v2 release w/ entry to reuse in tests
      const defaultParams = {
        environmentId: TestDefaults.environmentId,
        spaceId: TestDefaults.spaceId,
        releaseSchemaVersion: 'Release.v2' as const,
      }
      createEntryClient = initPlainClient(defaultParams)

      entry = await createEntryClient.entry.create(
        { ...defaultParams, contentTypeId: TestDefaults.contentType.withCrossSpaceReferenceId },
        {
          fields: {
            title: {
              'en-US': 'Test Entry for Release',
            },
          },
        }
      )

      entry2 = await createEntryClient.entry.create(
        { ...defaultParams, contentTypeId: TestDefaults.contentType.withCrossSpaceReferenceId },
        {
          fields: {
            title: {
              'en-US': 'Test Entry for Release',
            },
          },
        }
      )

      release = await createEntryClient.release.create(defaultParams, {
        title: 'Test Release',
        entities: {
          sys: { type: 'Array' },
          items: [
            {
              entity: makeLink('Entry', entry.sys.id),
              action: 'publish',
            },
            {
              entity: makeLink('Entry', entry2.sys.id),
              action: 'publish',
            },
          ],
        },
        startDate: '2025-08-28T10:00:000Z',
      })
    })

    afterAll(async () => {
      // cleanup test release
      await createEntryClient.release.delete({
        releaseId: release.sys.id,
      })
      await createEntryClient.entry.delete({
        entryId: entry.sys.id,
      })
      await timeoutToCalmRateLimiting()
    })

    describe('releaseId is provided in params, but not in default params', () => {
      //the entry.getMany API endpoint currently does not return release metadata
      test('entry.getMany works', async () => {
        const response = await createEntryClient.entry.getMany({
          query: {
            'release[lte]': release.sys.id,
            'order': '-sys.createdAt',
          },
        })
        expect(response.items[0].sys.id).toEqual(entry2.sys.id)
        expect(response.items[1].sys.id).toEqual(entry.sys.id)
        //expect(response.items[0].sys.release.sys.id).toEqual(release.sys.id)
        //expect(response.items[1].sys.release.sys.id).toEqual(release.sys.id)
      })

      test('entry.get works', async () => {
        const fetchedEntry = await createEntryClient.entry.get({
          entryId: entry.sys.id,
          releaseId: release.sys.id,
        })
        expect(fetchedEntry.sys.id).toEqual(entry.sys.id)
        expect(fetchedEntry.sys.release.sys.id).toEqual(release.sys.id)
      })
    })

    describe('releaseId is provided in default params, but not in params', () => {
      beforeEach(() => {
        createEntryClient = initPlainClient({
          environmentId: TestDefaults.environmentId,
          spaceId: TestDefaults.spaceId,
          releaseId: release.sys.id,
        })
      })

      test('entry.getMany works', async () => {
        const response = await createEntryClient.entry.getMany({
          query: {
            'order': '-sys.createdAt',
          }
        })
        expect(response.items[0].sys.id).toEqual(entry2.sys.id)
        expect(response.items[1].sys.id).toEqual(entry.sys.id)
        //expect(response.items[0].sys.release.sys.id).toEqual(release.sys.id)
        //expect(response.items[1].sys.release.sys.id).toEqual(release.sys.id)
      })

      test('entry.get works', async () => {
        const fetchedEntry = await createEntryClient.entry.get({
          entryId: entry.sys.id,
        })
        expect(fetchedEntry.sys.id).toEqual(entry.sys.id)
        expect(fetchedEntry.sys.release.sys.id).toEqual(release.sys.id)
      })
    })
  })

  /**
   * This test was created to make sure the SDK supports
   * creating/updating/publishing/unpublishing/deleting of
   * entries with cross space links
   *
   * This test is slightly fragile as it can break if the
   * entry '4zimQzVMxDsSX607PCfo2u' from the space '6mqcevu5a50r' is deleted
   * Content type with id stored in `TestDefaults.contentType.withCrossSpaceReferenceId` is deleted
   */
  describe.skip('write with x-space references', () => {
    const contentTypeData = {
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

    const entryData = {
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

    describe('When cross-space references feature is enabled for the space', () => {
      let xSpaceEnabledSpace
      let xSpaceEnabledEnvironment
      let xSpaceEnabledContentType

      beforeAll(async () => {
        // The default space has x-space enabled in it through the feature flags
        xSpaceEnabledSpace = await getDefaultSpace()
        xSpaceEnabledEnvironment = await createTestEnvironment(
          xSpaceEnabledSpace,
          'Test Cross Space'
        )
        await waitForEnvironmentToBeReady(xSpaceEnabledSpace, xSpaceEnabledEnvironment)
        xSpaceEnabledContentType = await xSpaceEnabledEnvironment.getContentType(
          TestDefaults.contentType.withCrossSpaceReferenceId
        )
      })

      afterAll(async () => {
        if (xSpaceEnabledEnvironment) {
          await xSpaceEnabledEnvironment.delete()
        }
      })

      test('can create, publish, unpublish and delete an entry with xspace references', async () => {
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

    describe('When cross-space references feature is disabled for the space', () => {
      let xSpaceDisabledSpace
      let xSpaceDisabledEnvironment
      let xSpaceDisabledContentType
      let xSpaceDisabledEntryId

      beforeAll(async () => {
        // Creating a new space that has the x-space feature disabled
        xSpaceDisabledSpace = await createTestSpace(initClient(), 'XSpaceDisabledEntry')
        xSpaceDisabledEnvironment = await xSpaceDisabledSpace.getEnvironment('master')
      })

      beforeEach(async () => {
        xSpaceDisabledContentType = await xSpaceDisabledEnvironment.createContentTypeWithId(
          generateRandomId('test-content-type'),
          contentTypeData
        )
        await xSpaceDisabledContentType.publish()
      })

      afterEach(async () => {
        if (xSpaceDisabledEntryId) {
          await xSpaceDisabledEnvironment.deleteEntry(xSpaceDisabledEntryId)
          await xSpaceDisabledContentType.unpublish()
          await xSpaceDisabledContentType.delete()
        }
      })

      afterAll(async () => {
        if (xSpaceDisabledSpace) {
          // Cleaning up the xSpaceDisabled Space
          await xSpaceDisabledSpace.delete()
        }
      })

      test('Blocks publishing an entry with x-space references', async () => {
        return xSpaceDisabledEnvironment
          .createEntry(xSpaceDisabledContentType.sys.id, entryData)
          .catch((accessDeniedError) => {
            const errorMessage = JSON.parse(accessDeniedError.message)
            expect(accessDeniedError.name).equals('AccessDenied', 'Access Denied Error')
            expect(errorMessage.status).equals(403, '403 forbidden status')
            expect(errorMessage.details.reasons).equals(
              'Cross space links feature is not enabled for this space',
              'reason explained'
            )
          })
      })
    })
  })
})
