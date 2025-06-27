import { describe, it } from 'vitest'
import { cloneMock } from '../mocks/entities.js'
import setupMakeRequest from '../mocks/makeRequest.js'

import { wrapRelease, wrapReleaseCollection } from '../../../lib/entities/release.js'
import {
  entityWrappedTest,
  entityCollectionWrappedTest,
  entityDeleteTest,
  entityUpdateTest,
} from '../test-creators/instance-entity-methods.js'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('release'),
  }
}

describe('Entity Release', () => {
  it('Release is wrapped', async () => {
    return entityWrappedTest(setup, { wrapperMethod: wrapRelease })
  })

  it('Release collection is wrapped', async () => {
    return entityCollectionWrappedTest(setup, {
      wrapperMethod: wrapReleaseCollection,
    })
  })

  it('Release update', async () => {
    return entityUpdateTest(setup, {
      wrapperMethod: wrapRelease,
    })
  })

  it('Release delete', async () => {
    return entityDeleteTest(setup, {
      wrapperMethod: wrapRelease,
    })
  })
})
