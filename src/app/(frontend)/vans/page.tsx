import Bounded from '@/components/Bounded';
import VanCard from '@/components/VanCard';
import { sanityFetch } from '@/sanity/lib/live';
import { ALL_VANS_QUERY } from '@/sanity/lib/sanityQueries';
import clsx from 'clsx';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'All Vans',
  description:
    'Browse our fleet of premium rental vans. Filter by type, price, and features to find the ideal rig for your solo trip or family adventure. Book today!',
};

const VAN_FILTERS = [
  { name: 'Simple', filter: 'simple', theme: '#e17654' },
  { name: 'Rugged', filter: 'rugged', theme: '#115e59' },
  { name: 'Luxury', filter: 'luxury', theme: '#161616' },
];

const VansPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; page?: string }>;
}) => {
  const { filter, page } = await searchParams;

  const vansPerPage = 3;
  const currentPage = parseInt(page || '1', 10);
  const startIndex = vansPerPage * (currentPage - 1);
  const endIndex = startIndex + vansPerPage;

  const { data: vans } = await sanityFetch({
    query: ALL_VANS_QUERY,
    params: {
      startIndex,
      endIndex,
    },
  });

  const totalPages = Math.ceil(vans.total / vansPerPage);

  return (
    <Bounded isPadded>
      <div className="flex flex-col gap-y-3">
        <h2 className="font-semibold text-fs-500">Explore our van options</h2>
        <div className="flex justify-between items-center">
          <div className="flex gap-x-3 items-center">
            {VAN_FILTERS.map((f) => (
              <Link
                href={{
                  pathname: '/vans',
                  query: {
                    ...(page && { page }),
                    filter: f.filter,
                  },
                }}
                key={f.theme}
                className={clsx(
                  'px-2 py-1 bg-brand-orange-100 rounded-sm font-semibold',
                )}
                style={{
                  backgroundColor: filter && filter === f.filter ? f.theme : '',
                  color: filter && filter === f.filter ? '#fff7ed' : '',
                }}
              >
                {f.name}
              </Link>
            ))}
          </div>

          {filter && (
            <div>
              <Link
                href={{
                  pathname: '/vans',
                  query: {
                    ...(page && { page }),
                  },
                }}
                className={clsx('underline underline-offset-4 text-red-500')}
              >
                Clear Filter
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-x-5">
        {vans.vans.map((van) => (
          <VanCard key={van.slug?.current} {...van} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex gap-x-4 justify-center items-center">
          {Array.from({ length: totalPages })
            .map((_, i) => i + 1)
            .map((pageNumber) => (
              <Link
                key={pageNumber}
                href={{
                  pathname: '/vans',
                  query: {
                    ...(filter && { filter }),
                    page: pageNumber,
                  },
                }}
              >
                {pageNumber}
              </Link>
            ))}
        </div>
      )}
    </Bounded>
  );
};

export default VansPage;
