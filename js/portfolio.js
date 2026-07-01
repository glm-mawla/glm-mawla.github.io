(function () {
  const tabs = Array.from(document.querySelectorAll('[data-theme]'));
  const themeKey = 'portfolio-theme';

  function setTheme(theme, focusTab) {
    const selectedTheme = theme === 'builder' ? 'builder' : 'executive';
    document.body.classList.toggle('theme-builder', selectedTheme === 'builder');
    document.body.classList.toggle('theme-executive', selectedTheme === 'executive');

    tabs.forEach((tab) => {
      const selected = tab.dataset.theme === selectedTheme;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focusTab) tab.focus();
    });

    try {
      localStorage.setItem(themeKey, selectedTheme);
    } catch (error) {
      // The selected theme still works when browser storage is unavailable.
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setTheme(tab.dataset.theme, false));
    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const nextIndex = event.key === 'ArrowRight' ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
      setTheme(tabs[nextIndex].dataset.theme, true);
    });
  });

  let initialTheme = 'executive';
  try {
    initialTheme = localStorage.getItem(themeKey) || initialTheme;
  } catch (error) {
    // Use the default theme when browser storage is unavailable.
  }

  setTheme(initialTheme, false);
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
