import { vi } from 'vitest'
import type { MockedFunction } from 'vitest'
import type { MakeRequest } from '../../../lib/common-types'

export default function setupMakeRequest(
  promise: Promise<unknown> = Promise.resolve({ data: {} })
): MockedFunction<MakeRequest> & MakeRequest {
  return vi.fn().mockReturnValue(promise)
}
