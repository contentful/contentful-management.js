import { after } from 'mocha'
import { cleanupTestSpaces } from './helpers'

after('clean up test spaces', async () => {
  try {
    await cleanupTestSpaces()
  } catch {
    // ignore if the cleanup fails. Usually fails locally due to missing credentials
  }
})
