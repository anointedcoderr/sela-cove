import manifest from '@/data/image-widths.json';

type Entry = { full: number; widths: number[] };
const sizes = manifest as Record<string, Entry>;

// Static export: pick the smallest pre-generated file that is at least as wide as the request,
// falling back to the full-size original. Files are produced by scripts/make-responsive.mjs.
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const entry = sizes[src];
  if (!entry) return src;
  const w = entry.widths.find((x) => x >= width);
  if (!w) return src;
  return src.replace(/^\/assets\//, '/assets/r/').replace(/\.webp$/, `-${w}.webp`);
}
