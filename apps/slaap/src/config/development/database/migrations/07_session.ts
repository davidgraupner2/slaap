import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .createTable('session', function (table) {
      table.string('sid').notNullable().primary();
      table.json('sess').notNullable();
      table.timestamp('expire').notNullable();

      table.index('expire', 'IDX_session_expire');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .dropTable('session');
}
