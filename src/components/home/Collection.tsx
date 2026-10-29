import Image from 'next/image';
import Link from 'next/link';
import { featuredProductSlugs, products } from '@/data/site';
import { Reveal } from '../Reveal';
import { TextLink } from '../Button';

export function Collection() {
  const items = featuredProductSlugs.map((s) => products.find((p) => p.slug === s)!);
  return (
    <section aria-labelledby="collection-title" className="container-page py-20 lg:py-32">
      <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-3xl">
          <p className="eyebrow text-clay-deep">The shop</p>
          <h2 id="collection-title" className="display-lg mt-5">Thoughtful resources for the business you’re building.</h2>
        </div>
        <TextLink href="/shop" className="shrink-0">Browse the whole shop</TextLink>
      </Reveal>

      <ul className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={(i % 2) * 80}>
            <article className="group relative flex h-full flex-col">
              <div className="img-frame aspect-square">
                <Image src={p.image} alt={p.alt} fill sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 92vw" className="object-cover" loading="lazy" />
              </div>
              <p className="eyebrow mt-5 text-forest/70">{p.kind}</p>
              <h3 className="mt-2 font-display text-[1.75rem] leading-[1.1]">{p.name}</h3>
              <p className="mt-3 text-[0.93rem] text-forest/80">{p.blurb}</p>
              <p className="mt-4 font-display text-[1.25rem] italic text-clay-deep">{p.price}</p>
              <div className="mt-auto pt-5">
                <Link href={`/shop/${p.slug}`} className="text-link after:absolute after:inset-0">
                  <span className="link-line">{p.cta}</span>
                  <span className="sr-only">: {p.name}</span>
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
