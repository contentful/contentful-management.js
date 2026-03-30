;(function () {
  function initVersionSelector() {
    // Target: top of the left sidebar (.site-menu)
    var sidebar = document.querySelector('.site-menu')
    if (!sidebar) return

    // Determine the base path for versioned docs
    // Expected URL structure: .../contentful-management/<VERSION>/...
    var pathSegments = window.location.pathname.split('/')
    var cmIdx = pathSegments.indexOf('contentful-management')
    if (cmIdx === -1) return

    var currentVersion = pathSegments[cmIdx + 1]
    if (!currentVersion) return

    var docsBase = pathSegments.slice(0, cmIdx + 1).join('/')
    var versionsUrl = docsBase + '/versions.json'

    fetch(versionsUrl)
      .then(function (r) {
        return r.ok ? r.json() : Promise.reject('not found')
      })
      .then(function (versions) {
        if (!versions || !versions.length) return

        var wrapper = document.createElement('div')
        wrapper.className = 'tsd-version-selector'

        var label = document.createElement('label')
        label.setAttribute('for', 'tsd-version-select')
        label.textContent = 'Version'
        wrapper.appendChild(label)

        var selectWrap = document.createElement('div')
        selectWrap.className = 'tsd-version-select-wrap'

        var select = document.createElement('select')
        select.id = 'tsd-version-select'
        select.setAttribute('aria-label', 'Documentation version')

        versions.forEach(function (v) {
          var opt = document.createElement('option')
          opt.value = v
          opt.textContent = v === 'latest' ? v : 'v' + v
          if (v === currentVersion) opt.selected = true
          select.appendChild(opt)
        })

        // If current version isn't in the list, add it
        if (!versions.includes(currentVersion)) {
          var opt = document.createElement('option')
          opt.value = currentVersion
          opt.textContent = currentVersion === 'latest' ? currentVersion : 'v' + currentVersion
          opt.selected = true
          select.insertBefore(opt, select.firstChild)
        }

        select.addEventListener('change', function () {
          var newVersion = select.value
          var subPath = pathSegments.slice(cmIdx + 2).join('/')
          var newUrl = docsBase + '/' + newVersion + '/' + subPath
          window.location.href = newUrl
        })

        selectWrap.appendChild(select)
        wrapper.appendChild(selectWrap)
        sidebar.insertBefore(wrapper, sidebar.firstChild)
      })
      .catch(function () {
        // versions.json not available — skip selector (e.g. local dev)
      })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVersionSelector)
  } else {
    initVersionSelector()
  }
})()
