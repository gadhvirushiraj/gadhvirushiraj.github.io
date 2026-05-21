'use client';

import { useEffect, useRef } from 'react';

const steps = [
  { t: 'type',  add: 'AI Researcher',     d: 65 },
  { t: 'pause', ms: 900 },
  { t: 'erase', to: 3,                    d: 45 },
  { t: 'pause', ms: 300 },
  { t: 'type',  add: 'Developer',         d: 65 },
  { t: 'pause', ms: 900 },
  { t: 'erase', to: 0,                    d: 38 },
  { t: 'pause', ms: 450 },
  { t: 'type',  add: 'Design Enthusiast', d: 65 },
  { t: 'pause', ms: 1000 },
  { t: 'erase', to: 0,                    d: 38 },
  { t: 'pause', ms: 400 },
  { t: 'loop' },
] as const;

export function Typewriter() {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (spanRef.current) spanRef.current.textContent = 'Design Enthusiast';
      return;
    }
    let cur = '';
    let si = 0;
    let timer: ReturnType<typeof setTimeout>;

    function next() {
      const s = steps[si++ % steps.length];
      if (s.t === 'loop') { si = 0; next(); return; }
      if (s.t === 'pause') {
        timer = setTimeout(next, s.ms);
      } else if (s.t === 'type') {
        let i = 0;
        (function typeChar() {
          if (!spanRef.current) return;
          if (i < s.add.length) {
            cur += s.add[i++];
            spanRef.current.textContent = cur;
            timer = setTimeout(typeChar, s.d);
          } else { next(); }
        })();
      } else if (s.t === 'erase') {
        (function eraseChar() {
          if (!spanRef.current) return;
          if (cur.length > s.to) {
            cur = cur.slice(0, -1);
            spanRef.current.textContent = cur;
            timer = setTimeout(eraseChar, s.d);
          } else { next(); }
        })();
      }
    }
    next();
    return () => clearTimeout(timer);
  }, []);

  return (
    <p className="subtitle-typing">
      <span className="sub-wrapper">[ <span ref={spanRef} className="sub-content" /> ]</span>
    </p>
  );
}
