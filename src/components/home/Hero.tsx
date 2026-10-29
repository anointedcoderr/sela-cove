import Image from 'next/image';
import { Button } from '../Button';

export function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <div className="container-page grid gap-8 pb-12 pt-8 sm:pt-12 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-16 lg:pt-12">
        <div className="lg:col-span-7">
          <p className="eyebrow text-clay-deep">Brand clarity &amp; creative direction</p>
          <h1 id="hero-title" className="display-xl mt-5">
            Before you change everything, find what’s <em className="text-clay-deep">actually&nbsp;off.</em>
          </h1>
          <p className="lede mt-6 max-w-[34rem] text-forest/85">
            Thoughtful tools and personalized guidance for small business owners, to help you make sense of the brand you’ve already built.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/audit">Explore the Free Audit</Button>
            <Button href="/start-here" variant="ghost" short="Where to Start">Find Your Starting Point</Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="img-frame aspect-[4/3] sm:aspect-[2/1] lg:aspect-[4/5]">
            <Image
              src="/assets/branding/hero-sea-window-desk.webp"
              alt="Black-and-white photograph of a woman working at a laptop at a wooden desk, with a window opening onto the sea behind her"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="object-cover object-[50%_58%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
