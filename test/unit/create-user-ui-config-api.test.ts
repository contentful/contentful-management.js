import { describe, test, afterEach, vi } from 'vitest'
import createUIConfigApi from '../../lib/create-ui-config-api'
import { wrapUIConfig } from '../../lib/entities/ui-config'
import { cloneMock } from './mocks/entities'
import setupMakeRequest from './mocks/makeRequest'
import { entityUpdateTest, failingVersionActionTest } from './test-creators/instance-entity-methods'

function setup(promise) {
  const makeRequest = setupMakeRequest(promise)
  const userUIConfigMock = cloneMock('userUIConfig')
  const api = createUIConfigApi(makeRequest)

  return {
    api: {
      ...api,
      toPlainObject: () => userUIConfigMock,
    },
    makeRequest,
    entityMock: userUIConfigMock,
  }
}

describe('createUserUIConfigApi', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('UserUIConfig update', async () => {
    await entityUpdateTest(setup, {
      wrapperMethod: wrapUIConfig,
    })
  })

  test('UserUIConfig update fails', async () => {
    await failingVersionActionTest(setup, {
      wrapperMethod: wrapUIConfig,
      actionMethod: 'update',
    })
  })
})
