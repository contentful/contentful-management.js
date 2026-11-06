import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import {
  defaultClient,
  createTestEnvironment,
  createTestSpace,
  timeoutToCalmRateLimiting,
  waitForEnvironmentToBeReady,
} from '../helpers'
import type { Space, Environment } from '../../lib/export-types'

describe('Extension API', () => {
  let space: Space
  let environment: Environment

  beforeAll(async () => {
    space = await createTestSpace(defaultClient, 'TSM')
    environment = await createTestEnvironment(space, 'Test')
    await waitForEnvironmentToBeReady(space, environment)
  })

  afterAll(async () => {
    if (space) {
      await space.delete()
    }

    await timeoutToCalmRateLimiting()
  })

  it('Creates, updates, gets, gets all, and deletes UI Extension', async () => {
    // Create a UI Extension
    let extension = await environment.createUiExtension({
      extension: {
        name: 'My awesome extension',
        src: 'https://extensions.example.com/your-extension.html',
        fieldTypes: [{ type: 'Text' }],
        sidebar: false,
      },
    })

    expect(extension.sys.type).toBe('Extension')
    expect(extension.extension.name).toBe('My awesome extension')

    // Update the UI Extension
    extension.extension.name = 'New name'
    extension = await extension.update()

    expect(extension.extension.name).toBe('New name')

    // Get the UI Extension by ID
    const fetchedExtension = await environment.getUiExtension(extension.sys.id)
    expect(fetchedExtension.sys.id).toBe(extension.sys.id)
    expect(fetchedExtension.extension.name).toBe('New name')

    // Get all UI Extensions
    const allExtensions = await environment.getUiExtensions()
    expect(allExtensions.items.length).toBe(allExtensions.total)

    // Delete the UI Extension
    await extension.delete()
  })

  it('Creates and deletes a UI Extension hosted by Contentful', async () => {
    // Create a UI Extension hosted by Contentful
    const extension = await environment.createUiExtension({
      extension: {
        name: 'My awesome extension hosted at Contentful',
        srcdoc:
          '<html><head><title>MyAwesomeUiExtension</title></head><body><h1>Awesome</h1></body></html>',
        fieldTypes: [{ type: 'Text' }],
        sidebar: false,
      },
    })

    expect(extension.sys.type).toBe('Extension')
    expect(extension.extension.name).toBe('My awesome extension hosted at Contentful')
    expect(extension.extension.srcdoc).toBe(
      '<html><head><title>MyAwesomeUiExtension</title></head><body><h1>Awesome</h1></body></html>',
    )

    // Delete the UI Extension
    await extension.delete()
  })

  it('Creates a UI extension with a specific ID', async () => {
    // Create a UI Extension with a specific ID
    const extension = await environment.createUiExtensionWithId('awesome-extension', {
      extension: {
        name: 'Awesome extension!',
        src: 'https://awesome.extension',
        fieldTypes: [{ type: 'Symbol' }],
        sidebar: false,
      },
    })

    expect(extension.sys.id).toBe('awesome-extension')
    expect(extension.extension.name).toBe('Awesome extension!')
    expect(extension.extension.src).toBe('https://awesome.extension')
  })
})
