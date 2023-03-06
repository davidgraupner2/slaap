import { Knex } from 'knex';
import {
  SCHEMA_TYPES,
  SCHEMA_SUB_TYPES,
} from '../../../../../../../libs/database/src/constants/schema';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .createTable('data_schema', function (table) {
      // Common Attributes
      table.bigIncrements('id');
      table.string('name', 60).notNullable();
      table.string('description', 4000).nullable();
      table.string('schemaName', 63).notNullable();

      // Choice of schema types
      table
        .string('type', 25)
        .checkIn(Object.values(SCHEMA_TYPES))
        .notNullable();

      // Choice of schema sub types
      table
        .string('subType', 25)
        .checkIn(Object.values(SCHEMA_SUB_TYPES))
        .notNullable();

      // Track who owns this schema item - typically the user that created it
      table.bigInteger('owner').unsigned().nullable();
      //   table.foreign('owner').references('user.id').onDelete('SET NULL');

      // Link this schema item to the tenant - each tenant can have their own schema's
      table.bigint('tenantId').unsigned().nullable();
      //   table.foreign('tenantId').references('tenant.id').onDelete('CASCADE');

      // Track when records were created or updated
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());

      // Track who created and last updated
      table.bigInteger('createdBy').unsigned().nullable();
      table.bigInteger('updatedBy').unsigned().nullable();
      //   table.foreign('createdBy').references('user.id').onDelete('SET NULL');
      //   table.foreign('updatedBy').references('user.id').onDelete('SET NULL');

      // Are these schema items able to be changed
      table.boolean('updateable').defaultTo(false);

      // Are these schema items able to be extended
      table.boolean('extendable').defaultTo(false);

      // Create a unique index - not allowing same schema name and type in same tenant
      table.unique(['tenantId', 'type', 'name']);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .dropTable('data_schema');
}
