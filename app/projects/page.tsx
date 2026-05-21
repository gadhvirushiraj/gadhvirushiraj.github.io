import Image from 'next/image';
import { BackButton } from '@/components/BackButton';
import { getProjects } from '@/lib/projects';
import { MasonryGrid } from '@/components/MasonryGrid';
import './projects.css';

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div>
      <div className="page-header">
        <BackButton />
        <h2 style={{ fontFamily: 'var(--heading)', margin: 0 }}>Projects</h2>
      </div>
      <MasonryGrid>
        {projects.map(p => {
          const imgs = Array.isArray(p.image) ? p.image : p.image ? [p.image] : [];
          return (
            <div className="project-tile-wrap" key={p.slug}>
              <div className="project-tile">
                {imgs.length > 0 && (
                  <div className="project-tile__img">
                    {imgs.map((src, i) => (
                      <Image
                        key={i}
                        src={src}
                        alt={p.title}
                        width={300}
                        height={200}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                      />
                    ))}
                  </div>
                )}
                <h3 className="project-tile__title">{p.title}</h3>
                <p className="project-tile__desc">{p.description}</p>
                <hr className="project-tile__divider" />
                <div className="project-tile__footer">
                  {p.code && (
                    <a href={p.code} target="_blank" rel="noopener noreferrer" className="project-tile__btn">
                      <i className="fab fa-github" /> Code
                    </a>
                  )}
                  {p.weblink && (
                    <a href={p.weblink} target="_blank" rel="noopener noreferrer" className="project-tile__btn project-tile__btn--icon">
                      <i className="fas fa-external-link-alt" />
                    </a>
                  )}
                  {p.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="project-tile__tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </MasonryGrid>
    </div>
  );
}
