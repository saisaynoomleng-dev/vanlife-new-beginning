import { createEnv } from '@t3-oss/env-nextjs';
import z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    SANITY_STUDIO_PROJECT_ID: z.string(),
    SANITY_STUDIO_DATASET: z.string(),
    SANITY_READ_TOKEN: z.string(),
    SANITY_WRITE_TOKEN: z.string(),
    SANITY_WEBHOOK_SECRET: z.string(),
    DATABASE_URL: z.string(),
    CLERK_SECRET_KEY: z.string(),
    CLERK_WEBHOOK_SIGNING_SECRET: z.string(),
    BLOB_READ_WRITE_TOKEN: z.string(),
  },
  experimental__runtimeEnv: process.env,
});
