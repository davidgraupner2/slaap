import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .createTable('data_schema_columns', function (table) {
      table.bigint('schemaId');
      table.bigint('columnId');
      table
        .foreign('schemaId')
        .references('data_schema.id')
        .onDelete('CASCADE');
      table
        .foreign('columnId')
        .references('data_schema_column.id')
        .onDelete('CASCADE');
      table.smallint('order').checkPositive();

      // Track when records were created or updated
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());

      // Track who created and last updated
      table.bigInteger('createdBy').unsigned().nullable();
      table.bigInteger('updatedBy').unsigned().nullable();
      table.foreign('createdBy').references('user.id').onDelete('SET NULL');
      table.foreign('updatedBy').references('user.id').onDelete('SET NULL');

      // Create a primary key
      table.primary(['schemaId', 'columnId']);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .dropTable('data_schema_columns');
}
