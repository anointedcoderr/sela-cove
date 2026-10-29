import Image from 'next/image';
import { Button } from '../Button';

// KEEP / REFINE / TEST / STOP / LATER descriptions follow the live audit page.
const decisions = [
  ['Keep', 'what should stay'],
  ['Refine', 'what needs refinement'],
  ['Test', 'what you’re not sure about yet'],
  ['Stop', 'what no longer fits'],
  ['Later', 'what can wait'],
];

const inside = ['Brand Clarity check', 'Visual Brand Direction check', 'Quick exercises and examples', '“What Does Your Pattern Look Like?”'];

export function FeaturedAudit() {
  return (
    <section aria-labelledby="audit-title" className="bg-sand-light">
      <div className="container-page grid items-center gap-8 py-14 md:grid-cols-12 md:items-start md:gap-10 lg:gap-16 lg:py-20">
        <div className="reveal mx-auto hidden w-52 sm:block md:col-span-4 md:w-full lg:max-w-sm">
          <div className="img-frame aspect-[1100/1276]">
            <Image src="/assets/products/audit-cover-portrait.webp" alt="The Stop Changing Everything Audit, a nine-page PDF with an ochre cover" fill sizes="(min-width: 1024px) 30vw, 208px" className="object-cover" />
          </div>
        </div>

        <div className="reveal md:col-span-8">
          <p className="eyebrow text-clay-deep">Free · 9-page PDF</p>
          <h2 id="audit-title" className="display-lg mt-4">The Stop Changing Everything Audit</h2>
          <p className="mt-5 max-w-2xl text-forest/85">
            A quick brand diagnostic for the moment when something feels off and you’re not sure what actually needs attention. It sorts what to keep, refine, test, stop or leave for later, and shows whether the uncertainty sits in the business, the visual side, both, or whether very little needs to change right now.
          </p>

          <dl className="mt-7 border-t border-forest/25">
            {decisions.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-forest/25 py-2.5 sm:grid-cols-[7rem_1fr]">
                <dt className="font-display text-[1.3rem] uppercase leading-none tracking-[0.08em]">{k}</dt>
                <dd className="text-[0.95rem] text-forest/85">{v}</dd>
              </div>
            ))}
          </dl>

          <h3 className="eyebrow mt-7 font-sans text-forest">Also inside</h3>
          <ul className="mt-3 grid gap-x-8 gap-y-1.5 text-[0.95rem] text-forest/85 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {inside.map((t) => (
              <li key={t} className="flex gap-3"><span aria-hidden="true" className="mt-[0.8em] h-px w-4 shrink-0 bg-clay" />{t}</li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 md:flex-col md:items-start md:gap-3 xl:flex-row xl:items-center xl:gap-6">
            <Button href="/audit">Explore the Free Audit</Button>
            <p className="text-sm text-forest/75">A free digital download for early-stage small business owners.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
