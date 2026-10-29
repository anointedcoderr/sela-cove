import Image from 'next/image';
import { Button } from '../Button';

type Path = { n: string; label: string; title: string; text: string; cta: string; href: string; variant: 'solid' | 'ghost'; image?: { src: string; alt: string } };

const paths: Path[] = [
  {
    n: '01',
    label: 'Free · Self-guided',
    title: 'The Stop Changing Everything Audit',
    text: 'A free diagnostic to help you decide what to keep, refine, test, stop, or leave for later.',
    cta: 'Explore the Free Audit',
    href: '/audit',
    variant: 'solid',
    image: { src: '/assets/products/audit-cover-portrait.webp', alt: 'Cover of The Stop Changing Everything Audit' },
  },
  {
    n: '02',
    label: 'Workbook · Self-guided',
    title: 'Brand Foundation: A Working Guide',
    text: 'A structured workbook for making the foundational brand decisions before any visual ones.',
    cta: 'Discover the Workbook',
    href: '/brand-foundation',
    variant: 'ghost',
    image: { src: '/assets/products/brand-foundation-cover-portrait.webp', alt: 'Cover of Brand Foundation: A Working Guide for Early-Stage Businesses' },
  },
  {
    n: '03',
    label: 'Collaborative',
    title: 'Creative Brand Direction',
    text: 'One-to-one brand strategy and creative direction, for when you want another set of eyes on the whole thing.',
    cta: 'Explore Creative Direction',
    href: '/creative-brand-direction',
    variant: 'ghost',
  },
];

export function Pathways() {
  return (
    <section aria-labelledby="pathways-title" className="container-page py-14 lg:py-20">
      <div className="reveal max-w-2xl">
        <p className="eyebrow text-clay-deep">Three ways to begin</p>
        <h2 id="pathways-title" className="display-lg mt-4">Find the support that fits where you are.</h2>
      </div>

      <ul className="mt-9 grid gap-x-10 gap-y-9 lg:mt-12 xl:grid-cols-3">
        {paths.map((p) => (
          <li key={p.n} className="reveal border-t border-forest/40 pt-6">
            <article className="path-card">
              {p.image ? (
                <div className="img-frame pa-img aspect-[1100/1276]">
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="104px" className="object-cover" />
                </div>
              ) : (
                <div aria-hidden="true" className="pa-img flex aspect-[1100/1276] items-end bg-forest p-3 text-sand">
                  <span className="font-display text-[2rem] italic leading-[0.8] sm:text-[2.4rem]">1:1</span>
                </div>
              )}
              <div className="pa-head">
                <p className="eyebrow text-clay-deep">{p.n} · {p.label}</p>
                <h3 className="title-sm mt-2">{p.title}</h3>
              </div>
              <p className="pa-text text-[0.95rem] text-forest/85">{p.text}</p>
              <div className="pa-cta">
                <Button href={p.href} variant={p.variant} className="w-full">{p.cta}</Button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
