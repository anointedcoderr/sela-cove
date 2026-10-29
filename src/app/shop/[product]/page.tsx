import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Placeholder } from '@/components/Placeholder';
import { products } from '@/data/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ product: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ product: string }> }): Promise<Metadata> {
  const { product } = await params;
  const p = products.find((x) => x.slug === product);
  return { title: p?.name ?? 'Not found' };
}

export default async function Page({ params }: { params: Promise<{ product: string }> }) {
  const { product } = await params;
  const p = products.find((x) => x.slug === product);
  if (!p) notFound();
  return (
    <Placeholder
      eyebrow={p.kind}
      title={p.name}
      meta={p.price}
      note="The product page will live here. Checkout is not connected in this concept."
      image={p.image}
      imageAlt={p.alt}
    />
  );
}
