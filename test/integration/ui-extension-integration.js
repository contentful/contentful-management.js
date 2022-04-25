import { after, before, describe, test } from 'mocha'
import {
  initClient,
  createTestEnvironment,
  createTestSpace,
  waitForEnvironmentToBeReady,
} from '../helpers'
import { expect } from 'chai'

describe('Extension api', function () {
  let space
  let environment

  before(async () => {
    space = await createTestSpace(initClient(), 'TSM')
    environment = await createTestEnvironment(space, 'Test')
    await waitForEnvironmentToBeReady(space, environment)
  })

  after(async () => {
    if (space) {
      return space.delete()
    }
  })

  test('Create, update, get, get all and delete UI Extension', async () => {
    return environment
      .createUiExtension({
        extension: {
          name: 'My awesome extension',
          src: 'https://extensions.example.com/your-extension.html',
          fieldTypes: [{ type: 'Text' }],
        },
      })
      .then((extension) => {
        expect(extension.sys.type).equals('Extension', 'type')
        expect(extension.extension.name).equals('My awesome extension', 'name')

        extension.extension.name = 'New name'
        return extension.update()
      })
      .then((extension) => {
        expect(extension.extension.name).equals('New name', 'name')

        return environment.getUiExtension(extension.sys.id).then((response) => {
          expect(response.sys.id).equals(extension.sys.id, 'id')
          expect(response.extension.name).equals('New name', 'name')

          return environment
            .getUiExtensions()
            .then((result) => {
              expect(result.items.length).equals(
                result.total,
                'returns the just created ui extensions'
              )
            })
            .then(() => extension.delete())
        })
      })
  })

  test('Create and delete UI Extension hosted by Contentful', async () => {
    return environment
      .createUiExtension({
        extension: {
          name: 'My awesome extension hosted at Contentful',
          srcdoc:
            '<html><head><title>MyAwesomeUiExtension</title></head><body><h1>Awesome</h1></body></html>',
          fieldTypes: [{ type: 'Text' }],
        },
      })
      .then((extension) => {
        expect(extension.sys.type).equals('Extension', 'type')
        expect(extension.extension.name).equals('My awesome extension hosted at Contentful', 'name')
        expect(extension.extension.srcdoc).equals(
          '<html><head><title>MyAwesomeUiExtension</title></head><body><h1>Awesome</h1></body></html>',
          'name'
        )

        return extension.delete()
      })
  })

  test('Create UI extension with ID', () => {
    return environment
      .createUiExtensionWithId('awesome-extension', {
        extension: {
          name: 'Awesome extension!',
          src: 'https://awesome.extension',
          fieldTypes: [{ type: 'Symbol' }],
        },
      })
      .then((extension) => {
        expect(extension.sys.id).equals('awesome-extension', 'id')
        expect(extension.extension.name).equals('Awesome extension!', 'name')
        expect(extension.extension.src).equals('https://awesome.extension', 'src')
      })
  })
})
