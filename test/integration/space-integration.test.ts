import { describe, it, beforeAll, afterAll } from 'vitest'
import { expect } from 'vitest'
import { getTestOrganization, timeoutToCalmRateLimiting } from '../helpers.js'
import type { Organization } from '../../lib/export-types.js'

describe('Space API', () => {
  let organization: Organization

  beforeAll(async () => {
    organization = await getTestOrganization()
  })

  afterAll(timeoutToCalmRateLimiting)

  it('Gets organization spaces', async () => {
    const response = await organization.getUsers()

    expect(response.sys).toBeTruthy()
    expect(response.items).toBeTruthy()
  })
})
