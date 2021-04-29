import {
  organizationMock,
  personalAccessTokenMock,
  setupEntitiesMock,
  spaceMock,
  usageMock,
  userMock,
} from './mocks/entities'
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
import setupMakeRequest from './mocks/makeRequest'

function setup(promise) {
  const entitiesMock = setupEntitiesMock(createContentfulApiRewireApi)
  const makeRequest = setupMakeRequest(promise)
  const api = createContentfulApi(makeRequest)
  return {
    api,
    makeRequest,
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
      const { api, makeRequest, entitiesMock } = setup(Promise.resolve({ data: data }))
      entitiesMock.space.wrapSpace.returns(data)

      const space = await api.createSpace({ name: 'name' }, 'orgid')
      expect(space).to.eq(data)
      expect(makeRequest.args[0][0].params).to.deep.equal({ organizationId: 'orgid' })
      expect(makeRequest.args[0][0].payload).to.deep.equal({ name: 'name' })
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

    test('API call getCurrentUser with extra params', async () => {
      const { api, makeRequest, entitiesMock } = setup(Promise.resolve(userMock))
      entitiesMock.user.wrapUser.returns(userMock)

      await api.getCurrentUser({ query: { foo: 'bar' } })
      expect(makeRequest.args[0][0].params).to.deep.eql({ query: { foo: 'bar' } })
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
      const { api, makeRequest, entitiesMock } = setup(Promise.resolve({ data: data }))
      entitiesMock.personalAccessToken.wrapPersonalAccessToken.returns(data)

      const result = await api.createPersonalAccessToken({ name: 'name' }, 'orgid')
      expect(result).to.eq(data)
      expect(makeRequest.args[0][0].payload).to.deep.eql({ name: 'name' })
    })
  })

  describe('with raw api', () => {
    test('API call rawRequest', async () => {
      const makeRequest = sinon.stub().resolves({ response: true })

      const api = createContentfulApi(makeRequest)

      const result = await api.rawRequest({
        url: 'url',
        opts: true,
      })
      expect(result).to.eql({
        response: true,
      })

      expect(makeRequest.args[0][0].params).to.eql({
        url: 'url',
        config: {
          opts: true,
        },
      })
    })
  })
})
