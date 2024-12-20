import { describe, test } from 'vitest'
import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import {
  wrapPreviewApiKey,
  wrapPreviewApiKeyCollection,
} from '../../../lib/entities/preview-api-key'
import {
  entityCollectionWrappedTest,
  entityWrappedTest,
} from '../test-creators/instance-entity-methods'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('previewApiKey'),
  }
}

describe('PreviewApiKey', () => {
  test('PreviewApiKey is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapPreviewApiKey,
    })
  })

  test('PreviewApiKey collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapPreviewApiKeyCollection,
    })
  })
})
