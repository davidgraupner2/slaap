import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .createTable('role_user', function (table) {
      // Links an existing user to an existing role
      table.bigint('role_id').unsigned().notNullable();
      table.foreign('role_id').references('role.id').onDelete('CASCADE');
      table.bigint('user_id').unsigned().notNullable();
      table.foreign('user_id').references('user.id').onDelete('CASCADE');

      // Keep track of who/when created / updated
      table.bigInteger('created_by').unsigned().notNullable();
      table.bigInteger('updated_by').unsigned().notNullable();
      table.foreign('created_by').references('user.id').onDelete('CASCADE');
      table.foreign('updated_by').references('user.id').onDelete('CASCADE');

      // Track when records were created or updated
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());

      // Ensure same user cannot belong to same tenant more than once
      table.primary(['role_id', 'user_id']);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .dropTable('role_user');
}
