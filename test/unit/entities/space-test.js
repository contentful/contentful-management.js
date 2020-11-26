import { afterEach, beforeEach, describe, test } from 'mocha'
import sinon from 'sinon'
import { mockCollection, spaceMock } from '../mocks/entities'
import {
  __RewireAPI__ as spaceRewireApi,
  wrapSpace,
  wrapSpaceCollection,
} from '../../../lib/entities/space'
import { expect } from 'chai'

const httpMock = {
  httpClientParams: {},
  cloneWithNewParams: sinon.stub(),
}

describe('Entity Space', () => {
  beforeEach(() => {
    spaceRewireApi.__Rewire__('rateLimit', sinon.stub())
  })

  afterEach(() => {
    spaceRewireApi.__ResetDependency__('rateLimit', sinon.stub())
  })

  test('Space is wrapped', async () => {
    const wrappedSpace = wrapSpace(httpMock, spaceMock)
    expect(wrappedSpace.toPlainObject()).eql(spaceMock)
  })

  test('Space collection is wrapped', async () => {
    const spaceCollection = mockCollection(spaceMock)
    const wrappedSpace = wrapSpaceCollection(httpMock, spaceCollection)
    expect(wrappedSpace.toPlainObject()).eql(spaceCollection)
  })
})
