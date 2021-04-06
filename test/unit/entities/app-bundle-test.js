import { cloneMock } from '../mocks/entities'
import setupMakeRequest from '../mocks/makeRequest'
import { wrapAppBundle, wrapAppBundleCollection } from '../../../lib/entities/app-bundle'
import {
  entityCollectionWrappedTest,
  entityWrappedTest,
  entityDeleteTest,
} from '../test-creators/instance-entity-methods'
import { describe, test } from 'mocha'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('appBundle'),
  }
}

describe('Entity AppBundle', () => {
  test('AppBundle is wrapped', async () => {
    return entityWrappedTest(setup, { wrapperMethod: wrapAppBundle })
  })

  test('AppBundle collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapAppBundleCollection,
    })
  })

  test('AppBundle delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapAppBundle,
    })
  })
})
