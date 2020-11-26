import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import {
  wrapEnvironmentAlias,
  wrapEnvironmentAliasCollection,
} from '../../../lib/entities/environment-alias'
import {
  entityCollectionWrappedTest,
  entityUpdateTest,
  entityWrappedTest,
  failingVersionActionTest,
} from '../test-creators/instance-entity-methods'
import { describe, test } from 'mocha'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('environmentAlias'),
  }
}

describe('Entity EnvironmentAlias', () => {
  test('Environment alias is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapEnvironmentAlias,
    })
  })

  test('Environment alias collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapEnvironmentAliasCollection,
    })
  })

  test('Environment alias update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapEnvironmentAlias,
    })
  })

  test('Environment alias update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapEnvironmentAlias,
      actionMethod: 'update',
    })
  })
})
