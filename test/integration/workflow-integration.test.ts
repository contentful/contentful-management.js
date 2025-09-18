import { expect, describe, it, beforeAll, afterAll } from 'vitest'
import {
  defaultClient,
  createTestEnvironment,
  createTestSpace,
  initPlainClient,
  timeoutToCalmRateLimiting,
} from '../helpers'
import type {
  ContentType,
  Entry,
  Environment,
  PlainClientAPI,
  Space,
  WorkflowDefinitionProps,
} from '../../lib/export-types'
import { makeLink } from '../utils'

describe('Workflow Api', () => {
  let plainClient: PlainClientAPI
  let space: Space
  let environment: Environment
  let contentType: ContentType
  let entry: Entry
  let environmentId: string
  let spaceId: string
  let workflowDefinition: WorkflowDefinitionProps

  beforeAll(async () => {
    plainClient = initPlainClient()
    space = (await createTestSpace(defaultClient, 'Comment')) as Space
    environment = (await createTestEnvironment(space, 'test')) as unknown as Environment
    environmentId = environment.sys.id
    spaceId = space.sys.id
    contentType = await environment.createContentType({
      name: 'Content Type',
      fields: [
        {
          id: 'firstField',
          name: 'First Field',
          type: 'Text',
          required: false,
          localized: false,
        },
      ],
    })
    await contentType.publish()
    entry = await environment.createEntry(contentType.sys.id, { fields: {} })
    workflowDefinition = await plainClient.workflowDefinition.create(
      { environmentId, spaceId },
      {
        name: 'Workflow Definition',
        steps: [
          { name: 'Step 1', actions: [] },
          { name: 'Step 2', actions: [] },
        ],
        appliesTo: [
          {
            type: 'Link',
            linkType: 'Entry',
            validations: [{ linkContentType: [contentType.sys.id] }],
          },
        ],
      },
    )
  })

  afterAll(async () => {
    if (space) {
      await space.delete()
    }
    await timeoutToCalmRateLimiting()
  })

  it('Create, get, update, delete workflow', async () => {
    const workflow = await plainClient.workflow.create(
      { environmentId, spaceId },
      {
        entity: makeLink(entry.sys.type as 'Entry', entry.sys.id),
        workflowDefinition: makeLink('WorkflowDefinition', workflowDefinition.sys.id),
      },
    )
    expect(workflow.sys).toBeDefined()
    const fetchedWorkflow = await plainClient.workflow.get({
      environmentId,
      spaceId,
      workflowId: workflow.sys.id,
    })

    expect(fetchedWorkflow).toEqual(workflow)

    const updatedWorkflow = await plainClient.workflow.update(
      { environmentId, spaceId, workflowId: workflow.sys.id },
      { stepId: workflowDefinition.steps[1].id, sys: { version: workflow.sys.version } },
    )

    expect(updatedWorkflow.stepId).toBe(workflowDefinition.steps[1].id)

    await plainClient.workflow.delete({
      version: updatedWorkflow.sys.version,
      environmentId,
      spaceId,
      workflowId: updatedWorkflow.sys.id,
    })

    await expect(
      plainClient.workflow.get({
        environmentId,
        spaceId,
        workflowId: updatedWorkflow.sys.id,
      }),
    ).rejects.toThrow()
  })
})
