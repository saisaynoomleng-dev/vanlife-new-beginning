'use server';

import db from '@/db';
import { ContactTable } from '@/db/schema';
import { ContactUsFormStateProps } from '@/lib/types';
import { contactFormSchema } from '@/lib/zodSchemas';

export const handleContact = async (
  prevState: ContactUsFormStateProps,
  formData: FormData,
): Promise<ContactUsFormStateProps> => {
  const rawData = {
    name: formData.get('name')?.toString().trim() || '',
    email: formData.get('email')?.toString().trim() || '',
    phone: formData.get('phone')?.toString().trim() || '',
    subject: formData.get('subject')?.toString().trim() || '',
    message: formData.get('message')?.toString().trim() || '',
  };

  const result = contactFormSchema.safeParse(rawData);

  if (result.error) {
    const firstError = result.error.issues[0];

    return {
      status: 'error',
      message: firstError.message,
      field: firstError.path[0] as string,
    };
  }

  const { name, email, phone, subject, message } = result.data;

  try {
    await db.insert(ContactTable).values({
      name,
      email,
      phone,
      subject,
      message,
    });

    return {
      status: 'success',
      message: "Thank you contacting Us! We'll be in touch!",
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Something went wrong!',
    };
  }
};
