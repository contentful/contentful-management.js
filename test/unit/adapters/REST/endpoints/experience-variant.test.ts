import { describe, expect, test } from 'vitest'
import setupRestAdapter from '../helpers/setupRestAdapter'

const experienceParams = {
  spaceId: 'space123',
  environmentId: 'master',
  experienceId: 'experience123',
}

const variantParams = {
  ...experienceParams,
  variantId: 'variant123',
}

const variantResponse = {
  sys: {
    id: 'variant123',
    type: 'Experience',
    version: 1,
    variant: 'variant123',
    variantType: 'ab-test',
    variantDimension: 'audience',
  },
  name: 'Optimization Variant',
  description: 'An optimization variant',
  viewports: [],
  designProperties: {},
}

describe('Rest ExperienceVariant', { concurrent: true }, () => {
  test('getMany calls the optimization variant URL and passes query parameters', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: { sys: { type: 'Array' }, items: [] } }),
    )

    return adapterMock
      .makeRequest({
        entityType: 'ExperienceVariant',
        action: 'getMany',
        userAgent: 'mocked',
        params: {
          ...experienceParams,
          query: { 'sys.archivedAt[exists]': true },
        },
      })
      .then(() => {
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experiences/experience123/optimization_variants',
        )
        expect(httpMock.get.mock.calls[0][1].params).to.eql({ 'sys.archivedAt[exists]': true })
        expect(httpMock.get.mock.calls[0][1].headers['x-contentful-enable-alpha-feature']).to.eql(
          'new-exo-entity-types',
        )
      })
  })

  test('get calls the optimization variant URL', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: variantResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ExperienceVariant',
        action: 'get',
        userAgent: 'mocked',
        params: variantParams,
      })
      .then((result) => {
        expect(result).to.eql(variantResponse)
        expect(httpMock.get.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experiences/experience123/optimization_variants/variant123',
        )
      })
  })

  test('create calls the optimization variant URL with POST', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: variantResponse }))
    const payload = {
      name: 'Optimization Variant',
      description: 'An optimization variant',
      viewports: [],
      designProperties: {},
      experienceTemplate: {
        sys: {
          type: 'ResourceLink',
          linkType: 'Contentful:ExperienceTemplate',
          urn: 'crn:contentful:::experience-template/template123',
        },
      },
    }

    return adapterMock
      .makeRequest({
        entityType: 'ExperienceVariant',
        action: 'create',
        userAgent: 'mocked',
        params: experienceParams,
        payload,
      })
      .then((result) => {
        expect(result).to.eql(variantResponse)
        expect(httpMock.post.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experiences/experience123/optimization_variants',
        )
        expect(httpMock.post.mock.calls[0][1]).to.eql(payload)
      })
  })

  test('upsert calls the optimization variant URL and sends the version header', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: variantResponse }))
    const payload = {
      sys: { id: 'variant123', type: 'Experience', version: 2 },
      name: 'Updated Optimization Variant',
      description: 'An updated optimization variant',
      viewports: [],
      designProperties: {},
    }

    return adapterMock
      .makeRequest({
        entityType: 'ExperienceVariant',
        action: 'upsert',
        userAgent: 'mocked',
        params: variantParams,
        payload,
      })
      .then(() => {
        expect(httpMock.put.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experiences/experience123/optimization_variants/variant123',
        )
        expect(httpMock.put.mock.calls[0][1].sys).to.be.undefined
        expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).to.eql(2)
      })
  })

  test('delete calls the optimization variant URL', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: {} }))

    return adapterMock
      .makeRequest({
        entityType: 'ExperienceVariant',
        action: 'delete',
        userAgent: 'mocked',
        params: variantParams,
      })
      .then(() => {
        expect(httpMock.delete.mock.calls[0][0]).to.eql(
          '/spaces/space123/environments/master/experiences/experience123/optimization_variants/variant123',
        )
      })
  })

  test.each([
    ['publish', 'put', 'published'],
    ['unpublish', 'delete', 'published'],
    ['archive', 'put', 'archived'],
    ['unarchive', 'delete', 'archived'],
  ])('%s calls the action URL with the version header', async (action, method, suffix) => {
    const { httpMock, adapterMock } = setupRestAdapter(Promise.resolve({ data: variantResponse }))

    return adapterMock
      .makeRequest({
        entityType: 'ExperienceVariant',
        action,
        userAgent: 'mocked',
        params: { ...variantParams, version: 3 },
      })
      .then(() => {
        const request = httpMock[method].mock.calls[0]
        expect(request[0]).to.eql(
          `/spaces/space123/environments/master/experiences/experience123/optimization_variants/variant123/${suffix}`,
        )
        if (method === 'put') {
          expect(request[1]).to.eql(null)
          expect(request[2].headers['X-Contentful-Version']).to.eql(3)
        } else {
          expect(request[1].headers['X-Contentful-Version']).to.eql(3)
        }
      })
  })
})
