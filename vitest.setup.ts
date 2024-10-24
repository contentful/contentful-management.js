import { vi } from 'vitest'
import type contentfulSdkCore from 'contentful-sdk-core'

import { version } from './package.json'

global.__VERSION__ = version

vi.mock('contentful-sdk-core', async (importOriginal) => {
  const orig = await importOriginal<typeof contentfulSdkCore>()
  return {
    ...orig,
    createHttpClient: vi.fn(),
  }
})
