import sinon from 'sinon'

export default function setupHttpMock(promise = Promise.resolve({ data: {} })) {
  const mock = {
    get: sinon.stub().returns(promise),
    post: sinon.stub().returns(promise),
    put: sinon.stub().returns(promise),
    delete: sinon.stub().returns(promise),
    defaults: {
      baseURL: 'https://api.contentful.com/spaces/',
    },
    httpClientParams: {
      hostUpload: 'upload.contentful.com',
    },
  }

  mock.cloneWithNewParams = () => mock

  return mock
}
