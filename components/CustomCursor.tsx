'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let x = 0, y = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const render = () => {
      if (dot) {
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
      }
      raf = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={dotRef} className="custom-cursor" />;
}
