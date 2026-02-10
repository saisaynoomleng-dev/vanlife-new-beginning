import { BoundedProps } from '@/lib/types';
import clsx from 'clsx';

const Bounded = ({
  className,
  children,
  isPadded,
  as: Comp = 'section',
}: BoundedProps) => {
  return (
    <Comp
      className={clsx(
        'py-5 space-y-8 md:space-y-10 lg:space-y-16 max-w-300 lg:mx-auto min-h-screen',
        isPadded && 'px-5 md:px-8 lg:px-10',
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export default Bounded;
