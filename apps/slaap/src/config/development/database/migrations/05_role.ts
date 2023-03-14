import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .createTable('role', function (table) {
      // Identiity and primary key
      table.bigIncrements('id').primary();

      // Role name identification
      table.string('name', 255).notNullable();
      table.string('description', 255).notNullable();

      // Track when records were created or updated
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());

      // Keep track of who/when created / updated
      table.bigInteger('created_by').unsigned().notNullable();
      table.bigInteger('updated_by').unsigned().notNullable();
      table.foreign('created_by').references('user.id').onDelete('CASCADE');
      table.foreign('updated_by').references('user.id').onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .dropTable('role');
}
