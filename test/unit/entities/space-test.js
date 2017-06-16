/* global test, jest, expect */
import {spaceMock, mockCollection} from '../mocks/entities'
import {wrapSpace, wrapSpaceCollection, __RewireAPI__ as spaceRewireApi} from '../../../lib/entities/space'

const httpMock = {
  httpClientParams: {},
  cloneWithNewParams: jest.fn()
}

function setup () {
  spaceRewireApi.__Rewire__('rateLimit', jest.fn())
}

function teardown () {
  spaceRewireApi.__ResetDependency__('rateLimit', jest.fn())
}

test('Space is wrapped', () => {
  setup()
  const wrappedSpace = wrapSpace(httpMock, spaceMock)
  expect(wrappedSpace.toPlainObject()).toEqual(spaceMock)
  teardown()
})

test('Space collection is wrapped', () => {
  setup()
  const spaceCollection = mockCollection(spaceMock)
  const wrappedSpace = wrapSpaceCollection(httpMock, spaceCollection)
  expect(wrappedSpace.toPlainObject()).toEqual(spaceCollection)
  teardown()
})
