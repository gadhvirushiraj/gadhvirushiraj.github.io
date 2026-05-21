import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string | string[];
  date: string;
  tags: string[];
  code?: string;
  weblink?: string;
}

export function getProjects(): Project[] {
  const dir = path.join(process.cwd(), 'content/projects');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

  return files
    .map(file => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data } = matter(raw);
      return {
        slug:        file.replace('.md', ''),
        title:       data.title       ?? '',
        description: data.description ?? '',
        image:       data.image       ?? '',
        date:        data.date        ? String(data.date) : '',
        tags:        data.tags        ?? [],
        code:        data.code,
        weblink:     data.weblink,
      } as Project;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
