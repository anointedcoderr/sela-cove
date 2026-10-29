// Content drawn from public selacove.com pages. See docs/content-sources.md.

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Start Here', href: '/start-here' },
  { label: 'Work With Me', href: '/work-with-me' },
  { label: 'Shop', href: '/shop' },
  { label: 'Journal', href: '/journal' },
  { label: 'About', href: '/about' },
] as const;

export const footerResources = [
  { label: 'The Free Audit', href: '/audit' },
  { label: 'Brand Foundation Workbook', href: '/brand-foundation' },
  { label: 'Creative Brand Direction', href: '/creative-brand-direction' },
  { label: 'Contact', href: '/contact' },
] as const;

export const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/sela_cove/' },
  { label: 'Pinterest', href: 'https://www.pinterest.com/sela_cove/' },
  { label: 'Etsy', href: 'https://www.etsy.com/shop/SelaCove' },
] as const;

export type Product = {
  slug: string;
  name: string;
  kind: string;
  blurb: string;
  price: string;
  image: string;
  alt: string;
  cta: string;
  ratio: string; // tailwind aspect class
};

export const products: Product[] = [
  {
    slug: 'brand-foundation-workbook',
    name: 'Brand Foundation Workbook',
    kind: 'Workbook · Self-guided',
    blurb: 'A 29-page workbook for sorting out what sits underneath your brand, before you touch anything visual.',
    price: '$29 intro price',
    image: '/assets/products/brand-foundation-workbook-cover.webp',
    alt: 'Deep red cover of the Brand Foundation workbook, subtitled A Working Guide for Early-Stage Businesses',
    cta: 'Discover the Workbook',
    ratio: 'aspect-[5/4]',
  },
  {
    slug: 'halden-mini-brand-kit',
    name: 'Halden Mini Brand Kit',
    kind: 'Canva mini brand kit',
    blurb: 'A premade, customizable brand for Canva, shown here as printed cards in warm gold and black.',
    price: '$37',
    image: '/assets/products/halden-mini-brand-kit.webp',
    alt: 'Gold and black Halden brand cards held above a laptop keyboard',
    cta: 'Explore the Kit',
    ratio: 'aspect-[5/4]',
  },
  {
    slug: 'talia-blake-mini-brand-kit',
    name: 'Talia Blake Mini Brand Kit',
    kind: 'Canva mini brand kit',
    blurb: 'A premade, customizable brand for Canva, introduced with a soft wordmark over black-and-white photography.',
    price: '$37',
    image: '/assets/products/talia-blake-mini-brand-kit.webp',
    alt: 'Talia Blake wordmark over a black-and-white photograph of a veiled bride from behind',
    cta: 'Explore the Kit',
    ratio: 'aspect-[5/4]',
  },
  {
    slug: 'patina-website-template',
    name: 'Patina Website Template',
    kind: 'Showit website template',
    blurb: 'A Showit website template you customize yourself, shown here in a dark, image-led layout.',
    price: '$249',
    image: '/assets/templates/patina-template.webp',
    alt: 'Two page layouts of the Patina Showit template on a dark ground',
    cta: 'Meet Patina',
    ratio: 'aspect-[5/4]',
  },
  {
    slug: 'portfolio-blog-website-template',
    name: 'Portfolio & Blog Website Template',
    kind: 'Showit website template',
    blurb: 'A light portfolio and blog template you customize yourself.',
    price: '$129',
    image: '/assets/templates/portfolio-blog-template.webp',
    alt: 'Two page layouts of a light portfolio and blog Showit template',
    cta: 'Explore the Template',
    ratio: 'aspect-[5/4]',
  },
];

export const featuredProductSlugs = [
  'brand-foundation-workbook',
  'halden-mini-brand-kit',
  'talia-blake-mini-brand-kit',
  'patina-website-template',
];

export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  alt: string;
  source: string;
};

export const articles: Article[] = [
  {
    slug: 'why-cant-i-get-my-logo-to-look-right',
    title: 'Why can’t I get my logo to look right?',
    category: 'Logo & identity',
    excerpt:
      'When most people start thinking about branding, the logo is the first thing on the list. You open Canva, look through some fonts, save a bunch of things on Pinterest…',
    image: '/assets/blog/logo-not-right.webp',
    alt: 'A woman at a desk beside a sunlit window, resting her hand on her face as she looks at her laptop',
    source: 'https://selacove.com/2026/09/18/logo-brand-identity/',
  },
  {
    slug: 'what-makes-a-logo-look-professional',
    title: 'What makes a logo look professional (and the mistakes that make it look cheap)',
    category: 'Logo & identity',
    excerpt:
      'To make a logo look professional, you remove things instead of adding them. A high-end logo comes from restraint, room to breathe, and one strong idea done well.',
    image: '/assets/blog/professional-logo.webp',
    alt: 'A cream envelope with a patterned liner beside a dark branded card',
    source: 'https://selacove.com/2026/06/24/what-makes-a-logo-look-professional/',
  },
  {
    slug: 'how-to-find-the-right-keywords-for-your-small-business',
    title: 'How to find the right keywords for your small business (for free)',
    category: 'Website & search',
    excerpt:
      'Google reads for meaning now, the way a person would. So the natural next question is the one I hear most: “Okay, but how do I find my keywords?”',
    image: '/assets/blog/keywords.webp',
    alt: 'A sand-colored card titled How to Find the Right Keywords',
    source: 'https://selacove.com/2026/06/09/how-to-find-the-right-keywords-for-your-small-business/',
  },
];

export type PlaceholderPage = { slug: string; title: string; eyebrow: string; note: string };

export const placeholderPages: PlaceholderPage[] = [
  { slug: 'start-here', title: 'Start Here', eyebrow: 'Find your starting point', note: 'A guided way to decide whether to audit, work through the workbook, or talk it through one-to-one.' },
  { slug: 'work-with-me', title: 'Work With Me', eyebrow: 'One-to-one support', note: 'How personalized work with Sela Cove is shaped will live here.' },
  { slug: 'shop', title: 'The Shop', eyebrow: 'Guides, kits & templates', note: 'The full collection of workbooks, Canva brand kits and Showit templates will live here.' },
  { slug: 'journal', title: 'The Journal', eyebrow: 'Notes on branding & websites', note: 'The full archive of articles will live here.' },
  { slug: 'about', title: 'About', eyebrow: 'The story behind Sela Cove', note: 'The full story will live here.' },
  { slug: 'contact', title: 'Contact', eyebrow: 'Say hello', note: 'This concept collects no personal information, so there is no form here.' },
  { slug: 'audit', title: 'The Stop Changing Everything Audit', eyebrow: 'Free self-guided audit', note: 'The audit page will live here. No download or sign-up is connected in this concept.' },
  { slug: 'brand-foundation', title: 'Brand Foundation: A Working Guide', eyebrow: 'Self-guided workbook', note: 'The workbook page will live here. Checkout is not connected in this concept.' },
  { slug: 'creative-brand-direction', title: 'Creative Brand Direction', eyebrow: '1:1 collaboration', note: 'Details and booking will live here. Nothing can be booked in this concept.' },
];
