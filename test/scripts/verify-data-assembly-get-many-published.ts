import { version } from '../../package.json'
;(globalThis as any).__VERSION__ = version

import { createClient } from '../../lib/contentful-management'

const accessToken = process.env.CONTENTFUL_INTEGRATION_TEST_CMA_TOKEN
if (!accessToken) {
  throw new Error('CONTENTFUL_INTEGRATION_TEST_CMA_TOKEN is required')
}

const spaceId = process.env.SPACE_ID
const environmentId = process.env.ENVIRONMENT_ID ?? 'exo'

if (!spaceId) {
  throw new Error('SPACE_ID environment variable is required')
}

const client = createClient(
  { accessToken },
  { type: 'plain', defaults: { spaceId, environmentId } },
)

;(async () => {
  console.log(`Fetching published data assemblies from space ${spaceId} (env: ${environmentId})...\n`)

  try {
    const dataAssemblies = await client.dataAssembly.getManyPublished({ query: {} })
    console.log('Success! Response:\n')
    console.log(JSON.stringify(dataAssemblies, null, 2))
  } catch (error) {
    console.error('Request failed:\n')
    console.error(error)
    process.exit(1)
  }
})()
