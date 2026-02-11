import BackTo from '@/components/BackTo';
import Bounded from '@/components/Bounded';
import VanType from '@/components/VanType';
import { formatCurrency, formatDash } from '@/lib/formatter';
import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';
import { VAN_QUERY } from '@/sanity/lib/sanityQueries';
import { myPortableTextComponents } from '@/sanity/schemaTypes/components/myPortableText';
import { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import CTA from '@/components/CTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugFormatted = formatDash(slug);

  return {
    title: slugFormatted,
    description: `${slugFormatted} -  View specs, availability, and high-res photos of this van. Fully equipped and ready for your next destination.`,
  };
}

const VanDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { data: van } = await sanityFetch({
    query: VAN_QUERY,
    params: await params,
  });

  if (!van) return null;

  return (
    <Bounded isPadded>
      <BackTo href="/vans">all vans</BackTo>

      {van?.mainImage?.asset?.url && (
        <Image
          src={urlFor(van.mainImage.asset.url).format('webp').url()}
          width={600}
          height={600}
          alt={van.mainImage.alt || ''}
          loading="eager"
          className="w-full object-cover"
        />
      )}

      <VanType
        type={van?.type as 'simple' | 'rugged' | 'luxury'}
        className="inline-block"
      >
        {van.type}
      </VanType>

      <p className="font-semibold text-fs-500">{van.name}</p>

      {van.pricePerDay && (
        <p>
          <span className="font-semibold">
            {formatCurrency(van.pricePerDay)}
          </span>
          /day
        </p>
      )}

      {van.body && (
        <div className="prose md:prose-lg min-w-full">
          <PortableText
            value={van.body}
            components={myPortableTextComponents}
          />
        </div>
      )}

      <CTA
        href={`/vans/rent-van?${van.slug?.current}`}
        className="w-full bg-brand-orange-400 hover:bg-brand-orange-400/80"
      >
        Rent This Van
      </CTA>
    </Bounded>
  );
};

export default VanDetailPage;
