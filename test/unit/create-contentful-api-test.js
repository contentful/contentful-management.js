import {
  organizationMock,
  personalAccessTokenMock,
  setupEntitiesMock,
  spaceMock,
  usageMock,
  userMock,
} from './mocks/entities'
import setupHttpMock from './mocks/http'
import createContentfulApi, {
  __RewireAPI__ as createContentfulApiRewireApi,
} from '../../lib/create-contentful-api'
import {
  makeEntityMethodFailingTest,
  makeGetCollectionTest,
  makeGetEntityTest,
} from './test-creators/static-entity-methods'
import { afterEach, describe, test } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'

function setup(promise) {
  const entitiesMock = setupEntitiesMock(createContentfulApiRewireApi)
  const httpMock = setupHttpMock(promise)
  const api = createContentfulApi({ http: httpMock })
  return {
    api,
    httpMock,
    entitiesMock,
  }
}

describe('A createContentfulApi', () => {
  afterEach(() => {
    createContentfulApiRewireApi.__ResetDependency__('entities')
  })

  describe('with space api', () => {
    test('API call getSpaces', async () =>
      makeGetCollectionTest(setup, {
        entityType: 'space',
        mockToReturn: spaceMock,
        methodToTest: 'getSpaces',
      }))

    test('API call getSpaces fails', async () =>
      makeEntityMethodFailingTest(setup, {
        methodToTest: 'getSpaces',
      }))

    test('API call getSpace', async () =>
      makeGetEntityTest(setup, {
        entityType: 'space',
        mockToReturn: spaceMock,
        methodToTest: 'getSpace',
      }))

    test('API call getSpace fails', async () =>
      makeEntityMethodFailingTest(setup, {
        methodToTest: 'getSpace',
      }))

    test('API call createSpace', async () => {
      const data = {
        sys: {
          id: 'id',
          type: 'Space',
        },
        name: 'name',
      }
      const { api, httpMock, entitiesMock } = setup(Promise.resolve({ data: data }))
      entitiesMock.space.wrapSpace.returns(data)

      const space = await api.createSpace({ name: 'name' }, 'orgid')
      expect(space).to.eq(data)
      expect(httpMock.post.args[0][1]).to.eql({ name: 'name' })
      expect(httpMock.post.args[0][2].headers['X-Contentful-Organization']).to.eq('orgid')
    })

    test('API call createSpace fails', async () =>
      makeEntityMethodFailingTest(setup, {
        methodToTest: 'createSpace',
      }))
  })

  describe('with org api', () => {
    test('API call getOrganization', async () => {
      const organizationMock2 = Object.assign({}, organizationMock, { sys: { id: 'eid' } })
      const getOrganizationSetup = () =>
        setup(Promise.resolve({ data: { items: [organizationMock, organizationMock2] } }))
      await makeGetEntityTest(getOrganizationSetup, {
        entityType: 'organization',
        mockToReturn: organizationMock2,
        methodToTest: 'getOrganization',
      })
    })

    test('API call getOrganization fails because org ID was not found in results', async () => {
      const { api, entitiesMock } = setup(Promise.resolve({ data: { items: [organizationMock] } }))
      entitiesMock.organization.wrapOrganization.returns(organizationMock)
      try {
        await api.getOrganization('non-existent-id')
      } catch (e) {
        expect(e).to.not.be.null
      }
    })

    test('API call getOrganization fails', async () =>
      makeEntityMethodFailingTest(setup, {
        methodToTest: 'getOrganization',
      }))

    test('API call getOrganizations', async () =>
      makeGetCollectionTest(setup, {
        entityType: 'organization',
        mockToReturn: organizationMock,
        methodToTest: 'getOrganizations',
      }))

    test('API call getOrganizations fails', async () =>
      makeEntityMethodFailingTest(setup, {
        methodToTest: 'getOrganizations',
      }))
  })

  describe('with org usage api', () => {
    test('API call getOrganizationUsage', async () =>
      makeGetCollectionTest(setup, {
        entityType: 'usage',
        mockToReturn: usageMock,
        methodToTest: 'getOrganizationUsage',
      }))

    test('API call getOrganizationUsage fails', async () =>
      makeEntityMethodFailingTest(setup, {
        methodToTest: 'getOrganizationUsage',
      }))
  })

  describe('with space-usage api', () => {
    test('API call getSpaceUsage', async () => {
      await makeGetCollectionTest(setup, {
        entityType: 'usage',
        mockToReturn: usageMock,
        methodToTest: 'getSpaceUsage',
      })
    })

    test('API call getSpaceUsage fails', async () => {
      await makeEntityMethodFailingTest(setup, {
        methodToTest: 'getSpaceUsage',
      })
    })
  })

  describe('with user api', () => {
    test('API call getCurrentUser', () => {
      makeGetEntityTest(setup, {
        entityType: 'user',
        mockToReturn: userMock,
        methodToTest: 'getCurrentUser',
      })
    })

    test('API call getCurrentUser fails', async () => {
      await makeEntityMethodFailingTest(setup, {
        methodToTest: 'getCurrentUser',
      })
    })
  })

  describe('with personal-access-token api', () => {
    test('API call getPersonalAccessToken', async () => {
      await makeGetEntityTest(setup, {
        entityType: 'personalAccessToken',
        mockToReturn: personalAccessTokenMock,
        methodToTest: 'getPersonalAccessToken',
      })
    })
    test('API call getPersonalAccessToken fails', async () => {
      await makeEntityMethodFailingTest(setup, {
        methodToTest: 'getPersonalAccessToken',
      })
    })

    test('API call getPersonalAccessTokens fails', async () => {
      await makeEntityMethodFailingTest(setup, {
        methodToTest: 'getPersonalAccessTokens',
      })
    })

    test('API call getPersonalAccessTokens', async () => {
      await makeGetCollectionTest(setup, {
        entityType: 'personalAccessToken',
        mockToReturn: personalAccessTokenMock,
        methodToTest: 'getPersonalAccessTokens',
      })
    })

    test('API call createSpace', async () => {
      const data = {
        sys: {
          id: 'id',
          type: 'AccessToken',
        },
        name: 'name',
      }
      const { api, httpMock, entitiesMock } = setup(Promise.resolve({ data: data }))
      entitiesMock.personalAccessToken.wrapPersonalAccessToken.returns(data)

      const result = await api.createPersonalAccessToken({ name: 'name' }, 'orgid')
      expect(result).to.eq(data)
      expect(httpMock.post.args[0][1]).to.eql({ name: 'name' })
    })
  })

  describe('with raw api', () => {
    test('API call rawRequest', async () => {
      const httpMock = sinon.stub().resolves({
        data: {
          response: true,
        },
      })

      const api = createContentfulApi({ http: httpMock })

      const result = await api.rawRequest({ opts: true })
      expect(result).to.eql({
        response: true,
      })

      expect(httpMock.args[0][0]).to.eql({
        opts: true,
      })
    })
  })
})
