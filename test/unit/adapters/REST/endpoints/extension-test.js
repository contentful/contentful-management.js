import { describe } from 'mocha'
import { reusableEntityUpdateTest } from '../reusable-tests/update'

describe('Rest Extension', () => {
  reusableEntityUpdateTest('Extension', 'extension')
})
