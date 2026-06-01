import { describe, it, beforeAll, afterAll } from 'vitest'
import { expect } from 'vitest'
import {
  defaultClient,
  getTestOrganization,
  getTestProductId,
  timeoutToCalmRateLimiting,
} from '../helpers'
import type { Organization } from '../../lib/export-types'

describe('Space API', () => {
  let organization: Organization
  let productId: string

  beforeAll(async () => {
    organization = await getTestOrganization()
    productId = await getTestProductId()
  })

  afterAll(timeoutToCalmRateLimiting)

  it('Gets organization spaces', async () => {
    const response = await organization.getUsers()

    expect(response.sys).toBeTruthy()
    expect(response.items).toBeTruthy()
  })

  it('creates and deletes a space', async () => {
    const space = await defaultClient.createSpace(
      {
        name: 'test space',
        productId,
        defaultLocale: 'en',
      },
      organization.sys.id,
    )
    expect(space.name).toEqual('test space')

    await defaultClient.getSpace(space.sys.id).then((space) => {
      space.delete()
    })
  })

  it('calls unarchive space correctly', async () => {
    const space = await defaultClient.createSpace(
      {
        name: 'test space for unarchive',
        productId,
        defaultLocale: 'en',
      },
      organization.sys.id,
    )
    try {
      await space.unarchive(productId)
    } catch (e) {
      expect((e as { name: string }).name).toEqual('ValidationFailed')
    } finally {
      await space.delete()
    }
  })
})
