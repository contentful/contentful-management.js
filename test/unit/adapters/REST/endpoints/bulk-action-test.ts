// import { describe, test } from 'mocha'
// import { expect } from 'chai'
// import { makeLink, makeVersionedLink } from '../../../../utils'
// import { cloneMock } from '../../../mocks/entities'
// import setupRestAdapter from '../helpers/setupRestAdapter'

// const setup = (promise = Promise.resolve({}), params = {}) => {
//   return {
//     ...setupRestAdapter(promise, params),
//     entityMock: cloneMock('bulkAction'),
//   }
// }

// const bulkActionPublishPayload = {
//   entities: {
//     sys: { type: 'Array' },
//     items: [
//       makeVersionedLink('Entry', 'testEntryId', 1),
//       makeVersionedLink('Asset', 'testAssetId', 2),
//     ],
//   },
// }

// const bulkActionPayload = {
//   entities: {
//     sys: { type: 'Array' },
//     items: [makeLink('Entry', 'testEntryId'), makeLink('Asset', 'testAssetId')],
//   },
// }

// describe('REST BulkAction', () => {
//   test.only('should publish using the BulkAction publish endpoint', async () => {
//     const { httpMock, adapterMock, entityMock } = setup()

//     adapterMock
//       .makeRequest({
//         userAgent: 'Test',
//         entityType: 'BulkAction',
//         action: 'publish',
//         params: {
//           environmentId: 'master',
//           spaceId: 'my-space',
//         },
//         payload: bulkActionPublishPayload,
//       })
//       .then((data) => {})

//     expect(httpMock.post.args[0][0]).to.eql(
//       '/spaces/my-space/environments/master/bulk_actions/publish'
//     )
//   })
// })
