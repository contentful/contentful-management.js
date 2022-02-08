import { expect } from 'chai'
import { describe, test } from 'mocha'
import { TestDefaults } from '../defaults'
import { initAlphaPlainClient } from '../helpers'
import { cloneMock } from '../unit/mocks/entities'

describe('WorkflowsChangelog Api', async function () {
  describe('AlphaPlainClient', () => {
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
    }

    test('fail with missing alpha header', async () => {
      const alphaClient = initAlphaPlainClient(['workflows'], defaultParams)

      const deferredResponse = alphaClient.workflowsChangelog.getMany(defaultParams)
      const notFoundError = cloneMock('error')
      expect(deferredResponse).to.be.rejectedWith(notFoundError)
    })
  })
})
