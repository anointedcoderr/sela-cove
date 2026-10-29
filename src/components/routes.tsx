import type { Metadata } from 'next';
import { Placeholder } from './Placeholder';
import { articles, placeholderPages, products } from '@/data/site';

// Each coming-soon route has its own folder under src/app (no dynamic [slug] segments): Next names the
// static-export data files of dynamic segments with "$", which Cloudflare's static assets redirect in a loop.
const find = <T extends { slug: string }>(list: T[], slug: string) => {
  const item = list.find((x) => x.slug === slug);
  if (!item) throw new Error(`Unknown route slug: ${slug}`);
  return item;
};

export function sectionRoute(slug: string) {
  const p = find(placeholderPages, slug);
  const metadata: Metadata = { title: p.title };
  const Page = () => <Placeholder eyebrow={p.eyebrow} title={p.title} note={p.note} />;
  return { metadata, Page };
}

export function productRoute(slug: string) {
  const p = find(products, slug);
  const metadata: Metadata = { title: p.name };
  const Page = () => (
    <Placeholder eyebrow={p.kind} title={p.name} meta={p.price} note="The product page will live here. Checkout is not connected in this concept." image={p.image} imageAlt={p.alt} />
  );
  return { metadata, Page };
}

export function articleRoute(slug: string) {
  const a = find(articles, slug);
  const metadata: Metadata = { title: a.title };
  const Page = () => <Placeholder eyebrow={`Journal · ${a.category}`} title={a.title} note="The full article will live here." image={a.image} imageAlt={a.alt} />;
  return { metadata, Page };
}
