import { createClient } from '../lib/contentful-management'
import * as testUtils from '@contentful/integration-test-utils'
import { TestDefaults } from './defaults'

const params = {}

if (process.env.API_INTEGRATION_TESTS) {
  params.host = '127.0.0.1:5000'
  params.insecure = true
}

const env = process.env !== undefined ? process.env : window.__env__

export const initClient = () => testUtils.initClient()

/**
 *
 * @returns {import('../lib/contentful-management').PlainClientAPI}
 */
export const initPlainClient = (defaults = {}) => {
  const accessToken = env.CONTENTFUL_INTEGRATION_TEST_CMA_TOKEN
  return createClient(
    {
      accessToken,
      ...params,
    },
    {
      type: 'plain',
      defaults,
    }
  )
}

/**
 *
 * @returns {import('../lib/contentful-management').AlphaPlainClientAPI}
 */
export const initAlphaPlainClient = (alphaFeatures = [], defaults = {}) => {
  const accessToken = env.CONTENTFUL_INTEGRATION_TEST_CMA_TOKEN
  return createClient(
    {
      accessToken,
      ...params,
    },
    {
      type: 'plain',
      alphaFeatures,
      defaults,
    }
  )
}

export async function getTestOrganization() {
  const testOrgId = env.CONTENTFUL_ORGANIZATION_ID
  const organizations = await initClient().getOrganizations()
  return organizations.items.find(({ sys: { id } }) => id === testOrgId)
}

export async function getTestUser() {
  const { userId } = TestDefaults
  const organization = await getTestOrganization()
  return organization.getUser(userId)
}

export async function getDefaultSpace() {
  const { spaceId } = TestDefaults
  return initClient().getSpace(spaceId)
}

export async function getSpecialSpace(feature) {
  const { spaceWithAliasesAndEmbargoedAssetsId } = TestDefaults
  if (['alias', 'embargoedAssets'].includes(feature)) {
    return initClient().getSpace(spaceWithAliasesAndEmbargoedAssetsId)
  } else {
    return getDefaultSpace()
  }
}

export const createTestSpace = async (client, testSuiteName = '') => {
  return testUtils.createTestSpace({
    client,
    organizationId: env.CONTENTFUL_ORGANIZATION_ID,
    repo: 'CMA',
    language: 'JS',
    testSuiteName,
  })
}

export const createTestEnvironment = async (space, environmentName) => {
  return await testUtils.createTestEnvironment(space, environmentName)
}

export const waitForEnvironmentToBeReady = async (space, environment) => {
  return testUtils.waitForEnvironmentToBeReady(space, environment)
}

export const generateRandomId = (prefix = 'randomId') => {
  return testUtils.generateRandomIdWithPrefix(prefix)
}

export const cleanupTestSpaces = async (dryRun = false) => {
  return testUtils.cleanUpTestSpaces({ threshold: 60 * 60 * 1000, dryRun })
}
