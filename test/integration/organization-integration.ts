/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai'
import { describe, test } from 'mocha'
import { TestDefaults } from '../defaults'
import { initPlainClient, initClient } from '../helpers'

describe('Organization API', async function () {
  describe('Contentful client', () => {
    test('getOrganizations', async () => {
      const client = initClient()
      const collection = await client.getOrganizations()
      const collectionWithLimit = await client.getOrganizations({ limit: 100 })
      expect(collection.limit).to.equal(25)
      expect(collectionWithLimit.limit).to.equal(100)
    })
  })

  describe('PlainClient', () => {
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
    }

    test('getAll', async () => {
      const plainClient = initPlainClient(defaultParams)
      const orgsCollection = await plainClient.organization.getAll()
      const orgsLimitCollection = await plainClient.organization.getAll({ query: { limit: 100 } })

      expect(orgsCollection.limit).to.equal(25)
      expect(orgsLimitCollection.limit).to.equal(100)
    })
  })
})
