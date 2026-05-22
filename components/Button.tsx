import Link from 'next/link';
import styles from './Button.module.css';

const DownloadIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" width="11">
    <path d="M7 1v7M4 6l3 3 3-3M1 11h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="10">
    <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
  </svg>
);

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  variant?: 'default' | 'card';
  onClick?: () => void;
  active?: boolean;
  download?: boolean | string;
}

export function Button({ href, children, target, rel, variant = 'default', onClick, active, download }: ButtonProps) {
  const cls = [
    styles.button,
    variant === 'card' ? styles.buttonCard : '',
    active ? styles.buttonCardActive : '',
  ].filter(Boolean).join(' ');

  const inner = (
    <>
      <span className={styles.iconWrapper}>
        {download ? <DownloadIcon /> : (
          <>
            <ArrowIcon className={styles.iconSvg} />
            <ArrowIcon className={`${styles.iconSvg} ${styles.iconSvgCopy}`} />
          </>
        )}
      </span>
      {children}
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto') || target === '_blank';
    if (isExternal || download) {
      return <a href={href} className={cls} target={target} rel={rel} onClick={onClick} download={download ?? undefined}>{inner}</a>;
    }
    return <Link href={href} className={cls} onClick={onClick}>{inner}</Link>;
  }
  return <button className={cls} onClick={onClick}>{inner}</button>;
}
