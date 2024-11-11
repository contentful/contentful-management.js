import { describe, test } from 'mocha'
import { wrapUploadCredential } from '../../../lib/entities/upload-credential'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { entityWrappedTest } from '../test-creators/instance-entity-methods'

function setup(promise: Promise<unknown>) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('uploadCredential'),
  }
}

describe('Entity Upload credential', () => {
  test('UploadCredential is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapUploadCredential,
    })
  })
})
