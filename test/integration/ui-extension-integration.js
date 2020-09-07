import { after, before, describe, test } from 'mocha'
import { client, createTestSpace } from '../helpers'
import { expect } from 'chai'

describe('Extension api', function () {
  this.timeout(60000)
  let space

  before(async () => {
    space = await createTestSpace(client(), 'TSM')
  })

  after(async () => {
    return space.delete()
  })

  test('Create, update, get, get all and delete UI Extension', async () => {
    return space
      .createUiExtension({
        extension: {
          name: 'My awesome extension',
          src: 'https://extensions.example.com/your-extension.html',
          fieldTypes: [{ type: 'Text' }],
        },
      })
      .then((uiExtension) => {
        expect(uiExtension.sys.type).equals('Extension', 'type')
        expect(uiExtension.extension.name).equals('My awesome extension', 'name')

        uiExtension.extension.name = 'New name'
        return uiExtension.update()
      })
      .then((uiExtension) => {
        expect(uiExtension.extension.name).equals('New name', 'name')

        return space.getUiExtension(uiExtension.sys.id).then((response) => {
          expect(response.sys.id).equals(uiExtension.sys.id, 'id')
          expect(response.extension.name).equals('New name', 'name')

          return space
            .getUiExtensions()
            .then((result) => {
              expect(result.items.length).equals(
                result.total,
                'returns the just created ui extensions'
              )
            })
            .then(() => uiExtension.delete())
        })
      })
  })

  test('Create and delete UI Extension hosted by Contentful', async () => {
    return space
      .createUiExtension({
        extension: {
          name: 'My awesome extension hosted at Contentful',
          srcdoc:
            '<html><head><title>MyAwesomeUiExtension</title></head><body><h1>Awesome</h1></body></html>',
          fieldTypes: [{ type: 'Text' }],
        },
      })
      .then((uiExtension) => {
        expect(uiExtension.sys.type).equals('Extension', 'type')
        expect(uiExtension.extension.name).equals(
          'My awesome extension hosted at Contentful',
          'name'
        )
        expect(uiExtension.extension.srcdoc).equals(
          '<html><head><title>MyAwesomeUiExtension</title></head><body><h1>Awesome</h1></body></html>',
          'name'
        )

        return uiExtension.delete()
      })
  })

  test('Create UI extension with ID', () => {
    return space
      .createUiExtensionWithId('awesome-extension', {
        extension: {
          name: 'Awesome extension!',
          src: 'https://awesome.extension',
          fieldTypes: [{ type: 'Symbol' }],
        },
      })
      .then((uiExtension) => {
        expect(uiExtension.sys.id).equals('awesome-extension', 'id')
        expect(uiExtension.extension.name).equals('Awesome extension!', 'name')
        expect(uiExtension.extension.src).equals('https://awesome.extension', 'src')
      })
  })
})
