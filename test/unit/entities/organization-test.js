/* global test */
import { cloneMock } from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import { wrapOrganizationCollection } from '../../../lib/entities/organization'
import {
  entityCollectionWrappedTest
} from '../test-creators/instance-entity-methods'

function setup (promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('organization')
  }
}

test('Organization collection is wrapped', () => {
  entityCollectionWrappedTest(setup, {
    wrapperMethod: wrapOrganizationCollection
  })
})
