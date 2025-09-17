import { expect, beforeAll, describe, test, afterAll } from 'vitest'
import { getDefaultSpace, timeoutToCalmRateLimiting } from '../helpers.js'
import type { Space } from '../../lib/export-types.js'

describe('PreviewApiKeys Api', () => {
  let space: Space

  beforeAll(async () => {
    space = await getDefaultSpace()
  })

  afterAll(timeoutToCalmRateLimiting)

  test('Gets previewApiKeys', async () => {
    const response = await space.getPreviewApiKeys()
    expect(response.sys).toBeDefined()
    expect(response.items).toBeDefined()
  })
})
