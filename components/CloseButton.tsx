export function CloseButton({ onClick, className }: { onClick: () => void; className?: string }) {
  return (
    <button
      className={['close-btn', className].filter(Boolean).join(' ')}
      onClick={onClick}
      aria-label="Close"
    >
      <i className="fas fa-xmark" />
    </button>
  );
}
