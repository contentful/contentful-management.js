import { after } from 'mocha'
import { cleanupSpaces } from './cleanup-spaces'

after(async () => {
  await cleanupSpaces()
})
