/**
 * Search result tagger — adds visual badges so users can distinguish plain
 * client, legacy client, and shared type results at a glance.
 *
 * Classification uses the href on each result's <a> element:
 *   - create-*-api                              → legacy
 *   - *PlainClientAPI*                          → plain
 *   - entities/{dir}/{WrapperInterface}.html    → legacy
 *   - entities/... (everything else)            → shared
 *   - plain/...                                 → plain
 *   - top-level {entity}.html                   → plain
 *
 * Injected inline by typedoc-search-tags.mjs via the head.end hook.
 */

;(function () {
  'use strict'

  var SKIP_TOP_LEVEL = /^(index|modules|common-types|getting-started|shared-types|hierarchy)(\.|$)/

  function toPascalCase(kebab) {
    return kebab.replace(/(^|-)([a-z])/g, function (_, _sep, ch) {
      return ch.toUpperCase()
    })
  }

  function classify(rel) {
    if (/^create-/.test(rel)) return 'legacy'
    if (rel.indexOf('PlainClientAPI') !== -1) return 'plain'

    if (/^entities\//.test(rel)) {
      var parts = rel.replace(/#.*$/, '').split('/')
      if (parts.length >= 3) {
        var dir = parts[1]
        var file = parts[2].replace(/\.html$/, '')
        if (file === toPascalCase(dir)) return 'legacy'
      }
      return 'shared'
    }

    if (/^plain\//.test(rel)) return 'plain'
    if (/^[a-z][a-z0-9-]*\.html/.test(rel) && !SKIP_TOP_LEVEL.test(rel)) return 'plain'

    return null
  }

  function tagResults(list) {
    var items = list.querySelectorAll('li')
    for (var i = 0; i < items.length; i++) {
      var li = items[i]
      if (li.dataset.searchTagged) continue
      li.dataset.searchTagged = 'true'

      var anchor = li.querySelector('a')
      if (!anchor) continue

      var href = anchor.getAttribute('href') || ''
      var base = document.documentElement.dataset.base || './'
      var rel = href
      if (href.indexOf(base) === 0) {
        rel = href.slice(base.length)
      }

      var tag = classify(rel)
      if (tag) {
        var badge = document.createElement('span')
        badge.className = 'search-tag-' + tag
        badge.textContent = tag
        anchor.appendChild(badge)
      }
    }
  }

  function init() {
    var results = document.getElementById('tsd-search-results')
    if (!results) return

    new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].addedNodes.length > 0) {
          tagResults(results)
          return
        }
      }
    }).observe(results, { childList: true })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
