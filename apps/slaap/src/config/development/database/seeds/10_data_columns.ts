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
  // Deletes ALL existing column to schema links
  await knex
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .table('data_schema_columns')
    .del();

  // Inserts simple column entries for the various tables
  await knex
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .table('data_schema_columns')
    .insert([
      {
        schemaId: 2,
        columnId: 1,
        order: 10,
        createdBy: 1,
        updatedBy: 1,
      },
      {
        schemaId: 2,
        columnId: 2,
        order: 20,
        createdBy: 1,
        updatedBy: 1,
      },
      {
        schemaId: 2,
        columnId: 3,
        order: 30,
        createdBy: 1,
        updatedBy: 1,
      },
      {
        schemaId: 2,
        columnId: 4,
        order: 40,
        createdBy: 1,
        updatedBy: 1,
      },
      {
        schemaId: 2,
        columnId: 5,
        order: 50,
        createdBy: 1,
        updatedBy: 1,
      },
      {
        schemaId: 2,
        columnId: 6,
        order: 60,
        createdBy: 1,
        updatedBy: 1,
      },
      {
        schemaId: 2,
        columnId: 7,
        order: 70,
        createdBy: 1,
        updatedBy: 1,
      },
      {
        schemaId: 2,
        columnId: 8,
        order: 80,
        createdBy: 1,
        updatedBy: 1,
      },
      {
        schemaId: 2,
        columnId: 9,
        order: 90,
        createdBy: 1,
        updatedBy: 1,
      },
      {
        schemaId: 2,
        columnId: 10,
        order: 100,
        createdBy: 1,
        updatedBy: 1,
      },
      {
        schemaId: 2,
        columnId: 11,
        order: 110,
        createdBy: 1,
        updatedBy: 1,
      },
    ]);
}
