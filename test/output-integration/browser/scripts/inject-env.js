/* eslint-disable no-undef */
import fs from 'fs'
import { resolve } from 'path'
import * as url from 'url'

// Define the path for the output file
const outputPath = resolve(
  url.fileURLToPath(new URL('.', import.meta.url)),
  '..',
  'public',
  'env.js'
)

// Convert process.env into a JS object with JSON.stringify
const envVariables = Object.keys(process.env).reduce((acc, key) => {
  acc[key] = process.env[key]
  return acc
}, {})

// Write the JS file that exports the environment variables
const fileContent = `
// Auto-generated file for exposing environment variables (testing purposes only - do not do this in production)
const process = { env: ${JSON.stringify(envVariables, null, 2)} };
`

fs.writeFileSync(outputPath, fileContent, 'utf8')

console.log(`Environment variables written to ${outputPath}`)
