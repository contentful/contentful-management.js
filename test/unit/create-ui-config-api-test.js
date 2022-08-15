import { afterEach, describe, test } from 'mocha'
import createUIConfigApi, {
  __RewireAPI__ as createUIConfigApiRewireApi,
} from '../../lib/create-ui-config-api'
import { wrapUIConfig } from '../../lib/entities/ui-config'
import { cloneMock } from './mocks/entities'
import setupMakeRequest from './mocks/makeRequest'
import { entityUpdateTest, failingVersionActionTest } from './test-creators/instance-entity-methods'

function setup(promise) {
  const makeRequest = setupMakeRequest(promise)
  const uiConfigMock = cloneMock('uiConfig')
  const api = createUIConfigApi(makeRequest)
  api.toPlainObject = () => uiConfigMock
  return {
    api,
    makeRequest,
    entityMock: uiConfigMock,
  }
}

describe('createUIConfigApi', () => {
  afterEach(() => {
    createUIConfigApiRewireApi.__ResetDependency__('entities')
  })

  test('UIConfig update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapUIConfig,
    })
  })

  test('UIConfig update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapUIConfig,
      actionMethod: 'update',
    })
  })
})
