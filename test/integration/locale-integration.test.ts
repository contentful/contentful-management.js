import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import {
  defaultClient,
  createTestEnvironment,
  createTestSpace,
  timeoutToCalmRateLimiting,
  waitForEnvironmentToBeReady,
} from '../helpers'
import type { Space, Environment } from '../../lib/export-types'

describe('Locale API', () => {
  let space: Space
  let environment: Environment

  beforeAll(async () => {
    space = await createTestSpace(defaultClient, 'Locale')
    environment = await createTestEnvironment(space, 'Test')
    await waitForEnvironmentToBeReady(space, environment)
  })

  afterAll(async () => {
    if (space) {
      // Gatekeeper can answer 409 (StaleObjectError) when the space row changes while it is
      // being trashed, so retry with a freshly fetched space.
      const spaceId = space.sys.id
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          await (await defaultClient.getSpace(spaceId)).delete()
          break
        } catch (error) {
          if (attempt === 3 || (error as { name?: string }).name !== 'Conflict') {
            throw error
          }
          await new Promise((resolve) => setTimeout(resolve, 2000 * attempt))
        }
      }
    }
    await timeoutToCalmRateLimiting()
  })

  it('Gets locales', async () => {
    const response = await environment.getLocales()
    expect(response.items[0].name).toBe('English (United States)')
    expect(response.items[0].code).toBe('en-US')
  })

  it('Gets locales respects skip', async () => {
    return environment.getLocales({ skip: 1 }).then((response) => {
      expect(response.items.length).equals(0)
    })
  })

  it('Creates, gets, updates, and deletes a locale', async () => {
    const createdLocale = await environment.createLocale({
      name: 'German (Austria)',
      code: 'de-AT',
      fallbackCode: null,
    })

    expect(createdLocale.code).toBe('de-AT')

    // Adding a delay to ensure the environment has enough time to process changes
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const fetchedLocale = await environment.getLocale(createdLocale.sys.id)
    expect(fetchedLocale.code).toBe('de-AT')

    fetchedLocale.name = 'Deutsch (Österreich)'
    fetchedLocale.fallbackCode = 'en-US'
    const updatedLocale = await fetchedLocale.update()

    expect(updatedLocale.name).toBe('Deutsch (Österreich)')
    expect(updatedLocale.fallbackCode).toBe('en-US')

    await updatedLocale.delete()
  })

  it('Creates, gets page (respects limit), deletes a locale', async () => {
    const createdLocal = await environment.createLocale({
      name: 'Chinese (Simplified, China)',
      code: 'zh-Hans-CN',
      fallbackCode: 'en-US',
    })
    // wait for the locale to be created
    await new Promise((res) => setTimeout(res, 3000))
    const pagedLocales = await environment.getLocales({ limit: 1 })
    expect(pagedLocales.items.length).equals(1)
    expect(pagedLocales.total).equals(2)
    await createdLocal.delete()
  })
})
