import Image from 'next/image';
import Link from 'next/link';
import { articles } from '@/data/site';
import { TextLink } from '../Button';

// Phones: one featured story and two compact rows. Tablet: featured story across the top, two stories below.
// Desktop: featured story beside two compact rows. Titles are never clamped.
export function Journal() {
  const [feature, ...rest] = articles;
  return (
    <section aria-labelledby="journal-title" className="container-page py-14 lg:py-20">
      <div className="reveal flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow text-clay-deep">The journal</p>
          <h2 id="journal-title" className="display-lg mt-4">Notes for the moments in between.</h2>
        </div>
        <TextLink href="/journal" className="shrink-0 self-start md:self-end">All articles</TextLink>
      </div>

      <ul className="mt-9 grid gap-x-8 gap-y-8 md:grid-cols-2 lg:mt-12 lg:grid-cols-12 lg:gap-x-12">
        <li className="reveal md:col-span-2 lg:col-span-6 lg:row-span-2">
          <article className="group relative grid gap-4 md:grid-cols-2 md:items-center md:gap-8 lg:grid-cols-1 lg:items-start lg:gap-5">
            <div className="img-frame aspect-[3/2]">
              <Image src={feature.image} alt={feature.alt} fill sizes="(min-width: 1024px) 45vw, (min-width: 768px) 44vw, 92vw" className="object-cover" />
            </div>
            <div>
              <p className="eyebrow text-clay-deep">{feature.category}</p>
              <h3 className="display-md mt-2">{feature.title}</h3>
              <p className="mt-3 text-[0.95rem] text-forest/80">{feature.excerpt}</p>
              <Link href={`/journal/${feature.slug}`} className="text-link mt-4 after:absolute after:inset-0">
                <span className="link-line">Read Article</span>
                <span className="sr-only">: {feature.title}</span>
              </Link>
            </div>
          </article>
        </li>

        {rest.map((a, i) => (
          <li key={a.slug} className={`reveal lg:col-span-6 lg:col-start-7 ${i === 0 ? 'lg:self-start' : 'lg:self-end'}`}>
            <article className="group relative grid gap-4 max-md:grid-cols-[6.5rem_1fr] max-md:gap-x-4 max-md:items-start lg:grid-cols-[11rem_1fr] lg:gap-x-6 xl:grid-cols-[13rem_1fr]">
              <div className="img-frame aspect-[3/2] max-md:aspect-square lg:aspect-[4/3]">
                <Image src={a.image} alt={a.alt} fill sizes="(min-width: 1280px) 208px, (min-width: 1024px) 176px, (min-width: 768px) 44vw, 104px" className="object-cover" />
              </div>
              <div className="md:col-span-1">
                <p className="eyebrow text-clay-deep">{a.category}</p>
                <h3 className="title-sm mt-1.5">{a.title}</h3>
                <p className="mt-2 hidden text-[0.93rem] text-forest/80 md:block">{a.excerpt}</p>
                <Link href={`/journal/${a.slug}`} className="text-link mt-3 after:absolute after:inset-0">
                  <span className="link-line">Read Article</span>
                  <span className="sr-only">: {a.title}</span>
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
