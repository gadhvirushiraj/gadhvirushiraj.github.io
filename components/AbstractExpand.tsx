'use client';

import { useState } from 'react';

const PREVIEW_LEN = 220;

export function AbstractExpand({ abstract }: { abstract: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = abstract.length > PREVIEW_LEN;

  return (
    <div className="pub-abstract">
      <span>
        {expanded || !isLong ? abstract : `${abstract.slice(0, PREVIEW_LEN)}…`}
      </span>
      {isLong && (
        <button className="pub-abstract__toggle" onClick={() => setExpanded(e => !e)}>
          {expanded ? ' Show less' : ' Show more'}
        </button>
      )}
    </div>
  );
}
