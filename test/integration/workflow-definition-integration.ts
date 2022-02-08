import { expect } from 'chai'
import { cloneDeep } from 'lodash'
import { describe, test } from 'mocha'
import { CreateWorkflowDefinitionProps } from '../../lib/contentful-management'
import { TestDefaults } from '../defaults'
import { initAlphaPlainClient } from '../helpers'
import { cloneMock, workflowDefinitionMock } from '../unit/mocks/entities'

describe('WorkflowDefinition Api', async function () {
  describe('AlphaPlainClient', () => {
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
    }

    const workflowDefinitionPayload = cloneDeep(
      workflowDefinitionMock
    ) as unknown as CreateWorkflowDefinitionProps
    delete (workflowDefinitionPayload as any).sys
    workflowDefinitionPayload.steps.forEach((workflowStep) => {
      delete (workflowStep as any).id
    })

    test('fail with missing alpha header', async () => {
      const alphaClient = initAlphaPlainClient(['workflows'], defaultParams)

      const deferredResponse = alphaClient.workflowDefinition.create(
        defaultParams,
        workflowDefinitionPayload
      )
      const notFoundError = cloneMock('error')
      expect(deferredResponse).to.be.rejectedWith(notFoundError)
    })
  })
})
