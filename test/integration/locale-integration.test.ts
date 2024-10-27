import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import {
  defaultClient,
  createTestEnvironment,
  createTestSpace,
  timeoutToCalmRateLimiting,
} from '../helpers'
import type { Space, Environment } from '../../lib/export-types'

describe('Locale API', () => {
  let space: Space
  let environment: Environment

  beforeAll(async () => {
    space = await createTestSpace(defaultClient, 'Locale')
    environment = await createTestEnvironment(space, 'Test')
  })

  afterAll(async () => {
    if (space) {
      await space.delete()
    }
    await timeoutToCalmRateLimiting()
  })

  it('Gets locales', async () => {
    const response = await environment.getLocales()
    expect(response.items[0].name).toBe('English (United States)')
    expect(response.items[0].code).toBe('en-US')
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
})
