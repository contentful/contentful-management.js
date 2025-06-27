import { describe, test } from 'vitest'
import { wrapUploadCredential } from '../../../lib/entities/upload-credential.js'
import { cloneMock } from '../mocks/entities.js'
import setupMakeRequest from '../mocks/makeRequest.js'
import { entityWrappedTest } from '../test-creators/instance-entity-methods.js'

function setup(promise) {
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
