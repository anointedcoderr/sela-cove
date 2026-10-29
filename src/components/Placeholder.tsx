import Image from 'next/image';
import { Button } from './Button';

export function Placeholder({
  eyebrow,
  title,
  note,
  meta,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  note: string;
  meta?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative">
      <div className="container-page grid min-h-[calc(100svh-4.5rem)] items-center gap-10 py-14 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-12 lg:gap-16 lg:py-20">
        <div className="lg:col-span-7">
          <p className="eyebrow text-clay-deep">{eyebrow}</p>
          <h1 className="display-lg mt-5 max-w-[16ch]">{title}</h1>
          {meta && <p className="mt-4 text-sm tracking-wide text-forest/75">{meta}</p>}
          <div className="mt-10 max-w-lg border-t hairline pt-8">
            <p className="font-display text-[1.9rem] italic leading-tight text-clay-deep">Something thoughtful is taking shape.</p>
            <p className="mt-4 text-forest/85">
              This section of the Cove is still being prepared. More to explore soon.
            </p>
            <p className="mt-3 text-sm text-forest/75">{note}</p>
          </div>
          <div className="mt-10">
            <Button href="/" variant="solid">Back to Home</Button>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="img-frame mx-auto aspect-[5/4] max-w-xl lg:aspect-[4/5] lg:max-w-none">
            <Image
              src={image ?? '/assets/editorial/sea-waves.webp'}
              alt={imageAlt ?? 'Black-and-white photograph of a wave rolling onto a calm shore'}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
