'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './about.css';
import { Typewriter } from '@/components/Typewriter';
import { ImageGrid } from '@/components/ImageGrid';
import { Button } from '@/components/Button';
import { CloseButton } from '@/components/CloseButton';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { AchievementsList } from '@/components/AchievementsList';

type PanelId = 'achievements' | 'experience';

export default function AboutPage() {
  const [panel, setPanel] = useState<PanelId | null>(null);
  const [activePanel, setActivePanel] = useState<PanelId | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.body.classList.toggle('panel-open', !!panel);
    return () => document.body.classList.remove('panel-open');
  }, [panel]);

  function toggle(id: PanelId) {
    if (panel === id) {
      setPanel(null);
      clearTimeout(closeTimer.current);
      closeTimer.current = setTimeout(() => setActivePanel(null), 900);
    } else {
      clearTimeout(closeTimer.current);
      setActivePanel(id);
      setPanel(id);
    }
  }

  function close() {
    setPanel(null);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActivePanel(null), 900);
  }

  const shutter = (
    <div className={`roller-shutter${panel ? ' roller-shutter--open' : ''}`}>
      <div className="roller-shutter__inner">
        <div className="roller-shutter__header">
          <h2 className="roller-shutter__title">
            {activePanel === 'achievements' ? 'Achievements' : 'Experience'}
          </h2>
          <div style={{ flex: 1 }} />
          <CloseButton onClick={close} />
        </div>
        <div className="roller-shutter__body">
          {activePanel === 'achievements' && <AchievementsList />}
          {activePanel === 'experience' && <ExperienceTimeline />}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-wrap items-stretch gap-6 mb-6">

        {/* Left column: header + bio box */}
        <div className="flex-1 min-w-75 flex flex-col gap-3 seg-right">

          {/* Header */}
          <div className="px-1 seg-bottom">
            <h1 style={{ fontFamily: 'var(--heading)', fontWeight: 300, marginBottom: '0.1rem' }}>
              Namaste World! 👋🏼 I&apos;m Rushiraj
            </h1>
            <Typewriter />
          </div>

          {/* Bio card */}
          <div className="flex-1 px-6 py-5" style={{ background: 'var(--card)', color: 'var(--font-col)', borderRadius: 'var(--radius)' }}>
            <p style={{ margin: `0 0 var(--para-gap) 0` }}>
              My research interests revolve around <i>Human-AI Interaction, AI Safety, and Reinforcement Learning</i>.
              More recently, I have developed a deeper interest in <i>Interpretability</i> and am actively exploring the space.
              I recently graduated with a B.Tech in Computer Science and AI from Plaksha University.
            </p>
            <p style={{ margin: `0 0 var(--para-gap) 0` }}>
              I have published my research outputs at several top conferences and journals.
              Beyond research, I&apos;m also an enthusiastic advocate for open source and an active contributor to its vibrant community.
              I am also the Founder of Housify (TechSurf Solutions); it keeps me connected to the real-world, product side of things.
            </p>
            <p style={{ margin: 0 }}>
              <i className="fas fa-bolt" style={{ color: 'var(--accent)' }} /> <i>Eager to explore new ideas, build stuff and make an impact through innovation!</i>
            </p>
          </div>

        </div>

        {/* Right column: image grid + vertical history strip */}
        <div className="flex items-start justify-center gap-2 comp-grid-col about-img-section">
          <ImageGrid />
          <div className="comp-history-strip">
            curious corners of computing
          </div>
        </div>

        {/* Nav buttons */}
        <div className="flex flex-wrap gap-3 px-1 seg-top about-nav-section">
          <Button href="/projects">Projects</Button>
          <Button href="/publications">Publications</Button>
          <Button href="https://medium.com/@gadhvirushiraj" target="_blank" rel="noopener noreferrer">Blogs</Button>
          <Button href="/cv">CV</Button>
          <span className="mobile-hide-btn">
            <Button variant="card" active={panel === 'achievements'} onClick={() => toggle('achievements')}>Achievements</Button>
          </span>
          <span className="mobile-hide-btn">
            <Button variant="card" active={panel === 'experience'} onClick={() => toggle('experience')}>Experience</Button>
          </span>
        </div>

        {/* Mobile-only inline sections */}
        <div className="mobile-inline-section">
          <h3 style={{ fontFamily: 'var(--heading)', marginBottom: '0.75rem' }}>Achievements</h3>
          <AchievementsList />
        </div>
        <div className="mobile-inline-section">
          <h3 style={{ fontFamily: 'var(--heading)', marginBottom: '0.75rem' }}>Experience</h3>
          <ExperienceTimeline />
        </div>

      </div>

      {mounted && createPortal(shutter, document.body)}
    </>
  );
}
