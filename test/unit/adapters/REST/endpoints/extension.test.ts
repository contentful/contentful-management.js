import { describe } from 'vitest'
import { reusableEntityUpdateTest } from '../reusable-tests/update'

describe('Rest Extension', () => {
  reusableEntityUpdateTest('Extension', 'extension')
})
