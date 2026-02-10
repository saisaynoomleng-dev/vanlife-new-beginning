import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from '../env';
import { env } from '@/lib/env/server';

const token = env.SANITY_WRITE_TOKEN;

if (!token) {
  throw new Error('Missing Sanity Token');
}

export const client = createClient({
  projectId,
  token,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
