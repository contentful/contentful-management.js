export default function uiExtensionTests(t, spaceOrEnvironment) {
  t.test('Create, update, get, get all and delete UI Extension', (t) => {
    return spaceOrEnvironment
      .createUiExtension({
        extension: {
          name: 'My awesome extension',
          src: 'https://extensions.example.com/your-extension.html',
          fieldTypes: [{ type: 'Text' }],
        },
      })
      .then((uiExtension) => {
        t.equals(uiExtension.sys.type, 'Extension', 'type')
        t.equals(uiExtension.extension.name, 'My awesome extension', 'name')

        uiExtension.extension.name = 'New name'
        return uiExtension.update()
      })
      .then((uiExtension) => {
        t.equals(uiExtension.extension.name, 'New name', 'name')

        return spaceOrEnvironment.getUiExtension(uiExtension.sys.id).then((uiExtension) => {
          t.equals(uiExtension.sys.id, uiExtension.sys.id, 'id')
          t.equals(uiExtension.extension.name, 'New name', 'name')

          return spaceOrEnvironment
            .getUiExtensions()
            .then((result) => {
              t.equals(result.items.length, result.total, 'returns the just created ui extensions')
            })
            .then(() => uiExtension.delete())
        })
      })
  })

  t.test('Create and delete UI Extension hosted by Contentful', (t) => {
    return spaceOrEnvironment
      .createUiExtension({
        extension: {
          name: 'My awesome extension hosted at Contentful',
          srcdoc:
            '<html><head><title>MyAwesomeUiExtension</title></head><body><h1>Awesome</h1></body></html>',
          fieldTypes: [{ type: 'Text' }],
        },
      })
      .then((uiExtension) => {
        t.equals(uiExtension.sys.type, 'Extension', 'type')
        t.equals(uiExtension.extension.name, 'My awesome extension hosted at Contentful', 'name')
        t.equals(
          uiExtension.extension.srcdoc,
          '<html><head><title>MyAwesomeUiExtension</title></head><body><h1>Awesome</h1></body></html>',
          'name'
        )

        return uiExtension.delete()
      })
  })

  t.test('Create UI extension with ID', () => {
    return spaceOrEnvironment
      .createUiExtensionWithId('awesome-extension', {
        extension: {
          name: 'Awesome extension!',
          src: 'https://awesome.extension',
          fieldTypes: [{ type: 'Symbol' }],
        },
      })
      .then((uiExtension) => {
        t.equals(uiExtension.sys.id, 'awesome-extension', 'id')
        t.equals(uiExtension.extension.name, 'Awesome extension!', 'name')
        t.equals(uiExtension.extension.src, 'https://awesome.extension', 'src')
      })
  })
}

export function uiExtensionTestsForEnvironmentOnly(t, environment) {
  t.test('GetUiExtensions can filter UI extensions by ID', async (t) => {
    const idOne = 'idOne'
    const idTwo = 'idTwo'

    const extensionOne = await environment.createUiExtensionWithId(idOne, {
      extension: {
        name: 'Awesome extension!',
        src: 'https://awesome.extension',
        fieldTypes: [{ type: 'Symbol' }],
      },
    })

    const extensionTwo = await environment.createUiExtensionWithId(idTwo, {
      extension: {
        name: 'Another awesome extension!',
        src: 'https://anotherawesome.extension',
        fieldTypes: [{ type: 'Text' }],
      },
    })

    const extensions = await environment.getUiExtensions({ 'sys.id[in]': idTwo })

    t.equals(extensions.items.length, 1)
    t.equals(extensions.items[0].extension.name, 'Another awesome extension!', 'name')

    await extensionOne.delete()
    await extensionTwo.delete()
  })

  t.test('GetUiExtensions can strip srcdoc with query parameter', async (t) => {
    const extension = await environment.createUiExtension({
      extension: {
        name: 'Awesome extension!',
        srcdoc: '<html>source doc source doc source doc</html>',
        fieldTypes: [{ type: 'Symbol' }],
      },
    })

    const extensions = await environment.getUiExtensions({ skipSrcdoc: true })

    console.log(extensions)
    t.equals(extensions.items.length, 1)
    t.equals(extensions.items[0].extension.name, 'Awesome extension!', 'name')
    t.equals(extensions.items[0].extension.srcdoc, undefined, 'srcdoc')

    await extension.delete()
  })
}
