import Bounded from '@/components/Bounded';
import CTA from '@/components/CTA';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Rent the perfect van for your next road trip. Explore a wide range of reliable, affordable adventure vans. Your journey starts here with easy online booking.',
};

export default function Home() {
  return (
    <Bounded isPadded>
      <div>
        <Image
          src="/home-hero.png"
          alt=""
          width={1200}
          height={600}
          className=""
        />
      </div>

      <div className="flex flex-col gap-y-5 justify-center items-center">
        <h1 className="font-semibold text-fs-600">
          You got the travel plans, we got the travel vans.
        </h1>
        <p>Add adventure to your life by joining the #vanlife movement.</p>
        <p>Rent the perfect van to make your perfect road trip.</p>
        <CTA href="/vans" className="self-start w-full">
          Find Your Van
        </CTA>
      </div>
    </Bounded>
  );
}
