import { describe, test, expect } from 'vitest'
import { cloneMock, mockCollection, spaceMock } from '../mocks/entities.js'
import type { Space } from '../../../lib/entities/space.js'
import { wrapSpace, wrapSpaceCollection } from '../../../lib/entities/space.js'
import setupMakeRequest from '../mocks/makeRequest.js'

function setup(promise) {
  return {
    makeRequest: setupMakeRequest(promise),
    entityMock: cloneMock('space'),
  }
}
describe('Entity Space', () => {
  test('Space is wrapped', async () => {
    const { makeRequest } = setup(Promise.resolve)
    const wrappedSpace = wrapSpace(makeRequest, spaceMock)
    expect(wrappedSpace.toPlainObject()).eql(spaceMock)
  })

  test('Space collection is wrapped', async () => {
    const { makeRequest } = setup(Promise.resolve)
    const spaceCollection = mockCollection<Space>(spaceMock)
    const wrappedSpace = wrapSpaceCollection(makeRequest, spaceCollection)
    expect(wrappedSpace.toPlainObject()).eql(spaceCollection)
  })
})
