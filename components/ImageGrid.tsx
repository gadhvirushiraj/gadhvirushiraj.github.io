'use client';

import { useEffect, useRef } from 'react';

const IMAGE_CARDS = [
  { src: '/images/computing-corner/ai_climbs.webp',        alt: 'RL humanoid',     caption: 'RL humanoid learning to climb stairs; pure trial and error. Thousands of falls before one clean step.',                                                                                                                                                        link: 'https://www.youtube.com/watch?v=xk8wHY1AFpI' },
  { src: '/images/computing-corner/cyclegan.png',           alt: 'CycleGAN',        caption: 'A mishap of zebraification; CycleGAN detected equine features in Putin\'s face and turned him into a zebra. Unintended; technically correct.', crop: 'top',                                                                                                    link: 'https://towardsdatascience.com/translate-a-horse-to-a-zebra-cyclegan-6c3e12e40f53/' },
  { src: '/images/computing-corner/JacquardLoom.jpg',       alt: 'Jacquard Loom',   caption: 'Jacquard Loom (1804); a punch-card programmable loom. Literally the first "software".',                                                                                                                                                                       link: 'https://www.scienceandindustrymuseum.org.uk/objects-and-stories/jacquard-loom' },
  { src: '/images/computing-corner/curta.jpg',              alt: 'Curta Calculator', caption: 'Curta Calculator (1948); the world\'s smallest mechanical calculator. Designed at Buchenwald concentration camp by Curt Herzstark; four arithmetic functions in a fist.',                                                                                                                          link: 'https://en.wikipedia.org/wiki/Curta' },
  { src: '/images/computing-corner/neural-geometry.png',    alt: 'Neural Geometry',  caption: 'Goodfire\'s Geometric Calculator; numbers live on circles in activation space. Each circle a different mod base; addition is Fourier decomposition in disguise.', fit: 'contain',                                                                              link: 'https://www.goodfire.ai/research/a-geometric-calculator#' },
  { src: '/images/computing-corner/proptotype-google-glass.webp', alt: 'Google Glass Prototype', caption: 'Google Glass prototype (2012); clay and coat hangers. Digital overlaid on physical in a day; also discovered people find it socially awkward.',                                                                                                    link: 'https://sfdesignweek.org/rapid-prototyping-google-glass/' },
  { src: '/images/computing-corner/faulty-reward-functions.webp', alt: 'Faulty Reward Function', caption: 'Faulty reward function; the boat scores by spinning in circles instead of finishing the race. Reward hacking; the gap between what you measure and what you mean.',                                                                                link: 'https://openai.com/index/faulty-reward-functions/' },
  { src: '/images/computing-corner/curve-detector.png',           alt: 'Curve Detector',        caption: 'Curve detector neurons in CNNs; an OpenAI finding. Early-layer units that fire for curved edges at any orientation; same neuron, any curve, any direction.',                                                                                        link: 'https://distill.pub/2020/circuits/curve-detectors/' },
  { src: '/images/computing-corner/chinese-room.png',             alt: 'Chinese Room',          caption: 'Searle\'s Chinese Room (1980); syntax ≠ semantics. A system can manipulate symbols perfectly without understanding them; still the sharpest intuition pump against strong AI.',                                                                     link: 'https://plato.stanford.edu/entries/chinese-room/' },
  { src: '/images/computing-corner/f-pattern.jpg',                alt: 'F-Pattern Eye Tracking', caption: 'How do humans read a webpage? Always in an F. Two horizontal sweeps then a vertical drop; every layout decision you\'ve ever made was predicted by this in 2006.',                                                                                               link: 'https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/' },
  { src: '/images/computing-corner/turing-pattern.png',           alt: 'Turing Pattern',        caption: 'Turing Pattern (1952); no blueprint, no instruction. Just an activator and a faster-diffusing inhibitor; they self-organize into cheetah spots, zebra stripes, and your fingerprint ridges.',                                             link: 'https://en.wikipedia.org/wiki/Turing_pattern' },
  { src: '/images/computing-corner/induction-heads.png',          alt: 'Induction Heads',       caption: 'Induction heads; see "A B … A", predict B. One head finds the first occurrence; one copies what followed. Likely the circuit behind most in-context learning in LLMs.', fit: 'contain', link: 'https://www.lesswrong.com/posts/TvrfY4c9eaGLeyDkE/induction-heads-illustrated' },
];

const PLACEHOLDER_COUNT = 0;

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

    let hoverTimer: ReturnType<typeof setTimeout> | null = null;

    function reset() {
      if (hoverTimer) { clearTimeout(hoverTimer); hoverTimer = null; }
      if (grid) delete grid.dataset.locked;
      cards.forEach(c => {
        c.querySelector('.bio-img-flipper')?.classList.remove('flipped');
        (c as HTMLElement).style.pointerEvents = '';
      });
      zoomImg.className  = 'bio-zoom-img';
      zoomText.className = 'bio-zoom-text';
    }

    cards.forEach((card, index) => {
      card.addEventListener('mouseleave', () => {
        if (hoverTimer) { clearTimeout(hoverTimer); hoverTimer = null; }
      });

      card.addEventListener('mouseenter', () => {
        if (grid.dataset.locked) return;
        hoverTimer = setTimeout(() => {
        grid.dataset.locked = '1';
        cards.forEach(c => (c as HTMLElement).style.pointerEvents = 'none');
        cards.forEach(c => c.querySelector('.bio-img-flipper')?.classList.add('flipped'));
        const isTop   = Math.floor(index / 3) <= 1;
        const imgEl   = card.querySelector<HTMLImageElement>('.bio-img-front img');
        const caption = card.dataset.caption ?? '';
        const link    = card.dataset.link ?? '';
        if (imgEl) {
          zoomImg.style.backgroundImage    = `url('${imgEl.getAttribute('src')}')`;
          zoomImg.style.backgroundSize     = card.dataset.fit === 'contain' ? 'contain' : 'cover';
          zoomImg.style.backgroundPosition = card.dataset.crop ?? 'center';
          zoomImg.style.backgroundColor   = card.dataset.fit === 'contain' ? '#f5f5f5' : '';
          zoomImg.className  = `bio-zoom-img ${isTop ? 'pos-top' : 'pos-bottom'} visible`;
          zoomText.textContent = caption;
          if (link) {
            const a = document.createElement('a');
            a.href = link;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.style.cssText = 'position:absolute;bottom:0.75rem;right:0.75rem;color:var(--accent);text-decoration:none;display:flex;align-items:center;pointer-events:auto;';
            a.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
            zoomText.appendChild(a);
          }
          zoomText.className = `bio-zoom-text ${isTop ? 'pos-bottom' : 'pos-top'} visible`;
        }
        }, 300);
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
          data-link={card.link}
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
