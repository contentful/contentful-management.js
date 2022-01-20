import { expect } from 'chai'
import { describe, test } from 'mocha'
import { CreateWorkflowProps } from '../../lib/contentful-management'
import { TestDefaults } from '../defaults'
import { initAlphaPlainClient } from '../helpers'
import { cloneMock } from '../unit/mocks/entities'

describe('Workflow Api', async function () {
  describe('AlphaPlainClient', () => {
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
    }

    const workflowPayload: CreateWorkflowProps = {
      entity: {
        sys: { id: 'some-entity-id', linkType: 'Entry', type: 'Link' },
      },
      workflowDefinition: {
        sys: { id: 'some-wf-def-id', linkType: 'WorkflowDefinition', type: 'Link' },
      },
      stepId: 'some-step-id',
    }

    test('fail with missing alpha header', async () => {
      const alphaClient = initAlphaPlainClient(['workflows'], defaultParams)

      const deferredResponse = alphaClient.workflow.create(defaultParams, workflowPayload)
      const notFoundError = cloneMock('error')
      expect(deferredResponse).to.be.rejectedWith(notFoundError)
    })
  })
})
