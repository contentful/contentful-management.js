/* global test, expect */
import { Promise } from 'es6-promise'

import {spaceMock, setupEntitiesMock, organizationMock} from './mocks/entities'
import setupHttpMock from './mocks/http'
import createContentfulApi, {__RewireAPI__ as createContentfulApiRewireApi} from '../../lib/create-contentful-api'
import {makeGetEntityTest, makeGetCollectionTest, makeEntityMethodFailingTest} from './test-creators/static-entity-methods'

function setup (promise) {
  const entitiesMock = setupEntitiesMock(createContentfulApiRewireApi)
  const httpMock = setupHttpMock(promise)
  const api = createContentfulApi({ http: httpMock })
  return {
    api,
    httpMock,
    entitiesMock
  }
}

function teardown () {
  createContentfulApiRewireApi.__ResetDependency__('entities')
}

test('API call getSpaces', () => {
  makeGetCollectionTest(setup, teardown, {
    entityType: 'space',
    mockToReturn: spaceMock,
    methodToTest: 'getSpaces'
  })
})

test('API call getSpaces fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getSpaces'
  })
})

test('API call getSpace', () => {
  makeGetEntityTest(setup, teardown, {
    entityType: 'space',
    mockToReturn: spaceMock,
    methodToTest: 'getSpace'
  })
})

test('API call getSpace fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getSpace'
  })
})

test('API call getOrganizations', () => {
  makeGetCollectionTest(setup, teardown, {
    entityType: 'organization',
    mockToReturn: organizationMock,
    methodToTest: 'getOrganizations'
  })
})

test('API call getOrganizations fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'getOrganizations'
  })
})

test('API call createSpace', () => {
  const data = {
    sys: { id: 'id', type: 'Space' },
    name: 'name'
  }
  const {api, httpMock, entitiesMock} = setup(Promise.resolve({ data: data }))
  entitiesMock.space.wrapSpace.mockReturnValue(data)

  return api.createSpace({name: 'name'}, 'orgid')
  .then((r) => {
    expect(r).toEqual(data)
    expect(httpMock.post.mock.calls[0][1]).toEqual({name: 'name'})
    expect(httpMock.post.mock.calls[0][2].headers['X-Contentful-Organization']).toBe('orgid')
    teardown()
  })
})

test('API call createSpace fails', () => {
  makeEntityMethodFailingTest(setup, teardown, {
    methodToTest: 'createSpace'
  })
})
