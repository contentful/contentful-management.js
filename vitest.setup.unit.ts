import { vi } from 'vitest'
import type * as contentfulSdkCore from 'contentful-sdk-core'

vi.mock('contentful-sdk-core', async (importOriginal) => {
  const orig = await importOriginal<typeof contentfulSdkCore>()
  return {
    ...orig,
    createHttpClient: vi.fn(),
  }
})
