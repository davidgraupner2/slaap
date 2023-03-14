import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .createTable('tenant', function (table) {
      // Primary key and identity
      table.bigIncrements('id').primary();

      // Identification fields
      table.string('name', 255).notNullable();
      table.string('schemaName', 255).notNullable().unique();
      table.string('description', 4000).nullable();
      table.boolean('isPublic').defaultTo(false);
      table.boolean('isActive').defaultTo(true);

      // Track who owns the tenant
      table.bigInteger('owner').unsigned().nullable();
      table.foreign('owner').references('user.id').onDelete('SET NULL');

      // Track when records were created or updated
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());

      // Track who created and last updated
      table.bigInteger('createdBy').unsigned().nullable();
      table.bigInteger('updatedBy').unsigned().nullable();
      table.foreign('createdBy').references('user.id').onDelete('SET NULL');
      table.foreign('updatedBy').references('user.id').onDelete('SET NULL');

      //Create a unique index
      // - The same user cannot have the same tenant name
      table.unique(['name', 'owner'], { indexName: 'idx_tenant_owner_unique' });
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .dropTable('tenant');
}
