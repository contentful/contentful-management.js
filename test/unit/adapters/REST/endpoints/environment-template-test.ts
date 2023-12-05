import { describe, test } from 'mocha'
import { cloneMock } from '../../../mocks/entities'
import { wrapEnvironmentTemplate } from '../../../../../lib/entities/environment-template'
import { expect } from 'chai'
import setupRestAdapter from '../helpers/setupRestAdapter'
import type { MakeRequest, MakeRequestOptions } from '../../../../../lib/export-types'

function setup(promise = Promise.resolve({ data: {} }), params = {}) {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock('environmentTemplate'),
  }
}

describe('Environment Template', async () => {
  test('environment template', async () => {
    const { httpMock, adapterMock, entityMock } = setup()
    entityMock.sys.version = 2
    console.log('entityMock', entityMock)

    const entity = wrapEnvironmentTemplate(
      ((...args: [MakeRequestOptions]) => adapterMock.makeRequest(...args)) as MakeRequest,
      entityMock,
      'org-id'
    )

    // console.log('entity', entity)
    // console.log('entity.getVersions()', await entity.getVersions())

    // return entity.getVersions().then((response) => {
    return entity.update().then((response) => {
      console.log('response', response)

      expect(response.toPlainObject, 'response is wrapped').to.be.ok
      expect(httpMock.put.args[0][2].headers['X-Contentful-Version']).equals(
        2,
        'version header is sent for first template'
      )

      return {
        httpMock,
        entityMock,
        response,
      }
    })
  })
})
