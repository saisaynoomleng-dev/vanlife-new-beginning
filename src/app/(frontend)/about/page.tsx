import Bounded from '@/components/Bounded';
import CTA from '@/components/CTA';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about our mission to make van travel accessible to everyone. From weekend warriors to full-time nomads, we provide the vehicles you need to explore.',
};

const AboutPage = () => {
  return (
    <Bounded isPadded>
      <div>
        <Image
          src="/about-hero.png"
          alt=""
          width={1200}
          height={600}
          className=""
        />
      </div>

      <h2 className="font-semibold text-fs-500 md:text-fs-600">
        Don&apos;t squeeze in a sedan when you could relax in a van.
      </h2>

      <p>
        Our mission is to enliven your road trip with the perfect travel van
        rental. Our vans are recertified before each trip to ensure your travel
        plans can go off without a hitch. (Hitch costs extra 😉)
      </p>

      <p>
        Our team is full of vanlife enthusiasts who know firsthand the magic of
        touring the world on 4 wheels
      </p>

      <div className="flex flex-col gap-y-2 bg-brand-orange-100 rounded-sm p-5">
        <p className="font-semibold">Your Destination is waiting.</p>
        <p className="font-semibold">Your Van is Ready.</p>
        <CTA href="/vans">Explore our vans</CTA>
      </div>
    </Bounded>
  );
};

export default AboutPage;
