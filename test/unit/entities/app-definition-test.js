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
import { describe, test } from 'mocha'

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

  test.skip('AppDefinition update fails', async () => {
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

  test.skip('AppDefinition delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapAppDefinition,
      actionMethod: 'delete',
    })
  })
})
