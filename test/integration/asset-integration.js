const TEST_IMAGE_SOURCE_URL =
  'https://raw.githubusercontent.com/contentful/contentful-management.js/master/test/integration/fixtures/shiba-stuck-bush.jpg'

import { expect } from 'chai'
import { before, describe, test } from 'mocha'
import { client } from '../helpers'

describe.skip('Asset api', function () {
  let space

  describe('Read', () => {
    before(async () => {
      space = await client().getSpace('ezs1swce23xe')
    })

    test('Gets assets with only images', async () => {
      return space
        .getAssets({
          mimetype_group: 'image',
        })
        .then((response) => {
          expect(response.items[0].fields.file['en-US'].contentType).match(/image/)
        })
    })

    test('Gets asset', async () => {
      return space.getAsset('1x0xpXu4pSGS4OukSyWGUK').then((response) => {
        expect(response.sys, 'sys').to.be.ok
        expect(response.fields, 'fields').to.be.ok
      })
    })

    test('Gets assets', async () => {
      return space.getAssets().then((response) => {
        expect(response.items, 'items').to.be.ok
      })
    })
  })

  // Write test seems currently broken
  describe.skip('Write', function () {
    this.timeout(60 * 1000)

    /*
    before(async () => {
      space = await createTestSpace(client());

      await space.createLocale({
        name: "German (Germany)",
        code: "de-DE"
      });
    });
     */

    test('Create, process, update, publish, unpublish, archive, unarchive and delete asset', async function () {
      return space
        .createAsset({
          fields: {
            title: { 'en-US': 'this is the title' },
            file: {
              'en-US': {
                contentType: 'image/jpeg',
                fileName: 'shiba-stuck.jpg',
                upload: TEST_IMAGE_SOURCE_URL,
              },
            },
          },
        })
        .then((asset) => {
          expect(asset.fields.title['en-US']).equals('this is the title', 'original title')
          return asset
            .processForLocale('en-US', { processingCheckWait: 5000 })
            .then((processedAsset) => {
              expect(asset.isDraft(), 'asset is in draft').to.be.true
              expect(processedAsset.fields.file['en-US'].url, 'file was uploaded').to.be.ok
              return processedAsset.publish().then((publishedAsset) => {
                expect(publishedAsset.isPublished(), 'asset is published').to.be.true
                publishedAsset.fields.title['en-US'] = 'title has changed'
                return publishedAsset.update().then((updatedAsset) => {
                  expect(updatedAsset.isUpdated(), 'asset is updated').to.be.true
                  expect(updatedAsset.fields.title['en-US']).equals(
                    'title has changed',
                    'updated title'
                  )
                  return updatedAsset.unpublish().then((unpublishedAsset) => {
                    expect(unpublishedAsset.isDraft(), 'asset is back in draft').to.be.true
                    return unpublishedAsset.archive().then((archivedAsset) => {
                      expect(archivedAsset.isArchived(), 'asset is archived').to.be.true
                      return archivedAsset.unarchive().then((unarchivedAsset) => {
                        expect(unarchivedAsset.isArchived(), 'asset is not archived anymore').to.be
                          .true
                        expect(unarchivedAsset.isDraft(), 'asset is back in draft').to.be.true
                        return unarchivedAsset.delete()
                      })
                    })
                  })
                })
              })
            })
        })
    })
  })
})

// These tests are temporarily commented out because they rely on a
// currently flaky external asset processing api.

// export function assetWriteTests(t, space) {
//   t.test(
//     'Create, process, update, publish, unpublish, archive, unarchive and delete asset',
//     async () => {
//       t.plan(10)

//       return space
//         .createAsset({
//           fields: {
//             title: { 'en-US': 'this is the title' },
//             file: {
//               'en-US': {
//                 contentType: 'image/jpeg',
//                 fileName: 'shiba-stuck.jpg',
//                 upload: TEST_IMAGE_SOURCE_URL,
//               },
//             },
//           },
//         })
//         .then((asset) => {
//           t.equals(asset.fields.title['en-US'], 'this is the title', 'original title')
//           return asset
//             .processForLocale('en-US', { processingCheckWait: 5000 })
//             .then((processedAsset) => {
//               t.ok(asset.isDraft(), 'asset is in draft')
//               t.ok(processedAsset.fields.file['en-US'].url, 'file was uploaded')
//               return processedAsset.publish().then((publishedAsset) => {
//                 t.ok(publishedAsset.isPublished(), 'asset is published')
//                 publishedAsset.fields.title['en-US'] = 'title has changed'
//                 return publishedAsset.update().then((updatedAsset) => {
//                   t.ok(updatedAsset.isUpdated(), 'asset is updated')
//                   t.equals(updatedAsset.fields.title['en-US'], 'title has changed', 'updated title')
//                   return updatedAsset.unpublish().then((unpublishedAsset) => {
//                     t.ok(unpublishedAsset.isDraft(), 'asset is back in draft')
//                     return unpublishedAsset.archive().then((archivedAsset) => {
//                       t.ok(archivedAsset.isArchived(), 'asset is archived')
//                       return archivedAsset.unarchive().then((unarchivedAsset) => {
//                         t.notOk(unarchivedAsset.isArchived(), 'asset is not archived anymore')
//                         t.ok(unarchivedAsset.isDraft(), 'asset is back in draft')
//                         return unarchivedAsset.delete()
//                       })
//                     })
//                   })
//                 })
//               })
//             })
//         })
//     }
//   )

//   t.test('Create and process asset with multiple locales', async () => {
//     t.plan(2)

//     return space
//       .createAsset({
//         fields: {
//           title: { 'en-US': 'this is the title' },
//           file: {
//             'en-US': {
//               contentType: 'image/jpeg',
//               fileName: 'shiba-stuck.jpg',
//               upload: TEST_IMAGE_SOURCE_URL,
//             },
//             'de-DE': {
//               contentType: 'image/jpeg',
//               fileName: 'shiba-stuck.jpg',
//               upload: TEST_IMAGE_SOURCE_URL,
//             },
//           },
//         },
//       })
//       .then((asset) => {
//         return asset.processForAllLocales({ processingCheckWait: 5000 }).then((processedAsset) => {
//           t.ok(processedAsset.fields.file['en-US'].url, 'file en-US was uploaded')
//           t.ok(processedAsset.fields.file['de-DE'].url, 'file de-DE was uploaded')
//         })
//       })
//   })

//   t.test('Upload and process asset with multiple locales', async () => {
//     t.plan(2)

//     return space
//       .createAssetFromFiles({
//         fields: {
//           title: { 'en-US': 'SVG upload test' },
//           file: {
//             'en-US': {
//               contentType: 'image/svg+xml',
//               fileName: 'blue-square.svg',
//               file:
//                 '<svg xmlns="http://www.w3.org/2000/svg"><path fill="blue" d="M50 50h150v50H50z"/></svg>',
//             },
//             'de-DE': {
//               contentType: 'image/svg+xml',
//               fileName: 'red-square.svg',
//               file:
//                 '<svg xmlns="http://www.w3.org/2000/svg"><path fill="red" d="M50 50h150v50H50z"/></svg>',
//             },
//           },
//         },
//       })
//       .then((asset) => {
//         return asset.processForAllLocales({ processingCheckWait: 5000 }).then((processedAsset) => {
//           t.ok(processedAsset.fields.file['en-US'].url, 'file en-US was uploaded')
//           t.ok(processedAsset.fields.file['de-DE'].url, 'file de-DE was uploaded')
//         })
//       })
//   })
// }
