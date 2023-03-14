import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .createTable('tenant_user', function (table) {
      // Links an existing user to an existing tenant
      table.bigint('tenantId').unsigned().notNullable();
      table.foreign('tenantId').references('tenant.id').onDelete('CASCADE');
      table.bigint('userId').unsigned().notNullable();
      table.foreign('userId').references('user.id').onDelete('CASCADE');

      // Track when records were created or updated
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());

      // Track who created and last updated
      table.bigInteger('createdBy').unsigned().nullable();
      table.bigInteger('updatedBy').unsigned().nullable();
      table.foreign('createdBy').references('user.id').onDelete('SET NULL');
      table.foreign('updatedBy').references('user.id').onDelete('SET NULL');

      // Create a unique index ensuring the same user cannot belong to the same tenant more than once
      table.primary(['tenantId', 'userId']);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .dropTable('tenant_user');
}
