'use client';

import { useEffect, useLayoutEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

let sidebarSnapshot: DOMRect | null = null;

export function ViewTransitions() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleVisibility = () => {
      if (!document.hidden) {
        document.documentElement.style.cursor = 'none';
        requestAnimationFrame(() => {
          document.documentElement.style.cursor = '';
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('#')) return;
      if (anchor.getAttribute('target') === '_blank') return;

      const sidebar = document.querySelector('.sidebar') as HTMLElement;
      if (sidebar) {
        sidebarSnapshot = sidebar.getBoundingClientRect();
        sidebar.style.opacity = '0';
      }

      const line = document.getElementById('sidebar-line');
      if (line) line.style.opacity = '0';

      // If a panel is open, snap #main back to its resting position instantly
      // before navigating so the new page doesn't inherit the shifted transform.
      if (document.body.classList.contains('panel-open')) {
        document.body.classList.remove('panel-open');
        const main = document.getElementById('main');
        if (main) {
          main.style.transition = 'none';
          main.style.transform = 'none';
          requestAnimationFrame(() => { main.style.transition = ''; main.style.transform = ''; });
        }
      }

      e.preventDefault();
      router.push(href);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [router]);

  useLayoutEffect(() => {
    if (!sidebarSnapshot) return;
    const first = sidebarSnapshot;
    sidebarSnapshot = null;

    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    if (!sidebar) return;

    const last = sidebar.getBoundingClientRect();
    const deltaY = first.top - last.top;

    // Animate the line growing in the direction of sidebar movement
    const line = document.getElementById('sidebar-line');
    if (line) {
      line.style.opacity = '1';
      if (Math.abs(deltaY) >= 2) {
        const clipStart = deltaY > 0 ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)';
        line.style.clipPath = clipStart;
        const anim = line.animate(
          [{ clipPath: clipStart }, { clipPath: 'inset(0 0 0 0)' }],
          { duration: 650, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', fill: 'forwards' }
        );
        anim.finished.then(() => { anim.cancel(); line.style.clipPath = ''; });
      } else {
        line.style.clipPath = '';
      }
    }

    if (Math.abs(deltaY) < 2) {
      sidebar.style.opacity = '';
      return;
    }

    const width = sidebar.offsetWidth;

    const sidebarMargin = parseFloat(getComputedStyle(sidebar).marginRight) || 0;
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `width:${width}px; flex-shrink:0; margin-right:${sidebarMargin}px;`;
    sidebar.parentElement!.insertBefore(placeholder, sidebar);

    // Setting cssText replaces the opacity:0 inline style, making the sidebar
    // visible again — but now it's at the FIRST position (via translateY).
    // This all happens before the browser paints, so there is no flicker.
    sidebar.style.cssText = `position:fixed; top:${last.top}px; width:${width}px; z-index:10; transform:translateY(${deltaY}px);`;

    requestAnimationFrame(() => {
      const anim = sidebar.animate(
        [
          { transform: `translateY(${deltaY}px)` },
          { transform: 'translateY(0)' },
        ],
        {
          duration: 650,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          fill: 'forwards',
        }
      );

      anim.finished.then(() => {
        anim.cancel();
        sidebar.style.cssText = '';
        placeholder.remove();
      });
    });
  }, [pathname]);

  return null;
}
