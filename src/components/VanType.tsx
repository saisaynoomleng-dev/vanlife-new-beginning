import { VanTypeProps } from '@/lib/types';
import clsx from 'clsx';

const THEME = {
  simple: '#e17654',
  rugged: '#115e59',
  luxury: '#161616',
};

const VanType = ({ className, children, type }: VanTypeProps) => {
  return (
    <div
      className={clsx(
        'px-2 py-1 capitalize font-semibold text-brand-white rounded-sm',
        className,
      )}
      style={{ backgroundColor: THEME[type] }}
    >
      {children}
    </div>
  );
};

export default VanType;
