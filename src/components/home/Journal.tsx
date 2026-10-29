import Image from 'next/image';
import Link from 'next/link';
import { articles } from '@/data/site';
import { Reveal } from '../Reveal';
import { TextLink } from '../Button';

export function Journal() {
  return (
    <section aria-labelledby="journal-title" className="container-page py-20 lg:py-32">
      <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow text-clay-deep">The journal</p>
          <h2 id="journal-title" className="display-lg mt-5">Notes for the in-between moments.</h2>
        </div>
        <TextLink href="/journal" className="shrink-0">All articles</TextLink>
      </Reveal>

      <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
        {articles.map((a, i) => (
          <Reveal as="li" key={a.slug} delay={i * 80}>
            <article className="group relative flex h-full flex-col">
              <div className="img-frame aspect-[4/3]">
                <Image src={a.image} alt={a.alt} fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover" loading="lazy" />
              </div>
              <p className="eyebrow mt-6 text-clay-deep">{a.category}</p>
              <h3 className="mt-3 font-display text-[1.7rem] leading-[1.12]">{a.title}</h3>
              <p className="mt-3 text-[0.93rem] text-forest/80">{a.excerpt}</p>
              <div className="mt-auto pt-5">
                <Link href={`/journal/${a.slug}`} className="text-link after:absolute after:inset-0">
                  <span className="link-line">Read Article</span>
                  <span className="sr-only">: {a.title}</span>
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
