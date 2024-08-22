import { Mock, vi } from 'vitest'

/**
 * @typedef {object} HTTPStub
 * @property {sinon.SinonStub} get
 * @property {sinon.SinonStub} post
 * @property {sinon.SinonStub} put
 * @property {sinon.SinonStub} delete
 * @property {object} defaults
 * @property {object} httpClientParams
 */

interface MockedHttp<T, R> extends Mock<[T], R> {
  get?: Mock<[T], R>
  post?: Mock<[T], R>
  put?: Mock<[T], R>
  patch?: Mock<[T], R>
  delete?: Mock<[T], R>
  defaults?: { baseURL: string }
  httpClientParams?: { hostUpload: string }
  cloneWithNewParams?: () => MockedHttp<T, R>
}

/**
 * @returns {sinon.SinonStub & HTTPStub}
 */
export default function setupHttpMock(promise = Promise.resolve({ data: {} })) {
  const mock: MockedHttp<{}, typeof promise> = vi.fn().mockReturnValue(promise)

  mock.get = vi.fn().mockReturnValue(promise)
  mock.post = vi.fn().mockReturnValue(promise)
  mock.put = vi.fn().mockReturnValue(promise)
  mock.patch = vi.fn().mockReturnValue(promise)
  mock.delete = vi.fn().mockReturnValue(promise)

  mock.defaults = {
    baseURL: 'https://api.contentful.com/spaces/',
  }
  mock.httpClientParams = {
    hostUpload: 'upload.contentful.com',
  }

  mock.cloneWithNewParams = () => mock

  return mock as Required<MockedHttp<{}, typeof promise>>
}
