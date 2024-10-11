import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { getSpecialSpace } from '../helpers'
import type { Space } from '../../lib/export-types'

describe('EnvironmentAlias API', () => {
  describe('read', () => {
    let space: Space

    beforeAll(async () => {
      space = await getSpecialSpace('alias')
    })

    afterAll(async () => {
      const alias = await space.getEnvironmentAlias('master')
      alias.environment.sys.id = 'previously-master-env'
      await alias.update()
    })

    it('Gets aliases', async () => {
      const response = await space.getEnvironmentAliases()
      expect(response.items[0].sys.id).toBe('master')
      expect(response.items[0].environment.sys.id).toBe('previously-master-env')
    })

    it('Updates alias', async () => {
      const alias = await space.getEnvironmentAlias('master')
      expect(alias.sys.id).toBe('master')
      expect(alias.environment.sys.id).toBe('previously-master-env')
      alias.environment.sys.id = 'feature-env'
      const updatedAlias = await alias.update()
      expect(updatedAlias.sys.id).toBe('master')
      expect(updatedAlias.environment.sys.id).toBe('feature-env')
    })
  })
})
