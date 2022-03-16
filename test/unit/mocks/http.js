import sinon from 'sinon'

/**
 * @typedef {object} HTTPStub
 * @property {sinon.SinonStub} get
 * @property {sinon.SinonStub} post
 * @property {sinon.SinonStub} put
 * @property {sinon.SinonStub} delete
 * @property {object} defaults
 * @property {object} httpClientParams
 */

/**
 * @returns {sinon.SinonStub & HTTPStub}
 */
export default function setupHttpMock(promise = Promise.resolve({ data: {} })) {
  const mock = sinon.stub().returns(promise)

  mock.get = sinon.stub().returns(promise)
  mock.post = sinon.stub().returns(promise)
  mock.put = sinon.stub().returns(promise)
  mock.patch = sinon.stub().returns(promise)
  mock.delete = sinon.stub().returns(promise)
  mock.defaults = {
    baseURL: 'https://api.contentful.com/spaces/',
  }
  mock.httpClientParams = {
    hostUpload: 'upload.contentful.com',
  }

  mock.cloneWithNewParams = () => mock

  return mock
}
