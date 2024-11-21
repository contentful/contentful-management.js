import type { Mock } from 'vitest'
import { vi } from 'vitest'

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

export default function setupHttpMock(promise = Promise.resolve({ data: {} })) {
  const mock: MockedHttp<{}, typeof promise> = vi.fn().mockImplementation(() => {
    console.log('Mock: Returning promise via direct call')
    return promise
  })

  mock.get = vi.fn().mockImplementation(() => {
    console.log('Mock: Returning promise via get call')
    return promise
  })
  mock.post = vi.fn().mockImplementation(() => {
    console.log('Mock: Returning promise via post call')
    return promise
  })
  mock.put = vi.fn().mockImplementation(() => {
    console.log('Mock: Returning promise via put call')
    return promise
  })
  mock.patch = vi.fn().mockImplementation(() => {
    console.log('Mock: Returning promise via patch call')
    return promise
  })
  mock.delete = vi.fn().mockImplementation(() => {
    console.log('Mock: Returning promise via delete call')
    return promise
  })

  mock.defaults = {
    baseURL: 'https://api.contentful.com/spaces/',
  }
  mock.httpClientParams = {
    hostUpload: 'upload.contentful.com',
  }

  mock.cloneWithNewParams = () => mock

  return mock as Required<MockedHttp<{}, typeof promise>>
}
