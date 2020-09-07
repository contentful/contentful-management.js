import { before, describe, test } from 'mocha'
import { client } from '../helpers'
import { expect } from 'chai'

describe('EnvironmentAlias Api', () => {
  describe('read', () => {
    let space
    before(async () => {
      space = await client(true).getSpace('w6xueg32zr68')
    })

    test('Gets aliases', async () => {
      return space.getEnvironmentAliases().then((response) => {
        expect(response.items[0].sys.id).equals('master')
        expect(response.items[0].environment.sys.id).equals('previously-master')
      })
    })

    test('Updates alias', async () => {
      return space
        .getEnvironmentAlias('master')
        .then((alias) => {
          expect(alias.sys.id).equals('master')
          expect(alias.environment.sys.id).equals('previously-master')
          alias.environment.sys.id = 'feature-13'
          return alias.update()
        })
        .then((updatedAlias) => {
          expect(updatedAlias.sys.id).equals('master')
          expect(updatedAlias.environment.sys.id).equals('feature-13')
        })
    })
  })
})
