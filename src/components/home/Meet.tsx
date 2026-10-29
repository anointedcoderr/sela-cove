import Image from 'next/image';
import { Button } from '../Button';

export function Meet() {
  return (
    <section aria-labelledby="meet-title" className="bg-sand">
      <div className="container-page grid items-center gap-8 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20">
        <div className="reveal lg:col-span-5">
          <div className="img-frame aspect-[2/1] lg:aspect-[4/5]">
            <Image src="/assets/editorial/beach-textiles.webp" alt="Soft linen throws and a straw hat resting on warm sand where the surf is washing in" fill sizes="(min-width: 1024px) 38vw, 92vw" className="object-cover object-[50%_60%]" />
          </div>
        </div>

        <div className="reveal lg:col-span-7">
          <p className="eyebrow text-clay-deep">Meet Debbie</p>
          <h2 id="meet-title" className="display-lg mt-4">A little more clarity. A lot less second-guessing.</h2>
          <p className="mt-5 max-w-xl text-forest/85">
            Debbie is a photographer turned brand and website template designer. She built her own business on a real-life budget and started Sela Cove after seeing how many new business owners were priced out of the help they needed.
          </p>
          <figure className="mt-7 max-w-xl border-l-2 border-clay pl-5">
            <blockquote className="font-display text-[1.4rem] italic leading-snug sm:text-[1.65rem]">
              “Sela Cove comes from that very real place, not from someone standing on the other side pretending to have it all figured out.”
            </blockquote>
            <figcaption className="mt-2 text-sm text-forest/75">Debbie, on the Sela Cove About page</figcaption>
          </figure>
          <div className="mt-8"><Button href="/about" variant="ghost">Read the Full Story</Button></div>
        </div>
      </div>
    </section>
  );
}
