import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Placeholder } from '@/components/Placeholder';
import { articles } from '@/data/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ article: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ article: string }> }): Promise<Metadata> {
  const { article } = await params;
  const a = articles.find((x) => x.slug === article);
  return { title: a?.title ?? 'Not found' };
}

export default async function Page({ params }: { params: Promise<{ article: string }> }) {
  const { article } = await params;
  const a = articles.find((x) => x.slug === article);
  if (!a) notFound();
  return (
    <Placeholder
      eyebrow={`Journal · ${a.category}`}
      title={a.title}
      note="The full article will live here."
      image={a.image}
      imageAlt={a.alt}
    />
  );
}
