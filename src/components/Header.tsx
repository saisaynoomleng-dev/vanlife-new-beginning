'use client';

import { useUser } from '@clerk/nextjs';
import BrandLogo from './BrandLogo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';

const NAV_LINKS = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'Vans', url: '/vans' },
  { name: 'Contact Us', url: '/contact-us' },
];

const Header = () => {
  const { isSignedIn, user } = useUser();
  const pathName = usePathname();

  const imageUrl = user?.imageUrl;

  return (
    <header className="px-5 py-3 flex justify-between items-center">
      <Link href="/">
        <BrandLogo />
      </Link>

      <nav className="flex gap-x-3">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.url}
            key={link.url}
            className={clsx(
              'font-medium',
              pathName === link.url && 'text-brand-orange-400',
            )}
          >
            {link.name}
          </Link>
        ))}

        {isSignedIn ? (
          <Link href="/user">
            <Image
              src={imageUrl || 'https://placehold.co/30'}
              alt={`${user.firstName}'s photo` || ''}
              width={30}
              height={30}
              className="rounded-full"
            />
          </Link>
        ) : (
          <Link href="/sign-in" className="font-medium">
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
