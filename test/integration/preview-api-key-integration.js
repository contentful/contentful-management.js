import { expect } from 'chai'
import { before, after, describe, test } from 'mocha'
import { client, createTestSpace } from '../helpers'

describe('PreviewApiKeys Api', () => {
  let space

  before(async () => {
    space = await createTestSpace(client(), 'PreviewApiKeys')
  })

  after(async () => {
    return space.delete()
  })

  test('Gets previewApiKeys', async () => {
    return space.getPreviewApiKeys().then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.items, 'fields').ok
    })
  })
})
