import { after, before, describe, test } from 'mocha'
import { getSpecialSpace } from '../helpers'
import { expect } from 'chai'

describe('EnvironmentAlias Api', () => {
  describe('read', () => {
    let space
    before(async () => {
      space = await getSpecialSpace('alias')
    })

    after(async () => {
      const alias = await space.getEnvironmentAlias('master')
      alias.environment.sys.id = 'previously-master-env'
      await alias.update()
    })

    test('Gets aliases', async () => {
      return space.getEnvironmentAliases().then((response) => {
        expect(response.items[0].sys.id).equals('master')
        expect(response.items[0].environment.sys.id).equals('previously-master-env')
      })
    })

    test('Updates alias', async () => {
      return space
        .getEnvironmentAlias('master')
        .then((alias) => {
          expect(alias.sys.id).equals('master')
          expect(alias.environment.sys.id).equals('previously-master-env')
          alias.environment.sys.id = 'feature-env'
          return alias.update()
        })
        .then((updatedAlias) => {
          expect(updatedAlias.sys.id).equals('master')
          expect(updatedAlias.environment.sys.id).equals('feature-env')
        })
    })
  })
})
