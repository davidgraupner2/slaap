import { Injectable } from '@nestjs/common';
import { KnexRepository } from '@lib/database/abstract/knex.repository';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { DataSchema } from '@lib/common/entities';
import schemaInspector from 'knex-schema-inspector';
import { SCHEMA_SUB_TYPES, SCHEMA_TYPES } from '@lib/database/constants/schema';

@Injectable()
export class SchemaService extends KnexRepository<DataSchema> {
  constructor(@InjectModel() public readonly knex: Knex) {
    super(knex, 'data_schema');
  }

  // Create a new instance of the schema inspector
  inspector = schemaInspector(this.knex);

  async getTables(
    type: SCHEMA_TYPES | void = undefined,
    sub_type: SCHEMA_SUB_TYPES | void = undefined,
  ) {
    let schemas: object[] = [];

    // check whether a certain type of schema was selected.
    if (type !== undefined) {
      // It was - filter the query by type
      schemas = await this.queryBuilder.where({
        type: type,
      });
    }

    // check whether a certain sub-type of schema was selected.
    if (sub_type !== undefined) {
      // It was - filter the query by sub-type
      schemas = await this.queryBuilder.where({
        subType: sub_type,
      });
    }

    if (type === undefined && sub_type === undefined) {
      // No types - subtypes were selected
      schemas = await this.queryBuilder.select();
    }

    // Loop though the schema's found and populate the relationships
    schemas.forEach(async (schema, index, array) => {
      // Populate the owner
      // schema.owner = await this.getOneToOneRelationshipData(
      //   'public',
      //   'user',
      //   'id',
      //   schema['owner'],
      // );

      schema = this.AddOneOnOneRelationships(
        schema,
        await this.getOneToOneRelationshipData(
          'public',
          'user',
          'id',
          schema['owner'],
        ),
      );

      console.log(schema);
    });

    // this.table[0] = this.AddOneOnOneRelationships(
    //   this.table[0],
    //   await this.getOneToOneRelationshipData('public', 'user', 'id', 1),
    // );

    // console.log(this.table);

    // table.owner = await this.getOneToOneRelationshipData(
    //   'public',
    //   'user',
    //   'id',
    //   1,
    // );
    // console.log(table['owner']);

    // return this.getOneToOneRelationshipData('public', 'user', 'id', 1);

    return schemas;

    // return this.inspector.foreignKeys('data_schema');

    // return await db;
  }

  AddOneOnOneRelationships(tableObject, objectPropperty) {
    tableObject.owner = objectPropperty;
    return tableObject;
  }

  async getOneToOneRelationshipData(
    schemaName: string,
    tableName: string,
    foreignKeycolumn: string,
    foreignKeyValue: number,
  ) {
    console.log(
      schemaName,
      ' ',
      tableName,
      ' ',
      foreignKeycolumn,
      ' ',
      foreignKeyValue,
    );
    return this.knex
      .withSchema(schemaName)
      .table(tableName)
      .where(foreignKeycolumn, foreignKeyValue)
      .first();
  }
}
