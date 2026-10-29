const moments = [
  'You keep changing your colors and fonts.',
  'You revisit your website and still aren’t happy with it.',
  'You wonder whether your logo still fits.',
  'You can’t tell what deserves your attention first.',
  'You don’t know what to keep, or what to change.',
];

export function Problem() {
  return (
    <section aria-labelledby="problem-title" className="bg-sand">
      <div className="container-page grid gap-8 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20">
        <div className="reveal lg:col-span-5">
          <p className="eyebrow text-clay-deep">Does this sound familiar?</p>
          <h2 id="problem-title" className="display-lg mt-4">You don’t always need to start over.</h2>
          <p className="mt-5 max-w-md text-forest/85">
            When parts of a brand feel disconnected, starting from scratch is the usual instinct. Often the better first step is deciding what has already earned its place.
          </p>
        </div>

        <ol className="reveal border-t border-forest/25 lg:col-span-7 lg:mt-1">
          {moments.map((text, i) => (
            <li key={text} className="flex items-baseline gap-5 border-b border-forest/25 py-4 sm:gap-7 sm:py-[1.15rem]">
              <span aria-hidden="true" className="w-6 shrink-0 font-display text-[1.15rem] italic text-clay-deep">{String(i + 1).padStart(2, '0')}</span>
              <p className="title-sm">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
