/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai'
import { describe, test } from 'mocha'
import { TestDefaults } from '../defaults'
import { initPlainClient, initClient, getTestOrganization } from '../helpers'

describe('Organization API', async function () {
  describe('Contentful client', () => {
    const client = initClient()

    test('getOrganizations', async () => {
      const collection = await client.getOrganizations()
      const collectionWithLimit = await client.getOrganizations({ limit: 100 })
      expect(collection.limit).to.equal(25)
      expect(collectionWithLimit.limit).to.equal(100)
    })

    test('getOrganization', async () => {
      const testOrg = await getTestOrganization()
      const fetchedOrg = await client.getOrganization(testOrg.sys.id)

      expect(testOrg.toPlainObject()).to.deep.equal(fetchedOrg.toPlainObject())
    })
  })

  describe('PlainClient', () => {
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
    }

    const plainClient = initPlainClient(defaultParams)

    test('getAll', async () => {
      const orgsCollection = await plainClient.organization.getAll()
      const orgsLimitCollection = await plainClient.organization.getAll({ query: { limit: 100 } })

      expect(orgsCollection.limit).to.equal(25)
      expect(orgsLimitCollection.limit).to.equal(100)
    })

    test('get', async () => {
      const testOrg = await getTestOrganization()
      const fetchedOrg = await plainClient.organization.get({ organizationId: testOrg.sys.id })
      expect(testOrg.toPlainObject()).to.deep.equal(fetchedOrg)
    })
  })
})
