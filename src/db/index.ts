import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { env } from '@/lib/env/server';
import * as schema from './schema';

const sql = neon(env.DATABASE_URL);
const db = drizzle(sql, { schema, logger: true });

export default db;
