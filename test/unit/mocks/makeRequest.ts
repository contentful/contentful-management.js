import { vi } from 'vitest'
import type { Mock } from 'vitest'
import type { MakeRequest } from '../../../lib/common-types.js'

export default function setupMakeRequest<T>(
  promise: Promise<T>
): Mock<{ payload: T }[], T> & MakeRequest {
  return vi.fn().mockReturnValue(promise)
}
