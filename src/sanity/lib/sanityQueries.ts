import { defineQuery } from 'next-sanity';

export const ALL_VANS_QUERY = defineQuery(`{
  "vans": *[_type == 'van' 
          && defined(slug.current)]
          [$startIndex...$endIndex]{
            name,
            mainImage{
              alt,
              asset->{url}
            },
            pricePerDay,
            type,
            slug
          },
  "total": count(*[_type == 'van' 
          && defined(slug.current)])
}`);

export const VAN_QUERY = defineQuery(`*[_type == 'van'
 && slug.current == $slug][0]{
  name,
  mainImage{
    alt,
    asset->{url}
  },
  pricePerDay,
  type,
  body,
  slug,
 }`);
