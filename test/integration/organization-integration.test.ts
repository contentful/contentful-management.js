import { describe, test, expect, afterAll } from 'vitest'
import { TestDefaults } from '../defaults'
import {
  initPlainClient,
  defaultClient,
  getTestOrganization,
  timeoutToCalmRateLimiting,
} from '../helpers'

describe('Organization API', async function () {
  afterAll(timeoutToCalmRateLimiting)

  describe('Contentful client', () => {
    const client = defaultClient

    describe('getOrganizations', () => {
      test('should return all organizations', async () => {
        const collection = await client.getOrganizations()
        const collectionWithLimit = await client.getOrganizations({ limit: 100 })
        expect(collection.limit).toBe(25)
        expect(collectionWithLimit.limit).toBe(100)
      })
    })

    describe('getOrganization', () => {
      test('should return the organization by id', async () => {
        const testOrg = await getTestOrganization()
        const fetchedOrg = await client.getOrganization(testOrg.sys.id)

        expect(testOrg.toPlainObject()).toEqual(fetchedOrg.toPlainObject())
      })

      test("should return undefined if the organization wasn't found", async () => {
        try {
          await client.getOrganization('nonExistingId')
        } catch (e: any) {
          expect(e.message).toContain('No organization was found with the ID nonExistingId')
        }
      })
    })
  })

  describe('PlainClient', () => {
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
    }

    const plainClient = initPlainClient(defaultParams)

    describe('getAll', () => {
      test('should return all organizations', async () => {
        const orgsCollection = await plainClient.organization.getAll()
        const orgsLimitCollection = await plainClient.organization.getAll({ query: { limit: 100 } })

        expect(orgsCollection.limit).toBe(25)
        expect(orgsLimitCollection.limit).toBe(100)
      })
    })

    describe('get', () => {
      test('should get the organization by id', async () => {
        const testOrg = await getTestOrganization()
        const fetchedOrg = await plainClient.organization.get({ organizationId: testOrg.sys.id })
        expect(testOrg.toPlainObject()).toEqual(fetchedOrg)
      })

      test("should throw if organization wasn't found", async () => {
        try {
          await plainClient.organization.get({ organizationId: 'nonExistingId' })
        } catch (e: any) {
          expect(e.message).toContain('No organization was found with the ID nonExistingId')
        }
      })
    })
  })
})
