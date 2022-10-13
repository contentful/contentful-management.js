import sinon from 'sinon'
import { MakeRequest } from '../../../lib/common-types'

export default function setupMakeRequest(
  promise: Promise<unknown> = Promise.resolve({ data: {} })
): MakeRequest {
  return sinon.stub().returns(promise)
}
