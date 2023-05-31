import { before, after } from 'mocha'
import { cleanupTestSpaces, cleanupTestEnvironmentTemplates } from './helpers'

const housekeeping = async () => {
  try {
    await Promise.all([cleanupTestSpaces(), cleanupTestEnvironmentTemplates()])
  } catch (err) {
    if (err.message === 'Missing credential') {
      console.log('Skipped deletion of old test spaces due to missing credentials.')
    } else {
      console.log('Skipped deletion of old test spaces. Error:', err.message)
    }
  }
}

before('clean up test spaces', async () => {
  await housekeeping()
  console.log('Running tests...')
})

after('clean up test spaces', async () => {
  await housekeeping()
})
