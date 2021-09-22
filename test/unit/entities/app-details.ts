import setupHttpMock from '../mocks/http'
import { wrapAppDetails } from '../../../lib/entities/app-details'
import {
  entityWrappedTest,
  entityDeleteTest,
  failingActionTest,
} from '../test-creators/instance-entity-methods'
import { appDetailsMock } from '../mocks/entities'
import { describe, test } from 'mocha'

function setup(promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: appDetailsMock,
  }
}

describe('App Details', () => {
  test('Details is wrapped', async () => {
    return entityWrappedTest(setup, {
      wrapperMethod: wrapAppDetails,
    })
  })

  test('Details delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapAppDetails,
    })
  })

  test('Details delete fails', async () => {
    return failingActionTest(setup, {
      wrapperMethod: wrapAppDetails,
      actionMethod: 'delete',
    })
  })
})
