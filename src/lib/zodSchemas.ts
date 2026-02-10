import z from 'zod';

export const newsletterFormSchema = z.object({
  email: z.email(),
});

export const contactFormSchema = z.object({
  name: z.string().min(5, 'Name must have at least 5 characters'),
  email: z.email(),
  phone: z.string(),
  subject: z.string(),
  message: z.string(),
});
