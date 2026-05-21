'use client';

export function ThemeToggle() {
  function toggle() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  return (
    <button id="theme-toggle" aria-label="Toggle theme" onClick={toggle}>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <defs>
          <clipPath id="tt-cut">
            <path className="tt-clip" />
          </clipPath>
        </defs>
        <g clipPath="url(#tt-cut)">
          <circle className="tt-circle" cx="16" cy="16" r="8.5" fill="currentColor" />
          <g className="tt-rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="16" y1="1"  x2="16" y2="5"  />
            <line x1="16" y1="27" x2="16" y2="31" />
            <line x1="1"  y1="16" x2="5"  y2="16" />
            <line x1="27" y1="16" x2="31" y2="16" />
            <line x1="5.2"  y1="5.2"  x2="8.1"  y2="8.1"  />
            <line x1="23.9" y1="23.9" x2="26.8" y2="26.8" />
            <line x1="26.8" y1="5.2"  x2="23.9" y2="8.1"  />
            <line x1="8.1"  y1="23.9" x2="5.2"  y2="26.8" />
          </g>
        </g>
      </svg>
    </button>
  );
}
