import Image from 'next/image';
import { Button } from '../Button';

export function Closing() {
  return (
    <section aria-labelledby="closing-title" className="on-dark bg-forest text-ivory">
      <div className="container-page grid items-center gap-10 py-16 lg:grid-cols-12 lg:gap-16 lg:py-20">
        <div className="reveal lg:col-span-8">
          <h2 id="closing-title" className="display-lg max-w-[20ch]">You don’t need every answer to take a clearer next step.</h2>
          <p className="mt-5 max-w-xl text-ivory/85">
            Start with what you already have. Decide what stays, and let the rest wait.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/audit" variant="light">Start With the Free Audit</Button>
            <Button href="/start-here" variant="ghost-light" short="Where to Start">Find Your Starting Point</Button>
          </div>
        </div>
        <div className="reveal hidden lg:col-span-4 lg:block">
          <div className="img-frame aspect-[4/3]">
            <Image src="/assets/editorial/sea-foam.webp" alt="Black-and-white close view of sea foam washing over dark sand" fill sizes="30vw" className="object-cover object-[50%_65%]" />
          </div>
        </div>
      </div>
    </section>
  );
}
