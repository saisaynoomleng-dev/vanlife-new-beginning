'use server';

import db from '@/db';
import { NewsletterSubscriptionTable } from '@/db/schema';
import { NewsletterFormStateProps } from '@/lib/types';
import { newsletterFormSchema } from '@/lib/zodSchemas';

export const handleNewsletter = async (
  prevState: NewsletterFormStateProps,
  formData: FormData,
): Promise<NewsletterFormStateProps> => {
  const rawData = {
    email: formData.get('email')?.toString().trim() || '',
  };

  const result = newsletterFormSchema.safeParse(rawData);

  if (result.error) {
    const firstError = result.error.issues[0].message;

    return {
      status: 'error',
      message: firstError,
    };
  }

  const { email } = result.data;

  try {
    await db
      .insert(NewsletterSubscriptionTable)
      .values({
        email,
      })
      .onConflictDoNothing({ target: NewsletterSubscriptionTable.email });

    return {
      status: 'success',
      message: 'Thank you for your subscription!',
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Something went wrong!',
    };
  }
};
