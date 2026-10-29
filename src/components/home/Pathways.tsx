import Image from 'next/image';
import { Button } from '../Button';
import { Reveal } from '../Reveal';

export function Pathways() {
  return (
    <section aria-labelledby="pathways-title" className="container-page py-20 lg:py-32">
      <Reveal className="max-w-3xl">
        <p className="eyebrow text-clay-deep">Three ways to begin</p>
        <h2 id="pathways-title" className="display-lg mt-5">Find the support that fits where you are.</h2>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
        {/* 01 Audit */}
        <Reveal as="article" className="group flex flex-col bg-sand-light lg:mt-0">
          <div className="img-frame aspect-[5/4]">
            <Image src="/assets/products/audit-cover.webp" alt="Cover of The Stop Changing Everything Audit in ochre, with the title set in white serif type" fill sizes="(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 92vw" className="object-cover object-[50%_40%]" />
          </div>
          <div className="flex flex-1 flex-col p-7 sm:p-9">
            <p className="eyebrow text-clay-deep">01 · Free · Self-guided</p>
            <h3 className="display-md mt-4">The Stop Changing Everything Audit</h3>
            <p className="mt-4 text-forest/85">
              A free diagnostic to help you decide what to keep, refine, test, stop, or leave for later, before you change anything else.
            </p>
            <p className="mt-5 font-display text-[1.15rem] uppercase tracking-[0.1em] text-forest/80">Keep · Refine · Test · Stop · Later</p>
            <div className="mt-auto pt-8"><Button href="/audit" variant="solid" className="w-full sm:w-auto">Explore the Free Audit</Button></div>
          </div>
        </Reveal>

        {/* 02 Workbook */}
        <Reveal as="article" delay={80} className="group flex flex-col border border-forest/25 lg:mt-14">
          <div className="img-frame aspect-[5/4]">
            <Image src="/assets/products/brand-foundation-workbook-cover.webp" alt="Cover of the Brand Foundation workbook in deep red" fill sizes="(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 92vw" className="object-cover object-[50%_40%]" />
          </div>
          <div className="flex flex-1 flex-col p-7 sm:p-9">
            <p className="eyebrow text-clay-deep">02 · Workbook · Self-guided</p>
            <h3 className="display-md mt-4">Brand Foundation: A Working Guide</h3>
            <p className="mt-4 text-forest/85">
              A structured, self-guided workbook for making the foundational brand decisions, so the visual choices have something solid to stand on.
            </p>
            <div className="mt-auto pt-8"><Button href="/brand-foundation" variant="ghost" className="w-full sm:w-auto">Discover the Workbook</Button></div>
          </div>
        </Reveal>

        {/* 03 Creative Brand Direction */}
        <Reveal as="article" delay={160} className="on-dark group flex flex-col bg-forest text-ivory md:col-span-2 lg:col-span-1 lg:mt-28">
          <div className="flex aspect-[5/4] items-end border-b border-ivory/20 p-7 sm:p-9 md:aspect-[16/6] lg:aspect-[5/4]">
            <p aria-hidden="true" className="font-display text-[7rem] italic leading-[0.8] text-sand sm:text-[9rem]">1:1</p>
          </div>
          <div className="flex flex-1 flex-col p-7 sm:p-9">
            <p className="eyebrow text-sand">03 · Collaborative</p>
            <h3 className="display-md mt-4">Creative Brand Direction</h3>
            <p className="mt-4 text-ivory/85">
              One-to-one brand strategy and creative direction for when you want another set of eyes on the whole thing, and someone to think it through with you.
            </p>
            <div className="mt-auto pt-8"><Button href="/creative-brand-direction" variant="ghost-light" className="w-full sm:w-auto">Explore Creative Direction</Button></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
