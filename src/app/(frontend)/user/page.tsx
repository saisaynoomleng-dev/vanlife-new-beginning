import { Button } from '@/components/ui/button';
import { SignOutButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

const UserPage = async () => {
  const { userId, isAuthenticated } = await auth();

  if (!isAuthenticated) (await auth()).redirectToSignIn();

  return (
    <div>
      <Button asChild>
        <SignOutButton />
      </Button>
    </div>
  );
};

export default UserPage;
