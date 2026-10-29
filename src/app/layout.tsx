import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

const instrument = localFont({
  src: [
    { path: '../fonts/instrument-serif-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/instrument-serif-latin-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-instrument',
  display: 'swap',
});

const manrope = localFont({
  src: '../fonts/manrope-latin-wght-normal.woff2',
  weight: '200 800',
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Sela Cove: an independent design concept', template: '%s · Sela Cove concept' },
  description:
    'A private, independent website redesign concept for Sela Cove by RSS World Network. Not the official Sela Cove website.',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: {
    title: 'Sela Cove: an independent design concept',
    description: 'A private redesign concept by RSS World Network. Not the official Sela Cove website.',
    type: 'website',
  },
};

export const viewport: Viewport = { themeColor: '#F7F3EC', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrument.variable} ${manrope.variable}`}>
      <body>
        <p className="no-print border-b border-forest/15 bg-sand-light px-4 py-2 text-center text-[0.74rem] leading-snug tracking-[0.02em] text-forest/85">
          A homepage design preview. The other pages are still in preparation.
        </p>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
