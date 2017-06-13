/* global expect, test */
const TEST_IMAGE_SOURCE_URL = 'https://raw.githubusercontent.com/contentful/contentful-management.js/master/test/integration/fixtures/shiba-stuck-bush.jpg'

export function assetReadOnlyTests (space) {
  test('Gets assets with only images', () => {
    return space.getAssets({
      mimetype_group: 'image'
    })
    .then((response) => {
      expect(response.items[0].fields.file['en-US'].contentType.match(/image/)).toBeTruthy()
    })
  })

  test('Gets asset', () => {
    return space.getAsset('1x0xpXu4pSGS4OukSyWGUK')
    .then((response) => {
      expect(response.sys).toBeTruthy()
      expect(response.fields).toBeTruthy()
    })
  })

  test('Gets assets', (t) => {
    return space.getAssets()
    .then((response) => {
      expect(response.item).toBeTruthy()
    })
  })
}

export function assetWriteTests (space) {
  test('Create, process, update, publish, unpublish, archive, unarchive and delete asset', (t) => {
    return space.createAsset({fields: {
      title: {'en-US': 'this is the title'},
      file: {'en-US': {
        contentType: 'image/jpeg',
        fileName: 'shiba-stuck.jpg',
        upload: TEST_IMAGE_SOURCE_URL
      }}
    }})
    .then((asset) => {
      expect(asset.fields.title['en-US']).toBe('this is the title')
      return asset.processForLocale('en-US', {processingCheckWait: 2000})
      .then((processedAsset) => {
        expect(asset.isDraft()).toBeTruthy()
        expect(processedAsset.fields.file['en-US'].url).toBeTruthy()
        return processedAsset.publish()
        .then((publishedAsset) => {
          expect(publishedAsset.isPublished()).toBeTruthy()
          publishedAsset.fields.title['en-US'] = 'title has changed'
          return publishedAsset.update()
          .then((updatedAsset) => {
            expect(updatedAsset.isUpdated()).toBeTruthy()
            expect(updatedAsset.fields.title['en-US']).toBe('title has changed')
            return updatedAsset.unpublish()
            .then((unpublishedAsset) => {
              expect(unpublishedAsset.isDraft()).toBeTruthy()
              return unpublishedAsset.archive()
              .then((archivedAsset) => {
                expect(archivedAsset.isArchived()).toBeTruthy()
                return archivedAsset.unarchive()
                .then((unarchivedAsset) => {
                  expect(unarchivedAsset.isArchived()).toBeFalsy()
                  expect(unarchivedAsset.isDraft()).toBeTruthy()
                  return unarchivedAsset.delete()
                })
              })
            })
          })
        })
      })
    })
  })

  test('Create and process asset with multiple locales', () => {
    return space.createAsset({fields: {
      title: {'en-US': 'this is the title'},
      file: {
        'en-US': {
          contentType: 'image/jpeg',
          fileName: 'shiba-stuck.jpg',
          upload: TEST_IMAGE_SOURCE_URL
        },
        'de-DE': {
          contentType: 'image/jpeg',
          fileName: 'shiba-stuck.jpg',
          upload: TEST_IMAGE_SOURCE_URL
        }
      }
    }})
    .then((asset) => {
      return asset.processForAllLocales({processingCheckWait: 2000})
      .then((processedAsset) => {
        expect(processedAsset.fields.file['en-US'].url).toBeTruthy()
        expect(processedAsset.fields.file['de-DE'].url).toBeTruthy()
      })
    })
  })

  test('Upload and process asset with multiple locales', () => {
    return space.createAssetFromFiles({
      fields: {
        title: {'en-US': 'SVG upload test'},
        file: {
          'en-US': {
            contentType: 'image/svg+xml',
            fileName: 'blue-square.svg',
            file: '<svg xmlns="http://www.w3.org/2000/svg"><path fill="blue" d="M50 50h150v50H50z"/></svg>'
          },
          'de-DE': {
            contentType: 'image/svg+xml',
            fileName: 'red-square.svg',
            file: '<svg xmlns="http://www.w3.org/2000/svg"><path fill="red" d="M50 50h150v50H50z"/></svg>'
          }
        }
      }
    })
    .then((asset) => {
      return asset.processForAllLocales({processingCheckWait: 2000})
      .then((processedAsset) => {
        expect(processedAsset.fields.file['en-US'].url).toBeTruthy()
        expect(processedAsset.fields.file['de-DE'].url).toBeTruthy()
      })
    })
  })
}
