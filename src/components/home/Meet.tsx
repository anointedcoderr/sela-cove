import Image from 'next/image';
import { Button } from '../Button';
import { Reveal } from '../Reveal';

export function Meet() {
  return (
    <section aria-labelledby="meet-title" className="bg-sand">
      <div className="container-page grid items-start gap-14 py-20 lg:grid-cols-12 lg:gap-20 lg:py-32">
        <Reveal className="relative lg:col-span-6 lg:pt-4">
          <div className="grid grid-cols-12 items-end gap-4">
            <div className="img-frame col-span-9 aspect-[4/5]">
              <Image src="/assets/editorial/beach-textiles.webp" alt="Soft linen throws and a straw hat laid on warm sand where the surf is washing in" fill sizes="(min-width: 1024px) 32vw, 60vw" className="object-cover" loading="lazy" />
            </div>
            <div className="img-frame col-span-3 mb-10 aspect-[3/5] sm:mb-16">
              <Image src="/assets/editorial/sea-waves.webp" alt="Black-and-white photograph of a wave breaking on a calm sea" fill sizes="(min-width: 1024px) 16vw, 30vw" className="object-cover" loading="lazy" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-6">
          <p className="eyebrow text-clay-deep">About Sela Cove</p>
          <h2 id="meet-title" className="display-lg mt-5">A little more clarity. A lot less second-guessing.</h2>
          <p className="lede mt-7 text-forest/85">
            Sela Cove was started by Debbie, a photographer turned brand and website template designer. She built her own business on a real-life budget, and got tired of seeing new business owners priced out of the help they actually needed.
          </p>
          <blockquote className="mt-9 border-l-2 border-clay pl-6">
            <p className="font-display text-[1.6rem] italic leading-snug sm:text-[1.9rem]">
              “Sela Cove comes from that very real place, not from someone standing on the other side pretending to have it all figured out.”
            </p>
            <p className="mt-3 text-xs tracking-wide text-forest/70">From the About page on selacove.com</p>
          </blockquote>
          <p className="mt-9 max-w-xl text-forest/85">
            You can ask questions, take a minute, change your mind, and say “nope, that doesn’t feel like me.” The goal is that you feel comfortable using what you make long after the work is done.
          </p>
          <div className="mt-9"><Button href="/about" variant="ghost">Read the Full Story</Button></div>
        </Reveal>
      </div>
    </section>
  );
}
