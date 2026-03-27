import { expect, describe, test } from 'vitest'
import { cloneMock } from '../../../mocks/entities'
import { wrapSpace } from '../../../../../lib/entities/space'
import setupRestAdapter from '../helpers/setupRestAdapter'

function setup(promise, params = {}) {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock('space'),
  }
}

describe('Rest Space', () => {
  test('Space getEligibleLicenses', async () => {
    const mockResponse = [
      {
        name: 'Test License',
        id: 'test-license-id',
        count: 2,
        quotas: {
          contentTypes: 50,
          records: 10000,
          environments: 1,
        },
      },
    ]
    const { httpMock, adapterMock, entityMock } = setup(
      Promise.resolve({ data: mockResponse }),
    )
    const entity = wrapSpace((...args) => adapterMock.makeRequest(...args), entityMock)
    return entity.getEligibleLicenses().then((response) => {
      expect(httpMock.get.mock.calls[0][0]).equals(
        `/spaces/${entityMock.sys.id}/eligible_licenses`,
        'url is correct',
      )
      expect(response).toEqual(mockResponse)
      return {
        httpMock,
        entityMock,
        response,
      }
    })
  })
})
