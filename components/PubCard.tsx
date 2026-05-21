import Image from 'next/image';
import type { Publication } from '@/lib/publications';

const PREVIEW_LEN = 220;

function AuthorsList({ authors }: { authors: string }) {
  return (
    <p className="pub-card__authors">
      {authors.split(/(Rushiraj Gadhvi\*?)/g).map((part, i) =>
        part.startsWith('Rushiraj Gadhvi') ? <strong key={i}>{part}</strong> : part
      )}
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
