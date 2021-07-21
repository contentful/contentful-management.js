import { after } from 'mocha'
import { cleanupTestSpaces } from './helpers'

after(async () => {
  await cleanupTestSpaces()
})
