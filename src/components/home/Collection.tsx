import Image from 'next/image';
import Link from 'next/link';
import { featuredProductSlugs, products } from '@/data/site';
import { TextLink } from '../Button';

export function Collection() {
  const items = featuredProductSlugs.map((s) => products.find((p) => p.slug === s)!);
  return (
    <section aria-labelledby="collection-title" className="container-page py-14 lg:py-20">
      <div className="reveal flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="eyebrow text-clay-deep">The shop</p>
          <h2 id="collection-title" className="display-lg mt-4">Thoughtful resources for the business you’re building.</h2>
        </div>
        <TextLink href="/shop" className="shrink-0 self-start md:self-end">Browse the whole shop</TextLink>
      </div>

      <ul className="mt-9 grid gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:mt-12 xl:grid-cols-4">
        {items.map((p) => (
          <li key={p.slug} className="reveal">
            <article className="product-card group relative h-full">
              <div className="img-frame pc-img aspect-[5/4]">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 128px"
                  className="object-cover"
                  style={p.position ? { objectPosition: p.position } : undefined}
                />
              </div>
              <p className="eyebrow pc-kind text-forest/70 max-sm:self-end">{p.kind}</p>
              <h3 className="title-sm pc-title">{p.name}</h3>
              <p className="pc-price text-[0.9rem] font-semibold tabular-nums">{p.price}</p>
              <p className="pc-blurb text-[0.93rem] text-forest/80">{p.blurb}</p>
              <div className="pc-cta">
                <Link href={`/shop/${p.slug}`} className="text-link after:absolute after:inset-0">
                  <span className="link-line">{p.cta}</span>
                  <span className="sr-only">: {p.name}</span>
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
