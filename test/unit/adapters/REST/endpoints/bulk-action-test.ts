import { describe, test } from 'mocha'
import { cloneMock } from '../../../mocks/entities'
import { wrapEntry } from '../../../../../lib/entities/entry'
import { expect } from 'chai'
import setupRestAdapter from '../helpers/setupRestAdapter'

const setup = (promise, params = {}) => {
  return {
    ...setupRestAdapter(promise, params),
    entityMock: cloneMock('bulkAction'),
  }
}
