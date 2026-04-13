(function () {
  var toggle   = document.getElementById('theme-toggle');
  var flyout   = document.getElementById('theme-flyout');
  var switcher = document.getElementById('theme-switcher');

  function getThemePath(name) {
    // Derive path from the current href so pathPrefix is handled automatically
    var link = document.getElementById('theme-stylesheet');
    return link.href.replace(/\/[^/]+\.css(\?.*)?$/, '/' + name + '.css');
  }

  function applyTheme(name) {
    document.getElementById('theme-stylesheet').href = getThemePath(name);
    localStorage.setItem('theme', name);
    document.querySelectorAll('.theme-option').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.dataset.theme === name);
    });
  }

  function openFlyout() {
    flyout.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeFlyout() {
    flyout.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  // Mark the currently active theme on load
  var current = localStorage.getItem('theme') || 'carnival';
  document.querySelectorAll('.theme-option').forEach(function (btn) {
    btn.classList.toggle('is-active', btn.dataset.theme === current);
  });

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    flyout.classList.contains('is-open') ? closeFlyout() : openFlyout();
  });

  document.querySelectorAll('.theme-option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyTheme(this.dataset.theme);
      closeFlyout();
    });
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!switcher.contains(e.target)) closeFlyout();
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeFlyout();
  });
})();
