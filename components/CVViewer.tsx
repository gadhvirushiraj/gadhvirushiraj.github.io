'use client';
import { useEffect, useRef, useState } from 'react';

export function CVViewer({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const pdf = await pdfjsLib.getDocument(src).promise;
      const container = containerRef.current;
      if (!container || cancelled) return;
      container.innerHTML = '';

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        if (cancelled) return;
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.cssText = 'width:100%;display:block;margin-bottom:1.5rem;border-radius:var(--radius);';

        await page.render({ canvasContext: ctx, viewport }).promise;
        if (cancelled) return;
        container.appendChild(canvas);
      }

      if (!cancelled) setLoading(false);
    }

    render();
    return () => { cancelled = true; };
  }, [src]);

  return (
    <>
      {loading && (
        <div className="cv-skeleton">
          {[1, 2].map(i => <div key={i} className="cv-skeleton__page" />)}
        </div>
      )}
      <div ref={containerRef} style={{ display: loading ? 'none' : 'block' }} />
    </>
  );
}
