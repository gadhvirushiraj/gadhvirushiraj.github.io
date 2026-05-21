'use client';
import { useEffect } from 'react';

export default function ProjectRedirect({ project }: { project: string }) {
  useEffect(() => {
    window.location.replace(`/project-page/${project}.html`);
  }, [project]);
  return null;
}
