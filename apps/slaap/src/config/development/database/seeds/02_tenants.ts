import { Knex } from 'knex';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Path to this environments config file
const configPath = path.join(
  __dirname,
  '../../..',
  process.env.NODE_ENV || 'development',
  '.app.env',
);

// Utilise dotenv to read the required environments config file into process vars
dotenv.config({
  path: configPath,
});

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing tenants
  await knex
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .table('tenant')
    .del();

  // Inserts seed entries
  await knex
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .table('tenant')
    .insert([
      {
        id: 1,
        name: 'public',
        schemaName: 'public',
        createdBy: 1,
        updatedBy: 1,
        owner: 1,
        isPublic: true,
        isActive: true,
      },
    ]);
}
