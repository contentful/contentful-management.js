import { before, after } from 'mocha'
import { cleanupTestSpaces } from './helpers'

const housekeeping = async () => {
  try {
    await cleanupTestSpaces()
  } catch {
    // ignore if the cleanup fails. Usually fails locally due to missing credentials
  }
}

before('clean up test spaces', async () => {
  await housekeeping()
  console.log('Running tests...')
})

after('clean up test spaces', async () => {
  await housekeeping()
})
