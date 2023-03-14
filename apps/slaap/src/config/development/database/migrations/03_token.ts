import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .createTable('token', function (table) {
      // Links this token to the end user
      table.bigIncrements('id');

      table.bigint('user_id').unsigned().notNullable();
      table.foreign('user_id').references('user.id').onDelete('CASCADE');

      // Indicates if the token has been revoked
      table.boolean('revoked').defaultTo(false).notNullable();
      table.string('revoke_reason', 50).nullable();
      table.timestamp('revoked_at').nullable();

      // Records identification details for the token
      table.uuid('access_token_id').notNullable();
      table.uuid('refresh_token_id').notNullable();
      table.string('refresh_token', 1024).notNullable();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .dropTable('token');
}
