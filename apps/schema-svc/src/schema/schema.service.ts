import { KnexRepository } from '@lib/database/abstract/knex.repository';
import { InjectModel } from 'nest-knexjs';
import { Injectable } from '@nestjs/common';
import { DataSchema } from '@lib/common/entities';
import schemaInspector from 'knex-schema-inspector';
import { Knex } from 'knex';
import { SchemaRequestDTO } from '@lib/common/dto';

@Injectable()
export class SchemaService extends KnexRepository<DataSchema> {
  constructor(@InjectModel() public readonly knex: Knex) {
    super(knex, 'data_schema');
  }

  // Create a new instance of the schema inspector
  inspector = schemaInspector(this.knex);

  async getSchema(tableName?: string, type?: string, subType?: string) {
    console.log('3', tableName, 'type ', type, 'sub ', subType);
    let schemas: object[] = [];

    // Start off the query on just the table
    if (!tableName && !type && !subType) {
      console.log('heh');
      schemas = await this.queryBuilder.select();
    }

    // Filter the query by table name if provided
    if (tableName !== undefined) {
      schemas = await this.queryBuilder.where({
        name: tableName,
      });
    }

    // Filter the query by Schema type if provided
    if (type !== undefined) {
      schemas = await this.queryBuilder.where({
        type: type,
      });
    }

    // Filter the query by Schema sub_type if provided
    if (subType !== undefined) {
      schemas = await this.queryBuilder.where({
        subType: subType,
      });
    }

    // Loop though the schema's found and populate the relationships
    // schemas.forEach(async (schema, index, array) => {
    // Populate the owner
    // schema.owner = await this.getOneToOneRelationshipData(
    //   'public',
    //   'user',
    //   'id',
    //   schema['owner'],
    // );

    // schema = this.AddOneOnOneRelationships(
    //   schema,
    //   await this.getOneToOneRelationshipData(
    //     'public',
    //     'user',
    //     'id',
    //     schema['owner'],
    //   ),
    // );

    //   console.log(schema);
    // });

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
