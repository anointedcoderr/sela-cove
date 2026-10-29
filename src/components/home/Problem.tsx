import { Reveal } from '../Reveal';

const moments = [
  ['You keep changing your colors and fonts.', 'A new palette every few weeks, and still nothing quite holds.'],
  ['You revisit your website and aren’t any happier.', 'You tweak it again, close the tab, and the feeling stays.'],
  ['You wonder whether your logo still fits.', 'Not because it’s broken, but because something feels slightly off.'],
  ['You can’t tell what deserves your attention.', 'Everything seems equally urgent, so nothing gets finished.'],
  ['You don’t know what to keep, or what to change.', 'Starting over feels drastic. Leaving it feels wrong.'],
];

export function Problem() {
  return (
    <section aria-labelledby="problem-title" className="bg-sand">
      <div className="container-page grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-32">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow text-clay-deep">Does any of this sound familiar?</p>
            <h2 id="problem-title" className="display-lg mt-5">You don’t always need to start over.</h2>
            <p className="lede mt-7 max-w-md text-forest/85">
              When the parts of a brand feel disconnected, the instinct is often to scrap it and begin again. Usually, though, the real work is quieter: looking at what you have and deciding what earns its place.
            </p>
          </div>
        </Reveal>

        <ol className="lg:col-span-7">
          {moments.map(([title, line], i) => (
            <Reveal as="li" key={title} delay={i * 40} className="grid grid-cols-[3.25rem_1fr] gap-x-4 border-t border-forest/25 py-7 first:border-t-0 first:pt-0 sm:grid-cols-[5rem_1fr] sm:py-9">
              <span aria-hidden="true" className="font-display text-[2.2rem] italic leading-none text-clay-deep sm:text-[3rem]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="display-md">{title}</h3>
                <p className="mt-2 max-w-md text-forest/80">{line}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
