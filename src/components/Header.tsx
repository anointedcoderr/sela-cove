'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { nav } from '@/data/site';
import { Wordmark } from './Wordmark';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Close after navigation.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes, Tab is kept inside the open menu, background scroll is locked.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    // The preview note above the header scrolls away, so anchor the menu to the header's actual bottom edge.
    const place = () => {
      if (headerRef.current && panelRef.current) panelRef.current.style.top = `${headerRef.current.getBoundingClientRect().bottom}px`;
    };
    place();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(true);
      if (e.key === 'Tab' && panelRef.current) {
        const items = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>('a')].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); else place(); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open, close]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/'));

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 border-b transition-colors duration-500 ${
        scrolled || open ? 'bg-ivory border-forest/15' : 'bg-ivory border-transparent'
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-forest focus:px-4 focus:py-2 focus:text-ivory">
        Skip to content
      </a>
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center gap-x-6 xl:gap-x-9 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className="link-line text-[0.78rem] font-medium tracking-[0.04em]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/audit" className="btn btn-solid hidden !min-h-[2.75rem] !px-5 !text-[0.7rem] lg:inline-flex">
            Take the Free Audit
          </Link>
          <Link href="/audit" className="btn btn-solid !min-h-[2.5rem] !px-3 min-[360px]:!px-4 !py-2 !text-[0.66rem] whitespace-nowrap lg:hidden">
            Free Audit
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="relative -mr-2 grid h-11 w-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span className={`absolute left-0 h-px w-6 bg-forest transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 h-px w-6 bg-forest transition-opacity duration-200 ${open ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 h-px w-6 bg-forest transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={`fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto bg-ivory transition-[opacity,visibility,transform] duration-500 ease-[var(--ease-quiet)] lg:hidden ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="container-page flex min-h-full flex-col py-8">
          <ul className="border-t hairline">
            {nav.map((item, i) => (
              <li key={item.href} className="border-b hairline">
                <Link
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className="flex min-h-14 items-baseline justify-between py-3.5 font-display text-[1.9rem] leading-none"
                  onClick={() => close()}
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true" className="text-[0.7rem] font-sans tracking-[0.2em] text-forest/55">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <Link href="/audit" tabIndex={open ? 0 : -1} className="btn btn-solid w-full" onClick={() => close()}>
              Take the Free Audit
            </Link>
            <p className="mt-6 text-xs leading-relaxed text-forest/70">
              An independent design concept by RSS World Network. Not the official Sela Cove website. Only the homepage is designed so far.
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
