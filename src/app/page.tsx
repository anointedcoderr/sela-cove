import { Hero } from '@/components/home/Hero';
import { Problem } from '@/components/home/Problem';
import { Pathways } from '@/components/home/Pathways';
import { FeaturedAudit } from '@/components/home/FeaturedAudit';
import { Collection } from '@/components/home/Collection';
import { Meet } from '@/components/home/Meet';
import { Journal } from '@/components/home/Journal';
import { Closing } from '@/components/home/Closing';

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Pathways />
      <FeaturedAudit />
      <Collection />
      <Meet />
      <Journal />
      <Closing />
    </>
  );
}
