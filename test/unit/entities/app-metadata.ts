import setupHttpMock from '../mocks/http'
import { wrapAppMetadata } from '../../../lib/entities/app-metadata'
import {
  entityWrappedTest,
  entityDeleteTest,
  failingActionTest,
} from '../test-creators/instance-entity-methods'
import { appMetadataMock } from '../mocks/entities'
import { describe, test } from 'mocha'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: appMetadataMock,
  }
}

describe('App Metadata', () => {
  test('Metadata is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapAppMetadata,
    })
  })

  test('Metadata delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapAppMetadata,
    })
  })

  test('Metadata delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapAppMetadata,
      actionMethod: 'delete',
    })
  })
})
