import { expect } from 'chai'
import { before, describe, test, after } from 'mocha'
import { client } from '../helpers'

describe('AppDefinition api', function () {
  let organization

  before(async () => {
    organization = await client()
      .getOrganizations()
      .then((response) => response.items[0])
  })

  after(async () => {
    organization.getAppDefinitions().then((response) => {
      response.items.map((appDefinition) => appDefinition.delete())
    })
  })

  test('Create, update, get, get all and delete AppDefinition', async () => {
    return organization
      .createAppDefinition({
        name: 'Test App',
        src: 'http://localhost:3000',
        locations: [
          {
            location: 'app-config',
          },
        ],
      })
      .then((newAppDefinition) => {
        expect(newAppDefinition.sys.type).equals('AppDefinition', 'type')
        expect(newAppDefinition.name).equals('Test App', 'name')

        newAppDefinition.name = 'Test App Updated'
        return newAppDefinition.update()
      })
      .then((newAppDefinition) => {
        expect(newAppDefinition.name).equals('Test App Updated', 'name')

        return organization.getAppDefinition(newAppDefinition.sys.id).then((response) => {
          expect(response.sys.id).equals(newAppDefinition.sys.id, 'id')
          expect(response.name).equals('Test App Updated', 'name')

          return organization
            .getAppDefinitions()
            .then((response) => {
              console.log(response)
              expect(response.items.length).equals(
                response.total,
                'returns the just created app definitions'
              )
            })
            .then(() => newAppDefinition.delete())
        })
      })
  })
})
