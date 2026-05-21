import Link from 'next/link';

export function BackButton({ href = '/' }: { href?: string }) {
  return (
    <Link href={href} className="back-btn" aria-label="Back">
      <i className="fas fa-arrow-left" />
    </Link>
  );
}
