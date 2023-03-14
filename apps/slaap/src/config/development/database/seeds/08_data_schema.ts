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
    .table('data_schema')
    .del();

  // Inserts seed entries
  await knex
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .table('data_schema')
    .insert([
      {
        id: 1,
        name: 'user',
        description:
          'Main user table - all locally defined users are created here',
        schemaName: 'public',
        type: 'table',
        subType: 'system-table',
        owner: 1,
        tenantId: 1,
        createdBy: 1,
        updatedBy: 1,
        updateable: false,
        extendable: false,
      },
      {
        id: 2,
        name: 'tenant',
        description:
          'Main tenant table - all tenants are defined in this table',
        schemaName: 'public',
        type: 'table',
        subType: 'system-table',
        owner: 1,
        tenantId: 1,
        createdBy: 1,
        updatedBy: 1,
        updateable: false,
        extendable: false,
      },
    ]);
}
