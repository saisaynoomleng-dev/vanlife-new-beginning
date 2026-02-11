'use server';

import { EditUserProfileProps } from '@/lib/types';
import { editUserProfileFormSchema } from '@/lib/zodSchemas';

export const handleEditUserProfile = async (
  prevState: EditUserProfileProps,
  formData: FormData,
): Promise<EditUserProfileProps> => {
  try {
    const rawData = {
      firstname: formData.get('firstname')?.toString().trim() || '',
      lastname: formData.get('lastname')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim() || '',
      imageUrl: formData.get('imageUrl')?.toString().trim() || '',
    };

    const result = editUserProfileFormSchema.safeParse(rawData);

    return {
      status: 'success',
      message: 'Profile Edit Successful!',
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Something went wrong!',
    };
  }
};
