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
  // Deletes ALL existing columns
  await knex
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .table('data_schema_column')
    .del();

  // Inserts simple column entries for the various tables
  await knex
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .table('data_schema_column')
    .insert([
      {
        id: 1,
        name: 'id',
        description: 'Primary key and identity for the Tenant Table',
        mandatory: true,
        type: 'increments',
        createdBy: 1,
        updatedBy: 1,
      },
      {
        id: 2,
        name: 'name',
        description: 'Name of the Tenant',
        mandatory: true,
        type: 'string',
        createdBy: 1,
        updatedBy: 1,
        length: 255,
      },
      {
        id: 3,
        name: 'schemaName',
        description:
          'Name of the database schema where this tenants tables will be located',
        mandatory: true,
        type: 'string',
        createdBy: 1,
        updatedBy: 1,
        length: 255,
      },
      {
        id: 4,
        name: 'description',
        description: 'A field to hold the description of the tenant',
        mandatory: false,
        type: 'string',
        createdBy: 1,
        updatedBy: 1,
        length: 4000,
      },
      {
        id: 5,
        name: 'isPublic',
        description:
          'Indicates if this is the Public Tenant - there can be only 1 public Tenant',
        mandatory: true,
        type: 'boolean',
        createdBy: 1,
        updatedBy: 1,
        defaultBoolean: false,
      },
      {
        id: 6,
        name: 'isActive',
        description: 'Indicates if this record is Active or Inactive',
        mandatory: true,
        type: 'boolean',
        createdBy: 1,
        updatedBy: 1,
        defaultBoolean: true,
      },
      {
        id: 7,
        name: 'owner',
        description: 'Indicates which user own this particular record',
        mandatory: true,
        type: 'bigInteger',
        createdBy: 1,
        updatedBy: 1,
      },
      {
        id: 8,
        name: 'createdAt',
        description: 'Indicates the date/time the record was created',
        mandatory: true,
        type: 'timestamp',
        createdBy: 1,
        updatedBy: 1,
        useTz: true,
        defaultToNow: true,
      },
      {
        id: 9,
        name: 'updatedAt',
        description: 'Indicates the date/time the record was last updated',
        mandatory: true,
        type: 'timestamp',
        createdBy: 1,
        updatedBy: 1,
        useTz: true,
        defaultToNow: true,
      },
      {
        id: 10,
        name: 'createdBy',
        description: 'Indicates which user created this particular record',
        mandatory: true,
        type: 'bigInteger',
        createdBy: 1,
        updatedBy: 1,
      },
      {
        id: 11,
        name: 'updatedBy',
        description: 'Indicates which user updated this particular record',
        mandatory: true,
        type: 'bigInteger',
        createdBy: 1,
        updatedBy: 1,
      },
    ]);
}
