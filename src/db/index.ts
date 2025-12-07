import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { customersTable } from './schema/customers-schema.js';
import { memoriesTable } from './schema/memories-schema.js';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set in .env file');
}

const client = postgres(databaseUrl, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(client, {
  schema: {
    memories: memoriesTable,
    customers: customersTable,
  },
});
