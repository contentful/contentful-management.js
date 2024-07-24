import { cloneMock, environmentMock, mockCollection } from '../mocks/entities'
import {
  EnvironmentProps,
  wrapEnvironment,
  wrapEnvironmentCollection,
} from '../../../lib/entities/environment'
import { describe, test, expect } from 'vitest'
import setupMakeRequest from '../mocks/makeRequest'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('environment'),
  }
}

describe('Entity Environment', () => {
  test('Environment is wrapped', async () => {
    const { makeRequest } = setup(Promise.resolve())
    const wrappedEnvironment = wrapEnvironment(makeRequest, environmentMock)
    expect(wrappedEnvironment.toPlainObject()).eql(environmentMock)
  })

  test('Environment collection is wrapped', async () => {
    const { makeRequest } = setup(Promise.resolve())
    const environmentCollection = mockCollection<EnvironmentProps>(environmentMock)
    const wrappedEnvironment = wrapEnvironmentCollection(makeRequest, environmentCollection)
    expect(wrappedEnvironment.toPlainObject()).eql(environmentCollection)
  })
})
