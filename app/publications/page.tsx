import { BackButton } from '@/components/BackButton';
import { getPublications } from '@/lib/publications';
import { PubList } from '@/components/PubList';
import './publications.css';

export default function PublicationsPage() {
  const pubs = getPublications();

  return (
    <div>
      <div className="page-header">
        <BackButton />
        <h2 style={{ fontFamily: 'var(--heading)', margin: 0 }}>Publications</h2>
      </div>

      <p style={{ marginBottom: '0.85rem', fontSize: '0.94rem', color: 'var(--sidebar-link-color)' }}>
        You can also find my articles on my{' '}
        <a href="https://scholar.google.com/citations?user=RB8fOIQAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
          Google Scholar profile
        </a>. <span style={{ color: 'var(--sidebar-link-color)' }}>[* Equal contribution]</span>
      </p>

      <PubList pubs={pubs} />
    </div>
  );
}
