import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapContentSemanticsIndex } from '../../../lib/entities/content-semantics-index'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'
import { describe, test } from 'vitest'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('contentSemanticsIndex'),
  }
}

describe('Entity ContentSemanticsIndex', () => {
  test('ContentSemanticsIndex is wrapped', async () => {
    return entityWrappedTest(setup, { wrapperMethod: wrapContentSemanticsIndex })
  })
})
