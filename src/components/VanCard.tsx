import { formatCurrency } from '@/lib/formatter';
import { urlFor } from '@/sanity/lib/image';
import { ALL_VANS_QUERYResult } from '@/sanity/types';
import Image from 'next/image';
import Link from 'next/link';
import VanType from './VanType';

const VanCard = (props: NonNullable<ALL_VANS_QUERYResult['vans'][number]>) => {
  const { slug, name, pricePerDay, mainImage, type } = props;

  const imageUrl = mainImage?.asset?.url;
  const imageAlt = mainImage?.alt;

  return (
    <Link href={`/vans/${slug?.current}`} className="space-y-2">
      {imageUrl && (
        <Image
          src={urlFor(imageUrl).format('webp').url()}
          alt={imageAlt || ''}
          width={300}
          height={300}
          loading="eager"
          className="object-cover rounded-sm"
        />
      )}

      <div className="flex justify-between">
        <p className="font-semibold">{name}</p>
        {pricePerDay && (
          <p className="flex flex-col items-end">
            <span className="font-semibold">{formatCurrency(pricePerDay)}</span>{' '}
            <span>/day</span>
          </p>
        )}
      </div>

      {type && (
        <VanType type={type} className="inline-block">
          {type}
        </VanType>
      )}
    </Link>
  );
};

export default VanCard;
