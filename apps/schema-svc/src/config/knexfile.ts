/**
 * KnexJS Config file for the data-svc microservice
 * - Configures KnexJS for creating the service tables
 *
 * @author David Graupner
 * @version 1.0
 * @since 2023-02-07
 */

import type { Knex } from 'knex';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as readline from 'readline';
import { exit } from 'process';

const environment = process.env.NODE_ENV;

// Path to this environments config file
const configPath = path.join(
  __dirname,
  process.env.NODE_ENV || 'development',
  '.app.env',
);

// Set the location to the migrations for the DB Structure - for this environment
const migrationPath = path.join(
  __dirname,
  process.env.NODE_ENV || 'development',
  'database',
  'migrations',
);

// Set the location to the seed path for the initial seed data - for this environment
const seedPath = path.join(
  __dirname,
  process.env.NODE_ENV || 'development',
  'database',
  'seeds',
);
// Setup the prompt to the user - to ensure they are using the correct environment
const prompt = `\n*************************************************************************************************************************************************
You are about to make database changes to the \x1b[31m${environment}\x1b[0m environment.\n
\x1b[32m Configuration File:\x1b[0m ${configPath}
\x1b[32m Migrations Directory:\x1b[0m ${migrationPath}
\x1b[32m Seed Directory:\x1b[0m ${seedPath}
\n*************************************************************************************************************************************************
If this is \x1b[31mNOT\x1b[0m what you want to do, press \x1b[31mCTRL-C\x1b[0m to break out of this process and change the \x1b[31m'NODE_ENV'\x1b[0m environment variable
 to the correct environment being 'development','staging' or 'production. Otherwise press \x1b[32mENTER to continue\x1b[0m.\n
 See: \x1b[34mhttps://knexjs.org/guide/migrations.html\x1b[0m for more command line options if needed (such as rollback!)
*************************************************************************************************************************************************`;
console.log(prompt);

// Prompt for ENTER to continue or CTRL-C to exit
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('child_process').spawnSync('read _ ', {
  shell: true,
  stdio: [0, 1, 2],
});

// Utilise dotenv to read the required environments config file into process vars
dotenv.config({
  path: configPath,
});

// Configure the environments with the config from the related environments
// (NODE_ENV environment variable) config file
const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_DATABASE_NAME,
      user: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST_NAME,
      port: parseInt(process.env.DB_HOST_PORT),
    },
    pool: {
      min: parseInt(process.env.DB_POOL_MIN_CONNECTIONS),
      max: parseInt(process.env.DB_POOL_MAX_CONNECTIONS),
    },
    migrations: {
      directory: migrationPath,
    },
    seeds: {
      directory: seedPath,
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_DATABASE_NAME,
      user: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST_NAME,
      port: parseInt(process.env.DB_HOST_PORT),
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: migrationPath,
    },
    seeds: {
      directory: seedPath,
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_DATABASE_NAME,
      user: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST_NAME,
      port: parseInt(process.env.DB_HOST_PORT),
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: migrationPath,
    },
    seeds: {
      directory: seedPath,
    },
  },
};

module.exports = config;
