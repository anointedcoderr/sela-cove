import Link from 'next/link';
import { footerResources, nav, socials } from '@/data/site';
import { Wordmark } from './Wordmark';

export function Footer() {
  return (
    <footer className="bg-sand text-forest">
      <div className="container-page grid gap-10 pb-8 pt-14 md:grid-cols-12 lg:pt-16 md:gap-8">
        <div className="md:col-span-12 lg:col-span-5">
          <Wordmark />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-forest/80">
            Brand strategy and creative direction, plus self-guided workbooks, Canva mini brand kits and Showit website templates for small business owners.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 md:col-span-12 md:grid-cols-3 lg:col-span-7">
          <div>
            <h2 className="eyebrow mb-2 font-sans text-forest">Explore</h2>
            <ul className="text-[0.95rem]">
              {nav.map((n) => (
                <li key={n.href}><Link href={n.href} className="flex min-h-11 items-center"><span className="link-line">{n.label}</span></Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-2 font-sans text-forest">Resources</h2>
            <ul className="text-[0.95rem]">
              {footerResources.map((n) => (
                <li key={n.href}><Link href={n.href} className="flex min-h-11 items-center"><span className="link-line">{n.label}</span></Link></li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h2 className="eyebrow mb-2 font-sans text-forest">Elsewhere</h2>
            <ul className="text-[0.95rem]">
              {socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center">
                    <span className="link-line">{s.label}</span><span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className="container-page">
        <div className="border-t border-forest/25 py-7 text-[0.78rem] leading-relaxed text-forest/80">
          <p>
            An independent, unsolicited design concept by <strong className="font-semibold text-forest">RSS World Network</strong>. This is not the official Sela Cove website, has not been commissioned or approved by Sela Cove, and collects no customer information. Sela Cove names, products and imagery belong to their owner.
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Concept design by RSS World Network.</p>
        </div>
      </div>
    </footer>
  );
}
