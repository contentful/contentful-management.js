import { describe, it, beforeAll } from 'vitest'
import { expect } from 'vitest'
import { getTestOrganization } from '../helpers'
import type { Organization } from '../../lib/export-types'

describe('Space API', () => {
  let organization: Organization

  beforeAll(async () => {
    organization = await getTestOrganization()
  })

  it('Gets organization spaces', async () => {
    const response = await organization.getUsers()

    expect(response.sys).toBeTruthy()
    expect(response.items).toBeTruthy()
  })
})
