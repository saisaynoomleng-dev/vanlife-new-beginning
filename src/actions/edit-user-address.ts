'use server';

import db from '@/db';
import { AddressTable, UserTable } from '@/db/schema';
import { EditUserAddressProps } from '@/lib/types';
import { editUserAddressFormSchema } from '@/lib/zodSchemas';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const handleEditUserAddress = async (
  prevState: EditUserAddressProps,
  formData: FormData,
): Promise<EditUserAddressProps> => {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) return { status: 'error', message: 'Unauthorized' };

    const user = await db.query.UserTable.findFirst({
      where: eq(UserTable.clerkUserId, clerkUserId),
      columns: { id: true },
    });

    if (!user) return { status: 'error', message: 'User not found' };

    const rawData = {
      address1: formData.get('address1'),
      address2: formData.get('address2'),
      city: formData.get('city'),
      zip: formData.get('zip'),
      country: formData.get('country'),
      state: formData.get('state'),
    };

    const result = editUserAddressFormSchema.safeParse(rawData);

    if (!result.success) {
      return {
        status: 'error',
        message: 'Invalid Form Data',
        field: result.error.issues[0].path[0] as string,
      };
    }

    const { address1, address2, city, zip, country, state } = result.data;

    await db
      .insert(AddressTable)
      .values({
        userId: user.id,
        address1,
        address2,
        city,
        zip,
        country,
        state,
      })
      .onConflictDoUpdate({
        target: AddressTable.userId,
        set: {
          address1,
          address2,
          city,
          state,
          zip,
          country,
        },
      });

    revalidatePath('/user/manage-address');

    return {
      status: 'success',
      message: 'Address Change Successful!',
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      message: 'Something Went Wrong',
    };
  }
};
