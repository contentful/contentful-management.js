import setupRestAdapter from '../helpers/setupRestAdapter'
import { cloneMock } from '../../../mocks/entities'
import { expect, it } from 'vitest'

export function reusableEntityUpdateTest(entityType, mockName) {
  it(`emits valid update request`, async () => {
    const entityMock = cloneMock(mockName)
    entityMock.name = 'updated name'
    entityMock.sys.version = 2

    const { adapterMock, httpMock } = setupRestAdapter(Promise.resolve({ data: entityMock }))

    await adapterMock.makeRequest({
      entityType,
      action: 'update',
      params: {},
      payload: entityMock,
      headers: { 'X-Test': 'test header' },
    })

    expect(httpMock.put.mock.calls[0][1].name).equals('updated name', 'data is sent')
    expect(httpMock.put.mock.calls[0][1].sys).equals(undefined, 'sys is removed')
    expect(httpMock.put.mock.calls[0][2].headers['X-Contentful-Version']).equals(
      2,
      'version header is sent'
    )
    expect(httpMock.put.mock.calls[0][2].headers['X-Test']).equals(
      'test header',
      'custom header is set'
    )
  })
}
