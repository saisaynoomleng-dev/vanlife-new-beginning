import Link from 'next/link';
import { Button } from './ui/button';
import { CTAProps } from '@/lib/types';
import clsx from 'clsx';

const CTA = ({ href, className, children }: CTAProps) => {
  return (
    <Button variant="link" className={clsx('', className)}>
      <Link href={href} className="block w-full">
        {children}
      </Link>
    </Button>
  );
};

export default CTA;
