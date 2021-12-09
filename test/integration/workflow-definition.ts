/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai'
import { cloneDeep } from 'lodash'
import { afterEach, beforeEach, describe, test } from 'mocha'
import {
  AlphaPlainClientAPI,
  CreateWorkflowDefinitionProps,
  WorkflowDefinitionProps,
} from '../../lib/contentful-management'
import { TestDefaults } from '../defaults'
import { initAlphaPlainClient } from '../helpers'
import { workflowDefinitionMock } from '../unit/mocks/entities'

describe('WorkflowDefinition Api', async function () {
  describe('AlphaPlainClient', () => {
    let alphaClient: AlphaPlainClientAPI
    let workflowDefinitionPayload: CreateWorkflowDefinitionProps
    let createdWorkflowDefinition: WorkflowDefinitionProps
    const defaultParams = {
      environmentId: TestDefaults.environmentId,
      spaceId: TestDefaults.spaceId,
    }

    beforeEach('workflowDefinition.create', async () => {
      alphaClient = initAlphaPlainClient(defaultParams)
      workflowDefinitionPayload = cloneDeep(workflowDefinitionMock)
      delete (workflowDefinitionPayload as any).sys

      createdWorkflowDefinition = await alphaClient.workflowDefinition.create(defaultParams, {
        ...workflowDefinitionPayload,
      })
    })

    afterEach('workflowDefinition.delete', async () => {
      await alphaClient.workflowDefinition.delete({
        workflowDefinitionId: createdWorkflowDefinition.sys.id,
        version: createdWorkflowDefinition.sys.version,
      })
    })

    test('workflowDefinition.get', async () => {
      const workflowDefinition = await alphaClient.workflowDefinition.get({
        ...defaultParams,
        workflowDefinitionId: createdWorkflowDefinition.sys.id,
        version: createdWorkflowDefinition.sys.version,
      })

      expect(workflowDefinition.name).to.eq(workflowDefinitionMock.name)
    })

    test('workflowDefinition.update', async () => {
      const newName = 'Test Renamed WorkflowDefinition'
      const updatedWorkflowDefinition = await alphaClient.workflowDefinition.update(
        {
          ...defaultParams,
          workflowDefinitionId: createdWorkflowDefinition.sys.id,
        },
        {
          ...workflowDefinitionPayload,
          name: newName,
          sys: {
            version: createdWorkflowDefinition.sys.version,
          },
        }
      )

      const workflowDefinition = await alphaClient.workflowDefinition.get({
        ...defaultParams,
        workflowDefinitionId: updatedWorkflowDefinition.sys.id,
        version: updatedWorkflowDefinition.sys.version,
      })

      expect(workflowDefinition.name).to.eq(newName)
    })
  })
})
