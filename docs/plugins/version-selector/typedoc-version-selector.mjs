/**
 * TypeDoc plugin — injects the version-selector dropdown into every generated page.
 *
 * Works by hooking into `head.end` and inlining the companion CSS and JS files
 * so no extra asset-copy step is required.  TypeDoc's `JSX.Raw` is used for the
 * inline blocks so the content is never HTML-escaped.
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
  // Read assets synchronously at load time so errors surface immediately
  // rather than silently producing empty output at render time.
  let css = ''
  let js = ''

  try {
    css = readFileSync(join(__dirname, 'version-selector.css'), 'utf8')
    js = readFileSync(join(__dirname, 'version-selector.js'), 'utf8')
  } catch (err) {
    app.logger.warn(`[version-selector] Could not read asset files: ${err.message}`)
    return
  }

  app.renderer.hooks.on('head.end', () =>
    JSX.createElement(
      JSX.Fragment,
      null,
      JSX.createElement(JSX.Raw, {
        html: `<style id="version-selector-styles">\n${css}\n</style>`,
      }),
      JSX.createElement(JSX.Raw, {
        html: `<script id="version-selector-script">\n${js}\n</script>`,
      }),
    ),
  )
}
