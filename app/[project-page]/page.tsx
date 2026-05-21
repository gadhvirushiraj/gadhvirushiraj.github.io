import { readdir } from 'fs/promises';
import path from 'path';
import ProjectRedirect from './redirect';

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'public', 'project-page');
  const files = await readdir(dir);
  return files
    .filter(f => f.endsWith('.html'))
    .map(f => ({ 'project-page': f.replace('.html', '') }));
}

export default async function ProjectPage({ params }: { params: Promise<{ 'project-page': string }> }) {
  const { 'project-page': project } = await params;
  return <ProjectRedirect project={project} />;
}
