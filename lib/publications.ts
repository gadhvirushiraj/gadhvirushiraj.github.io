import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Publication {
  slug: string;
  title: string;
  authors: string;
  image: string;
  preview_image?: string;
  date: string;
  status: string;
  arxiv?: string;
  openreview?: string;
  paperurl?: string;
  abstract?: string;
}

export function getPublications(): Publication[] {
  const dir   = path.join(process.cwd(), 'content/publications');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

  return files
    .map(file => {
      const raw    = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data } = matter(raw);
      return {
        slug:          file.replace('.md', ''),
        title:         data.title         ?? '',
        authors:       data.authors       ?? '',
        image:         data.image         ?? '',
        preview_image: data.preview_image,
        date:          data.date ? String(data.date) : '',
        status:        data.status        ?? '',
        arxiv:         data.arxiv,
        openreview:    data.openreview,
        paperurl:      data.paperurl,
        abstract:      data.abstract,
      } as Publication;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
