import { expect } from 'chai'
import { before, describe, test } from 'mocha'
import { getDefaultSpace } from '../helpers'

describe('PreviewApiKeys Api', () => {
  let space

  before(async () => {
    space = await getDefaultSpace()
  })

  test('Gets previewApiKeys', async () => {
    return space.getPreviewApiKeys().then((response) => {
      expect(response.sys, 'sys').ok
      expect(response.items, 'fields').ok
    })
  })
})
