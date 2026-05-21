'use client';

import { useEffect, useRef } from 'react';

const IMAGE_CARDS = [
  { src: '/images/computing-corner/ai_climbs.webp',        alt: 'RL humanoid',     caption: 'Snapshot of RL training episodes — humanoid learning to traverse stairs. [AI Warehouse YT]' },
  { src: '/images/computing-corner/cyclegan.png',           alt: 'CycleGAN',        caption: '[CycleGAN] 2017 — Putin detected as equine; feature stylized as zebra. Horse2Zebra dataset.', crop: 'top' },
  { src: '/images/computing-corner/JacquardLoom.jpg',       alt: 'Jacquard Loom',   caption: 'Jacquard Loom (1804) — punch-card programmable loom. Literally the first "software".' },
  { src: '/images/computing-corner/curta.jpg',              alt: 'Curta Calculator', caption: 'Curta Calculator (1948) — mechanical marvel that fits in your palm. Designed in a Nazi concentration camp by Curt Herzstark.' },
  { src: '/images/computing-corner/neural-geometry.png',    alt: 'Neural Geometry',  caption: 'Neural feature geometry — how concepts are encoded as directions in activation space. [Goodfire Calculator]', fit: 'contain' },
  { src: '/images/computing-corner/proptotype-google-glass.webp', alt: 'Google Glass Prototype', caption: 'Early Google Glass prototype — wearable computing before it was cool (or accepted).' },
  { src: '/images/computing-corner/faulty-reward-functions.webp', alt: 'Faulty Reward Function', caption: 'Faulty reward function — RL agent exploits the score by spinning in circles instead of finishing the race.' },
  { src: '/images/computing-corner/curve-detector.png',           alt: 'Curve Detector',        caption: 'Curve detector neurons in CNNs — early-layer units that fire for curved edges at any orientation. Part of the "Zoom In" thread on neural network feature visualization. [Olah et al., Distill.pub 2020]' },
  { src: '/images/computing-corner/chinese-room.png',             alt: 'Chinese Room',          caption: 'Searle\'s Chinese Room (1980) — a thought experiment arguing syntax ≠ semantics: a system can manipulate symbols perfectly without understanding them. Still the sharpest intuition pump against strong AI.' },
  { src: '/images/computing-corner/f-pattern.jpg',                alt: 'F-Pattern Eye Tracking', caption: 'F-Pattern eye-tracking heatmap — users scan the web in an F shape: two horizontal sweeps then a vertical drop. Every layout decision you\'ve ever made was predicted by this in 2006. [Nielsen Norman Group]' },
  { src: '/images/computing-corner/turing-pattern.png',          alt: 'Turing Reaction-Diffusion', caption: 'Turing\'s Reaction-Diffusion (1952) — Alan Turing\'s last paper explained why leopards have spots using two chemicals diffusing at different rates. The same equations now generate procedural textures in games and films. Nobody expects Turing to have done biology.' },
];

const PLACEHOLDER_COUNT = 1;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function ImageGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.bio-img-card'));
    const shuffled = shuffle(cards);
    shuffled.forEach(c => grid.appendChild(c));

    const zoomImg  = grid.querySelector<HTMLElement>('.bio-zoom-img')!;
    const zoomText = grid.querySelector<HTMLElement>('.bio-zoom-text')!;

    function reset() {
      cards.forEach(c => c.querySelector('.bio-img-flipper')?.classList.remove('flipped'));
      zoomImg.className  = 'bio-zoom-img';
      zoomText.className = 'bio-zoom-text';
    }

    cards.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        cards.forEach(c => c.querySelector('.bio-img-flipper')?.classList.add('flipped'));
        const isTop   = Math.floor(index / 3) <= 1;
        const imgEl   = card.querySelector<HTMLImageElement>('.bio-img-front img');
        const caption = card.dataset.caption ?? '';
        if (imgEl) {
          zoomImg.style.backgroundImage    = `url('${imgEl.getAttribute('src')}')`;
          zoomImg.style.backgroundSize     = card.dataset.fit === 'contain' ? 'contain' : 'cover';
          zoomImg.style.backgroundPosition = card.dataset.crop ?? 'center';
          zoomImg.style.backgroundColor   = card.dataset.fit === 'contain' ? '#f5f5f5' : '';
          zoomImg.className  = `bio-zoom-img ${isTop ? 'pos-top' : 'pos-bottom'} visible`;
          zoomText.textContent = caption;
          zoomText.className = `bio-zoom-text ${isTop ? 'pos-bottom' : 'pos-top'} visible`;
        }
      });
    });

    grid.addEventListener('mouseleave', reset);
  }, []);

  return (
    <div className="bio-images" ref={gridRef}>
      <div className="bio-zoom-img" />
      <div className="bio-zoom-text" />

      {IMAGE_CARDS.map((card) => (
        <div
          key={card.src}
          className="bio-img-card"
          data-caption={card.caption}
          data-crop={card.crop}
          data-fit={card.fit}
        >
          <div className="bio-img-flipper">
            <div className="bio-img-front">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.src} alt={card.alt} />
            </div>
            <div className="bio-img-back" />
          </div>
        </div>
      ))}

      {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
        <div key={`ph-${i}`} className="bio-img-card bio-img-placeholder" />
      ))}
    </div>
  );
}
