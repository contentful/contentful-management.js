/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai'
import { merge } from 'lodash'
import { before, describe, test } from 'mocha'
import sinon from 'sinon'
import { Environment } from '../../lib/entities/environment'
import { Space } from '../../lib/entities/space'
import { TestDefaults } from '../defaults'
import { getDefaultSpace, getPlainClient } from '../helpers'
import { makeLink, makeVersionedLink } from '../utils'

describe('BulkActions Api', async function () {
  let testSpace: Space
  let testEnvironment: Environment

  before(async () => {
    testSpace = await getDefaultSpace()
    testEnvironment = await testSpace.getEnvironment('master')
  })

  describe('Environment Scoped', () => {
    test.only('getEntryReferences', async () => {
      const entryReferences = await testEnvironment.getEntryReferences(
        TestDefaults.entry.testEntryId,
        2
      )
      console.dir(entryReferences, {
        depth: 3,
      })
    })
  })

  // PlainAPI doesn't offer the wait for processing
  describe('PlainClient', () => {
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
    }

    test('entry.references', async () => {
      const plainClient = getPlainClient(defaultParams)
      const entry = await plainClient.entry.get({ entryId: TestDefaults.entry.testEntryId })

      const entryReferences = await plainClient.entry.references({
        entryId: entry.sys.id,
        maxDepth: 5,
      })
      console.dir(entryReferences, {
        depth: 3,
      })
    })
  })
})
