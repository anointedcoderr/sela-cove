import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

type Variant = 'solid' | 'ghost' | 'light' | 'ghost-light';

export function Button({
  href,
  children,
  variant = 'solid',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`btn btn-${variant} ${className}`}>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={15} strokeWidth={1.6} className="arrow shrink-0" />
    </Link>
  );
}

export function TextLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`text-link ${className}`}>
      <span className="link-line">{children}</span>
      <ArrowRight aria-hidden="true" size={14} strokeWidth={1.6} className="arrow shrink-0" />
    </Link>
  );
}
