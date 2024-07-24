import { wrapAppSigningSecret } from '../../../lib/entities/app-signing-secret'
import {
  entityWrappedTest,
  entityDeleteTest,
  failingActionTest,
} from '../test-creators/instance-entity-methods'
import { appSigningSecretMock } from '../mocks/entities'
import { describe, test } from 'vitest'
import setupMakeRequest from '../mocks/makeRequest'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: appSigningSecretMock,
  }
}

describe('App SigningSecret', () => {
  test('SigningSecret is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapAppSigningSecret,
    })
  })

  test('SigningSecret delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapAppSigningSecret,
    })
  })

  test('SigningSecret delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapAppSigningSecret,
      actionMethod: 'delete',
    })
  })
})
