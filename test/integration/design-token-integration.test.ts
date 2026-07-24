import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { initPlainClient, timeoutToCalmRateLimiting, generateRandomId } from '../helpers'
import { TestDefaults } from '../defaults'
import { testName, sweepStaleExoEntities } from './utils/exo.utils'

describe('DesignToken Integration', { sequential: true }, () => {
  const client = initPlainClient({
    spaceId: TestDefaults.spaceId,
    environmentId: TestDefaults.environmentId,
  })

  const createdIds: string[] = []
  let designTokenId: string

  beforeAll(async () => {
    await sweepStaleExoEntities(client)

    designTokenId = generateRandomId('token')
    const created = await client.designToken.upsert(
      { designTokenId },
      {
        sys: { id: designTokenId, type: 'DesignToken' },
        name: testName('Token'),
        type: 'DTCG.Color',
      },
    )
    designTokenId = created.sys.id
    createdIds.push(designTokenId)
  })

  afterAll(async () => {
    for (const id of createdIds) {
      try {
        await client.designToken.delete({ designTokenId: id })
      } catch {
        // entity already deleted or not found
      }
    }

    await timeoutToCalmRateLimiting()
  })

  it('has correct sys fields after creation', async () => {
    const token = await client.designToken.get({ designTokenId })

    expect(token.sys.id).toBeDefined()
    expect(token.sys.type).toBe('DesignToken')
    expect(token.sys.version).toBeGreaterThanOrEqual(1)
    expect(token.sys.createdAt).toBeDefined()
    expect(token.sys.updatedAt).toBeDefined()
    expect(token.sys.createdBy).toBeDefined()
    expect(token.name).toBe(testName('Token'))
    expect(token.type).toBe('DTCG.Color')
  })

  it('gets a design token by ID', async () => {
    const fetched = await client.designToken.get({ designTokenId })

    expect(fetched.sys.id).toBe(designTokenId)
    expect(fetched.sys.type).toBe('DesignToken')
    expect(fetched.type).toBe('DTCG.Color')
  })

  it('upserts (updates) a design token', async () => {
    const current = await client.designToken.get({ designTokenId })

    const updated = await client.designToken.upsert(
      { designTokenId },
      {
        sys: { id: current.sys.id, type: 'DesignToken', version: current.sys.version },
        name: testName('Token Updated'),
        type: current.type,
      },
    )

    expect(updated.name).toBe(testName('Token Updated'))
    expect(updated.sys.version).toBeGreaterThan(current.sys.version)
  })

  it('lists design tokens with cursor pagination', async () => {
    const collection = await client.designToken.getMany({ query: { limit: 10 } })

    expect(collection.items.length).toBeGreaterThanOrEqual(1)
    expect(collection.pages).toBeDefined()

    const found = collection.items.find((item) => item.sys.id === designTokenId)
    expect(found).toBeDefined()
  })

  it('deletes a design token', async () => {
    await client.designToken.delete({ designTokenId })

    await expect(client.designToken.get({ designTokenId })).rejects.toThrow()

    const idx = createdIds.indexOf(designTokenId)
    if (idx !== -1) createdIds.splice(idx, 1)
  })
})
