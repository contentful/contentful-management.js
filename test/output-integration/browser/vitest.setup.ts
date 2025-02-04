import { beforeAll, beforeEach, afterAll } from 'vitest'

import puppeteer, { Browser, Page, PuppeteerNode } from 'puppeteer'
import path from 'path'

let browser: Browser
let page: Page

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
  })
})

beforeEach(async () => {
  page = await browser.newPage()

  page.on('console', (msg) => console.log('CONSOLE LOG:', msg.text))
  page.on('error', (err) => console.log('CONSOLE ERROR:', err, err.message))

  await page.goto(`file:${path.join(__dirname, 'public/index.html')}`)

  await page.waitForSelector('#contentful-management-loaded', { timeout: 5_000 })
})

afterAll(async () => {
  await browser.close()
})

export { page }
