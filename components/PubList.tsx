'use client';

import { useState } from 'react';
import { PubCard } from './PubCard';
import type { Publication } from '@/lib/publications';

export function PubList({ pubs }: { pubs: Publication[] }) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  return (
    <div className="pub-list">
      {pubs.map(pub => (
        <PubCard
          key={pub.slug}
          pub={pub}
          expanded={expandedSlug === pub.slug}
          onToggle={() => setExpandedSlug(prev => prev === pub.slug ? null : pub.slug)}
        />
      ))}
    </div>
  );
}
