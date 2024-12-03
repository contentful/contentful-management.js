import { test, expect } from 'vitest'
import * as contentfulManagement from 'contentful-management'

/**
 * This test project should ensure that the builds are actually functioning.
 * Mostly useful for changes to building/transpiling/bundling/...
 */

const client = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_INTEGRATION_TEST_CMA_TOKEN || '',
})

const PERMANENT_SPACE_ID = 'segpl12szpe6'

test('Gets entry', async () => {
  const response = await client.getSpace(PERMANENT_SPACE_ID)
  expect(response.sys).toBeDefined()
  expect(response.name).toBeDefined()
  expect(response.sys.id).toBe(PERMANENT_SPACE_ID)
})
