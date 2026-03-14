'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('theme');
  if (stored) root.setAttribute('data-theme', stored);

  // Enable theme transitions after initial paint to prevent flash
  requestAnimationFrame(() => requestAnimationFrame(() => {
    root.classList.add('transitions-ready');
  }));

  toggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    let next = current === 'dark' ? 'light' : 'dark';
    if (!current) {
      next = matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
    }
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    const r = (parseInt(toggle.dataset.r || '0', 10) + 180);
    toggle.dataset.r = r;
    toggle.style.transform = `rotate(${r}deg)`;
  });

  // Active nav link
  const { pathname } = location;
  for (const link of document.querySelectorAll('.site-nav a')) {
    const href = link.getAttribute('href');
    if (href === '/' ? pathname === '/' : pathname.startsWith(href)) {
      link.classList.add('nav-active');
    }
  }

  // Reading time
  const readingEl = document.querySelector('.reading-time');
  if (readingEl) {
    const words = parseInt(readingEl.dataset.words, 10) || 0;
    const minutes = Math.max(1, Math.round(words / 200));
    readingEl.textContent = `${minutes} min read`;
  }

  // Reading progress bar
  const bar = document.getElementById('reading-progress');
  if (bar) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = h > 0 ? `${scrollY / h * 100}%` : '0%';
    }, { passive: true });
  }
});
