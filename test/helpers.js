import { createClient } from '../lib/contentful-management'
import * as testUtils from '@contentful/integration-test-utils'
import { TestDefaults } from './defaults'

const params = {}

if (process.env.API_INTEGRATION_TESTS) {
  params.host = '127.0.0.1:5000'
  params.insecure = true
}

const env = process.env !== undefined ? process.env : window.__env__

// Please do not replace it with testUtils.initClient(), becuase test-utils repo has contentful-management
// as dependency and will make it impossible to test new changes to client's api.
// Eg: getAll() fn in prod doesn't have any args. I change it in my PR to getAll({ query })
// if I used testUtils.initClient(), it would have the version of cma repo that would still have getAll() without args
// making it impossible for me to cover my changes with tests
export const initClient = (options) => {
  const accessToken = env.CONTENTFUL_INTEGRATION_TEST_CMA_TOKEN
  return createClient({
    accessToken,
    ...params,
    ...options,
  })
}

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

export function getTestOrganizationId() {
  return env.CONTENTFUL_ORGANIZATION_ID
}

export async function getTestOrganization() {
  const testOrgId = getTestOrganizationId()
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

export async function getAppDefinition(orgId, appId) {
  const appDefinition = await initClient().getAppDefinition(orgId, appId)
  return appDefinition
}

export async function createAppDefinition() {
  const organization = await getTestOrganization()
  const appDefinition = await organization.createAppDefinition({
    name: 'Test App',
    src: 'http://localhost:3000',
    locations: [
      {
        location: 'app-config',
      },
    ],
  })
  return { orgId: appDefinition.sys.organization.sys.id, appId: appDefinition.sys.id }
}

export async function createAppInstallation(appDefinitionId) {
  const space = await getDefaultSpace()
  const env = await space.getEnvironment('master')
  return await env.createAppInstallation(appDefinitionId, {}, { acceptAllTerms: true })
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
  return testUtils.cleanUpTestSpaces({ threshold: 10 * 60 * 1000, dryRun })
}

export const baseEnvironmentTemplateDescription = 'Integration test run'
export const cleanupTestEnvironmentTemplates = async (olderThan = 1000 * 60 * 60) => {
  const client = initClient()
  const { items: templates } = await client.getEnvironmentTemplates(getTestOrganizationId())

  const filterTemplate = (template) =>
    template.name.startsWith(baseEnvironmentTemplateDescription) &&
    Date.parse(template.sys.updatedAt) + olderThan < Date.now()

  const cleanUpTemplates = templates.filter(filterTemplate).map((templates) => templates.delete())
  await Promise.allSettled(cleanUpTemplates)
}
