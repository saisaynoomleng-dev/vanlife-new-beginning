'use client';

import { SignOutButton } from '@clerk/nextjs';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

const USER_NAV_LINKS = [
  { name: 'Personal Information', url: '/user' },
  { name: 'Rental History', url: '/user/rental-history' },
  { name: 'Manage Address', url: '/user/manage-address' },
];

const UserNav = () => {
  const pathname = usePathname();
  return (
    <header className=" border-r border-brand-black-200/20">
      <nav>
        <ul className="flex flex-col">
          {USER_NAV_LINKS.map((link) => (
            <li
              key={link.url}
              className={clsx(
                'w-50 px-3 py-2 not-first:border-t border-brand-black-200/20',
                pathname == link.url && 'bg-brand-orange-400',
              )}
            >
              <Link
                href={link.url}
                className={clsx(
                  'font-medium block w-full border-brand-black-200/20',
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Button asChild className="w-full rounded-none cursor-pointer">
              <SignOutButton />
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default UserNav;
