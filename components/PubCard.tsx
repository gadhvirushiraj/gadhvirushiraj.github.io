import Image from 'next/image';
import type { Publication } from '@/lib/publications';

const PREVIEW_LEN = 220;

function AuthorToken({ name }: { name: string }) {
  const hasstar = name.endsWith('*');
  const clean = hasstar ? name.slice(0, -1) : name;
  const isMe = clean.trim() === 'Rushiraj Gadhvi';
  const inner = isMe ? <strong>{clean}</strong> : <>{clean}</>;
  return <>{inner}{hasstar && <sup>*</sup>}</>;
}

function AuthorsList({ authors }: { authors: string }) {
  const parts = authors.split(', ');
  return (
    <p className="pub-card__authors">
      {parts.map((name, i) => (
        <span key={i}><AuthorToken name={name} />{i < parts.length - 1 ? ', ' : ''}</span>
      ))}
    </p>
  );
}

export function PubCard({ pub, expanded, onToggle }: { pub: Publication; expanded: boolean; onToggle: () => void }) {
  const hasAbstract = !!pub.abstract;

  return (
    <div className={`pub-card${expanded ? ' pub-card--expanded' : ''}`}>
      <div className="pub-card__top">
        <div className="pub-card__img">
          {pub.preview_image ? (
            <Image
              src={pub.preview_image}
              alt={pub.title}
              width={129}
              height={183}
            />
          ) : (
            <span className="pub-card__img-placeholder">Yet to Release</span>
          )}
        </div>

        <div className="pub-card__body">
          <h3 className="pub-card__title">{pub.title}</h3>

          <div className="pub-card__meta">
            <span className="pub-card__status">
              {pub.status.replace(/^Accepted,\s*/i, '')}
            </span>
            {pub.arxiv && (
              <a href={pub.arxiv} target="_blank" rel="noopener noreferrer" className="pub-card__btn">
                <i className="ai ai-arxiv" /> arXiv
              </a>
            )}
            {pub.openreview && (
              <a href={pub.openreview} target="_blank" rel="noopener noreferrer" className="pub-card__btn">
                <i className="ai ai-open-access" /> OpenReview
              </a>
            )}
            {pub.paperurl && (
              <a href={pub.paperurl} target="_blank" rel="noopener noreferrer" className="pub-card__btn">
                <i className="fas fa-file-alt" /> DOI
              </a>
            )}
            {hasAbstract && (
              <button className="pub-abstract__toggle" onClick={onToggle}>
                {expanded ? 'Hide Abstract' : 'Read Abstract'}
              </button>
            )}
          </div>

          <AuthorsList authors={pub.authors} />
        </div>
      </div>

      {hasAbstract && expanded && (
        <div className="pub-abstract">{pub.abstract}</div>
      )}
    </div>
  );
}
