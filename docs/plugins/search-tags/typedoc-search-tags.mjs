/**
 * TypeDoc plugin — adds "legacy" badges to search results that point to
 * legacy client modules or inherited wrapper methods.
 *
 * Uses the same head.end hook pattern as the version-selector plugin.
 */

import { JSX } from 'typedoc'
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * @param {import('typedoc').Application} app
 */
export function load(app) {
  let css = ''
  let js = ''

  try {
    css = readFileSync(join(__dirname, 'search-tags.css'), 'utf8')
    js = readFileSync(join(__dirname, 'search-tags.js'), 'utf8')
  } catch (err) {
    app.logger.warn(`[search-tags] Could not read asset files: ${err.message}`)
    return
  }

  app.renderer.hooks.on('head.end', () =>
    JSX.createElement(
      JSX.Fragment,
      null,
      JSX.createElement(JSX.Raw, {
        html: `<style id="search-tags-styles">\n${css}\n</style>`,
      }),
      JSX.createElement(JSX.Raw, {
        html: `<script id="search-tags-script">\n${js}\n</script>`,
      }),
    ),
  )
}
