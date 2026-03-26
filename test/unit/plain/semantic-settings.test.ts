import { describe, test, expect } from 'vitest'
import { createClient } from '../../../lib/index'
import setupRestAdapter from '../adapters/REST/helpers/setupRestAdapter'
import { semanticSettingsMock } from '../mocks/entities'

describe('SemanticSettings', () => {
  const organizationId = 'mock-org-id'

  test('get', async () => {
    const { httpMock, adapterMock } = setupRestAdapter(
      Promise.resolve({ data: semanticSettingsMock }),
    )
    const plainClient = createClient({ apiAdapter: adapterMock }, { type: 'plain' })
    const response = await plainClient.semanticSettings.get({ organizationId })

    expect(response).toBeInstanceOf(Object)
    expect(response.sys.type).toBe('ContentSemanticsSettings')
    expect(response.supportedLocalePrefixes).toEqual(['en', 'de'])

    expect(httpMock.get.mock.calls[0][0]).toBe(`/organizations/${organizationId}/semantic/settings`)
  })
})
