import Bounded from '@/components/Bounded';
import CTA from '@/components/CTA';
import db from '@/db';
import { UserTable } from '@/db/schema';
import { formatDate } from '@/lib/formatter';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';

const UserPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const userData = await db.query.UserTable.findFirst({
    where: eq(UserTable.clerkUserId, userId),
    columns: {
      name: true,
      email: true,
      imageUrl: true,
      createdAt: true,
    },
  });

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Bounded isPadded>
      <div>
        {userData?.imageUrl && (
          <Image
            src={userData.imageUrl}
            alt={`${userData.name}'s photo` || ''}
            width={100}
            height={100}
            loading="eager"
            className="rounded-sm"
          />
        )}
      </div>

      <div className="space-y-2 [&>*:nth-child(odd)]:bg-brand-black-100/10">
        <div className="flex justify-between items-center px-2">
          <p className="font-medium">Name</p>
          <p>{userData?.name}</p>
        </div>

        <div className="flex justify-between items-center px-2">
          <p className="font-medium">Email</p>
          <p>{userData?.email}</p>
        </div>

        {userData.createdAt && (
          <div className="flex justify-between items-center px-2">
            <p className="font-medium">Member Since</p>
            <p>{formatDate(userData.createdAt.toDateString())}</p>
          </div>
        )}
      </div>

      <CTA href="/user/edit-user-profile">Edit Personal Information</CTA>
    </Bounded>
  );
};

export default UserPage;
