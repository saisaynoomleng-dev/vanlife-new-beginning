'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import clsx from 'clsx';
import { LoadingSpinner } from './LoadingSpinner';

const SubmitButton = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      variant="submit"
      type="submit"
      className={clsx('', className)}
    >
      {pending ? (
        <span>
          <LoadingSpinner />
        </span>
      ) : (
        <span>{children}</span>
      )}
    </Button>
  );
};

export default SubmitButton;
