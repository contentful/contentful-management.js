import { describe } from 'vitest'
import { reusableEntityUpdateTest } from '../reusable-tests/update.js'

describe('Rest Extension', () => {
  reusableEntityUpdateTest('Extension', 'extension')
})
