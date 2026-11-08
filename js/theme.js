/* Site-wide theme: system (default), light, dark. No cookies or dependencies. */
(function () {
  'use strict';
  var storageKey = 'merhart-theme';
  var modes = ['system', 'light', 'dark'];
  var labels = {
    cs: { system: 'Automatický režim', light: 'Světlý režim', dark: 'Tmavý režim', change: 'Změnit vzhled' },
    en: { system: 'System theme', light: 'Light theme', dark: 'Dark theme', change: 'Change appearance' }
  };
  function savedMode() {
    try {
      var value = localStorage.getItem(storageKey);
      return modes.indexOf(value) === -1 ? 'system' : value;
    } catch (error) { return 'system'; }
  }
  var mode = savedMode();
  function applyTheme() {
    if (mode === 'system') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', mode);
  }
  applyTheme(); // Run in <head> before page content to avoid a light-mode flash.
  function makeToggle() {
    var language = document.documentElement.lang === 'en' ? 'en' : 'cs';
    var strings = labels[language];
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-toggle';
    function updateButton() {
      var icons = { system: '◐', light: '☀', dark: '☾' };
      button.textContent = icons[mode];
      button.setAttribute('aria-label', strings.change + ': ' + strings[mode]);
      button.title = strings.change + ': ' + strings[mode];
    }
    button.addEventListener('click', function () {
      mode = modes[(modes.indexOf(mode) + 1) % modes.length];
      try { localStorage.setItem(storageKey, mode); } catch (error) { /* private mode */ }
      applyTheme();
      updateButton();
    });
    updateButton();
    document.body.insertBefore(button, document.body.firstChild);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', makeToggle);
  else makeToggle();
})();
