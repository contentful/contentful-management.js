import { expect, beforeAll, describe, test } from 'vitest'
import { getDefaultSpace } from '../helpers'
import type { Space } from '../../lib/export-types'

describe('PreviewApiKeys Api', () => {
  let space: Space

  beforeAll(async () => {
    space = await getDefaultSpace()
  })

  test('Gets previewApiKeys', async () => {
    const response = await space.getPreviewApiKeys()
    expect(response.sys).toBeDefined()
    expect(response.items).toBeDefined()
  })
})
