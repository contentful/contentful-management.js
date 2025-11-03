import type { CreateHttpClientParams } from 'contentful-sdk-core'
import * as testUtils from '@contentful/integration-test-utils'
import { createClient } from '../lib/contentful-management'
import type {
  BulkActionPayload,
  BulkActionProps,
  BulkActionV2Payload,
  Environment,
  Organization,
  PlainClientAPI,
  Space,
} from '../lib/contentful-management'
import { TestDefaults } from './defaults'
import { AsyncActionProcessingOptions, pollAsyncActionStatus } from '../lib/methods/action'

type PlainOptions = {
  /** Used by the PlainClient to perform a poll for the BulkAction status */
  plainClient: PlainClientAPI
  spaceId: string
  environmentId: string
  bulkActionId: string
}

const accessToken = process.env.CONTENTFUL_INTEGRATION_TEST_CMA_TOKEN
const orgId = process.env.CONTENTFUL_ORGANIZATION_ID
if (!accessToken || !orgId) {
  throw new Error('Integration test CMA token or organization id are missing')
}

const params: Partial<CreateHttpClientParams> = {}

if (process.env.API_INTEGRATION_TESTS) {
  params.host = '127.0.0.1:5000'
  params.insecure = true
}

// Please do not replace it with testUtils.initClient({}), becuase test-utils repo has contentful-management
// as dependency and will make it impossible to test new changes to client's api.
// Eg: getAll() fn in prod doesn't have any args. I change it in my PR to getAll({ query })
// if I used testUtils.initClient({}), it would have the version of cma repo that would still have getAll() without args
// making it impossible for me to cover my changes with tests
export const initClient = (options: Partial<CreateHttpClientParams> = {}) => {
  const accessToken = process.env.CONTENTFUL_INTEGRATION_TEST_CMA_TOKEN
  if (!accessToken) {
    throw new Error('CONTENTFUL_INTEGRATION_TEST_CMA_TOKEN is required')
  }
  return createClient({
    accessToken,
    ...params,
    ...options,
  })
}

// Shared instance to reduce rate limiting issues due to recreation of clients and therefore loosing track of requests per second
export const defaultClient = initClient({ ...params })

/**
 * @returns {import('../lib/contentful-management').PlainClientAPI}
 */
export const initPlainClient = (defaults = {}) => {
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

export function getTestOrganizationId() {
  return orgId as string
}

export async function getTestOrganization(): Promise<Organization> {
  const testOrgId = getTestOrganizationId()
  const organizations = await defaultClient.getOrganizations()
  const org = organizations.items.find(({ sys: { id } }) => id === testOrgId)
  if (!org) {
    throw new Error('Test org not available')
  }
  return org
}

export async function getTestUser() {
  const { userId } = TestDefaults
  const organization = await getTestOrganization()
  if (!organization) {
    throw new Error(`Unable to load test organization`)
  }
  return organization.getUser(userId)
}

export async function getDefaultSpace() {
  const { spaceId } = TestDefaults
  return initClient({}).getSpace(spaceId)
}

export async function getSpecialSpace(feature) {
  const { spaceWithAliasesAndEmbargoedAssetsId } = TestDefaults
  if (['alias', 'embargoedAssets'].includes(feature)) {
    return initClient({}).getSpace(spaceWithAliasesAndEmbargoedAssetsId)
  } else {
    return getDefaultSpace()
  }
}

export async function getAppDefinition(orgId, appId) {
  const client = await initClient({})
  const organisation = await client.getOrganization(orgId)
  const appDefinition = organisation.getAppDefinition(appId)
  return appDefinition
}

export async function createAppDefinition() {
  const organization = await getTestOrganization()
  if (!organization) {
    throw new Error(`Unable to load test organization`)
  }
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
    organizationId: orgId,
    repo: 'CMA',
    language: 'JS',
    testSuiteName,
  }) as unknown as Space
}

export const createTestEnvironment = async (space, environmentName) => {
  return (await testUtils.createTestEnvironment(space, environmentName)) as Environment
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
  const client = initClient({})
  const { items: templates } = await client.getEnvironmentTemplates(getTestOrganizationId())

  const filterTemplate = (template) =>
    template.name.startsWith(baseEnvironmentTemplateDescription) &&
    Date.parse(template.sys.updatedAt) + olderThan < Date.now()

  const cleanUpTemplates = templates.filter(filterTemplate).map((templates) => templates.delete())
  await Promise.allSettled(cleanUpTemplates)
}

export const cleanupTaxonomy = async (olderThan = 1000 * 60 * 60) => {
  const client = initPlainClient({ organizationId: getTestOrganizationId() })
  const { items: concepts } = await client.concept.getMany({})

  const conceptsToBeDeleted = concepts.filter(
    (item) => Date.parse(item.sys.createdAt) > Date.now() - olderThan
  )

  if (conceptsToBeDeleted.length > 0) {
    console.log(`Deleting ${conceptsToBeDeleted.length} concepts`)
  }

  await Promise.all(
    conceptsToBeDeleted.map((item) =>
      client.concept.delete({
        conceptId: item.sys.id,
        version: item.sys.version,
      })
    )
  )
  const { items: conceptSchemes } = await client.conceptScheme.getMany({})
  const conceptSchemesToBeDeleted = conceptSchemes.filter(
    (item) => Date.parse(item.sys.createdAt) > Date.now() - olderThan
  )

  if (conceptSchemesToBeDeleted.length > 0) {
    console.log(`Deleting ${conceptSchemesToBeDeleted.length} conceptSchemes`)
  }

  await Promise.all(
    conceptSchemesToBeDeleted.map((item) =>
      client.conceptScheme.delete({
        conceptSchemeId: item.sys.id,
        version: item.sys.version,
      })
    )
  )
}

export const timeoutToCalmRateLimiting = () => new Promise((resolve) => setTimeout(resolve, 1000))

/** Waits for a BulkAction status to be either succeeded or failed.
 * Used by the Plain client */
export async function waitForBulkActionProcessing<T extends BulkActionPayload = any>(
  { plainClient, spaceId, environmentId, bulkActionId }: PlainOptions,
  options?: AsyncActionProcessingOptions
): Promise<BulkActionProps<T>> {
  return pollAsyncActionStatus<BulkActionProps>(
    async () =>
      plainClient.bulkAction.get<T>({
        bulkActionId,
        spaceId,
        environmentId,
      }),
    options
  )
}

/** Waits for a BulkAction V2 status to be either succeeded or failed.
 * Used by the Plain client */
export async function waitForBulkActionV2Processing<T extends BulkActionV2Payload = any>(
  { plainClient, spaceId, environmentId, bulkActionId }: PlainOptions,
  options?: AsyncActionProcessingOptions
): Promise<BulkActionProps<T>> {
  return pollAsyncActionStatus<BulkActionProps>(
    async () =>
      plainClient.bulkAction.getV2({
        bulkActionId,
        spaceId,
        environmentId,
      }),
    options
  )
}
