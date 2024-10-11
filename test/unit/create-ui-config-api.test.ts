import { describe, test, afterEach, vi } from 'vitest'
import createUIConfigApi from '../../lib/create-ui-config-api'
import { wrapUIConfig } from '../../lib/entities/ui-config'
import { cloneMock } from './mocks/entities'
import setupMakeRequest from './mocks/makeRequest'
import { entityUpdateTest, failingVersionActionTest } from './test-creators/instance-entity-methods'

function setup(promise) {
  const makeRequest = setupMakeRequest(promise)
  const uiConfigMock = cloneMock('uiConfig')
  const api = createUIConfigApi(makeRequest)

  return {
    api: {
      ...api,
      toPlainObject: () => uiConfigMock,
    },
    makeRequest,
    entityMock: uiConfigMock,
  }
}

describe('createUIConfigApi', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('UIConfig update', async () => {
    await entityUpdateTest(setup, {
      wrapperMethod: wrapUIConfig,
    })
  })

  test('UIConfig update fails', async () => {
    await failingVersionActionTest(setup, {
      wrapperMethod: wrapUIConfig,
      actionMethod: 'update',
    })
  })
})
