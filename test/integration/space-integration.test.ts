import { describe, it, beforeAll, afterAll } from 'vitest'
import { expect } from 'vitest'
import { defaultClient, getTestOrganization, timeoutToCalmRateLimiting } from '../helpers'
import type { Organization } from '../../lib/export-types'

describe('Space API', () => {
  let organization: Organization
  const INTERNAL_PRODUCT_ID = process.env.CONTENTFUL_PRODUCT_ID || '54jwueRJC2BOihxYMIdYoD'

  beforeAll(async () => {
    organization = await getTestOrganization()
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
        productId: INTERNAL_PRODUCT_ID,
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
        productId: INTERNAL_PRODUCT_ID,
        defaultLocale: 'en',
      },
      organization.sys.id,
    )
    try {
      await space.unarchive(INTERNAL_PRODUCT_ID)
    } catch (e) {
      expect((e as { name: string }).name).toEqual('ValidationFailed')
    } finally {
      await space.delete()
    }
  })
})
