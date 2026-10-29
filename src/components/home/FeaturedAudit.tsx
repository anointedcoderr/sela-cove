import Image from 'next/image';
import { Button } from '../Button';
import { Reveal } from '../Reveal';

const outcomes = [
  ['Keep', 'what’s working and earning its place'],
  ['Refine', 'what’s close, but needs attention'],
  ['Test', 'what you’re not sure about yet'],
  ['Stop', 'what no longer fits'],
  ['Later', 'what can wait without costing you'],
];

const inside = [
  'A Brand Clarity check',
  'A Visual Brand Direction check',
  'Quick exercises and examples',
  'A closing section: “What does your pattern look like?”',
];

export function FeaturedAudit() {
  return (
    <section aria-labelledby="audit-title" className="bg-sand-light">
      <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-12 lg:gap-20 lg:py-32">
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="img-frame aspect-[4/5]">
              <Image src="/assets/products/audit-cover.webp" alt="The Stop Changing Everything Audit, a nine-page PDF with an ochre cover" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover object-[50%_45%]" loading="lazy" />
            </div>
            <p className="eyebrow absolute -bottom-4 left-6 bg-ivory px-4 py-3 text-forest shadow-[0_0_0_1px_rgba(40,52,47,0.2)]">Free · 9-page PDF</p>
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-7">
          <p className="eyebrow text-clay-deep">The free audit</p>
          <h2 id="audit-title" className="display-lg mt-5">The Stop Changing Everything Audit</h2>
          <p className="lede mt-6 max-w-2xl text-forest/85">
            A quick brand diagnostic for the moment when something feels off and you’re not sure what actually needs attention. It also shows whether the uncertainty sits mostly in the business, the visual side, or both, or whether very little needs to change right now.
          </p>

          <dl className="mt-10 border-t hairline">
            {outcomes.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6rem_1fr] items-baseline gap-4 border-b hairline py-3.5 sm:grid-cols-[8rem_1fr]">
                <dt className="font-display text-[1.45rem] uppercase tracking-[0.08em] leading-none">{k}</dt>
                <dd className="text-[0.95rem] text-forest/85">{v}</dd>
              </div>
            ))}
          </dl>

          <h3 className="eyebrow mt-10 font-sans text-forest">What’s inside</h3>
          <ul className="mt-4 grid gap-x-8 gap-y-2 text-[0.95rem] text-forest/85 sm:grid-cols-2">
            {inside.map((t) => (
              <li key={t} className="flex gap-3"><span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-clay" />{t}</li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-forest/75">A free digital download for early-stage small business owners. Use it on your own, before another round of changes.</p>
          <div className="mt-8"><Button href="/audit">Explore the Free Audit</Button></div>
        </Reveal>
      </div>
    </section>
  );
}
