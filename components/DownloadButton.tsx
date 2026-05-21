'use client';
import { Button } from './Button';

export function DownloadButton({ href, filename, children }: { href: string; filename: string; children: React.ReactNode }) {
  async function handleDownload() {
    const res = await fetch(href);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return <Button onClick={handleDownload} download>{children}</Button>;
}
