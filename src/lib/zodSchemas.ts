import z from 'zod';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

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

export const editUserProfileFormSchema = z.object({
  fistname: z
    .string()
    .min(2, 'First name must have at least 2 characters')
    .max(50, 'First name cannot have 50 characters'),
  lastname: z
    .string()
    .min(2, 'First name must have at least 2 characters')
    .max(50, 'First name cannot have 50 characters'),
  email: z.email(),
  imageUrl: z
    .any()
    .refine((file) => {
      if (!file || typeof file === 'string') return true;
      return file.size <= MAX_FILE_SIZE;
    }, 'Max file size is 2MB')
    .refine((file) => {
      if (!file || typeof file === 'string') return true;
      return ACCEPTED_IMAGE_TYPES.includes(file.type);
    }, '.jpg, .jpeg, .png and .webp files are accepted.')
    .optional(),
});

export const editUserAddressFormSchema = z.object({
  address1: z.string().min(5, 'Address 1 should have at least 5 characters'),
  address2: z.string().min(1, 'Address 2 should have at least 1 characters'),
  city: z.string().min(5, 'City should have at least 5 characters'),
  state: z.string().min(1, 'State should have at least 1 characters'),
  zip: z.string().min(3, 'Zip should have at least 3 characters'),
  country: z.string().min(3, 'Country should have at least 3 characters'),
});
