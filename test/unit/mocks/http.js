import sinon from 'sinon'

export default function setupHttpMock(promise = Promise.resolve({ data: {} })) {
  const mock = sinon.stub().returns(promise)

  mock.get = sinon.stub().returns(promise)
  mock.post = sinon.stub().returns(promise)
  mock.put = sinon.stub().returns(promise)
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
