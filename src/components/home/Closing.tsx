import Image from 'next/image';
import { Button } from '../Button';
import { Reveal } from '../Reveal';

export function Closing() {
  return (
    <section aria-labelledby="closing-title" className="on-dark bg-forest text-ivory">
      <div className="container-page grid items-center gap-12 py-24 lg:grid-cols-12 lg:gap-16 lg:py-36">
        <Reveal className="lg:col-span-8">
          <p className="eyebrow text-sand">When you’re ready</p>
          <h2 id="closing-title" className="display-lg mt-6 max-w-[18ch]">You don’t need every answer to take a clearer next step.</h2>
          <p className="lede mt-8 max-w-xl text-ivory/85">
            Sela Cove begins with what you already have. Look at it honestly, decide what stays, and let the rest wait. That’s often enough to move forward with a little more confidence.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/audit" variant="light">Start With the Free Audit</Button>
            <Button href="/start-here" variant="ghost-light">Find Your Starting Point</Button>
          </div>
        </Reveal>
        <Reveal delay={120} className="hidden lg:col-span-4 lg:block">
          <div className="img-frame aspect-[4/5] opacity-90">
            <Image src="/assets/editorial/sea-foam.webp" alt="Black-and-white close view of sea foam washing over dark sand" fill sizes="30vw" className="object-cover" loading="lazy" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
