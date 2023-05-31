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
  const userUIConfigMock = cloneMock('userUIConfig')
  const api = createUIConfigApi(makeRequest)
  api.toPlainObject = () => userUIConfigMock
  return {
    api,
    makeRequest,
    entityMock: userUIConfigMock,
  }
}

describe('createUserUIConfigApi', () => {
  afterEach(() => {
    createUIConfigApiRewireApi.__ResetDependency__('entities')
  })

  test('UserUIConfig update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapUIConfig,
    })
  })

  test('UserUIConfig update fails', async () => {
    return failingVersionActionTest(setup, {
      wrapperMethod: wrapUIConfig,
      actionMethod: 'update',
    })
  })
})
