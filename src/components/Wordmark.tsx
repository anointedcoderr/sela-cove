import Link from 'next/link';

export function Wordmark({ className = '', onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Sela Cove, home"
      className={`font-display uppercase tracking-[0.2em] min-[360px]:tracking-[0.26em] text-[1.15rem] min-[360px]:text-[1.35rem] leading-none whitespace-nowrap ${onDark ? 'text-ivory' : 'text-forest'} ${className}`}
    >
      Sela<span aria-hidden="true" className="inline-block w-[0.55em]" />Cove
    </Link>
  );
}
