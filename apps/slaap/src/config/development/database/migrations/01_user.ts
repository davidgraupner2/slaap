import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .createTable('user', function (table) {
      // Identity and Primary Key
      table.bigIncrements('id').primary();

      table.string('firstName', 255).notNullable();
      table.string('lastName', 255).notNullable();
      table.string('userName', 255).unique().notNullable();
      table.string('email', 255).unique().notNullable();
      table.string('password', 1024).notNullable();
      table.boolean('isActive').notNullable().defaultTo(true);
      table.boolean('isEmailVerified').notNullable().defaultTo(false);

      // Indicates if the user is a MSP User
      table.boolean('isMsp').notNullable().defaultTo(false);

      // Track when records were created or updated
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());

      // Track who created and last updated
      table.bigInteger('createdBy').unsigned().nullable();
      table.bigInteger('updatedBy').unsigned().nullable();
      table.foreign('createdBy').references('user.id').onDelete('SET NULL');
      table.foreign('updatedBy').references('user.id').onDelete('SET NULL');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .dropTable('user');
}
