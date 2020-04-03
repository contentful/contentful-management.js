import test from 'blue-tape'
import {cloneMock} from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import {
  entityWrappedTest
} from '../test-creators/instance-entity-methods'
import { wrapInvitation } from '../../../lib/entities/invitation'

function setup (promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('invitation')
  }
}

test('Invitation is wrapped', (t) => {
  entityWrappedTest(t, setup, {
    wrapperMethod: wrapInvitation
  })
})
