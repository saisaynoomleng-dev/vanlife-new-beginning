import Bounded from '@/components/Bounded';
import CTA from '@/components/CTA';
import db from '@/db';
import { UserTable } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

const ManageAddressPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const userData = await db.query.UserTable.findFirst({
    where: eq(UserTable.clerkUserId, userId),
    columns: {
      name: true,
    },
    with: {
      address: {
        columns: {
          address1: true,
          address2: true,
          city: true,
          zip: true,
          state: true,
          country: true,
        },
      },
    },
  });

  return (
    <Bounded isPadded>
      <h2 className="font-semibold text-fs-500">User Addresses</h2>

      <div className="space-y-2 [&>*:nth-child(even)]:bg-brand-black-100/5 *:px-3 *:flex *:items-center *:justify-between">
        <div>
          <p className="font-semibold">Address 1</p>
          <p>{userData?.address?.address1}</p>
        </div>

        <div>
          <p className="font-semibold">Address 2</p>
          <p>{userData?.address?.address2}</p>
        </div>

        <div>
          <p className="font-semibold">City</p>
          <p>{userData?.address?.city}</p>
        </div>

        <div>
          <p className="font-semibold">State</p>
          <p>{userData?.address?.state}</p>
        </div>

        <div>
          <p className="font-semibold">Zip</p>
          <p>{userData?.address?.zip}</p>
        </div>

        <div>
          <p className="font-semibold">Country</p>
          <p>{userData?.address?.country}</p>
        </div>
      </div>

      <CTA href="/user/manage-address/edit-user-address">Edit Address</CTA>
    </Bounded>
  );
};

export default ManageAddressPage;
