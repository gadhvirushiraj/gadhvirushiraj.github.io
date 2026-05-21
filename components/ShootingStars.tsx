'use client';

import { useEffect, useRef } from 'react';
import styles from './ShootingStars.module.css';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  trail: { x: number; y: number }[];
  nextSpawn: number;
}

export function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const stars: Star[] = [];
    let lastSpawn = 0;
    let nextInterval = 2000 + Math.random() * 2000;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function spawnStar() {
      if (!canvas) return;
      const fromTop = Math.random() > 0.25;
      const x = fromTop ? Math.random() * canvas.width * 0.75 : Math.random() * canvas.width * 0.2;
      const y = fromTop ? -2 : Math.random() * canvas.height * 0.25;
      const angle = (28 + Math.random() * 22) * (Math.PI / 180);
      const speed = 4 + Math.random() * 3.5;

      stars.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        opacity: 0.9 + Math.random() * 0.1,
        trail: [],
        nextSpawn: 0,
      });
    }

    function draw(ts: number) {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (ts - lastSpawn > nextInterval && stars.length < 3) {
        spawnStar();
        lastSpawn = ts;
        nextInterval = 1800 + Math.random() * 2400;
      }

      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 22) s.trail.shift();

        s.x += s.vx;
        s.y += s.vy;
        s.opacity -= 0.012;

        // trail
        for (let j = 1; j < s.trail.length; j++) {
          const t = j / s.trail.length;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(212,130,31,${t * s.opacity * 0.85})`;
          ctx.lineWidth = t * 1.8;
          ctx.moveTo(s.trail[j - 1].x, s.trail[j - 1].y);
          ctx.lineTo(s.trail[j].x, s.trail[j].y);
          ctx.stroke();
        }

        // head glow
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 3);
        g.addColorStop(0, `rgba(255,200,100,${s.opacity})`);
        g.addColorStop(1, `rgba(212,130,31,0)`);
        ctx.beginPath();
        ctx.arc(s.x, s.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        if (s.x > canvas.width + 20 || s.y > canvas.height + 20 || s.opacity <= 0) {
          stars.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
