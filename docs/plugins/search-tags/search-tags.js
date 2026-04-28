/**
 * Search result tagger — adds visual badges to legacy client results so users
 * can distinguish plain client methods from legacy chainable methods at a glance.
 *
 * Detection uses the href on each result's <a> element:
 *   - entities/<type>/<Wrapper>.html#<method>  → legacy wrapper method (inherited)
 *   - create-*-api                             → legacy module page
 *
 * Injected inline by typedoc-search-tags.mjs via the head.end hook.
 */

;(function () {
  'use strict'

  var LEGACY_URL_PATTERN = /^(?:entities\/|create-)/

  function tagResults(list) {
    var items = list.querySelectorAll('li')
    for (var i = 0; i < items.length; i++) {
      var li = items[i]
      if (li.dataset.searchTagged) continue
      li.dataset.searchTagged = 'true'

      var anchor = li.querySelector('a')
      if (!anchor) continue

      // Extract the relative path portion of the href
      var href = anchor.getAttribute('href') || ''
      var base = document.documentElement.dataset.base || './'
      var rel = href
      if (href.indexOf(base) === 0) {
        rel = href.slice(base.length)
      }

      if (LEGACY_URL_PATTERN.test(rel)) {
        var badge = document.createElement('span')
        badge.className = 'search-tag-legacy'
        badge.textContent = 'legacy'
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
