import { Knex } from 'knex';
import { COLUMN_TYPES } from '../../../../../../../libs/database/src/constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(process.env.DB_PUBLIC_SCHEMA_NAME)
    .createTable('data_schema_column', function (table) {
      // Some common column attributes
      table.bigIncrements('id');
      table.string('name', 50).notNullable();
      table.string('description', 4000).nullable();
      table.boolean('mandatory').defaultTo(false);

      // Choice of data types
      table
        .string('type', 25)
        .checkIn(Object.values(COLUMN_TYPES))
        .notNullable();

      //////////////////////////////////////////////////
      // Some extension fields for various column types
      //////////////////////////////////////////////////

      // Boolean Columns
      // Extension(s) specific to the boolean column type
      table.boolean('defaultBoolean');

      // String Columns
      // Extension(s) specific to the string column type
      table.string('defaultString', 4000);
      table.integer('length').checkPositive().checkBetween([1, 4000]);

      // Float and other number columns
      // Extension(s) specific to the number column types
      table.integer('precision').checkPositive().checkBetween([1, 1000]);
      table.integer('scale').checkBetween([0, 1000]);

      // DateTime and Timestamp column types
      // Extensions specific to the datetime/ timestamp column types
      table.boolean('useTz');
      table.boolean('defaultToNow');

      // Currency column types
      // Extensions specific to the currency column type
      table.string('prefix', 5);

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
    .dropTable('data_schema_column');
}
