import { describe, it } from 'vitest'
import { cloneMock } from '../mocks/entities.js'
import setupMakeRequest from '../mocks/makeRequest.js'
import { entityWrappedTest, entityActionTest } from '../test-creators/instance-entity-methods.js'
import { wrapReleaseAction } from '../../../lib/entities/release-action.js'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('releaseAction'),
  }
}

describe('Entity ReleaseAction', () => {
  it('ReleaseAction is wrapped', async () => {
    return entityWrappedTest(setup, { wrapperMethod: wrapReleaseAction })
  })

  it('ReleaseAction get', async () => {
    return entityActionTest(setup, { wrapperMethod: wrapReleaseAction, actionMethod: 'get' })
  })
})
