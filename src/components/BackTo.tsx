import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const BackTo = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} className="flex items-center gap-x-1 group">
      <span>
        <FaArrowLeft className="group-hover:-translate-x-1 duration-200 ease-in-out transition-all size-3" />
      </span>
      <span className="group-hover:underline">Back to {children}</span>
    </Link>
  );
};

export default BackTo;
