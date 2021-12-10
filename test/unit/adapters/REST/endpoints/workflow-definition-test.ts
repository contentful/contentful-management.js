import { expect } from 'chai'
import { describe, test } from 'mocha'
import { cloneMock } from '../../../mocks/entities'
import setupRestAdapter from '../helpers/setupRestAdapter'
import {
  WorkflowDefinitionProps,
  wrapWorkflowDefinition,
} from '../../../../../lib/entities/workflow-definition'
import { MakeRequest } from '../../../../../lib/export-types'

function setup(params = {}) {
  const entityMock: WorkflowDefinitionProps = cloneMock('workflowDefinition')
  const promise = Promise.resolve({ data: entityMock })
  return {
    ...setupRestAdapter(promise, params),
    entityMock,
  }
}

describe('Rest Workflow Definition', () => {
  test('WorkflowDefinition update', async () => {
    const { httpMock, adapterMock, entityMock } = setup()
    entityMock.sys.version = 2
    const entity = wrapWorkflowDefinition(
      // @ts-ignore
      ((...args) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock
    )
    entity.description = 'new description'
    return entity.update().then((response) => {
      expect(response.toPlainObject, 'response is wrapped').to.be.ok
      expect(httpMock.put.args[0][0]).equals(
        `/spaces/${entityMock.sys.space.sys.id}/environments/${entityMock.sys.environment.sys.id}/workflow_definitions/${entityMock.sys.id}`,
        'url is correct'
      )
      expect(httpMock.put.args[0][2].headers['X-Contentful-Version']).equals(
        2,
        'version header is sent'
      )
      return {
        httpMock,
        entityMock,
        response,
      }
    })
  })

  test('WorkflowDefinition delete', async () => {
    const { httpMock, adapterMock, entityMock } = setup()
    entityMock.sys.version = 2
    const entity = wrapWorkflowDefinition(
      // @ts-ignore
      ((...args) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock
    )
    return entity.delete().then(() => {
      expect(httpMock.delete.args[0][0]).equals(
        `/spaces/${entityMock.sys.space.sys.id}/environments/${entityMock.sys.environment.sys.id}/workflow_definitions/${entityMock.sys.id}`,
        'url is correct'
      )
      expect(httpMock.delete.args[0][1].headers['X-Contentful-Version']).equals(
        2,
        'version header is sent'
      )
      return {
        httpMock,
        entityMock,
      }
    })
  })
})

// describe('WorkflowDefinition Api', async function () {
//   describe('AlphaPlainClient', () => {
//     let alphaClient: AlphaPlainClientAPI
//     let workflowDefinitionPayload: CreateWorkflowDefinitionProps
//     let createdWorkflowDefinition: WorkflowDefinitionProps
//     const defaultParams = {
//       environmentId: TestDefaults.environmentId,
//       spaceId: TestDefaults.spaceId,
//     }

//     beforeEach('workflowDefinition.create', async () => {
//       alphaClient = initAlphaPlainClient(defaultParams)
//       workflowDefinitionPayload = (cloneDeep(
//         workflowDefinitionMock
//       ) as unknown) as CreateWorkflowDefinitionProps
//       delete (workflowDefinitionPayload as any).sys

//       console.info(alphaClient, workflowDefinitionPayload)

//       createdWorkflowDefinition = await alphaClient.workflowDefinition.create(defaultParams, {
//         ...workflowDefinitionPayload,
//       })

//       console.info(createdWorkflowDefinition)
//     })

//     afterEach('workflowDefinition.delete', async () => {
//       await alphaClient.workflowDefinition.delete({
//         workflowDefinitionId: createdWorkflowDefinition.sys.id,
//         version: createdWorkflowDefinition.sys.version,
//       })
//     })

//     test('workflowDefinition.get', async () => {
//       const workflowDefinition = await alphaClient.workflowDefinition.get({
//         ...defaultParams,
//         workflowDefinitionId: createdWorkflowDefinition.sys.id,
//         version: createdWorkflowDefinition.sys.version,
//       })

//       expect(workflowDefinition.name).to.eq(workflowDefinitionMock.name)
//     })

//     test('workflowDefinition.update', async () => {
//       const newName = 'Test Renamed WorkflowDefinition'
//       const updatedWorkflowDefinition = await alphaClient.workflowDefinition.update(
//         {
//           ...defaultParams,
//           workflowDefinitionId: createdWorkflowDefinition.sys.id,
//         },
//         {
//           ...workflowDefinitionPayload,
//           name: newName,
//           sys: {
//             version: createdWorkflowDefinition.sys.version,
//           },
//         }
//       )

//       const workflowDefinition = await alphaClient.workflowDefinition.get({
//         ...defaultParams,
//         workflowDefinitionId: updatedWorkflowDefinition.sys.id,
//         version: updatedWorkflowDefinition.sys.version,
//       })

//       expect(workflowDefinition.name).to.eq(newName)
//     })
//   })
// })
