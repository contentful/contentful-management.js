/* global jest */

import { Promise } from 'es6-promise'

export default function setupHttpMock (promise = Promise.resolve({data: {}})) {
  return {
    get: jest.fn().mockReturnValue(promise),
    post: jest.fn().mockReturnValue(promise),
    put: jest.fn().mockReturnValue(promise),
    delete: jest.fn().mockReturnValue(promise),
    defaults: {
      baseURL: 'https://api.contentful.com/spaces/'
    }
  }
}
