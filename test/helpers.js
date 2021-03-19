import { createClient } from '../lib/contentful-management'
import delay from 'delay'

const params = {}

if (process.env.API_INTEGRATION_TESTS) {
  params.host = '127.0.0.1:5000'
  params.insecure = true
}

const env = process.env.CONTENTFUL_ACCESS_TOKEN !== undefined ? process.env : window.__env__

export const client = (isV2 = false) =>
  createClient({
    accessToken: isV2 ? env.CONTENTFUL_V2_ACCESS_TOKEN : env.CONTENTFUL_ACCESS_TOKEN,
    ...params,
  })

export const createTestSpace = async (client, spacePrefix = '') => {
  let space
  let spaceName = 'CMA JS SDK [AUTO]'
  if (spacePrefix.length > 0) {
    spaceName += ' ' + spacePrefix
  }
  try {
    space = await client.createSpace(
      {
        name: spaceName,
      },
      env.CONTENTFUL_ORGANIZATION
    )
  } catch (e) {
    console.error(e)
  }
  if (!space) {
    throw new Error('Test space creation failed for ' + spaceName)
  }
  return space
}

export const createTestEnvironment = async (space, environmentName) => {
  const environment = await space.createEnvironment({
    name: environmentName,
  })
  await waitForEnvironmentToBeReady(space, environment)
  return environment
}

export function waitForEnvironmentToBeReady(space, environment) {
  return space.getEnvironment(environment.sys.id).then((env) => {
    if (env.sys.status.sys.id !== 'ready') {
      console.log(`Environment ${environment.sys.id} is not ready yet. Waiting 1000ms...`)
      return delay(1000).then(() => waitForEnvironmentToBeReady(space, env))
    }
    return env
  })
}

export function generateRandomId(prefix = 'randomId') {
  return prefix + Math.ceil(Math.random() * 1e8)
}

export const DEFAULT_SPACE_ID = 'ezs1swce23xe'
export const ALTERNATIVE_SPACE_ID = '7dh3w86is8ls'
export const V2_SPACE_ID = 'w6xueg32zr68'

export async function getDefaultSpace() {
  return await client().getSpace(DEFAULT_SPACE_ID)
}
export async function getAlternativeSpace() {
  return await client().getSpace(ALTERNATIVE_SPACE_ID)
}

export async function getV2Space() {
  return await client(true).getSpace(V2_SPACE_ID)
}
