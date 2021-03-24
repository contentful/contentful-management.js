import sinon from 'sinon'

export default function setupMakeRequest(promise = Promise.resolve({ data: {} })) {
  return sinon.stub().returns(promise)
}
