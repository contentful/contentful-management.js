import {
  wrapAppDefinition,
  wrapAppDefinitionCollection,
} from '../../../lib/entities/app-definition'
import setupMakeRequest from '../mocks/makeRequest'
import { appDefinitionMock } from '../mocks/entities'
import {
  entityCollectionWrappedTest,
  entityDeleteTest,
  entityUpdateTest,
  entityWrappedTest,
  failingActionTest,
  failingVersionActionTest,
} from '../test-creators/instance-entity-methods'
import { describe, test } from 'vitest'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: appDefinitionMock,
  }
}

describe('Entity AppDefinition', () => {
  test('AppDefinition is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapAppDefinition,
    })
  })

  test('AppDefinition collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapAppDefinitionCollection,
    })
  })

  test('AppDefinition update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapAppDefinition,
    })
  })

  test('AppDefinition update preserves internal agent payload', async () => {
    const { makeRequest, entityMock } = setup(Promise.resolve(appDefinitionMock))
    const entity = wrapAppDefinition(makeRequest, entityMock)

    entity.agent = { id: 'mocked-agent-id' }

    await entity.update()

    expect(makeRequest.mock.calls[0][0].payload).toMatchObject({
      agent: { id: 'mocked-agent-id' },
      name: appDefinitionMock.name,
    })
  })

  test('AppDefinition update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapAppDefinition,
      actionMethod: 'update',
    })
  })

  test('AppDefinition delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapAppDefinition,
    })
  })

  test('AppDefinition delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapAppDefinition,
      actionMethod: 'delete',
    })
  })
})
