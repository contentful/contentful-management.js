import { describe, it } from 'mocha'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { entityWrappedTest, entityActionTest } from '../test-creators/instance-entity-methods'
import { wrapReleaseAction } from '../../../lib/entities/release-action'

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

  it('Release get', async () => {
    return entityActionTest(setup, { wrapperMethod: wrapReleaseAction, actionMethod: 'get' })
  })
})
