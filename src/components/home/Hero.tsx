import Image from 'next/image';
import { Button } from '../Button';

const verbs = [
  ['Keep', 'what already works'],
  ['Refine', 'what needs polish'],
  ['Test', 'what you’re unsure about'],
  ['Stop', 'what no longer fits'],
  ['Later', 'what can wait'],
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="container-page grid gap-10 pb-12 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-16">
        <div className="lg:col-span-7 lg:pt-6">
          <p className="eyebrow text-clay-deep">Brand clarity &amp; creative direction</p>
          <h1 id="hero-title" className="display-xl mt-6">
            Before you change everything, find what’s <em className="text-clay-deep">actually&nbsp;off.</em>
          </h1>
          <p className="lede mt-8 max-w-[34rem] text-forest/85">
            Thoughtful tools and personalized guidance to help you make sense of the brand you’ve already built.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/audit">Explore the Free Audit</Button>
            <Button href="/start-here" variant="ghost">Find Your Starting Point</Button>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative mx-auto">
            <div aria-hidden="true" className="absolute -bottom-4 -right-4 hidden h-full w-full border border-clay/60 sm:block" />
            <div className="img-frame relative aspect-[5/4] sm:aspect-[16/10] lg:aspect-[4/5]">
              <Image
                src="/assets/branding/hero-sea-window-desk.webp"
                alt="Black-and-white photograph of a woman working at a laptop at a wooden desk, with a window opening onto the sea behind her"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="object-cover object-[50%_55%]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container-page pb-4">
        <h2 className="sr-only">The five questions the audit helps you answer</h2>
        <ul className="grid border-t hairline sm:grid-cols-5">
          {verbs.map(([word, line], i) => (
            <li
              key={word}
              className={`flex items-baseline justify-between gap-4 border-b hairline py-3.5 sm:block sm:border-b-0 sm:py-6 sm:pr-4 ${i > 0 ? 'sm:border-l sm:pl-5' : ''}`}
            >
              <p className="font-display text-[1.7rem] uppercase tracking-[0.08em] leading-none">{word}</p>
              <p className="text-right text-[0.8rem] leading-snug text-forest/75 sm:mt-2 sm:text-left">{line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
