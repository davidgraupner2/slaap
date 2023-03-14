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
  // Deletes ALL existing users
  await knex.withSchema(process.env.DB_PUBLIC_SCHEMA_NAME).table('user').del();

  // Inserts seed entries
  await knex
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .table('user')
    .insert([
      {
        id: 1,
        firstName: 'MSP',
        lastName: 'Admin',
        userName: 'msp.admin@localhost',
        email: 'msp.admin@localhost',
        password:
          '$argon2id$v=19$m=65536,t=3,p=4$Lo2BXKlFwYpvd69ZIyqN1A$H/Rak2mdGR2CHbJRuHIrUzcXa8xJ8TViiUOB5/P2kCI',
        isMsp: true,
        isActive: true,
      },
      {
        id: 2,
        firstName: 'David',
        lastName: 'Graupner',
        userName: 'grada17@gmail.com',
        email: 'grada17@gmail.com',
        password:
          '$argon2id$v=19$m=65536,t=3,p=4$Lo2BXKlFwYpvd69ZIyqN1A$H/Rak2mdGR2CHbJRuHIrUzcXa8xJ8TViiUOB5/P2kCI',
        isMsp: false,
        isActive: true,
      },
    ]);
}
