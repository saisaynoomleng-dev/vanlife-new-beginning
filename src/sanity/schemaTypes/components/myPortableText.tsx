import { urlFor } from '@/sanity/lib/image';
import { PortableTextComponents } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';

export const myPortableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) =>
      value ? (
        <Image
          src={urlFor(value).format('webp').url()}
          alt={value?.alt || ''}
          width={400}
          height={400}
          loading="lazy"
          className="object-cover rounded-sm"
        />
      ) : null,
  },
  marks: {
    link: ({ value, children }) => (
      <Link href={value?.hred} className="underline text-brand-orange-400">
        {children}
      </Link>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="marker:text-brand-orange-400">{children}</ul>
    ),
  },
};
