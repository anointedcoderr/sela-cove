import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Placeholder } from '@/components/Placeholder';
import { placeholderPages } from '@/data/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return placeholderPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = placeholderPages.find((p) => p.slug === slug);
  return { title: page?.title ?? 'Not found' };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = placeholderPages.find((p) => p.slug === slug);
  if (!page) notFound();
  return <Placeholder eyebrow={page.eyebrow} title={page.title} note={page.note} />;
}
