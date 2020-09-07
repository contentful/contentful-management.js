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

export const createTestSpace = (client, spacePrefix = '') =>
  client.createSpace(
    {
      name: 'CMA JS SDK tests' + spacePrefix,
    },
    env.CONTENTFUL_ORGANIZATION
  )

export function waitForEnvironmentToBeReady(space, environment) {
  return space.getEnvironment(environment.sys.id).then((env) => {
    if (env.sys.status.sys.id !== 'ready') {
      console.log(`Environment ${environment.sys.id} is not ready yet. Waiting 1000ms...`)
      return delay(1000).then(() => waitForEnvironmentToBeReady(space, env))
    }
    return env
  })
}

export function generateRandomId(prefix = 'randomid') {
  return prefix + Math.ceil(Math.random() * 1e8)
}
